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
  await page.waitForTimeout(80);
}

async function prepare(
  page: import('@playwright/test').Page,
  width: number,
  height: number,
  selector: string,
) {
  await page.setViewportSize({ width, height });
  await page.goto('/', { waitUntil: 'networkidle' });
  await freeze(page);
  await alignTo(page, selector);
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

async function captureSectionState(
  page: import('@playwright/test').Page,
  sectionSelector: string,
  controlSelector: string,
  fileName: string,
) {
  await prepare(page, 1536, 1024, sectionSelector);
  await page.locator(controlSelector).click();
  await page.waitForTimeout(30);
  await page.locator(sectionSelector).screenshot({ path: actual(fileName), animations: 'disabled' });
}

test('capture Stage 8 default and responsive central-panel fixtures', async ({ page }) => {
  await captureViewportAt(page, '[data-visual-id="central-panels"]', 1536, 1024, 'stage8-central-panels-default-1536x1024.png');
  await captureViewportAt(page, '[data-visual-id="central-panels"]', 768, 1400, 'stage8-central-panels-tablet-768x1400.png');
  await captureViewportAt(page, '[data-visual-id="central-panels"]', 390, 1800, 'stage8-central-panels-mobile-390x1800.png');
});

test('capture six Problem Explorer states', async ({ page }) => {
  const states = [
    ['manual-automation', 'stage8-problem-01-manual-automation.png'],
    ['telegram-product', 'stage8-problem-02-telegram-product.png'],
    ['web-service', 'stage8-problem-03-web-service.png'],
    ['api-integration', 'stage8-problem-04-api-integration.png'],
    ['ai-process', 'stage8-problem-05-ai-process.png'],
    ['internal-crm', 'stage8-problem-06-internal-crm.png'],
  ] as const;

  for (const [id, fileName] of states) {
    await captureSectionState(page, '#change', `[data-problem-scenario="${id}"]`, fileName);
  }
});

test('capture four Product Assembler states', async ({ page }) => {
  const states = [
    ['ai-web', 'stage8-product-01-ai-web.png'],
    ['telegram', 'stage8-product-02-telegram.png'],
    ['api-automation', 'stage8-product-03-api-automation.png'],
    ['crm-internal', 'stage8-product-04-crm-internal.png'],
  ] as const;

  for (const [id, fileName] of states) {
    await captureSectionState(page, '#products', `[data-product-direction="${id}"]`, fileName);
  }
});

test('capture Hero and Stage 7 Configurator regression fixtures', async ({ page }) => {
  await page.setViewportSize({ width: 1630, height: 965 });
  await page.goto('/', { waitUntil: 'networkidle' });
  await freeze(page);
  await page.screenshot({ path: actual('stage8-hero-regression-1630x965.png'), animations: 'disabled' });

  await captureViewportAt(page, '#configurator', 1672, 941, 'stage8-configurator-regression-1672x941.png');
});

test('retain isolated OctagonalCore fixtures', async ({ page }) => {
  await page.setViewportSize({ width: 820, height: 430 });
  await page.goto('/fixtures/octagonal-core', { waitUntil: 'networkidle' });
  await freeze(page);
  await page.locator('[data-core-fixture="idle"]').screenshot({ path: actual('octagonal-core-idle.png'), animations: 'disabled' });
  await page.locator('[data-core-fixture="active"]').screenshot({ path: actual('octagonal-core-active.png'), animations: 'disabled' });
});
