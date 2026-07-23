import { expect, test } from '@playwright/test';

test('header and Hero remain usable at 200% browser zoom', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.evaluate(() => { document.documentElement.style.zoom = '2'; });
  await expect(page.getByRole('banner')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test('OctagonalCore scales without raster image elements', async ({ page }) => {
  await page.goto('/fixtures/octagonal-core');
  const core = page.locator('[data-visual-id="octagonal-core"]').first();
  await expect(core).toBeVisible();
  await expect(core.locator('image')).toHaveCount(0);
  const box = await core.boundingBox();
  expect(box?.width ?? 0).toBeGreaterThan(100);
  expect(box?.height ?? 0).toBeGreaterThan(90);
});
