import { expect, test } from '@playwright/test';

const widths = [390, 768, 1024, 1440, 1536] as const;

async function openCentralPanels(page: import('@playwright/test').Page) {
  await page.goto('/');
  await page.locator('[data-visual-id="central-panels"]').scrollIntoViewIfNeeded();
}

test('Problem Explorer exposes six controls and the Stage 6 default selection', async ({ page }) => {
  await openCentralPanels(page);
  const section = page.locator('#change');
  const controls = section.locator('[data-problem-scenario]');

  await expect(controls).toHaveCount(6);
  await expect(controls.filter({ has: page.locator('[aria-pressed="true"]') })).toHaveCount(0);
  await expect(section.locator('[data-problem-scenario][aria-pressed="true"]')).toHaveCount(1);
  await expect(section.locator('[data-problem-scenario="manual-automation"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(section.locator('[data-problem-core="manual-automation"]')).toBeVisible();
  await expect(section.locator('[data-process-chain="manual-automation"]')).toBeVisible();
});

test('Problem Explorer click updates selected card, modules, core, process chain and live status', async ({ page }) => {
  await openCentralPanels(page);
  const section = page.locator('#change');
  const control = section.locator('[data-problem-scenario="telegram-product"]');

  await control.click();

  await expect(control).toHaveAttribute('aria-pressed', 'true');
  await expect(section.locator('[data-problem-scenario][aria-pressed="true"]')).toHaveCount(1);
  await expect(section.locator('[data-system-module="interfaces"]')).toHaveAttribute('data-state', 'primary');
  await expect(section.locator('[data-system-module="integration"]')).toHaveAttribute('data-state', 'primary');
  await expect(section.locator('[data-problem-core="telegram-product"]')).toBeVisible();
  await expect(section.locator('[data-process-chain="telegram-product"]')).toBeVisible();
  await expect(section.locator('[data-problem-live-status]')).toContainText('Выбран сценарий: Telegram-продукт');
  await expect(control).toBeFocused();
});

test('Problem Explorer supports keyboard selection and preserves focus', async ({ page }) => {
  await openCentralPanels(page);
  const section = page.locator('#change');
  const apiControl = section.locator('[data-problem-scenario="api-integration"]');
  const aiControl = section.locator('[data-problem-scenario="ai-process"]');

  await apiControl.focus();
  await page.keyboard.press('Enter');
  await expect(apiControl).toHaveAttribute('aria-pressed', 'true');
  await expect(apiControl).toBeFocused();

  await aiControl.focus();
  await page.keyboard.press('Space');
  await expect(aiControl).toHaveAttribute('aria-pressed', 'true');
  await expect(aiControl).toBeFocused();
  await expect(section.locator('[data-system-module="ai"]')).toHaveAttribute('data-state', 'primary');
});

test('Problem Explorer resolves all six scenarios without empty process content', async ({ page }) => {
  await openCentralPanels(page);
  const section = page.locator('#change');
  const controls = section.locator('[data-problem-scenario]');

  for (let index = 0; index < await controls.count(); index += 1) {
    const control = controls.nth(index);
    const id = await control.getAttribute('data-problem-scenario');
    await control.click();
    await expect(control).toHaveAttribute('aria-pressed', 'true');
    await expect(section.locator(`[data-process-chain="${id}"] > li`)).toHaveCount(5);
    await expect(section.locator(`[data-problem-core="${id}"]`)).toBeVisible();
    await expect(section.locator('[data-system-module][data-state="primary"]')).not.toHaveCount(0);
  }
});

test('Product Assembler exposes four controls and the Stage 6 default direction', async ({ page }) => {
  await openCentralPanels(page);
  const section = page.locator('#products');

  await expect(section.locator('[data-product-direction]')).toHaveCount(4);
  await expect(section.locator('[data-product-direction][aria-pressed="true"]')).toHaveCount(1);
  await expect(section.locator('[data-product-direction="ai-web"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(section.locator('[data-product-stack="ai-web"]')).toBeVisible();
  await expect(section.locator('[data-visual-id="octagonal-core"]')).toHaveAttribute('data-route-profile', 'web');
});

test('Product Assembler click updates direction, Octagonal Core, stack, capabilities and live status', async ({ page }) => {
  await openCentralPanels(page);
  const section = page.locator('#products');
  const control = section.locator('[data-product-direction="telegram"]');

  await control.click();

  await expect(control).toHaveAttribute('aria-pressed', 'true');
  await expect(section.locator('[data-product-direction][aria-pressed="true"]')).toHaveCount(1);
  await expect(section.locator('[data-product-stack="telegram"]')).toContainText('Telegram API');
  await expect(section.locator('[data-visual-id="octagonal-core"]')).toHaveAttribute('data-route-profile', 'telegram');
  await expect(section.locator('[data-visual-id="octagonal-core"] [data-layer="inner"]')).toHaveAttribute('data-primary', 'true');
  await expect(section.getByLabel('Возможности выбранного направления')).toContainText('MINI APP');
  await expect(section.locator('[data-product-live-status]')).toContainText('Выбрано направление: Telegram-боты и Mini Apps');
  await expect(control).toBeFocused();
});

test('Product Assembler supports keyboard selection', async ({ page }) => {
  await openCentralPanels(page);
  const section = page.locator('#products');
  const apiControl = section.locator('[data-product-direction="api-automation"]');
  const crmControl = section.locator('[data-product-direction="crm-internal"]');

  await apiControl.focus();
  await page.keyboard.press('Enter');
  await expect(apiControl).toHaveAttribute('aria-pressed', 'true');
  await expect(section.locator('[data-product-stack="api-automation"]')).toContainText('REST API');

  await crmControl.focus();
  await page.keyboard.press('Space');
  await expect(crmControl).toHaveAttribute('aria-pressed', 'true');
  await expect(crmControl).toBeFocused();
  await expect(section.locator('[data-visual-id="octagonal-core"] [data-layer="glass"]')).toHaveAttribute('data-primary', 'true');
});

test('all four product directions resolve without changing the assembly box', async ({ page }) => {
  await openCentralPanels(page);
  const section = page.locator('#products');
  const assembly = section.getByLabel('Сборка продуктовой архитектуры');
  const before = await assembly.boundingBox();
  expect(before).not.toBeNull();

  const controls = section.locator('[data-product-direction]');
  for (let index = 0; index < await controls.count(); index += 1) {
    const control = controls.nth(index);
    const id = await control.getAttribute('data-product-direction');
    await control.click();
    await expect(section.locator(`[data-product-stack="${id}"] > li`)).toHaveCount(6);
    const current = await assembly.boundingBox();
    expect(current).not.toBeNull();
    expect(Math.abs(current!.width - before!.width)).toBeLessThanOrEqual(1);
    expect(Math.abs(current!.height - before!.height)).toBeLessThanOrEqual(1);
  }
});

test('reduced motion preserves interaction state', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await openCentralPanels(page);

  const scenario = page.locator('[data-problem-scenario="internal-crm"]');
  await scenario.click();
  await expect(scenario).toHaveAttribute('aria-pressed', 'true');

  const direction = page.locator('[data-product-direction="crm-internal"]');
  await direction.click();
  await expect(direction).toHaveAttribute('aria-pressed', 'true');
});

for (const width of widths) {
  test(`Stage 8 central panels remain interactive without horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width <= 768 ? 1800 : 1100 });
    await openCentralPanels(page);

    await page.locator('[data-problem-scenario="web-service"]').click();
    await page.locator('[data-product-direction="api-automation"]').click();

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    await expect(page.locator('[data-problem-scenario="web-service"]')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('[data-product-direction="api-automation"]')).toHaveAttribute('aria-pressed', 'true');
  });
}

test('Stage 8 produces no console or hydration errors during interaction', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));

  await openCentralPanels(page);
  await page.locator('[data-problem-scenario="ai-process"]').click();
  await page.locator('[data-product-direction="crm-internal"]').click();
  await page.waitForTimeout(100);

  expect(errors.filter((message) => !/favicon/i.test(message))).toEqual([]);
});

test('Hero and Stage 7 Configurator remain regression-locked', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-fixture-version="stage-5-1"]')).toBeAttached();
  await expect(page.locator('#configurator[data-fixture-version="stage-7"]')).toBeAttached();
  await expect(page.locator('h1')).toHaveCount(1);
});
