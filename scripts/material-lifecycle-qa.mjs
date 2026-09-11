import { chromium } from "@playwright/test";

const targetUrl = new URL("/", process.env.QA_BASE_URL ?? "http://127.0.0.1:3000").toString();
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

try {
  await page.goto(targetUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(650);

  const snapshot = await page.locator("[data-material-surface]").evaluateAll((nodes) =>
    nodes.map((node) => ({
      name: node.getAttribute("data-material-surface"),
      placeholder: node.hasAttribute("data-material-placeholder-state"),
      active: node.getAttribute("data-render-active") === "true",
    })),
  );

  const real = snapshot.filter((surface) => !surface.placeholder);
  const realNames = new Set(real.map((surface) => surface.name));
  const placeholders = snapshot.filter((surface) => surface.placeholder);

  if (!realNames.has("hero")) {
    throw new Error("material lifecycle: Hero surface is not mounted on initial view");
  }
  if (realNames.has("capabilities") || realNames.has("footer")) {
    throw new Error(`material lifecycle: deep offscreen surfaces mounted eagerly (${[...realNames].join(", ")})`);
  }
  if (real.length > 3) {
    throw new Error(`material lifecycle: expected at most 3 real surfaces initially, got ${real.length}`);
  }
  if (placeholders.length < 2) {
    throw new Error(`material lifecycle: expected deferred placeholders for deep sections, got ${placeholders.length}`);
  }

  await page.evaluate(() => document.querySelector("#footer")?.scrollIntoView({ behavior: "auto", block: "start" }));
  await page.waitForFunction(
    () => document.querySelector('[data-material-surface="footer"]')?.getAttribute("data-render-active") === "true",
    undefined,
    { timeout: 3000 },
  );

  const footerPlaceholder = await page.locator('[data-material-placeholder-state][data-material-surface="footer"]').count();
  if (footerPlaceholder !== 0) {
    throw new Error("material lifecycle: Footer placeholder was not retired after real surface became ready");
  }
} finally {
  await browser.close();
}
