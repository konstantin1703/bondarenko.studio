import { NextResponse } from "next/server";

const MAX_LENGTH = 4000;

function clean(value: unknown, max = 600) {
  return String(value ?? "").trim().slice(0, max);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (clean(body.website, 200)) {
      return NextResponse.json({ ok: true });
    }

    const name = clean(body.name, 100);
    const contact = clean(body.contact, 180);
    const description = clean(body.description, 1600);

    if (!name || !contact) {
      return NextResponse.json({ error: "Укажите имя и контакт для связи." }, { status: 400 });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) {
      return NextResponse.json({ error: "Отправка ещё не настроена. Добавьте TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID в .env.local." }, { status: 503 });
    }

    const typeLabels: Record<string, string> = { site: "Сайт", landing: "Лендинг", media: "Медиа-система", telegram: "Telegram-бот", automation: "Автоматизация", packaging: "Упаковка продукта" };
    const projectTypes = Array.isArray(body.selectedTypes) ? body.selectedTypes.map((v: unknown) => typeLabels[clean(v, 50)] || clean(v, 50)).join(", ") : "—";
    const modules = Array.isArray(body.selectedModules) ? body.selectedModules.map((v: unknown) => clean(v, 50)).join(", ") : "—";
    const priorities = Array.isArray(body.selectedPriorities) ? body.selectedPriorities.map((v: unknown) => clean(v, 50)).join(", ") : "—";

    const text = [
      "🧩 Новая заявка — BONDARENKO.STUDIO",
      "",
      `Имя: ${name}`,
      `Контакт: ${contact}`,
      `Формат: ${projectTypes || "—"}`,
      `Модули: ${modules || "—"}`,
      `Приоритеты: ${priorities || "—"}`,
      `Сроки: ${clean(body.timeline, 80) || "—"}`,
      `Бюджет: ${clean(body.budget, 80) || "—"}`,
      "",
      `Задача: ${description || "—"}`,
    ].join("\n").slice(0, MAX_LENGTH);

    const telegram = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
      signal: AbortSignal.timeout(8000),
    });

    if (!telegram.ok) {
      return NextResponse.json({ error: "Telegram не принял заявку. Проверьте токен и chat ID." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Не удалось обработать заявку." }, { status: 500 });
  }
}
