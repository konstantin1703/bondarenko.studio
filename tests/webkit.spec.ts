import { expect, test } from "@playwright/test";

const baseURL = "http://127.0.0.1:3000";

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 428, height: 926 });
});

test("WebKit mobile shell renders without overflow or runtime errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.goto(baseURL, { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: /Цифровые системы/i })).toBeVisible();
  await expect(page.locator(".v12-scene canvas")).toBeVisible();

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  expect(errors).toEqual([]);
});

test("WebKit mobile navigation reaches the configurator", async ({ page }) => {
  await page.goto(baseURL, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Открыть меню" }).click();
  const navigation = page.getByRole("navigation", { name: "Мобильная навигация" });
  await expect(navigation).toBeVisible();
  await navigation.getByRole("link", { name: /Бриф/ }).click();

  await expect(page.locator("html")).toHaveAttribute("data-scene", "brief");
  await expect(page.getByRole("heading", { name: /Соберите конфигурацию проекта/i })).toBeVisible();
});
