import { test } from '@playwright/test';
import path from 'node:path';

const actual = (name: string) => path.resolve(process.cwd(), 'tests/visual/actual', name);

async function freeze(page: import('@playwright/test').Page) {
  await page.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}' });
}

async function alignTo(page: import('@playwright/test').Page, selector: string) {
  await page.evaluate((target) => {
    const element = document.querySelector(target);
    if (!element) throw new Error(`Missing visual target: ${target}`);
    const top = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top, left: 0, behavior: 'instant' });
  }, selector);
  await page.waitForTimeout(90);
}

async function prepare(
  page: import('@playwright/test').Page,
  width: number,
  height: number,
  selector?: string,
) {
  await page.setViewportSize({ width, height });
  await page.goto('/', { waitUntil: 'networkidle' });
  await freeze(page);
  if (selector) await alignTo(page, selector);
}

async function captureViewportAt(
  page: import('@playwright/test').Page,
  selector: string,
  width: number,
  height: number,
  fileName: string,
) {
  await prepare(page, width, height, selector);
  await page.screenshot({ path: actual(fileName), animations: 'disabled' });
}

async function captureElement(
  page: import('@playwright/test').Page,
  selector: string,
  width: number,
  height: number,
  fileName: string,
) {
  await prepare(page, width, height, selector);
  await page.locator(selector).screenshot({ path: actual(fileName), animations: 'disabled' });
}

test('capture Stage 9 lower sections at desktop reference width', async ({ page }) => {
  await captureViewportAt(page, '#projects', 1536, 700, 'stage9-projects-1536x700.png');
  await captureViewportAt(page, '#workflow', 1536, 700, 'stage9-workflow-1536x700.png');
  await captureViewportAt(page, '#technologies', 1536, 700, 'stage9-technologies-1536x700.png');
  await captureViewportAt(page, '#contacts', 1536, 900, 'stage9-contact-footer-1536x900.png');
});

test('capture Stage 9 lower-page responsive fixtures', async ({ page }) => {
  await captureViewportAt(page, '#projects', 1536, 3000, 'stage9-lower-page-1536x3000.png');
  await captureViewportAt(page, '#projects', 768, 3000, 'stage9-lower-page-tablet-768x3000.png');
  await captureViewportAt(page, '#projects', 390, 3600, 'stage9-lower-page-mobile-390x3600.png');
});

test('capture Stage 9 full-page screenshots', async ({ page }) => {
  await prepare(page, 1440, 1000);
  await page.screenshot({ path: actual('stage9-full-page-1440.png'), fullPage: true, animations: 'disabled' });

  await prepare(page, 390, 1000);
  await page.screenshot({ path: actual('stage9-full-page-390.png'), fullPage: true, animations: 'disabled' });
});

test('capture Stage 9 labeled zone sources for contact sheets', async ({ page }) => {
  const zones = [
    ['[data-visual-id="hero"]', 'hero'],
    ['#change', 'problem-explorer'],
    ['#products', 'product-assembler'],
    ['#configurator', 'configurator'],
    ['#projects', 'projects'],
    ['#workflow', 'workflow'],
    ['#technologies', 'technologies'],
    ['#contacts', 'contact'],
    ['#footer', 'footer'],
  ] as const;

  for (const [selector, slug] of zones) {
    await captureElement(page, selector, 1440, 1200, `stage9-zone-${slug}.png`);
    await captureElement(page, selector, 390, 1200, `stage9-zone-mobile-${slug}.png`);
  }
});

test('capture Stage 9 regression fixtures for previous sections', async ({ page }) => {
  await prepare(page, 1630, 965);
  await page.screenshot({ path: actual('stage9-hero-regression-1630x965.png'), animations: 'disabled' });

  await captureViewportAt(page, '[data-visual-id="central-panels"]', 1536, 1024, 'stage9-central-panels-regression-1536x1024.png');
  await captureViewportAt(page, '#configurator', 1672, 941, 'stage9-configurator-regression-1672x941.png');
});

test('retain isolated OctagonalCore fixtures', async ({ page }) => {
  await page.setViewportSize({ width: 820, height: 430 });
  await page.goto('/fixtures/octagonal-core', { waitUntil: 'networkidle' });
  await freeze(page);
  await page.locator('[data-core-fixture="idle"]').screenshot({ path: actual('octagonal-core-idle.png'), animations: 'disabled' });
  await page.locator('[data-core-fixture="active"]').screenshot({ path: actual('octagonal-core-active.png'), animations: 'disabled' });
});
