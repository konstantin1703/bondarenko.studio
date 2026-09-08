# BONDARENKO.STUDIO

Готовый одностраничный сайт на Next.js 15 + React 19 + TypeScript.

## Что внутри

- 4 связанные секции: Hero → проблемы → возможности → конструктор задачи.
- Один фирменный статичный `BND Core`, который используется во всех секциях и ощущается «живым» за счёт мягкого свечения, скан-линии, сигналов, колец и микропараллакса.
- Интерактивная секция проблем: наведение включает связанные модули ядра.
- Интерактивный конструктор: выбранные модули меняют конфигурацию ядра и автоматически собирают бриф.
- Адаптив для desktop / tablet / mobile.
- Уважение `prefers-reduced-motion`.
- API-роут для отправки заявки в Telegram.
- Без выдуманных бизнес-метрик и неподтверждённых кейсов.

## Запуск

```bash
npm install
npm run dev
```

Открыть: `http://localhost:3000`

Проверка перед публикацией:

```bash
npm run typecheck
npm run build
npm run start
```

## Telegram-заявки

1. Скопируйте `.env.example` в `.env.local`.
2. Укажите:

```env
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...
NEXT_PUBLIC_TELEGRAM_URL=https://t.me/...
```

`NEXT_PUBLIC_TELEGRAM_URL` необязателен. Если его нет, кнопка «Обсудить напрямую» не показывается.

API отправки находится в `app/api/lead/route.ts`.

## Основные файлы

- `components/CoreVisual.tsx` — фирменное ядро и его состояния.
- `components/Hero.tsx` — секция 01.
- `components/Problems.tsx` — секция 02.
- `components/Capabilities.tsx` — секция 03.
- `components/Constructor.tsx` — секция 04 и интерактивный бриф.
- `app/globals.css` — вся визуальная система, адаптив и анимации.
- `public/bnd-core-static.webp` — статичный визуал ядра.

## Публикация

Проект подходит для Vercel и обычного Node.js-хостинга. На Vercel добавьте переменные окружения из `.env.local` в Project Settings → Environment Variables.
