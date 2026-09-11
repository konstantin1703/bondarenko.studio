import { chromium, webkit } from "@playwright/test";
import { mkdir } from "node:fs/promises";

await mkdir("system-integration-qa", { recursive: true });

const sectionIds = ["hero", "diagnostics", "capabilities", "brief", "footer"];

async function forceDeterministicScroll(page) {
  await page.addStyleTag({ content: `html { scroll-behavior: auto !important; scroll-padding-top: 0 !important; } #hero, #diagnostics, #capabilities, #brief, #footer { scroll-margin-top: 0 !important; }` });
}

async function assertRenderBudget(page, label, expectedSurface, maxActive = 3) {
  await page.waitForFunction(
    (surface) => document.querySelector(`[data-material-surface="${surface}"]`)?.getAttribute("data-render-active") === "true",
    expectedSurface,
    { timeout: 2500 },
  );

  const states = await page.locator("[data-material-surface]").evaluateAll((nodes) => nodes.map((node) => ({
    surface: node.getAttribute("data-material-surface"),
    active: node.getAttribute("data-render-active") === "true",
  })));

  if (states.length !== 5) throw new Error(`${label}: expected 5 governed material surfaces, got ${states.length}`);
  const active = states.filter((state) => state.active);
  if (!active.some((state) => state.surface === expectedSurface)) throw new Error(`${label}: ${expectedSurface} material is not active near its viewport`);
  if (active.length > maxActive) throw new Error(`${label}: WebGL budget exceeded; active surfaces: ${active.map((state) => state.surface).join(", ")}`);
}

async function activateHashLink(page, selector, expectedHash, targetSelector, label) {
  const result = await page.evaluate(({ selector, expectedHash, targetSelector }) => {
    const anchor = document.querySelector(selector);
    const target = document.querySelector(targetSelector);
    if (!(anchor instanceof HTMLAnchorElement)) return { ok: false, reason: `missing anchor ${selector}`, hash: window.location.hash, top: Number.NaN };
    if (!(target instanceof HTMLElement)) return { ok: false, reason: `missing target ${targetSelector}`, hash: window.location.hash, top: Number.NaN };

    anchor.click();
    target.scrollIntoView({ behavior: "auto", block: "start" });

    return {
      ok: window.location.hash === expectedHash,
      reason: "",
      hash: window.location.hash,
      top: target.getBoundingClientRect().top,
    };
  }, { selector, expectedHash, targetSelector });

  if (!result.ok) throw new Error(`${label}: ${selector} expected ${expectedHash}, got ${result.hash || "<empty>"}${result.reason ? ` (${result.reason})` : ""}`);
  if (Math.abs(result.top) > 3) throw new Error(`${label}: ${expectedHash} landed at top=${result.top}px`);
}

async function assertStructure(page, label) {
  const positions = [];
  for (const id of sectionIds) {
    const locator = page.locator(`#${id}`);
    if ((await locator.count()) !== 1) throw new Error(`${label}: expected exactly one #${id}`);
    const box = await locator.boundingBox();
    if (!box) throw new Error(`${label}: #${id} has no layout box`);
    positions.push(box.y);
  }

  for (let index = 1; index < positions.length; index += 1) {
    if (positions[index] <= positions[index - 1]) throw new Error(`${label}: section order is invalid at ${sectionIds[index]}`);
  }

  const missingTargets = await page.evaluate(() => [...document.querySelectorAll('a[href^="#"]')]
    .map((anchor) => anchor.getAttribute("href"))
    .filter((href) => href && href.length > 1 && !document.querySelector(href)));
  if (missingTargets.length) throw new Error(`${label}: missing hash targets: ${missingTargets.join(", ")}`);

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  if (overflow > 1) throw new Error(`${label}: horizontal overflow ${overflow}px`);

  const canvasMetrics = await page.locator("canvas").evaluateAll((canvases) => canvases.map((canvas) => ({
    width: canvas.width,
    cssWidth: canvas.getBoundingClientRect().width,
  })));
  if (canvasMetrics.length < 5) throw new Error(`${label}: expected the five frozen material canvases`);
  for (const metric of canvasMetrics) {
    if (metric.cssWidth > 0 && metric.width / metric.cssWidth > 1.5) throw new Error(`${label}: canvas DPR exceeds integration budget`);
  }
}

async function assertAnchorNavigation(page, label) {
  await forceDeterministicScroll(page);

  await activateHashLink(page, '#hero a[href="#diagnostics"]', "#diagnostics", "#diagnostics", label);
  await assertRenderBudget(page, label, "diagnostics");

  await activateHashLink(page, '#hero a[href="#capabilities"]', "#capabilities", "#capabilities", label);
  await assertRenderBudget(page, label, "capabilities");

  await activateHashLink(page, '#hero a[href="#brief"]', "#brief", "#brief", label);
  await assertRenderBudget(page, label, "brief");

  await page.evaluate(() => document.querySelector("#footer")?.scrollIntoView({ behavior: "auto", block: "start" }));
  await assertRenderBudget(page, label, "footer", 2);
  await activateHashLink(page, '#footer a[href="#hero"]', "#hero", "#hero", label);
  await assertRenderBudget(page, label, "hero", 2);
}

