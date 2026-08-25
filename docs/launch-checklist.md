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
- [ ] Открываются 5 новых статей блога.
- [ ] Открываются 4 актуальных кейса портфолио.
- [ ] Главная показывает актуальные кейсы: сайт-визитка, REDLINE CS2, лендинг психолога, WB/Ozon карточка.
- [ ] Все CTA на Telegram ведут на актуальный контакт.
- [ ] Форма на главной открывается.
- [ ] Форма валидирует обязательные поля.
- [ ] Успешная заявка доходит через Cloudflare Worker.
- [ ] Повторная быстрая заявка показывает понятный rate-limit текст.
- [ ] Ошибка отправки показывается понятным текстом.
- [ ] Мобильная версия не ломает первый экран.
- [ ] Навигация не уводит на 404.
- [ ] Скрины REDLINE загружаются локально из `assets/img/portfolio/redline/`.

## P1 — важно перед активным продвижением

- [ ] Подключить Open Graph meta tags к главной и ключевым страницам.
- [ ] Подключить `assets/img/og-bondarenko-studio.svg` как preview image.
- [ ] Добавить JSON-LD для главной страницы.
- [ ] Проверить Cloudflare Worker: CORS, rate limit, server validation, Telegram secrets.
- [ ] Прогнать `npm install` и `npm run check:core`.
- [ ] Прогнать `npm run check:html` после очистки legacy HTML.
- [ ] Проверить GitHub Actions на новом PR.
- [ ] Проверить `/sitemap.xml`.
- [ ] Проверить `/robots.txt`.
- [ ] Проверить `/.well-known/security.txt`.
- [ ] Проверить `/humans.txt`.

## P2 — улучшения после запуска

- [ ] Унифицировать header/footer на всех страницах без зависимости базовой навигации от JS.
- [ ] Очистить legacy inline CSS в кейсах.
- [ ] Улучшить EN-версию.
- [ ] Сделать self-case Bondarenko.studio после визуального редизайна.
- [ ] Добавить отзывы или альтернативные proof-блоки без выдуманных фактов.
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
- https://bndstudio.art/portfolio/site-vizitka/
- https://bndstudio.art/portfolio/redline-cs2/
- https://bndstudio.art/portfolio/landing-psihologa/
- https://bndstudio.art/portfolio/wb-ozon-card/
- https://bndstudio.art/blog/
- https://bndstudio.art/blog/site-ili-landing/
- https://bndstudio.art/blog/perviy-ekran-lendinga/
- https://bndstudio.art/blog/oshibki-v-tekstah/
- https://bndstudio.art/blog/upakovka-predlozheniya-pered-reklamoy/
- https://bndstudio.art/blog/ai-sozdanie-saita/

## Команды

```bash
npm install
npm run check:core
npm run check:html
```

`check:html` может быть информационным, пока старые страницы и legacy HTML не очищены отдельным спринтом.
