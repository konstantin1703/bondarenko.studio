import { webkit } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const browser = await webkit.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];

page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
page.on("console", (message) => {
  if (message.type() === "error") errors.push(`console: ${message.text()}`);
});

await mkdir("hero-lab-qa", { recursive: true });
await page.goto("http://127.0.0.1:3000/hero-lab", { waitUntil: "networkidle" });

await page.waitForFunction(
  () => {
    const lines = Array.from(document.querySelectorAll("[data-hero-line] > b"));
    const support = document.querySelector("[data-hero-support]");
    if (!lines.length || !support) return false;

    const linesSettled = lines.every((element) => getComputedStyle(element).transform === "none");
    const supportVisible = Number.parseFloat(getComputedStyle(support).opacity || "1") > 0.95;
    return linesSettled && supportVisible;
  },
  { timeout: 6000 },
);

const heading = page.getByRole("heading", { name: /Цифровые системы/i });
if (!(await heading.isVisible())) throw new Error("Hero heading is not visible in WebKit");

const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
if (overflow > 1) throw new Error(`WebKit Hero overflows horizontally by ${overflow}px`);

await page.screenshot({ path: "hero-lab-qa/hero-webkit-1440x1000.png" });

if (errors.length) throw new Error(errors.join("\n"));
await browser.close();
