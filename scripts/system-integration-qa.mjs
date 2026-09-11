import { chromium, webkit } from "@playwright/test";
import { mkdir } from "node:fs/promises";

await mkdir("system-integration-qa", { recursive: true });

const sectionIds = ["hero", "diagnostics", "capabilities", "brief", "footer"];

async function waitForHash(page, hash) {
  await page.waitForFunction((expected) => window.location.hash === expected, hash);
  await page.waitForTimeout(900);
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
    if (positions[index] <= positions[index - 1]) {
      throw new Error(`${label}: section order is invalid at ${sectionIds[index]}`);
    }
  }

  const missingTargets = await page.evaluate(() => {
    return [...document.querySelectorAll('a[href^="#"]')]
      .map((anchor) => anchor.getAttribute("href"))
      .filter((href) => href && href.length > 1 && !document.querySelector(href));
  });
  if (missingTargets.length) throw new Error(`${label}: missing hash targets: ${missingTargets.join(", ")}`);

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  if (overflow > 1) throw new Error(`${label}: horizontal overflow ${overflow}px`);

  const canvasMetrics = await page.locator("canvas").evaluateAll((canvases) => canvases.map((canvas) => ({
    width: canvas.width,
    height: canvas.height,
    cssWidth: canvas.getBoundingClientRect().width,
    cssHeight: canvas.getBoundingClientRect().height,
  })));
  if (canvasMetrics.length < 5) throw new Error(`${label}: expected the five frozen material canvases`);
  for (const metric of canvasMetrics) {
    if (metric.cssWidth > 0 && metric.width / metric.cssWidth > 1.5) {
      throw new Error(`${label}: canvas DPR exceeds integration budget`);
    }
  }
}

async function assertAnchorNavigation(page, label) {
  await page.locator('#hero a[href="#diagnostics"]').first().click();
  await waitForHash(page, "#diagnostics");
  let top = await page.locator("#diagnostics").evaluate((element) => element.getBoundingClientRect().top);
  if (Math.abs(top) > 3) throw new Error(`${label}: diagnostics anchor lands at ${top}px`);

  await page.locator('#hero a[href="#capabilities"]').click();
  await waitForHash(page, "#capabilities");
  top = await page.locator("#capabilities").evaluate((element) => element.getBoundingClientRect().top);
  if (Math.abs(top) > 3) throw new Error(`${label}: capabilities anchor lands at ${top}px`);

  await page.locator('#hero a[href="#brief"]').first().click();
  await waitForHash(page, "#brief");
  top = await page.locator("#brief").evaluate((element) => element.getBoundingClientRect().top);
  if (Math.abs(top) > 3) throw new Error(`${label}: brief anchor lands at ${top}px`);

  await page.evaluate(() => document.querySelector("#footer")?.scrollIntoView());
  await page.waitForTimeout(600);
  await page.locator('#footer a[href="#hero"]').click();
  await waitForHash(page, "#hero");
  top = await page.locator("#hero").evaluate((element) => element.getBoundingClientRect().top);
  if (Math.abs(top) > 3) throw new Error(`${label}: return-to-top anchor lands at ${top}px`);
}

async function completeBriefMobile(page, label) {
  await page.evaluate(() => document.querySelector("#brief")?.scrollIntoView());
  await page.waitForTimeout(700);
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
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });

  await page.goto("http://127.0.0.1:3000/system-lab", { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  await assertStructure(page, label);
  await assertAnchorNavigation(page, label);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(700);
  await page.screenshot({ path: `system-integration-qa/system-${label}-hero.png` });
  await page.evaluate(() => document.querySelector("#footer")?.scrollIntoView());
  await page.waitForTimeout(700);
  await page.screenshot({ path: `system-integration-qa/system-${label}-footer.png` });

  if (errors.length) throw new Error(`${label}: ${errors.join("\n")}`);
  await browser.close();
}

async function runMobile(width, height, label) {
  const browser = await webkit.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width, height } });
  const errors = [];

  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });

  await page.goto("http://127.0.0.1:3000/system-lab", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await assertStructure(page, label);
  await completeBriefMobile(page, label);
  await page.evaluate(() => document.querySelector("#footer")?.scrollIntoView());
  await page.waitForTimeout(600);
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
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.goto("http://127.0.0.1:3000/system-lab", { waitUntil: "networkidle" });
  await assertStructure(page, "reduced-motion");
  for (const id of sectionIds) {
    await page.evaluate((targetId) => document.querySelector(`#${targetId}`)?.scrollIntoView(), id);
    await page.waitForTimeout(120);
    const section = page.locator(`#${id}`);
    if (!(await section.isVisible())) throw new Error(`reduced-motion: #${id} is not visible`);
  }
  if (errors.length) throw new Error(`reduced-motion: ${errors.join("\n")}`);
  await browser.close();
}

await runDesktop(chromium, "chromium");
await runDesktop(webkit, "webkit");
await runMobile(430, 932, "webkit-430");
await runMobile(390, 844, "webkit-390");
await runReducedMotion();
