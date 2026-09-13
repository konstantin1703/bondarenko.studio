import { NextResponse } from "next/server";

const MAX_REQUEST_BYTES = 24_000;
const MAX_MESSAGE_LENGTH = 4000;

const API_HEADERS = {
  "Cache-Control": "no-store, max-age=0",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
} as const;

const PROJECT_TYPES = new Set(["site", "landing", "media", "telegram", "automation", "packaging"]);
const MODULES = new Set(["Стратегия", "Контент", "Дизайн", "AI", "CRM", "Интеграции", "Аналитика", "Запуск"]);
const PRIORITIES = new Set(["Быстро", "Аккуратно", "Масштабируемо", "Без рутины", "Под ключ"]);
const TIMELINES = new Set(["Срочно", "2–4 недели", "1–2 месяца", "Гибко"]);
const BUDGETS = new Set(["до $5K", "$5–15K", "$15–50K", "$50K+"]);

function apiJson(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: API_HEADERS,
  });
}

function cleanSingleLine(value: unknown, max: number) {
  return String(value ?? "")
    .replace(/[\u0000-\u001f\u007f]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function cleanDescription(value: unknown, max: number) {
  return String(value ?? "")
    .replace(/\u0000/g, "")
    .replace(/\r\n?/g, "\n")
    .trim()
    .slice(0, max);
}

function cleanAllowedList(value: unknown, allowed: Set<string>, maxItems = 12) {
  if (!Array.isArray(value)) return [];
  return [...new Set(
    value
      .slice(0, maxItems)
      .map((item) => cleanSingleLine(item, 60))
      .filter((item) => allowed.has(item)),
  )];
}

function isCrossSiteBrowserRequest(request: Request) {
  const fetchSite = request.headers.get("sec-fetch-site")?.toLowerCase();
  if (fetchSite === "cross-site") return true;

  const origin = request.headers.get("origin");
  if (!origin) return false;

  try {
    return new URL(origin).origin !== new URL(request.url).origin;
  } catch {
    return true;
  }
}

async function readJsonBody(request: Request) {
  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_REQUEST_BYTES) {
    return { error: "too_large" as const };
  }

  const raw = await request.text();
  const byteLength = new TextEncoder().encode(raw).byteLength;
  if (byteLength > MAX_REQUEST_BYTES) {
    return { error: "too_large" as const };
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return { error: "invalid" as const };
    }
    return { body: parsed as Record<string, unknown> };
  } catch {
    return { error: "invalid" as const };
  }
}

export async function POST(request: Request) {
  try {
    if (isCrossSiteBrowserRequest(request)) {
      return apiJson({ error: "Запрос отклонён." }, 403);
    }

    const contentType = request.headers.get("content-type") || "";
    const mediaType = contentType.split(";", 1)[0]?.trim().toLowerCase();
    if (mediaType !== "application/json") {
      return apiJson({ error: "Неверный формат запроса." }, 415);
    }

    const payload = await readJsonBody(request);
    if ("error" in payload) {
      if (payload.error === "too_large") {
        return apiJson({ error: "Слишком большой объём данных." }, 413);
      }
      return apiJson({ error: "Некорректный JSON." }, 400);
    }

    const body = payload.body;

    // Honeypot: automated submissions are accepted silently and never forwarded.
    if (cleanSingleLine(body.website, 200)) {
      return apiJson({ ok: true });
    }

    const name = cleanSingleLine(body.name, 100);
    const contact = cleanSingleLine(body.contact, 180);
    const description = cleanDescription(body.description, 1600);

    if (!name || !contact) {
      return apiJson({ error: "Укажите имя и контакт для связи." }, 400);
    }

    const projectTypes = cleanAllowedList(body.selectedTypes, PROJECT_TYPES, 1);
    const selectedModules = cleanAllowedList(body.selectedModules, MODULES, 8);
    const selectedPriorities = cleanAllowedList(body.selectedPriorities, PRIORITIES, 5);
    const timeline = cleanSingleLine(body.timeline, 80);
    const budget = cleanSingleLine(body.budget, 80);

    if (
      projectTypes.length !== 1 ||
      selectedModules.length < 1 ||
      selectedPriorities.length < 1 ||
      !TIMELINES.has(timeline) ||
      !BUDGETS.has(budget)
    ) {
      return apiJson({ error: "Конфигурация неполная. Проверьте выбранные параметры." }, 400);
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.error("BND lead endpoint is missing Telegram environment configuration.");
      return apiJson({ error: "Форма временно недоступна. Попробуйте позже." }, 503);
    }

    const typeLabels: Record<string, string> = {
      site: "Сайт",
      landing: "Лендинг",
      media: "Медиа-система",
      telegram: "Telegram-бот",
      automation: "Автоматизация",
      packaging: "Упаковка",
    };

    const text = [
      "Новая заявка — BND Studio",
      "",
      `Имя: ${name}`,
      `Контакт: ${contact}`,
      `Формат: ${typeLabels[projectTypes[0]]}`,
      `Модули: ${selectedModules.join(", ")}`,
      `Приоритеты: ${selectedPriorities.join(", ")}`,
      `Сроки: ${timeline}`,
      `Бюджет: ${budget}`,
      "",
      `Задача: ${description || "—"}`,
    ]
      .join("\n")
      .slice(0, MAX_MESSAGE_LENGTH);

    const telegram = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true,
      }),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });

    const telegramResult = await telegram.json().catch(() => null) as { ok?: boolean } | null;
    if (!telegram.ok || telegramResult?.ok !== true) {
      console.error("Telegram rejected a BND lead request.", telegram.status);
      return apiJson({ error: "Не удалось отправить бриф. Попробуйте позже." }, 502);
    }

    return apiJson({ ok: true });
  } catch (error) {
    console.error("BND lead endpoint failed.", error);
    return apiJson({ error: "Не удалось обработать бриф." }, 500);
  }
}
