import { test } from '@playwright/test';
import path from 'node:path';

const actual = (name: string) => path.resolve(process.cwd(), 'tests/visual/actual', name);

async function freeze(page: import('@playwright/test').Page) {
  await page.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}' });
}

async function captureAt(
  page: import('@playwright/test').Page,
  selector: string,
  width: number,
  height: number,
  fileName: string,
) {
  await page.setViewportSize({ width, height });
  await page.goto('/', { waitUntil: 'networkidle' });
  await freeze(page);
  await page.locator(selector).scrollIntoViewIfNeeded();
  await page.evaluate((target) => {
    const element = document.querySelector(target);
    if (element) window.scrollTo(0, element.getBoundingClientRect().top + window.scrollY);
  }, selector);
  await page.screenshot({ path: actual(fileName), animations: 'disabled' });
}

test('capture Stage 6 central panel calibration fixtures', async ({ page }) => {
  await captureAt(page, '[data-visual-id="central-panels"]', 1536, 1024, 'stage6-central-panels-1536x1024.png');
  await captureAt(page, '#change', 1536, 620, 'stage6-problem-explorer-1536x620.png');
  await captureAt(page, '#products', 1536, 620, 'stage6-product-assembler-1536x620.png');
  await captureAt(page, '[data-visual-id="central-panels"]', 768, 1400, 'stage6-central-panels-tablet-768x1400.png');
  await captureAt(page, '[data-visual-id="central-panels"]', 390, 1600, 'stage6-central-panels-mobile-390x1600.png');
});

test('capture Stage 5.1 Hero regression fixture', async ({ page }) => {
  await page.setViewportSize({ width: 1630, height: 965 });
  await page.goto('/', { waitUntil: 'networkidle' });
  await freeze(page);
  await page.screenshot({ path: actual('stage6-hero-regression-1630x965.png'), animations: 'disabled' });
});

test('retain configurator and isolated OctagonalCore fixtures', async ({ page }) => {
  await page.setViewportSize({ width: 1672, height: 941 });
  await page.goto('/', { waitUntil: 'networkidle' }); await freeze(page);
  await page.locator('[data-visual-id="configurator"]').screenshot({ path: actual('configurator-1672x941.png'), animations: 'disabled' });

  await page.setViewportSize({ width: 820, height: 430 });
  await page.goto('/fixtures/octagonal-core', { waitUntil: 'networkidle' }); await freeze(page);
  await page.locator('[data-core-fixture="idle"]').screenshot({ path: actual('octagonal-core-idle.png'), animations: 'disabled' });
  await page.locator('[data-core-fixture="active"]').screenshot({ path: actual('octagonal-core-active.png'), animations: 'disabled' });
});
