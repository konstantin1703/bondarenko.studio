import { expect, test } from "@playwright/test";

const baseURL = "http://127.0.0.1:3000";

function collectErrors(page: import("@playwright/test").Page) {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });
  return errors;
}

async function expectSectionLanding(page: import("@playwright/test").Page, scene: string, expectedTop: number) {
  await expect(page.locator("html")).toHaveAttribute("data-scene", scene);
  await expect
    .poll(
      async () => {
        const top = await page.locator(`#${scene}`).evaluate((element) => element.getBoundingClientRect().top);
        return Math.abs(top - expectedTop);
      },
      { timeout: 3000, intervals: [50, 100, 150, 250] },
    )
    .toBeLessThanOrEqual(4);
}

test("desktop shell renders without overflow or runtime errors", async ({ page }) => {
  const errors = collectErrors(page);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${baseURL}/`, { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: /Цифровые системы/i })).toBeVisible();

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  expect(errors).toEqual([]);
});

test("direct section URLs land directly below the desktop header", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const scene of ["diagnostics", "capabilities", "brief"] as const) {
    await page.goto(`${baseURL}/#${scene}`, { waitUntil: "networkidle" });
    await expectSectionLanding(page, scene, 76);
  }
});

test("mobile section URLs and menu navigation land below the header", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${baseURL}/#capabilities`, { waitUntil: "networkidle" });
  await expectSectionLanding(page, "capabilities", 64);

  await page.getByRole("button", { name: "Открыть меню" }).click();
  const mobileNavigation = page.getByRole("navigation", { name: "Мобильная навигация" });
  await expect(mobileNavigation).toBeVisible();
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  await expect(mobileNavigation.getByRole("link", { name: /Диагностика/ })).toBeFocused();

  await mobileNavigation.getByRole("link", { name: /Бриф/ }).click();
  await expect(page.getByRole("button", { name: "Открыть меню" })).toBeVisible();
  await expectSectionLanding(page, "brief", 64);
});

test("mobile navigation traps focus, closes with Escape and restores the page", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${baseURL}/`, { waitUntil: "networkidle" });

  const menuButton = page.locator(".v12-menu-button");
  await menuButton.click();
  const mobileNavigation = page.getByRole("navigation", { name: "Мобильная навигация" });
  await expect(mobileNavigation).toBeVisible();
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  await expect(mobileNavigation.getByRole("link", { name: /Диагностика/ })).toBeFocused();

  await page.keyboard.press("Shift+Tab");
  await expect(page.getByRole("link", { name: /Собрать проект/ })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(mobileNavigation.getByRole("link", { name: /Диагностика/ })).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Открыть меню" })).toBeVisible();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  await expect(menuButton).toBeFocused();
});

test("brief is sequential and reaches the transmitted state", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${baseURL}/#brief`, { waitUntil: "networkidle" });

  // The transport endpoint is smoke-tested separately. Here we isolate the UI state
  // machine so CI does not depend on Telegram secrets or external network access.
  await page.evaluate(() => {
    const originalFetch = window.fetch.bind(window);
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
      if (url.endsWith("/api/lead")) {
        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      return originalFetch(input, init);
    };
  });

  const modulesStep = page.getByRole("button", { name: /Модули/ }).first();
  await expect(modulesStep).toBeDisabled();

  await page.getByRole("button", { name: /Сайт Корпоративный сайт/ }).click();
  await expect(modulesStep).toBeEnabled();
  await page.getByRole("button", { name: /Дальше/ }).click();

  await page.getByRole("button", { name: /Стратегия/ }).click();
  await page.getByRole("button", { name: /Дальше/ }).click();

  await page.getByRole("button", { name: /Масштабируемо/ }).click();
  await page.getByRole("button", { name: /Дальше/ }).click();

  await page.getByRole("button", { name: "2–4 недели" }).click();
  await page.getByRole("button", { name: "$5–15K" }).click();
  await page.getByRole("button", { name: /Дальше/ }).click();

  await page.getByPlaceholder("Как к вам обращаться?").fill("QA");
  await page.getByPlaceholder("@username или email").fill("qa@example.com");
  await page.getByPlaceholder("Что уже есть и какой результат нужен?").fill("Проверка полного сценария конструктора.");

  await page.getByRole("button", { name: /Отправить конфигурацию/ }).click();
  await expect(page.getByRole("heading", { name: "Конфигурация отправлена." })).toBeVisible();
  await expect(page.getByText("TRANSMISSION COMPLETE")).toBeVisible();
});
