import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];

page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
page.on("console", (message) => {
  if (message.type() === "error") errors.push(`console: ${message.text()}`);
});

await mkdir("hero-lab-qa", { recursive: true });
await page.goto("http://127.0.0.1:3000/hero-lab", { waitUntil: "networkidle" });

const heading = page.getByRole("heading", { name: /Цифровые системы/i });
if (!(await heading.isVisible())) throw new Error("Hero heading is not visible");

const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
if (overflow > 1) throw new Error(`Hero overflows horizontally by ${overflow}px`);

await page.waitForTimeout(1700);
const frameA = await page.screenshot();
await writeFile("hero-lab-qa/hero-motion-a.png", frameA);

await page.mouse.move(1170, 330, { steps: 12 });
await page.waitForTimeout(1300);
const framePointer = await page.screenshot();
await writeFile("hero-lab-qa/hero-motion-pointer.png", framePointer);

await page.mouse.move(720, 500, { steps: 10 });
await page.waitForTimeout(1700);
const frameB = await page.screenshot();
await writeFile("hero-lab-qa/hero-motion-b.png", frameB);

if (frameA.equals(frameB)) {
  throw new Error("Material field is visually frozen: motion frames are byte-identical");
}

if (frameA.equals(framePointer)) {
  throw new Error("Pointer response is visually frozen: pointer frame is byte-identical");
}

if (errors.length) {
  throw new Error(errors.join("\n"));
}

await browser.close();
