import { chromium, webkit } from "@playwright/test";
import { mkdir } from "node:fs/promises";

await mkdir("system-integration-qa", { recursive: true });

const baseUrl = process.env.QA_BASE_URL ?? "http://127.0.0.1:3000";
const routes = [
  { path: "/studio", name: "studio", material: "hero" },
  { path: "/systems", name: "systems", material: "capabilities" },
];

async function assertSitemap() {
  const response = await fetch(new URL("/sitemap.xml", baseUrl));
  if (!response.ok) throw new Error(`sitemap: expected 200, got ${response.status}`);
  const body = await response.text();
  for (const path of ["/studio", "/systems"]) {
    if (!body.includes(`https://bndstudio.art${path}`)) {
      throw new Error(`sitemap: missing ${path}`);
    }
  }
}

async function assertCommon(page, route, label) {
  const response = await page.goto(new URL(route.path, baseUrl).toString(), { waitUntil: "networkidle" });
  if (!response || response.status() !== 200) {
    throw new Error(`${label}/${route.name}: expected 200, got ${response?.status() ?? "no response"}`);
  }

  await page.waitForTimeout(450);

  if ((await page.locator("main").count()) !== 1) {
    throw new Error(`${label}/${route.name}: expected exactly one main landmark`);
  }

  const skipHref = await page.locator(".site-skip-link").getAttribute("href");
  if (skipHref !== `#${route.name}-main`) {
    throw new Error(`${label}/${route.name}: skip link points to ${skipHref ?? "<missing>"}`);
  }

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  if (overflow > 1) throw new Error(`${label}/${route.name}: horizontal overflow ${overflow}px`);

  const canvas = page.locator("canvas").first();
  if ((await canvas.count()) !== 1) throw new Error(`${label}/${route.name}: expected one primary material canvas`);

  const metric = await canvas.evaluate((node) => ({
    width: node.width,
    cssWidth: node.getBoundingClientRect().width,
  }));
  if (metric.cssWidth > 0 && metric.width / metric.cssWidth > 1.5) {
    throw new Error(`${label}/${route.name}: canvas DPR exceeds budget`);
  }

  const surface = page.locator(`[data-material-surface="${route.material}"]`).first();
  if ((await surface.count()) !== 1) throw new Error(`${label}/${route.name}: missing governed material surface`);
}

async function assertVisibleBriefRoute(page, label, routeName) {
  const brief = page.locator('a[href="/#brief"]:visible').first();
  if ((await brief.count()) !== 1) {
    throw new Error(`${label}/${routeName}: no visible route to Brief`);
  }
}

async function assertStudio(page, label) {
  const make = page.getByRole("tab", { name: /MAKE/ });
  await make.click();
  if ((await make.getAttribute("aria-selected")) !== "true") {
    throw new Error(`${label}/studio: MAKE mode did not activate`);
  }
  await page.getByRole("heading", { name: "Проектируем материальный цифровой опыт." }).waitFor({ state: "visible" });

  const systemsHref = await page.getByRole("link", { name: /Открыть Systems/ }).getAttribute("href");
  if (systemsHref !== "/systems") throw new Error(`${label}/studio: Systems exit link is ${systemsHref}`);

  await assertVisibleBriefRoute(page, label, "studio");
}

async function assertSystems(page, label) {
  const media = page.getByRole("tab", { name: /MEDIA SYSTEMS/ });
  await media.click();
  if ((await media.getAttribute("aria-selected")) !== "true") {
    throw new Error(`${label}/systems: MEDIA route did not activate`);
  }

  await page.locator("#atlas").scrollIntoViewIfNeeded();
  await page.getByRole("heading", { name: "Content / Channels / Distribution" }).waitFor({ state: "visible" });

  await assertVisibleBriefRoute(page, label, "systems");

  const studioHref = await page.getByRole("link", { name: /Studio/ }).last().getAttribute("href");
  if (studioHref !== "/studio") throw new Error(`${label}/systems: Studio link is ${studioHref}`);
}

async function assertHomepageRouteIndex(page, label) {
  const response = await page.goto(new URL("/", baseUrl).toString(), { waitUntil: "networkidle" });
  if (!response || response.status() !== 200) {
    throw new Error(`${label}/home: expected 200, got ${response?.status() ?? "no response"}`);
  }

  for (const path of ["/studio", "/systems"]) {
    const link = page.locator(`#hero nav[aria-label="Навигация BND Studio"] a[href="${path}"]:visible`);
    if ((await link.count()) !== 1) {
      throw new Error(`${label}/home: ${path} is not visible in the site route index`);
    }
  }
}

async function run(browserType, label, viewport) {
  const browser = await browserType.launch({ headless: true });
  const page = await browser.newPage({ viewport });
  const errors = [];
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });

  for (const route of routes) {
    await assertCommon(page, route, label);
    if (route.name === "studio") await assertStudio(page, label);
    if (route.name === "systems") await assertSystems(page, label);

    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "auto" }));
    await page.waitForTimeout(160);
    await page.screenshot({
      path: `system-integration-qa/route-${route.name}-${label}.png`,
      fullPage: false,
    });
  }

  await assertHomepageRouteIndex(page, label);

  if (errors.length) throw new Error(`${label}: ${errors.join("\n")}`);
  await browser.close();
}

async function runReducedMotion() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  for (const route of routes) {
    await assertCommon(page, route, "reduced-motion");
    const active = await page.locator('[data-render-active="true"]').count();
    if (active !== 0) throw new Error(`reduced-motion/${route.name}: ${active} continuously active material surfaces`);
  }

  if (errors.length) throw new Error(`reduced-motion: ${errors.join("\n")}`);
  await browser.close();
}

await assertSitemap();
await run(chromium, "chromium", { width: 1440, height: 1000 });
await run(webkit, "webkit", { width: 1440, height: 1000 });
await run(webkit, "webkit-430", { width: 430, height: 932 });
await runReducedMotion();
