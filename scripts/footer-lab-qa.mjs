import { chromium, webkit } from "@playwright/test";
import { mkdir } from "node:fs/promises";

await mkdir("footer-lab-qa", { recursive: true });

async function alignFooter(page, offset = 0) {
  await page.evaluate((scrollOffset) => {
    const target = document.querySelector("#footer");
    if (!(target instanceof HTMLElement)) throw new Error("Footer section missing");
    const top = target.getBoundingClientRect().top + window.scrollY + scrollOffset;
    window.scrollTo(0, top);
  }, offset);
  await page.waitForTimeout(1000);
}

async function assertNoOverflow(page, label) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  if (overflow > 1) throw new Error(`${label}: page overflows horizontally by ${overflow}px`);
}

async function assertFooter(page, label) {
  const footer = page.locator("#footer");
  const heading = footer.getByRole("heading", { name: /Из разрозненных частей/i });
  if (!(await heading.isVisible())) throw new Error(`${label}: footer heading is not visible`);

  const project = footer.getByRole("link", { name: /Собрать проект/i });
  const diagnostics = footer.getByRole("link", { name: /Вернуться к диагностике/i });
  const top = footer.getByRole("link", { name: /Наверх/i });

  if ((await project.getAttribute("href")) !== "#brief") throw new Error(`${label}: project CTA does not target #brief`);
  if ((await diagnostics.getAttribute("href")) !== "#diagnostics") throw new Error(`${label}: diagnostics CTA does not target #diagnostics`);
  if ((await top.getAttribute("href")) !== "#hero") throw new Error(`${label}: top link does not target #hero`);

  const canvas = footer.locator("canvas").first();
  if (!(await canvas.isVisible())) throw new Error(`${label}: footer material canvas is not visible`);
  const frameA = await canvas.screenshot();
  await page.waitForTimeout(1000);
  const frameB = await canvas.screenshot();
  if (frameA.equals(frameB)) throw new Error(`${label}: footer material field does not animate`);

  const wordmark = footer.getByLabel("BND Studio");
  if (!(await wordmark.isVisible())) throw new Error(`${label}: BND wordmark is not visible`);

  await assertNoOverflow(page, label);
  return footer;
}

async function runDesktop(browserType, label) {
  const browser = await browserType.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];

  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });

  await page.goto("http://127.0.0.1:3000/footer-lab", { waitUntil: "networkidle" });
  await alignFooter(page);

  const footerTop = await page.locator("#footer").evaluate((element) => element.getBoundingClientRect().top);
  if (Math.abs(footerTop) > 1) throw new Error(`${label}: footer is not aligned to viewport top (${footerTop}px)`);

  await assertFooter(page, label);
  await alignFooter(page);
  await page.screenshot({ path: `footer-lab-qa/footer-${label}.png` });
  await alignFooter(page, -260);
  await page.screenshot({ path: `footer-lab-qa/transition-${label}.png` });

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

  await page.goto("http://127.0.0.1:3000/footer-lab", { waitUntil: "networkidle" });
  await alignFooter(page);
  await assertFooter(page, "webkit-mobile");
  await alignFooter(page);
  await page.screenshot({ path: "footer-lab-qa/footer-webkit-mobile.png" });
  await alignFooter(page, -160);
  await page.screenshot({ path: "footer-lab-qa/transition-webkit-mobile.png" });

  if (errors.length) throw new Error(`webkit-mobile: ${errors.join("\n")}`);
  await browser.close();
}

async function runReducedMotion() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3000/footer-lab", { waitUntil: "networkidle" });
  await alignFooter(page);
  const heading = page.locator("#footer").getByRole("heading", { name: /Из разрозненных частей/i });
  if (!(await heading.isVisible())) throw new Error("reduced-motion: footer is not usable without animated reveal");
  await assertNoOverflow(page, "reduced-motion");
  await browser.close();
}

await runDesktop(chromium, "chromium");
await runDesktop(webkit, "webkit");
await runMobileWebKit();
await runReducedMotion();
