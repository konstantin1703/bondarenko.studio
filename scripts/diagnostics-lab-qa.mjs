import { chromium, webkit } from "@playwright/test";
import { mkdir } from "node:fs/promises";

await mkdir("diagnostics-lab-qa", { recursive: true });

async function run(browserType, label) {
  const browser = await browserType.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];

  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });

  await page.goto("http://127.0.0.1:3000/diagnostics-lab", { waitUntil: "networkidle" });
  await page.evaluate(() => {
    const target = document.querySelector("#diagnostics");
    if (!(target instanceof HTMLElement)) throw new Error("Diagnostics section missing");
    const top = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, top);
  });
  await page.waitForTimeout(1800);

  const sectionTop = await page.locator("#diagnostics").evaluate((element) => element.getBoundingClientRect().top);
  if (Math.abs(sectionTop) > 1) throw new Error(`${label}: Diagnostics section is not aligned to viewport top (${sectionTop}px)`);

  const heading = page.getByRole("heading", { name: /Где система/i });
  if (!(await heading.isVisible())) throw new Error(`${label}: Diagnostics heading is not visible`);

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  if (overflow > 1) throw new Error(`${label}: page overflows horizontally by ${overflow}px`);

  const canvas = page.locator("#diagnostics canvas").first();
  if (!(await canvas.isVisible())) throw new Error(`${label}: Diagnostics WebGL canvas is not visible`);

  const initialCanvas = await canvas.screenshot();
  await page.getByRole("button", { name: /Разрозненный контент/i }).click();
  await page.waitForTimeout(900);
  const changedCanvas = await canvas.screenshot();
  if (initialCanvas.equals(changedCanvas)) throw new Error(`${label}: Diagnostics material did not react to active state`);

  const detail = page.locator("#diagnostics").getByText("Разрозненный контент", { exact: true }).last();
  if (!(await detail.isVisible())) throw new Error(`${label}: active diagnostic detail did not update`);

  await page.screenshot({ path: `diagnostics-lab-qa/diagnostics-${label}-active-04.png` });

  if (errors.length) throw new Error(`${label}: ${errors.join("\n")}`);
  await browser.close();
}

await run(chromium, "chromium");
await run(webkit, "webkit");
