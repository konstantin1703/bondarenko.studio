import { chromium, webkit } from "@playwright/test";
import { mkdir } from "node:fs/promises";

await mkdir("brief-lab-qa", { recursive: true });

async function alignSection(page) {
  await page.evaluate(() => {
    const target = document.querySelector("#brief");
    if (!(target instanceof HTMLElement)) throw new Error("Brief section missing");
    const top = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, top);
  });
  await page.waitForTimeout(1800);
}

async function configureFirstTwoSteps(page, label) {
  const section = page.locator("#brief");
  const canvas = section.locator("canvas").first();
  if (!(await canvas.isVisible())) throw new Error(`${label}: Brief WebGL canvas is not visible`);

  const initialCanvas = await canvas.screenshot();

  await section.getByRole("button", { name: /Сайт/ }).first().click();
  const siteInSpec = section.locator('[aria-label="Ваш бриф"]').getByText("Сайт", { exact: true });
  if (!(await siteInSpec.isVisible())) throw new Error(`${label}: project type did not update live specification`);

  await section.getByRole("button", { name: /Дальше/ }).click();
  await page.waitForTimeout(520);
  await section.getByRole("button", { name: /Дизайн/ }).click();
  await page.waitForTimeout(900);

  const designInSpec = section.locator('[aria-label="Ваш бриф"]').getByText("Дизайн", { exact: true });
  if (!(await designInSpec.isVisible())) throw new Error(`${label}: module did not update live specification`);

  const changedCanvas = await canvas.screenshot();
  if (initialCanvas.equals(changedCanvas)) throw new Error(`${label}: assembly material did not react to brief state`);

  return section;
}

async function runDesktop(browserType, label) {
  const browser = await browserType.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];

  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });

  await page.goto("http://127.0.0.1:3000/brief-lab", { waitUntil: "networkidle" });
  await alignSection(page);

  const sectionTop = await page.locator("#brief").evaluate((element) => element.getBoundingClientRect().top);
  if (Math.abs(sectionTop) > 1) throw new Error(`${label}: Brief section is not aligned to viewport top (${sectionTop}px)`);

  const heading = page.getByRole("heading", { name: /Соберите проект/i });
  if (!(await heading.isVisible())) throw new Error(`${label}: Brief heading is not visible`);

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  if (overflow > 1) throw new Error(`${label}: page overflows horizontally by ${overflow}px`);

  await configureFirstTwoSteps(page, label);
  await page.screenshot({ path: `brief-lab-qa/brief-${label}-step-02.png` });

  if (errors.length) throw new Error(`${label}: ${errors.join("\n")}`);
  await browser.close();
}

async function runMobileWebKit() {
  const browser = await webkit.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 430, height: 932 } });
  const errors = [];

  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });

  await page.goto("http://127.0.0.1:3000/brief-lab", { waitUntil: "networkidle" });
  await alignSection(page);

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  if (overflow > 1) throw new Error(`webkit-mobile: page overflows horizontally by ${overflow}px`);

  const section = await configureFirstTwoSteps(page, "webkit-mobile");
  const moduleButton = section.getByRole("button", { name: /Дизайн/ });
  if (!(await moduleButton.isVisible())) throw new Error("webkit-mobile: active module control is not visible");

  await page.screenshot({ path: "brief-lab-qa/brief-webkit-mobile-step-02.png" });

  if (errors.length) throw new Error(`webkit-mobile: ${errors.join("\n")}`);
  await browser.close();
}

await runDesktop(chromium, "chromium");
await runDesktop(webkit, "webkit");
await runMobileWebKit();
