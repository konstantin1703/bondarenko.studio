# BND Studio — Production v1 ТЗ

Статус: active
Дата фиксации: 2026-09-13
Production: https://bndstudio.art
Source of truth: `main` в `konstantin1703/bondarenko.studio`

## Цель

Довести текущую frozen-композицию BND до production v1: сайт должен стабильно деплоиться из GitHub в Vercel, проходить автоматический QA уже на публичном домене, корректно принимать проектный бриф, иметь минимальную продуктовую аналитику, индексироваться поисковиками и держать измеримый performance/security budget.

## Зафиксировано и не переоткрывается без дефекта

- Hero, Diagnostics, Capabilities, Brief и Footer сохраняют текущую арт-дирекцию и композицию.
- Основной домен: `bndstudio.art`; `www.bndstudio.art` — постоянный redirect на apex.
- GitHub `main` — единственный production source.
- Vercel — production runtime/deployment layer.
- Cloudflare и новый инфраструктурный слой не добавляются без конкретной необходимости.
- Новые секции, карточки, портфолио-блоки и визуальный редизайн не входят в v1 hardening.

## P0 — Release integrity и live QA

1. Каждый push/merge в `main` должен автоматически запускать Vercel production deployment.
2. Production должен публиковать build SHA через безопасный health endpoint без секретов.
3. GitHub live-QA должен дождаться, пока `bndstudio.art` обслуживает ровно текущий SHA, и только после этого запускать проверки.
4. Live-QA проверяет:
   - apex `200` и `www -> 308 -> apex`;
   - HTTPS/security headers;
   - canonical, JSON-LD, robots, sitemap, manifest, OG image;
   - 404 и отсутствие публичных lab-маршрутов;
   - safe API-contract `/api/lead` без реальной отправки заявки;
   - Chromium/WebKit, desktop/mobile, direct hash navigation, accessibility, reduced motion, WebGL lifecycle budget и Brief recovery.
5. Реальную Telegram-доставку проверить отдельно контролируемой заявкой после подтверждения production secrets.

Приёмка P0: merge в `main` считается production-завершённым только после Vercel READY + live workflow green.

## P1 — Brief и conversion telemetry

- Подтвердить реальную доставку заявки в Telegram.
- События: `brief_start`, `brief_step`, `brief_submit`, `brief_success`, `brief_error`.
- Не отправлять в аналитику имя, контакт, описание или другие пользовательские данные.
- Success/error/retry должны оставаться доступными с клавиатуры и корректно объявляться assistive technology.

Приёмка P1: одна контролируемая live-заявка доставлена; события фиксируются без PII.

## P2 — Индексация

- Сохранить корректные metadata, canonical, Open Graph, Twitter card, JSON-LD.
- Подключить Google Search Console и Яндекс Вебмастер.
- Отправить `https://bndstudio.art/sitemap.xml`.
- Проверить, что индексируется только production surface; `/api/*` и внутренние маршруты не индексируются.

Приёмка P2: домен подтверждён в обеих панелях, sitemap принят, canonical совпадает с apex.

## P3 — Реальный performance budget

Измерять только live production. Приоритет: mobile.

- LCP: целевой <= 2.5 s на нормальной мобильной сети.
- CLS: <= 0.1.
- INP: <= 200 ms при наличии достаточных полевых данных.
- Не более двух соседних активных WebGL-loop одновременно; глубокие surfaces deferred.
- Любая оптимизация принимается только при измеримом выигрыше или устранении дефекта.

## P4 — Production hardening

- Проверить runtime errors и 4xx/5xx после релизов.
- Rate limiting/anti-abuse для `/api/lead` — через Vercel-native механизм либо отдельный edge layer только при необходимости.
- Сохранить request size limits, allowlists, honeypot и delivery timeout.
- Проверить rollback на предыдущий Vercel production deployment.
- Финальный контентный проход: орфография, повторения, CTA, отсутствие внутренних lab/dev формулировок.

## Definition of Done v1

Production v1 готов, когда P0–P4 выполнены либо явно помечены как external-access item, `main` автоматически деплоится, live-QA зелёный, реальный Brief доставлен, домен индексируем, а live performance не имеет P0/P1 дефектов.
