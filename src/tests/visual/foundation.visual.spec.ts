import { test } from '@playwright/test';
import path from 'node:path';

const actual = (name: string) => path.resolve(process.cwd(), 'tests/visual/actual', name);

async function freeze(page: import('@playwright/test').Page) {
  await page.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}' });
}

test('capture foundation visual fixtures', async ({ page }) => {
  await page.setViewportSize({ width: 1630, height: 965 });
  await page.goto('/'); await freeze(page);
  await page.locator('[data-visual-id="hero"]').screenshot({ path: actual('hero-1630x965.png'), animations: 'disabled' });

  await page.setViewportSize({ width: 1536, height: 1024 });
  await page.goto('/'); await freeze(page);
  await page.locator('[data-visual-id="central-panels"]').screenshot({ path: actual('central-panels-1536x1024.png'), animations: 'disabled' });

  await page.setViewportSize({ width: 1672, height: 941 });
  await page.goto('/'); await freeze(page);
  await page.locator('[data-visual-id="configurator"]').screenshot({ path: actual('configurator-1672x941.png'), animations: 'disabled' });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/'); await freeze(page);
  await page.locator('main').screenshot({ path: actual('mobile-390.png'), animations: 'disabled' });
});

test('capture isolated OctagonalCore states', async ({ page }) => {
  await page.setViewportSize({ width: 820, height: 430 });
  await page.goto('/fixtures/octagonal-core'); await freeze(page);
  await page.locator('[data-core-fixture="idle"]').screenshot({ path: actual('octagonal-core-idle.png'), animations: 'disabled' });
  await page.locator('[data-core-fixture="active"]').screenshot({ path: actual('octagonal-core-active.png'), animations: 'disabled' });
});
