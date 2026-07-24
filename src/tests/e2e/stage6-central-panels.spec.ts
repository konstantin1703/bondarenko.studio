import { expect, test } from '@playwright/test';

const widths = [390, 768, 1024, 1440, 1536] as const;

test('Problem Explorer exposes six static scenarios and one selected fixture', async ({ page }) => {
  await page.goto('/');
  const scenarios = page.getByRole('list', { name: 'Сценарии задач' });
  await expect(scenarios.getByRole('listitem')).toHaveCount(6);
  await expect(scenarios.locator('[data-state="selected"]')).toHaveCount(1);
});

test('Problem Explorer contains the system core and six semantic modules', async ({ page }) => {
  await page.goto('/');
  const section = page.locator('#change');
  await expect(section.getByRole('img', { name: /BND ENGINE — центральный модуль/i })).toBeVisible();
  await expect(section.locator('[data-system-module]')).toHaveCount(6);
});

test('Product Assembler keeps four directions, vector core and five workflow stages', async ({ page }) => {
  await page.goto('/');
  const section = page.locator('#products');
  await expect(section.getByRole('article')).toHaveCount(4);
  const core = section.locator('[data-visual-id="octagonal-core"]');
  await expect(core).toBeVisible();
  await expect(core.locator('image')).toHaveCount(0);
  await expect(section.getByLabel('Этапы разработки').locator(':scope > div')).toHaveCount(5);
});

for (const width of widths) {
  test(`Stage 6 central panels have no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width <= 768 ? 1400 : 1024 });
    await page.goto('/');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
}

test('mobile central objects precede secondary panels and remain readable', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 1600 });
  await page.goto('/');
  const systemCore = page.locator('#change').getByRole('img', { name: /центральный модуль/i });
  const processPanel = page.locator('#change').getByRole('complementary');
  const coreBox = await systemCore.boundingBox();
  const processBox = await processPanel.boundingBox();
  expect(coreBox).not.toBeNull();
  expect(processBox).not.toBeNull();
  expect(processBox!.y).toBeGreaterThan(coreBox!.y);
});

test('Stage 5.1 Hero remains locked during Stage 6', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-fixture-version="stage-5-1"]')).toBeAttached();
  await expect(page.locator('[data-hero-media-contract="static-placeholder"]')).toBeVisible();
  await expect(page.locator('h1')).toHaveCount(1);
});
