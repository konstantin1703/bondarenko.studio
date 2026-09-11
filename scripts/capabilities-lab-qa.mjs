import { chromium, webkit } from "@playwright/test";
import { mkdir } from "node:fs/promises";

await mkdir("capabilities-lab-qa", { recursive: true });

async function run(browserType, label) {
  const browser = await browserType.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];

  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });

  await page.goto("http://127.0.0.1:3000/capabilities-lab", { waitUntil: "networkidle" });
  await page.evaluate(() => {
    const target = document.querySelector("#capabilities");
    if (!(target instanceof HTMLElement)) throw new Error("Capabilities section missing");
    const top = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, top);
  });
  await page.waitForTimeout(1800);

  const sectionTop = await page.locator("#capabilities").evaluate((element) => element.getBoundingClientRect().top);
  if (Math.abs(sectionTop) > 1) throw new Error(`${label}: Capabilities section is not aligned to viewport top (${sectionTop}px)`);

  const heading = page.getByRole("heading", { name: /Одна система/i });
  if (!(await heading.isVisible())) throw new Error(`${label}: Capabilities heading is not visible`);

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  if (overflow > 1) throw new Error(`${label}: page overflows horizontally by ${overflow}px`);

  const canvas = page.locator("#capabilities canvas").first();
  if (!(await canvas.isVisible())) throw new Error(`${label}: Capabilities WebGL canvas is not visible`);

  const initialCanvas = await canvas.screenshot();
  await page.getByRole("button", { name: /Автоматизация/i }).click();
  await page.waitForTimeout(950);
  const changedCanvas = await canvas.screenshot();
  if (initialCanvas.equals(changedCanvas)) throw new Error(`${label}: routing material did not react to active contour`);

  const activeButton = page.getByRole("button", { name: /Автоматизация/i });
  if ((await activeButton.getAttribute("aria-pressed")) !== "true") {
    throw new Error(`${label}: Automation route did not become active`);
  }

  const payload = page.locator("#capabilities").getByText("Внутренние инструменты", { exact: true });
  if (!(await payload.isVisible())) throw new Error(`${label}: active route payload did not update`);

  await page.screenshot({ path: `capabilities-lab-qa/capabilities-${label}-active-03.png` });

  if (errors.length) throw new Error(`${label}: ${errors.join("\n")}`);
  await browser.close();
}

await run(chromium, "chromium");
await run(webkit, "webkit");
