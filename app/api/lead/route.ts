import { NextResponse } from "next/server";

const clean = (value: unknown, max = 1200) => String(value ?? "").trim().slice(0, max);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (clean(body.website, 200)) return NextResponse.json({ ok: true });

    const name = clean(body.name, 100);
    const contact = clean(body.contact, 180);

    if (!name || !contact) {
      return NextResponse.json({ error: "Укажите имя и контакт." }, { status: 400 });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return NextResponse.json({ error: "Канал заявок ещё не подключён." }, { status: 503 });
    }

    const text = [
      "Новая заявка — BONDARENKO.STUDIO",
      "",
      "Имя: " + name,
      "Контакт: " + contact,
      "Формат: " + clean(body.type, 160),
      "Модули: " + clean((body.modules || []).join(", "), 600),
      "Приоритет: " + clean(body.priority, 120),
      "Срок: " + clean(body.timeline, 120),
      "Бюджет: " + clean(body.budget, 120),
      "",
      "Задача:",
      clean(body.description, 1800) || "—",
    ].join("\n");

    const response = await fetch("https://api.telegram.org/bot" + token + "/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Не удалось передать заявку." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Не удалось обработать заявку." }, { status: 500 });
  }
}
