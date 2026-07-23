import { test } from '@playwright/test';
import path from 'node:path';

const actual = (name: string) => path.resolve(process.cwd(), 'tests/visual/actual', name);

async function freeze(page: import('@playwright/test').Page) {
  await page.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}' });
}

async function captureViewport(
  page: import('@playwright/test').Page,
  width: number,
  height: number,
  fileName: string,
) {
  await page.setViewportSize({ width, height });
  await page.goto('/', { waitUntil: 'networkidle' });
  await freeze(page);
  await page.screenshot({ path: actual(fileName), animations: 'disabled' });
}

test('capture Stage 5.1 targeted Hero calibration fixtures', async ({ page }) => {
  await captureViewport(page, 1630, 965, 'stage5-1-hero-1630x965.png');
  await captureViewport(page, 1440, 900, 'stage5-1-hero-1440x900.png');
  await captureViewport(page, 390, 844, 'stage5-1-hero-mobile-390x844.png');
  await captureViewport(page, 768, 1024, 'stage5-1-hero-tablet-768x1024.png');
});

test('retain Stage 4 downstream visual fixtures', async ({ page }) => {
  await page.setViewportSize({ width: 1536, height: 1024 });
  await page.goto('/', { waitUntil: 'networkidle' }); await freeze(page);
  await page.locator('[data-visual-id="central-panels"]').screenshot({ path: actual('central-panels-1536x1024.png'), animations: 'disabled' });

  await page.setViewportSize({ width: 1672, height: 941 });
  await page.goto('/', { waitUntil: 'networkidle' }); await freeze(page);
  await page.locator('[data-visual-id="configurator"]').screenshot({ path: actual('configurator-1672x941.png'), animations: 'disabled' });
});

test('capture isolated OctagonalCore states', async ({ page }) => {
  await page.setViewportSize({ width: 820, height: 430 });
  await page.goto('/fixtures/octagonal-core', { waitUntil: 'networkidle' }); await freeze(page);
  await page.locator('[data-core-fixture="idle"]').screenshot({ path: actual('octagonal-core-idle.png'), animations: 'disabled' });
  await page.locator('[data-core-fixture="active"]').screenshot({ path: actual('octagonal-core-active.png'), animations: 'disabled' });
});
