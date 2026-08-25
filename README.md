# Bondarenko.studio

Bondarenko.studio — digital studio for websites, copywriting, design and visual packaging.

Custom domain: `bndstudio.art`

## Project purpose

The website is being built as a portfolio and order-entry point for a small AI-assisted digital studio.

Main directions:

- websites;
- copywriting;
- visual design;
- brand and project packaging;
- portfolio cases;
- blog articles;
- RU/EN presentation for client work and Upwork.

## Stack

- Static HTML/CSS/JavaScript.
- GitHub Pages.
- Cloudflare Worker for lead form submissions.
- Telegram as the lead notification channel.
- Yandex Metrika, enabled only when a counter ID is configured.

## Local setup

```bash
npm ci
```

## Quality checks

```bash
npm run format:check
npm run lint:js
npm run lint:css
npm run check:html
```

Full local check:

```bash
npm run check
```

## Worker

The lead Worker source is kept in `worker/src/index.js`.

Secrets must not be committed. Configure them in Cloudflare/Wrangler:

```bash
wrangler secret put TELEGRAM_TOKEN
wrangler secret put CHAT_ID
```

Use `worker/wrangler.toml.example` as a safe deployment reference.

## Current sprint

Sprint 1: project foundation and multilingual structure.

Goals:

- prepare reusable asset folders;
- move shared CSS and JavaScript into `assets/` step by step;
- add basic SEO files;
- prepare the future RU/EN structure;
- keep the current visual version stable while refactoring.

## Repository rules

- Do not push directly to `main` without review.
- Work through feature branches and pull requests.
- Make changes gradually and verify each step.
