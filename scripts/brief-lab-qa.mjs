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
  await page.waitForTimeout(1000);
}

async function assertNoOverflow(page, label) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  if (overflow > 1) throw new Error(`${label}: page overflows horizontally by ${overflow}px`);
}

async function configureFlow(page, label) {
  const section = page.locator("#brief");
  const canvas = section.locator("canvas").first();
  if (!(await canvas.isVisible())) throw new Error(`${label}: Brief WebGL canvas is not visible`);

  const initialCanvas = await canvas.screenshot();

  await section.getByRole("button", { name: /Сайт/ }).first().click();
  const siteInSpec = section.locator('[aria-label="Ваш бриф"]').getByText("Сайт", { exact: true });
  if (!(await siteInSpec.isVisible())) throw new Error(`${label}: project type did not update live specification`);

  await section.getByRole("button", { name: /Дальше/ }).click();
  await page.waitForTimeout(420);
  await section.getByRole("button", { name: /Дизайн/ }).click();
  await page.waitForTimeout(650);

  const designInSpec = section.locator('[aria-label="Ваш бриф"]').getByText("Дизайн", { exact: true });
  if (!(await designInSpec.isVisible())) throw new Error(`${label}: module did not update live specification`);

  const changedCanvas = await canvas.screenshot();
  if (initialCanvas.equals(changedCanvas)) throw new Error(`${label}: assembly material did not react to brief state`);

  await section.getByRole("button", { name: /Дальше/ }).click();
  await page.waitForTimeout(360);
  await section.getByRole("button", { name: /Масштабируемо/ }).click();

  await section.getByRole("button", { name: /Дальше/ }).click();
  await page.waitForTimeout(360);
  await section.getByRole("button", { name: /2–4 недели/ }).click();
  await section.getByRole("button", { name: /\$5–15K/ }).click();

  await section.getByRole("button", { name: /Дальше/ }).click();
  await page.waitForTimeout(360);
  await section.getByPlaceholder("Как к вам обращаться?").fill("QA Test");
  await section.getByPlaceholder("@username или email").fill("qa@example.com");
  await section.getByPlaceholder("Что уже есть и какой результат нужен?").fill("Проверка полной сборки спецификации без отправки заявки.");
  await page.waitForTimeout(300);

  const submit = section.getByRole("button", { name: /Передать спецификацию/ });
  if (await submit.isDisabled()) throw new Error(`${label}: submit is disabled after all five stages are complete`);

  const ready = section.locator('[aria-label="Ваш бриф"]').getByText("READY", { exact: true });
  if (!(await ready.isVisible())) throw new Error(`${label}: live specification did not reach READY state`);

  const progress = section.getByText("100%", { exact: true });
  if (!(await progress.isVisible())) throw new Error(`${label}: assembly progress did not reach 100%`);

  await assertNoOverflow(page, label);
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
  await assertNoOverflow(page, label);

  const section = await configureFlow(page, label);
  await alignSection(page);
  await page.screenshot({ path: `brief-lab-qa/brief-${label}-ready.png` });
  await section.locator('[aria-live="polite"]').screenshot({ path: `brief-lab-qa/brief-${label}-stage-ready.png` });

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
  await assertNoOverflow(page, "webkit-mobile");

  const section = await configureFlow(page, "webkit-mobile");
  const nextButton = section.getByRole("button", { name: /Дальше/ });
  if (await nextButton.count()) {
    const accessibleName = await nextButton.first().getAttribute("aria-label");
    if (accessibleName === "") throw new Error("webkit-mobile: navigation control has an empty accessible label");
  }

  await alignSection(page);
  await page.screenshot({ path: "brief-lab-qa/brief-webkit-mobile-ready.png" });
  await section.locator('[aria-live="polite"]').screenshot({ path: "brief-lab-qa/brief-webkit-mobile-stage-ready.png" });

  if (errors.length) throw new Error(`webkit-mobile: ${errors.join("\n")}`);
  await browser.close();
}

await runDesktop(chromium, "chromium");
await runDesktop(webkit, "webkit");
await runMobileWebKit();
