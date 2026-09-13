import { chromium, webkit } from "@playwright/test";
import { mkdir } from "node:fs/promises";

await mkdir("route-continuity-qa", { recursive: true });

const baseUrl = process.env.QA_BASE_URL ?? "http://127.0.0.1:3000";

async function waitForIdle(page) {
  await page.locator('[data-route-transition="true"][data-state="idle"]').waitFor({ state: "attached" });
  await page.waitForFunction(() => {
    const node = document.querySelector('[data-route-transition="true"]');
    return node?.getAttribute("data-state") === "idle";
  });
}

async function navigateWithTransition(page, selector, expectedPath, screenshotPath) {
  const link = page.locator(selector).filter({ visible: true }).first();
  if ((await link.count()) !== 1) throw new Error(`missing visible route link: ${selector}`);

  const expected = new URL(expectedPath, baseUrl);
  await link.click({ noWaitAfter: true });

  await page.waitForFunction(() => {
    const node = document.querySelector('[data-route-transition="true"]');
    return node?.getAttribute("data-state") === "covering";
  });

  if (screenshotPath) {
    await page.waitForTimeout(150);
    await page.screenshot({ path: screenshotPath, fullPage: false });
  }

  await page.waitForURL((url) => url.pathname === expected.pathname && url.hash === expected.hash, { timeout: 7000 });
  await waitForIdle(page);
}

async function run(browserType, label, viewport) {
  const browser = await browserType.launch({ headless: true });
  const page = await browser.newPage({ viewport });
  const errors = [];

  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });

  await page.goto(new URL("/", baseUrl).toString(), { waitUntil: "networkidle" });
  await waitForIdle(page);

  await navigateWithTransition(
    page,
    '#hero nav[aria-label="Навигация BND Studio"] a[href="/studio"]',
    "/studio",
    `route-continuity-qa/transition-home-studio-${label}.png`,
  );

  await page.getByRole("heading", { name: "BND Studio" }).waitFor({ state: "visible" }).catch(() => {});
  if (new URL(page.url()).pathname !== "/studio") throw new Error(`${label}: Studio navigation failed`);

  await navigateWithTransition(
    page,
    'nav[aria-label="Разделы сайта"] a[href="/systems"]',
    "/systems",
    null,
  );
  await page.getByRole("heading", { name: /Не услуги/ }).waitFor({ state: "visible" });

  await navigateWithTransition(
    page,
    'a[href="/#brief"]',
    "/#brief",
    null,
  );

  await page.locator("#brief").waitFor({ state: "visible" });
  const briefPosition = await page.locator("#brief").evaluate((node) => node.getBoundingClientRect().top);
  if (Math.abs(briefPosition) > 180) {
    throw new Error(`${label}: Brief route landed ${Math.round(briefPosition)}px from viewport origin`);
  }

  if (errors.length) throw new Error(`${label}: ${errors.join("\n")}`);
  await browser.close();
}

async function runReducedMotion() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 430, height: 932 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();

  await page.goto(new URL("/", baseUrl).toString(), { waitUntil: "networkidle" });
  const routeLayer = page.locator('[data-route-transition="true"]');
  if ((await routeLayer.count()) !== 1) throw new Error("reduced-motion: transition bridge missing");

  await Promise.all([
    page.waitForURL((url) => url.pathname === "/studio"),
    page.locator('#hero nav[aria-label="Навигация BND Studio"] a[href="/studio"]:visible').click(),
  ]);

  const state = await routeLayer.getAttribute("data-state");
  if (state !== "idle") throw new Error(`reduced-motion: transition state is ${state}`);

  await browser.close();
}

await run(chromium, "chromium", { width: 1440, height: 1000 });
await run(webkit, "webkit-430", { width: 430, height: 932 });
await runReducedMotion();
