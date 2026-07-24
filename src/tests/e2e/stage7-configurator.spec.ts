import { expect, test } from '@playwright/test';

const widths = [390, 768, 1024, 1440, 1672] as const;

test('Stage 7 Configurator exposes one active step out of five', async ({ page }) => {
  await page.goto('/');
  const section = page.locator('#configurator');
  await expect(section).toHaveAttribute('data-fixture-version', 'stage-7');
  await expect(section.getByRole('heading', { level: 2, name: /СОБЕРЁМ РЕШЕНИЕ ПОД ВАШ ПРОЦЕСС/i })).toBeVisible();
  const progress = section.getByRole('navigation', { name: 'Этапы конфигуратора' });
  await expect(progress.locator('ol > li')).toHaveCount(5);
  await expect(progress.locator('[aria-current="step"]')).toHaveCount(1);
});

test('Stage 7 Configurator contains six static scenarios and one selected fixture', async ({ page }) => {
  await page.goto('/');
  const section = page.locator('#configurator');
  await expect(section.locator('[data-configurator-option]')).toHaveCount(6);
  await expect(section.locator('[data-configurator-option][data-selected="true"]')).toHaveCount(1);
  await expect(section.locator('form, input, select, textarea')).toHaveCount(0);
});

test('navigation fixtures are honest disabled controls', async ({ page }) => {
  await page.goto('/');
  const controls = page.locator('#configurator').getByLabel('Навигация по статическому конфигуратору');
  const back = controls.getByRole('button', { name: /Назад/i });
  const next = controls.getByRole('button', { name: /Продолжить/i });
  await expect(back).toBeDisabled();
  await expect(next).toBeDisabled();
  await expect(controls.locator('a[href="#"]')).toHaveCount(0);
});

test('Architecture Preview contains five semantic nodes and honest local status', async ({ page }) => {
  await page.goto('/');
  const preview = page.locator('[data-configurator-zone="preview"]');
  await expect(preview).toBeVisible();
  await expect(preview.locator('[data-architecture-node]')).toHaveCount(5);
  await expect(preview.getByText('LOCAL PREVIEW', { exact: true }).first()).toBeVisible();
  await expect(preview.locator('canvas, img, image')).toHaveCount(0);
});

for (const width of widths) {
  test(`Stage 7 Configurator has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width <= 768 ? 1800 : 1000 });
    await page.goto('/');
    await page.locator('#configurator').scrollIntoViewIfNeeded();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
}

test('tablet and mobile keep intro, workspace and preview in semantic order', async ({ page }) => {
  for (const viewport of [{ width: 768, height: 1400 }, { width: 390, height: 1800 }]) {
    await page.setViewportSize(viewport);
    await page.goto('/');
    const intro = page.locator('[data-configurator-zone="intro"]');
    const workspace = page.locator('[data-configurator-zone="workspace"]');
    const preview = page.locator('[data-configurator-zone="preview"]');
    const introBox = await intro.boundingBox();
    const workspaceBox = await workspace.boundingBox();
    const previewBox = await preview.boundingBox();
    expect(introBox).not.toBeNull();
    expect(workspaceBox).not.toBeNull();
    expect(previewBox).not.toBeNull();
    expect(workspaceBox!.y).toBeGreaterThan(introBox!.y);
    expect(previewBox!.y).toBeGreaterThan(workspaceBox!.y);
  }
});

test('Stage 7 Configurator remains locked during Stage 8', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-fixture-version="stage-5-1"]')).toBeAttached();
  await expect(page.locator('#configurator[data-fixture-version="stage-7"]')).toBeAttached();
  await expect(page.locator('[data-visual-id="central-panels"][data-fixture-version="stage-8"]')).toBeAttached();
  await expect(page.locator('h1')).toHaveCount(1);
});
