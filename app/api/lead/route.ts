import { NextResponse } from "next/server";

const MAX_REQUEST_BYTES = 24_000;
const MAX_MESSAGE_LENGTH = 4000;

function clean(value: unknown, max = 600) {
  return String(value ?? "").trim().slice(0, max);
}

function cleanList(value: unknown, maxItems = 12) {
  if (!Array.isArray(value)) return [];
  return value.slice(0, maxItems).map((item) => clean(item, 60)).filter(Boolean);
}

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > MAX_REQUEST_BYTES) {
      return NextResponse.json({ error: "Слишком большой объём данных." }, { status: 413 });
    }

    const body = (await request.json()) as Record<string, unknown>;

    // Honeypot: bots get a successful response without forwarding anything.
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

    const projectTypes = cleanList(body.selectedTypes, 4)
      .map((value) => typeLabels[value] || value)
      .join(", ");
    const modules = cleanList(body.selectedModules).join(", ");
    const priorities = cleanList(body.selectedPriorities).join(", ");

    const text = [
      "Новая заявка — BND Studio",
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
    ]
      .join("\n")
      .slice(0, MAX_MESSAGE_LENGTH);

    const telegram = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true,
      }),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });

    if (!telegram.ok) {
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
