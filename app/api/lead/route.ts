import { NextResponse } from "next/server";

const MAX_REQUEST_BYTES = 24_000;
const MAX_MESSAGE_LENGTH = 4000;

const PROJECT_TYPES = new Set(["site", "landing", "media", "telegram", "automation", "packaging"]);
const MODULES = new Set(["Стратегия", "Контент", "Дизайн", "AI", "CRM", "Интеграции", "Аналитика", "Запуск"]);
const PRIORITIES = new Set(["Быстро", "Аккуратно", "Масштабируемо", "Без рутины", "Под ключ"]);
const TIMELINES = new Set(["Срочно", "2–4 недели", "1–2 месяца", "Гибко"]);
const BUDGETS = new Set(["до $5K", "$5–15K", "$15–50K", "$50K+"]);

function clean(value: unknown, max = 600) {
  return String(value ?? "").trim().slice(0, max);
}

function cleanAllowedList(value: unknown, allowed: Set<string>, maxItems = 12) {
  if (!Array.isArray(value)) return [];
  return [...new Set(
    value
      .slice(0, maxItems)
      .map((item) => clean(item, 60))
      .filter((item) => allowed.has(item)),
  )];
}

async function readJsonBody(request: Request) {
  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (declaredLength > MAX_REQUEST_BYTES) {
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
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return NextResponse.json({ error: "Неверный формат запроса." }, { status: 415 });
    }

    const payload = await readJsonBody(request);
    if ("error" in payload) {
      if (payload.error === "too_large") {
        return NextResponse.json({ error: "Слишком большой объём данных." }, { status: 413 });
      }
      return NextResponse.json({ error: "Некорректный JSON." }, { status: 400 });
    }

    const body = payload.body;

    // Honeypot: automated submissions are accepted silently and never forwarded.
    if (clean(body.website, 200)) {
      return NextResponse.json({ ok: true });
    }

    const name = clean(body.name, 100);
    const contact = clean(body.contact, 180);
    const description = clean(body.description, 1600);

    if (!name || !contact) {
      return NextResponse.json(
        { error: "Укажите имя и контакт для связи." },
        { status: 400 },
      );
    }

    const projectTypes = cleanAllowedList(body.selectedTypes, PROJECT_TYPES, 1);
    const selectedModules = cleanAllowedList(body.selectedModules, MODULES, 8);
    const selectedPriorities = cleanAllowedList(body.selectedPriorities, PRIORITIES, 5);
    const timeline = clean(body.timeline, 80);
    const budget = clean(body.budget, 80);

    if (
      projectTypes.length !== 1 ||
      selectedModules.length < 1 ||
      selectedPriorities.length < 1 ||
      !TIMELINES.has(timeline) ||
      !BUDGETS.has(budget)
    ) {
      return NextResponse.json(
        { error: "Конфигурация неполная. Проверьте выбранные параметры." },
        { status: 400 },
      );
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.error("BND lead endpoint is missing Telegram environment configuration.");
      return NextResponse.json(
        { error: "Форма временно недоступна. Попробуйте позже." },
        { status: 503 },
      );
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
      return NextResponse.json(
        { error: "Не удалось отправить бриф. Попробуйте позже." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("BND lead endpoint failed.", error);
    return NextResponse.json(
      { error: "Не удалось обработать бриф." },
      { status: 500 },
    );
  }
}