async function completeBriefMobile(page, label) {
  await forceDeterministicScroll(page);
  await page.evaluate(() => document.querySelector("#brief")?.scrollIntoView({ behavior: "auto", block: "start" }));
  await page.waitForTimeout(180);
  await assertRenderBudget(page, label, "brief");
  const section = page.locator("#brief");

  await section.getByRole("button", { name: /Сайт/ }).first().click();
  await section.getByRole("button", { name: /Дальше/ }).click();
  await section.getByRole("button", { name: /Дизайн/ }).click();
  await section.getByRole("button", { name: /Дальше/ }).click();
  await section.getByRole("button", { name: /Масштабируемо/ }).click();
  await section.getByRole("button", { name: /Дальше/ }).click();
  await section.getByRole("button", { name: /2–4 недели/ }).click();
  await section.getByRole("button", { name: /\$5–15K/ }).click();
  await section.getByRole("button", { name: /Дальше/ }).click();
  await section.getByPlaceholder("Как к вам обращаться?").fill("System QA");
  await section.getByPlaceholder("@username или email").fill("qa@example.com");
  await section.getByPlaceholder("Что уже есть и какой результат нужен?").fill("Интеграционная проверка без отправки заявки.");

  const ready = section.locator('[aria-label="Ваш бриф"]').getByText("READY", { exact: true });
  if (!(await ready.isVisible())) throw new Error(`${label}: mobile Brief did not reach READY`);
  const submit = section.getByRole("button", { name: /Передать спецификацию/ });
  if (await submit.isDisabled()) throw new Error(`${label}: mobile Brief submit is disabled after valid completion`);

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  if (overflow > 1) throw new Error(`${label}: Brief created horizontal overflow ${overflow}px`);
}

async function runDesktop(browserType, label) {
  const browser = await browserType.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("console", (message) => { if (message.type() === "error") errors.push(`console: ${message.text()}`); });

  await page.goto("http://127.0.0.1:3000/", { waitUntil: "networkidle" });
  await page.waitForTimeout(700);
  await assertStructure(page, label);
  await assertRenderBudget(page, label, "hero", 2);
  await assertAnchorNavigation(page, label);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "auto" }));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `system-integration-qa/system-${label}-hero.png` });
  await page.evaluate(() => document.querySelector("#footer")?.scrollIntoView({ behavior: "auto", block: "start" }));
  await page.waitForTimeout(300);
  await assertRenderBudget(page, label, "footer", 2);
  await page.screenshot({ path: `system-integration-qa/system-${label}-footer.png` });

  if (errors.length) throw new Error(`${label}: ${errors.join("\n")}`);
  await browser.close();
}

async function runMobile(width, height, label) {
  const browser = await webkit.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width, height } });
  const errors = [];
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("console", (message) => { if (message.type() === "error") errors.push(`console: ${message.text()}`); });

  await page.goto("http://127.0.0.1:3000/", { waitUntil: "networkidle" });
  await page.waitForTimeout(650);
  await assertStructure(page, label);
  await assertRenderBudget(page, label, "hero", 2);
  await completeBriefMobile(page, label);
  await page.evaluate(() => document.querySelector("#footer")?.scrollIntoView({ behavior: "auto", block: "start" }));
  await page.waitForTimeout(300);
  await assertRenderBudget(page, label, "footer", 2);
  await page.screenshot({ path: `system-integration-qa/system-${label}-footer.png` });

  if (errors.length) throw new Error(`${label}: ${errors.join("\n")}`);
  await browser.close();
}

async function runReducedMotion() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });

  await page.goto("http://127.0.0.1:3000/", { waitUntil: "networkidle" });
  await page.waitForTimeout(350);
  await assertStructure(page, "reduced-motion");

  const activeSurfaces = await page.locator('[data-render-active="true"]').count();
  if (activeSurfaces !== 0) throw new Error(`reduced-motion: ${activeSurfaces} material surfaces are still running continuously`);

  for (const id of sectionIds) {
    await page.evaluate((targetId) => document.querySelector(`#${targetId}`)?.scrollIntoView({ behavior: "auto", block: "start" }), id);
    await page.waitForTimeout(100);
    if (!(await page.locator(`#${id}`).isVisible())) throw new Error(`reduced-motion: #${id} is not visible`);
  }
  if (errors.length) throw new Error(`reduced-motion: ${errors.join("\n")}`);
  await browser.close();
}

await runDesktop(chromium, "chromium");
await runDesktop(webkit, "webkit");
await runMobile(430, 932, "webkit-430");
await runMobile(390, 844, "webkit-390");
await runReducedMotion();
