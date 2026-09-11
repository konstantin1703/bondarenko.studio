import { webkit } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const browser = await webkit.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 430, height: 932 },
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
});
const page = await context.newPage();
const errors = [];

page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
page.on("console", (message) => {
  if (message.type() === "error") errors.push(`console: ${message.text()}`);
});

await mkdir("hero-lab-qa", { recursive: true });
await page.goto("http://127.0.0.1:3000/hero-lab", { waitUntil: "networkidle" });
await page.waitForTimeout(2200);

const heading = page.getByRole("heading", { name: /Цифровые системы/i });
if (!(await heading.isVisible())) throw new Error("Hero heading is not visible on iPhone-sized WebKit viewport");

const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
if (overflow > 1) throw new Error(`Mobile Hero overflows horizontally by ${overflow}px`);

const canvas = page.locator("canvas").first();
if (!(await canvas.isVisible())) throw new Error("Hero WebGL canvas is not visible on mobile WebKit");

const first = await canvas.screenshot();
await page.waitForTimeout(850);
const second = await canvas.screenshot();
if (first.equals(second)) throw new Error("Mobile WebGL material did not change between sampled frames");

await page.screenshot({ path: "hero-lab-qa/hero-webkit-iphone-430x932.png" });

if (errors.length) throw new Error(errors.join("\n"));
await browser.close();
