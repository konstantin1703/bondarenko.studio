import { chromium, webkit } from "@playwright/test";

const targetUrl = new URL("/", process.env.QA_BASE_URL ?? "http://127.0.0.1:3000").toString();
const sectionIds = ["hero", "diagnostics", "capabilities", "brief", "footer"];

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
    throw new Error("material lifecycle: Hero surface is not mounted on initial desktop view");
  }
  if (realNames.has("capabilities") || realNames.has("brief") || realNames.has("footer")) {
    throw new Error(`material lifecycle: deep desktop surfaces mounted eagerly (${[...realNames].join(", ")})`);
  }
  if (real.length > 2) {
    throw new Error(`material lifecycle: expected at most 2 real desktop surfaces initially, got ${real.length}`);
  }
  if (placeholders.length < 3) {
    throw new Error(`material lifecycle: expected deferred desktop placeholders for deep sections, got ${placeholders.length}`);
  }

  await page.addStyleTag({ content: "html { scroll-behavior: auto !important; } #footer { scroll-margin-top: 0 !important; }" });
  await page.evaluate(() => document.querySelector("#footer")?.scrollIntoView({ behavior: "auto", block: "start" }));
  await page.waitForFunction(
    () => document.querySelector('[data-material-surface="footer"]')?.getAttribute("data-render-active") === "true",
    undefined,
    { timeout: 3000 },
  );

  const footerPlaceholder = await page.locator('[data-material-placeholder-state][data-material-surface="footer"]').count();
  if (footerPlaceholder !== 0) {
    throw new Error("material lifecycle: Footer placeholder was not retired after real desktop surface became ready");
  }
} finally {
  await browser.close();
}

const mobileBrowser = await webkit.launch({ headless: true });
try {
  for (const section of ["diagnostics", "capabilities", "brief"]) {
    const mobilePage = await mobileBrowser.newPage({ viewport: { width: 430, height: 932 } });
    const url = new URL(`#${section}`, targetUrl).toString();
    await mobilePage.goto(url, { waitUntil: "networkidle" });
    await mobilePage.waitForTimeout(700);

    const position = await mobilePage.locator(`#${section}`).evaluate((node) => node.getBoundingClientRect().top);
    if (Math.abs(position) > 3) {
      throw new Error(`material lifecycle: mobile direct hash #${section} drifted to top=${position}px`);
    }

    const visibleMaterialCanvases = await mobilePage.locator(`#${section} canvas:visible`).count();
    if (visibleMaterialCanvases !== 0) {
      throw new Error(`material lifecycle: #${section} exposes ${visibleMaterialCanvases} visible WebGL canvas(es) on mobile`);
    }

    const activeInSection = await mobilePage.locator(`#${section} [data-render-active="true"]`).count();
    if (activeInSection !== 0) {
      throw new Error(`material lifecycle: #${section} has ${activeInSection} continuously running material surface(s) on mobile`);
    }

    const allRunning = await mobilePage.locator('[data-render-active="true"]').count();
    if (allRunning !== 0) {
      throw new Error(`material lifecycle: mobile direct hash #${section} still runs ${allRunning} WebGL material surface(s)`);
    }

    await mobilePage.close();
  }

  const mobilePage = await mobileBrowser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto(targetUrl, { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(500);
  for (const section of sectionIds) {
    await mobilePage.evaluate((id) => document.querySelector(`#${id}`)?.scrollIntoView({ behavior: "auto", block: "start" }), section);
    await mobilePage.waitForTimeout(100);
    const visibleMaterialCanvases = await mobilePage.locator(`#${section} canvas:visible`).count();
    if (visibleMaterialCanvases !== 0) {
      throw new Error(`material lifecycle: #${section} exposes ${visibleMaterialCanvases} visible WebGL canvas(es) during mobile scroll`);
    }
  }
  const mobileRunning = await mobilePage.locator('[data-render-active="true"]').count();
  if (mobileRunning !== 0) {
    throw new Error(`material lifecycle: mobile page still runs ${mobileRunning} WebGL material surface(s)`);
  }
  await mobilePage.close();
} finally {
  await mobileBrowser.close();
}

console.log("Material lifecycle QA passed: desktop deferred WebGL preserved; mobile static materials stay non-running");
