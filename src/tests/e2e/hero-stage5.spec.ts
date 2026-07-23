import { expect, test } from '@playwright/test';

const widths = [390, 768, 1024, 1440, 1630] as const;

test('Stage 5 Hero has one H1 and accessible primary actions', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.getByRole('heading', { level: 1, name: /СОЗДАЁМ AI-ПРОДУКТЫ И АВТОМАТИЗАЦИИ/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /СОБРАТЬ РЕШЕНИЕ/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /СМОТРЕТЬ ПРОЕКТЫ/i })).toBeVisible();
});

test('Hero media contract and HUD layer exist independently', async ({ page }) => {
  await page.goto('/');
  const media = page.locator('[data-hero-media-contract="static-placeholder"]');
  await expect(media).toBeVisible();
  await expect(media.getByRole('img', { name: /BND AI Core/i })).toBeVisible();
  await expect(page.locator('[data-hero-hud="true"]')).toBeAttached();
  await expect(media.locator('img')).toHaveCount(0);
});

for (const width of widths) {
  test(`Stage 5 Hero has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width <= 768 ? 1024 : 965 });
    await page.goto('/');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
}

test('mobile Hero stacks Core below copy and preserves 44px actions', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const heading = page.locator('h1');
  const media = page.locator('[data-hero-media-contract="static-placeholder"]');
  const headingBox = await heading.boundingBox();
  const mediaBox = await media.boundingBox();
  expect(headingBox).not.toBeNull();
  expect(mediaBox).not.toBeNull();
  expect(mediaBox!.y).toBeGreaterThan(headingBox!.y + headingBox!.height);
  for (const link of [
    page.getByRole('link', { name: /СОБРАТЬ РЕШЕНИЕ/i }),
    page.getByRole('link', { name: /СМОТРЕТЬ ПРОЕКТЫ/i }),
  ]) {
    const box = await link.boundingBox();
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
  }
});

test('reduced motion keeps Hero content and media contract usable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('[data-hero-media-contract="static-placeholder"]')).toBeVisible();
  const duration = await page.getByRole('link', { name: /СОБРАТЬ РЕШЕНИЕ/i }).evaluate((element) => getComputedStyle(element).transitionDuration);
  expect(parseFloat(duration)).toBeLessThanOrEqual(.01);
});
