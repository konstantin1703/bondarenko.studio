# Bondarenko.studio — launch checklist

Этот чеклист нужен перед финальным показом сайта клиентам или использованием в портфолио.

## P0 — проверить обязательно

- [ ] Открывается главная страница `/`.
- [ ] Открывается `/services/`.
- [ ] Открывается `/services/landing-page.html`.
- [ ] Открывается `/services/site-audit.html`.
- [ ] Открывается `/audit/`.
- [ ] Открывается `/brief/`.
- [ ] Открывается `/process/`.
- [ ] Открывается `/about/`.
- [ ] Открывается `/contacts/`.
- [ ] Открывается `/portfolio/`.
- [ ] Открывается `/blog/`.
- [ ] Открываются 3 статьи блога.
- [ ] Открываются кейсы портфолио.
- [ ] Все CTA на Telegram ведут на актуальный контакт.
- [ ] Форма на главной открывается.
- [ ] Форма валидирует обязательные поля.
- [ ] Успешная заявка доходит через Cloudflare Worker.
- [ ] Ошибка отправки показывается понятным текстом.
- [ ] Мобильная версия не ломает первый экран.
- [ ] Навигация не уводит на 404.

## P1 — важно перед активным продвижением

- [ ] Подключить Open Graph meta tags к главной и ключевым страницам.
- [ ] Подключить `assets/img/og-bondarenko-studio.svg` как preview image.
- [ ] Добавить JSON-LD для главной страницы.
- [ ] Проверить Cloudflare Worker: CORS, rate limit, server validation, Telegram secrets.
- [ ] Прогнать `npm install` и `npm run check:core`.
- [ ] Проверить GitHub Actions на новом PR.
- [ ] Проверить `/sitemap.xml`.
- [ ] Проверить `/robots.txt`.
- [ ] Проверить `/.well-known/security.txt`.
- [ ] Проверить `/humans.txt`.

## P2 — улучшения после запуска

- [ ] Унифицировать header/footer на всех страницах.
- [ ] Очистить legacy inline CSS в кейсах.
- [ ] Улучшить EN-версию.
- [ ] Добавить больше кейсов.
- [ ] Добавить отзывы или альтернативные proof-блоки.
- [ ] Добавить страницу отдельной услуги для сайта-визитки.
- [ ] Добавить страницу отдельной услуги для digital-упаковки.
- [ ] Настроить аналитику событий: Telegram click, form submit, brief click.
- [ ] Подключить CRM/таблицу лидов.

## Ручная проверка ссылок

Ключевые URL:

- https://bndstudio.art/
- https://bndstudio.art/services/
- https://bndstudio.art/services/landing-page.html
- https://bndstudio.art/services/site-audit.html
- https://bndstudio.art/audit/
- https://bndstudio.art/brief/
- https://bndstudio.art/process/
- https://bndstudio.art/about/
- https://bndstudio.art/contacts/
- https://bndstudio.art/portfolio/
- https://bndstudio.art/blog/

## Команды

```bash
npm install
npm run check:core
npm run check:html
```

`check:html` пока информационный: старые кейсы и legacy HTML нужно чистить отдельным спринтом.
