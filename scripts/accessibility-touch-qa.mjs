import { chromium, webkit } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const baseUrl = process.env.QA_BASE_URL ?? "http://127.0.0.1:3000";
const routes = [
  { path: "/", focusTarget: "main-content", label: "HOME" },
  { path: "/studio", focusTarget: "studio-main", label: "STUDIO" },
  { path: "/systems", focusTarget: "systems-main", label: "SYSTEMS" },
  { path: "/brief", focusTarget: "brief-main", label: "BRIEF" },
];

await mkdir("accessibility-touch-qa", { recursive: true });

function url(path) {
  return new URL(path, baseUrl).toString();
}

async function activeId(page) {
  return page.evaluate(() => document.activeElement?.id || document.activeElement?.className || document.activeElement?.tagName || "");
}

async function assertSkipLink(browser, route) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const response = await page.goto(url(route.path), { waitUntil: "networkidle" });
  if (!response || response.status() !== 200) {
    throw new Error(`skip ${route.path}: expected 200, got ${response?.status() ?? "no response"}`);
  }

  await page.keyboard.press("Tab");
  const firstFocus = await page.evaluate(() => ({
    className: document.activeElement?.className || "",
    text: document.activeElement?.textContent?.trim() || "",
  }));
  if (!String(firstFocus.className).includes("site-skip-link")) {
    throw new Error(`skip ${route.path}: first focus is ${JSON.stringify(firstFocus)}`);
  }

  const skipRect = await page.locator(".site-skip-link").boundingBox();
  if (!skipRect || skipRect.y < -1 || skipRect.height < 24) {
    throw new Error(`skip ${route.path}: focused skip link is not visibly exposed`);
  }

  await page.keyboard.press("Enter");
  await page.waitForFunction((target) => document.activeElement?.id === target, route.focusTarget, { timeout: 2_000 });
  const focused = await activeId(page);
  if (focused !== route.focusTarget) {
    throw new Error(`skip ${route.path}: activation focused ${focused || "<missing>"}, expected ${route.focusTarget}`);
  }

  await context.close();
}

async function waitForRouteState(page, pathname) {
  await page.waitForURL((candidate) => candidate.pathname === pathname, { timeout: 10_000 });
  await page.waitForFunction(() => document.querySelector('[data-route-transition="true"]')?.getAttribute("data-state") === "idle", null, { timeout: 10_000 });
}

async function assertRouteFocusAndAnnouncement(browser, reducedMotion = false) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: reducedMotion ? "reduce" : "no-preference",
  });
  const page = await context.newPage();
  await page.goto(url("/"), { waitUntil: "networkidle" });

  const sequence = [
    { from: "/", to: "/studio", target: "studio-main", label: "STUDIO" },
    { from: "/studio", to: "/systems", target: "systems-main", label: "SYSTEMS" },
    { from: "/systems", to: "/brief", target: "brief-main", label: "BRIEF" },
  ];

  for (const step of sequence) {
    const selector = step.from === "/"
      ? `#hero > header a[href="${step.to}"]:visible`
      : `main header a[href="${step.to}"]:visible`;
    const link = page.locator(selector).first();
    if ((await link.count()) !== 1) throw new Error(`route ${step.from}: missing visible ${step.to} link`);

    await link.focus();
    await link.press("Enter");
    await waitForRouteState(page, step.to);
    await page.waitForFunction((target) => document.activeElement?.id === target, step.target, { timeout: 2_000 });

    const focused = await activeId(page);
    if (focused !== step.target) {
      throw new Error(`route ${step.to}: focus landed on ${focused || "<missing>"}, expected ${step.target}`);
    }

    await page.waitForFunction(
      ({ label }) => document.querySelector('[data-route-announcer="true"]')?.textContent?.includes(label),
      { label: step.label },
      { timeout: 2_000 },
    );
    const announcement = (await page.locator('[data-route-announcer="true"]').textContent())?.trim() || "";
    if (!announcement.includes(step.label)) {
      throw new Error(`route ${step.to}: missing route announcement, got ${JSON.stringify(announcement)}`);
    }
  }

  if (reducedMotion) {
    const overlay = page.locator('[data-route-transition="true"]');
    const display = await overlay.evaluate((node) => getComputedStyle(node).display);
    if (display !== "none") throw new Error(`reduced motion: route overlay display is ${display}`);
  }

  await context.close();
}

async function collectTouchRoute(browser, route) {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    hasTouch: true,
    isMobile: true,
  });
  const page = await context.newPage();
  const response = await page.goto(url(route.path), { waitUntil: "networkidle" });
  if (!response || response.status() !== 200) {
    throw new Error(`touch ${route.path}: expected 200, got ${response?.status() ?? "no response"}`);
  }
  await page.waitForTimeout(450);

  const audit = await page.evaluate(() => {
    const overflow = document.documentElement.scrollWidth - window.innerWidth;
    const selector = [
      "header a[href]",
      '[role="tab"]',
      "button[aria-pressed]",
      "#brief button",
      "#brief input",
      "#brief textarea",
      "#brief-main footer a[href]",
      "#footer a[href]",
    ].join(",");

    const targets = Array.from(document.querySelectorAll(selector))
      .filter((node) => {
        const style = getComputedStyle(node);
        const rect = node.getBoundingClientRect();
        return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
      })
      .map((node) => {
        const rect = node.getBoundingClientRect();
        return {
          tag: node.tagName.toLowerCase(),
          text: (node.textContent || node.getAttribute("aria-label") || "").trim().replace(/\s+/g, " ").slice(0, 80),
          width: Math.round(rect.width * 10) / 10,
          height: Math.round(rect.height * 10) / 10,
        };
      });

    return { overflow, targets };
  });

  if (audit.overflow > 1) {
    throw new Error(`touch ${route.path}: horizontal overflow ${audit.overflow}px`);
  }

  const undersized = audit.targets.filter((target) => target.width < 44 || target.height < 44);
  if (undersized.length) {
    throw new Error(`touch ${route.path}: targets below 44x44: ${JSON.stringify(undersized)}`);
  }

  await context.close();
  return audit;
}

const chromiumBrowser = await chromium.launch({ headless: true });
try {
  for (const route of routes) await assertSkipLink(chromiumBrowser, route);
  await assertRouteFocusAndAnnouncement(chromiumBrowser, false);
  await assertRouteFocusAndAnnouncement(chromiumBrowser, true);
} finally {
  await chromiumBrowser.close();
}

const webkitBrowser = await webkit.launch({ headless: true });
const touch = {};
try {
  for (const route of routes) touch[route.path] = await collectTouchRoute(webkitBrowser, route);
} finally {
  await webkitBrowser.close();
}

await writeFile(
  "accessibility-touch-qa/report.json",
  `${JSON.stringify({ generatedAt: new Date().toISOString(), baseUrl, touch }, null, 2)}\n`,
);

console.log("Accessibility / touch QA passed");
for (const route of routes) {
  console.log(`${route.path.padEnd(9)} touch-targets=${touch[route.path].targets.length} overflow=${touch[route.path].overflow}px`);
}
