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

async function captureViewportAt(
  page: import('@playwright/test').Page,
  selector: string,
  width: number,
  height: number,
  fileName: string,
) {
  await page.setViewportSize({ width, height });
  await page.goto('/', { waitUntil: 'networkidle' });
  await freeze(page);
  await alignTo(page, selector);
  await page.screenshot({ path: actual(fileName), animations: 'disabled' });
}

async function captureElementAt(
  page: import('@playwright/test').Page,
  selector: string,
  target: string,
  width: number,
  height: number,
  fileName: string,
) {
  await page.setViewportSize({ width, height });
  await page.goto('/', { waitUntil: 'networkidle' });
  await freeze(page);
  await alignTo(page, selector);
  await page.locator(target).screenshot({ path: actual(fileName), animations: 'disabled' });
}

test('capture Stage 7 Configurator calibration fixtures', async ({ page }) => {
  await captureViewportAt(page, '#configurator', 1672, 941, 'stage7-configurator-1672x941.png');
  await captureViewportAt(page, '#configurator', 1440, 1000, 'stage7-configurator-1440x1000.png');
  await captureViewportAt(page, '#configurator', 768, 1400, 'stage7-configurator-tablet-768x1400.png');
  await captureViewportAt(page, '#configurator', 390, 1800, 'stage7-configurator-mobile-390x1800.png');
});

test('capture Stage 7 Configurator desktop zones', async ({ page }) => {
  await captureElementAt(page, '#configurator', '[data-configurator-zone="intro"]', 1672, 941, 'stage7-configurator-left-1672x941.png');
  await captureElementAt(page, '#configurator', '[data-configurator-zone="workspace"]', 1672, 941, 'stage7-configurator-center-1672x941.png');
  await captureElementAt(page, '#configurator', '[data-configurator-zone="preview"]', 1672, 941, 'stage7-configurator-preview-1672x941.png');
});

test('capture Stage 5.1 Hero and Stage 6 central-panel regression fixtures', async ({ page }) => {
  await page.setViewportSize({ width: 1630, height: 965 });
  await page.goto('/', { waitUntil: 'networkidle' });
  await freeze(page);
  await page.screenshot({ path: actual('stage7-hero-regression-1630x965.png'), animations: 'disabled' });

  await captureViewportAt(page, '[data-visual-id="central-panels"]', 1536, 1024, 'stage7-central-panels-regression-1536x1024.png');
});

test('retain isolated OctagonalCore fixtures', async ({ page }) => {
  await page.setViewportSize({ width: 820, height: 430 });
  await page.goto('/fixtures/octagonal-core', { waitUntil: 'networkidle' });
  await freeze(page);
  await page.locator('[data-core-fixture="idle"]').screenshot({ path: actual('octagonal-core-idle.png'), animations: 'disabled' });
  await page.locator('[data-core-fixture="active"]').screenshot({ path: actual('octagonal-core-active.png'), animations: 'disabled' });
});
