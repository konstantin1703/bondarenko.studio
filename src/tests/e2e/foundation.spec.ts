import { test, expect } from '@playwright/test';

const sections = ['home','change','products','configurator','projects','workflow','technologies','contacts','footer'];

test('home opens and contains all nine sections', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/BND\.STUDIO/);
  for (const id of sections) await expect(page.locator(`#${id}`)).toBeAttached();
});

test('Hero CTAs use real anchors', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /СОБРАТЬ РЕШЕНИЕ/ }).click();
  await expect(page.locator('#configurator')).toBeInViewport();
  await page.goto('/');
  await page.getByRole('link', { name: /СМОТРЕТЬ ПРОЕКТЫ/ }).click();
  await expect(page.locator('#projects')).toBeInViewport();
});

for (const width of [390, 768, 1440]) {
  test(`no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
}

test('keyboard starts with skip link and reaches navigation/CTA with visible focus', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Перейти к основному содержанию' });
  await expect(skip).toBeFocused();
  await expect(skip).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, 0)');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'BND.STUDIO — на главную' })).toBeFocused();
  for (let i=0;i<7;i++) await page.keyboard.press('Tab');
  const active = page.locator(':focus');
  await expect(active).toBeVisible();
  const outline = await active.evaluate((el) => getComputedStyle(el).outlineStyle);
  expect(outline).not.toBe('none');
});

test('reduced motion foundation is active', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const duration = await page.locator('a[href="#configurator"]').first().evaluate((el) => getComputedStyle(el).transitionDuration);
  expect(parseFloat(duration)).toBeLessThanOrEqual(0.01);
});
