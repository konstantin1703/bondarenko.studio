import { expect, test } from '@playwright/test';

const sectionIds = ['home', 'change', 'products', 'configurator', 'projects', 'workflow', 'technologies', 'contacts', 'footer'] as const;
const widths = [390, 768, 1024, 1440, 1536] as const;

async function sectionTop(page: import('@playwright/test').Page, id: string) {
  return page.locator(`#${id}`).evaluate((element) => element.getBoundingClientRect().top + window.scrollY);
}

test('Stage 9 preserves all nine sections in the intended order', async ({ page }) => {
  await page.goto('/');
  for (const id of sectionIds) await expect(page.locator(`#${id}`)).toBeAttached();

  const positions = await Promise.all(sectionIds.map((id) => sectionTop(page, id)));
  for (let index = 1; index < positions.length; index += 1) {
    expect(positions[index]).toBeGreaterThan(positions[index - 1]);
  }

  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('#projects')).toHaveAttribute('data-fixture-version', 'stage-9');
  await expect(page.locator('#workflow')).toHaveAttribute('data-fixture-version', 'stage-9');
  await expect(page.locator('#technologies')).toHaveAttribute('data-fixture-version', 'stage-9');
  await expect(page.locator('#contacts')).toHaveAttribute('data-fixture-version', 'stage-9');
  await expect(page.locator('#footer')).toHaveAttribute('data-fixture-version', 'stage-9');
});

test('Projects is honest about pending materials and does not present fake cases', async ({ page }) => {
  await page.goto('/');
  const projects = page.locator('#projects');
  await expect(projects.getByText(/Подборка будет опубликована после согласования материалов/i)).toBeVisible();
  await expect(projects.locator('article')).toHaveCount(6);
  await expect(projects.locator('button')).toHaveCount(0);
  await expect(projects).not.toContainText(/300\+|50 клиентов|-65%|отзыв клиента|рост выручки|пользователей/i);
  await expect(projects).toContainText('направления и типовые форматы решений');
});

test('Workflow contains five static engineering stages and their artifacts', async ({ page }) => {
  await page.goto('/');
  const workflow = page.locator('#workflow');
  await expect(workflow.locator('ol > li')).toHaveCount(5);
  for (const label of ['Анализ', 'Проектирование', 'Разработка', 'Тестирование', 'Запуск и поддержка']) {
    await expect(workflow.getByRole('heading', { level: 3, name: label })).toBeVisible();
  }
  for (const artifact of [
    'Требования и карта процессов',
    'Архитектура и прототип',
    'Рабочие модули',
    'Проверенный сценарий',
    'Production release и поддержка',
  ]) await expect(workflow.getByText(artifact, { exact: true })).toBeVisible();
  await expect(workflow.locator('button')).toHaveCount(0);
});

test('Technologies use only approved labels and principles remain a distinct structure', async ({ page }) => {
  await page.goto('/');
  const section = page.locator('#technologies');
  const approved = ['TypeScript', 'React', 'Next.js', 'Python', 'AI API', 'REST / Webhooks', 'PostgreSQL', 'Docker', 'Telegram API'];
  for (const label of approved) await expect(section.getByText(label, { exact: true })).toBeVisible();
  await expect(section.getByText('Принципы', { exact: true })).toBeVisible();
  await expect(section.locator('ol > li')).toHaveCount(6);
  await expect(section).not.toContainText(/сертифицирован|гарантирован|в каждом проекте/i);
});

test('Contact foundation is static, disabled and privacy-aware', async ({ page }) => {
  await page.goto('/');
  const contact = page.locator('#contacts');
  const form = contact.locator('[data-static-contact-form="true"]');
  await expect(form).toBeVisible();
  await expect(form.locator('input, textarea')).toHaveCount(4);
  for (const control of await form.locator('input, textarea').all()) await expect(control).toBeDisabled();
  const consent = form.locator('input[type="checkbox"]');
  await expect(consent).not.toBeChecked();
  await expect(consent).toBeDisabled();
  await expect(form.getByRole('button', { name: /Отправка будет подключена позже/i })).toBeDisabled();
  await expect(form).not.toHaveAttribute('action', /.+/);
  await expect(contact.getByText(/Данные не сохраняются и сетевые запросы не выполняются/i)).toBeVisible();
  await expect(contact.getByRole('link', { name: /privacy draft/i })).toHaveAttribute('href', '/privacy');
});

test('privacy route and technical footer are available', async ({ page }) => {
  const response = await page.goto('/privacy');
  expect(response?.ok()).toBeTruthy();
  await expect(page.locator('h1')).toHaveCount(1);

  await page.goto('/');
  const footer = page.locator('#footer');
  await expect(footer.getByRole('navigation', { name: 'Навигация в подвале' })).toBeVisible();
  await expect(footer.getByRole('link', { name: /Privacy draft/i })).toHaveAttribute('href', '/privacy');
  for (const label of ['LOCAL FOUNDATION', 'BUILD VERIFIED', 'PREVIEW MODE']) {
    await expect(footer.getByText(label, { exact: true })).toBeVisible();
  }
  await expect(footer).not.toContainText('ALL SYSTEMS OPERATIONAL');
});

for (const width of widths) {
  test(`Stage 9 full page has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width <= 768 ? 1200 : 1000 });
    await page.goto('/');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
}

test('mobile lower page keeps sequential layout and accessible targets', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 1000 });
  await page.goto('/');
  const lowerIds = ['projects', 'workflow', 'technologies', 'contacts', 'footer'];
  const positions = await Promise.all(lowerIds.map((id) => sectionTop(page, id)));
  for (let index = 1; index < positions.length; index += 1) expect(positions[index]).toBeGreaterThan(positions[index - 1]);

  for (const link of await page.locator('#projects a, #contacts a, #footer a').all()) {
    const box = await link.boundingBox();
    if (box) expect(box.height).toBeGreaterThanOrEqual(40);
  }
});

test('Stage 9 keeps Stage 5.1, Stage 8 and Stage 7 contracts unchanged', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-fixture-version="stage-5-1"]')).toBeAttached();
  await expect(page.locator('[data-visual-id="central-panels"][data-fixture-version="stage-8"]')).toBeAttached();
  await expect(page.locator('#configurator[data-fixture-version="stage-7"]')).toBeAttached();
  await expect(page.locator('h1')).toHaveCount(1);
});
