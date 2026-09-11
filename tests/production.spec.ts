import { expect, test, type Page } from "@playwright/test";

const baseURL = "http://127.0.0.1:3000";

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
});

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  return errors;
}

async function completeBrief(page: Page) {
  const brief = page.locator("#brief");
  await expect(brief.getByRole("button", { name: /^Модули/ })).toBeDisabled();
  await brief.getByRole("button", { name: /01 Сайт/ }).click();
  await brief.getByRole("button", { name: "Дальше", exact: true }).click();
  await brief.getByRole("button", { name: /03 Дизайн/ }).click();
  await brief.getByRole("button", { name: "Дальше", exact: true }).click();
  await brief.getByRole("button", { name: /03 Масштабируемо/ }).click();
  await brief.getByRole("button", { name: "Дальше", exact: true }).click();
  await brief.getByRole("button", { name: /2–4 недели/ }).click();
  await brief.getByRole("button", { name: /\$5–15K/ }).click();
  await brief.getByRole("button", { name: "Дальше", exact: true }).click();
  await brief.getByPlaceholder("Как к вам обращаться?").fill("Production QA");
  await brief.getByPlaceholder("@username или email").fill("qa@example.com");
  await brief.getByPlaceholder("Что уже есть и какой результат нужен?").fill("Проверка с перехваченным запросом, без отправки в Telegram.");
  await expect(brief.getByText("READY", { exact: true })).toBeVisible();
  await expect(brief.getByText("100%", { exact: true })).toBeVisible();
  return brief;
}

test("current production sections, anchors and interactions work", async ({ page }) => {
  const errors = collectErrors(page);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(baseURL, { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName("Цифровые системы, собранные в одно целое.");
  for (const id of ["hero", "diagnostics", "capabilities", "brief", "footer"]) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
  await page.getByRole("link", { name: "Диагностика", exact: true }).click();
  await expect(page).toHaveURL(/#diagnostics$/);
  await expect.poll(() => page.locator("#diagnostics").evaluate((el) => Math.abs(el.getBoundingClientRect().top))).toBeLessThan(4);
  await page.getByRole("button", { name: /03 Ручная рутина/ }).click();
  await expect(page.locator("#diagnostics aside")).toContainText("Ручная рутина");
  await page.getByRole("link", { name: "Дальше: возможности", exact: true }).click();
  await page.getByRole("button", { name: /03 Автоматизация BOTS/ }).click();
  await expect(page.locator("#capabilities aside")).toContainText("Автоматизация");
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  expect(errors).toEqual([]);
});

for (const width of [390, 430]) {
  test(`brief completes on ${width}px and survives a failed submission`, async ({ page }) => {
    await page.setViewportSize({ width, height: 932 });
    await page.route("**/api/lead", (route) => route.fulfill({ status: 503, json: { error: "Форма временно недоступна. Попробуйте позже." } }));
    await page.goto(`${baseURL}/#brief`, { waitUntil: "networkidle" });
    const brief = await completeBrief(page);
    await brief.getByRole("button", { name: "Передать спецификацию" }).click();
    await expect(brief.getByRole("status")).toContainText("Форма временно недоступна");
    await expect(brief.getByPlaceholder("@username или email")).toHaveValue("qa@example.com");
    await expect(brief.getByRole("button", { name: "Передать спецификацию" })).toBeEnabled();
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  });
}

test("submitted specification is stable until delivery completes", async ({ page }) => {
  let release!: () => void;
  const gate = new Promise<void>((resolve) => { release = resolve; });
  let payload: Record<string, unknown> | undefined;
  await page.route("**/api/lead", async (route) => {
    payload = route.request().postDataJSON();
    await gate;
    await route.fulfill({ status: 200, json: { ok: true } });
  });
  await page.goto(`${baseURL}/#brief`, { waitUntil: "networkidle" });
  const brief = await completeBrief(page);
  await brief.getByRole("button", { name: "Передать спецификацию" }).click();
  await expect(brief.getByRole("button", { name: "Назад", exact: true })).toBeDisabled();
  await expect(brief.getByRole("button", { name: "Тип проекта", exact: true })).toBeDisabled();
  await expect(brief.getByPlaceholder("@username или email")).toBeDisabled();
  release();
  await expect(brief.getByRole("heading", { name: "Спецификация отправлена." })).toBeVisible();
  expect(payload).toMatchObject({ selectedTypes: ["site"], selectedModules: ["Дизайн"], selectedPriorities: ["Масштабируемо"], contact: "qa@example.com" });
  await brief.getByRole("button", { name: "Собрать новый проект" }).click();
  await expect(brief.getByText("00%", { exact: true })).toBeVisible();
});

test("without WebGL the material fallback and full brief remain usable", async ({ page }) => {
  const errors = collectErrors(page);
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type: string, ...args: unknown[]) {
      if (type === "webgl2" || type === "webgl" || type === "experimental-webgl") return null;
      return Reflect.apply(original, this, [type, ...args]);
    } as typeof original;
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(baseURL, { waitUntil: "networkidle" });
  await expect(page.locator('[data-material-fallback="true"]')).toHaveCount(5);
  await expect(page.locator("canvas")).toHaveCount(0);
  expect((await page.request.get(`${baseURL}/material-fallback.webp`)).ok()).toBe(true);
  await page.getByRole("link", { name: "Обсудить проект", exact: true }).click();
  await completeBrief(page);
  expect(errors).toEqual([]);
});

test("a lost graphics context switches the affected surface to its fallback", async ({ page }) => {
  await page.goto(baseURL, { waitUntil: "networkidle" });
  const hero = page.locator('[data-material-surface="hero"]');
  await expect(hero.locator("canvas")).toHaveCount(1);
  await hero.locator("canvas").evaluate((canvas: HTMLCanvasElement) => {
    const extension = canvas.getContext("webgl2")?.getExtension("WEBGL_lose_context");
    if (!extension) throw new Error("WEBGL_lose_context is required for this regression check");
    extension.loseContext();
  });
  await expect(hero.locator('[data-material-fallback="true"]')).toHaveCount(1);
  await page.getByRole("link", { name: "Обсудить проект", exact: true }).click();
  await completeBrief(page);
});
