# Sprint 1 — QA checklist

Branch: `sprint-1-site-foundation`

## Scope

This checklist covers only the foundation changes made in Sprint 1. It does not approve a full visual redesign.

## Repository structure

- [ ] `assets/css/main.css` exists.
- [ ] `assets/js/main.js` exists.
- [ ] `assets/img/` exists.
- [ ] `robots.txt` exists.
- [ ] `sitemap.xml` exists.
- [ ] `.nojekyll` exists.
- [ ] `.gitignore` exists.
- [ ] `.editorconfig` exists.
- [ ] `404.html` exists.
- [ ] `docs/sprint-1-foundation.md` exists.

## Pages

- [ ] `/portfolio/` exists.
- [ ] `/blog/` exists.
- [ ] `/en/` exists.
- [ ] `/en/portfolio/` exists.
- [ ] `/en/blog/` exists.

## SEO basics

- [ ] `robots.txt` points to `https://bndstudio.art/sitemap.xml`.
- [ ] `sitemap.xml` includes RU homepage.
- [ ] `sitemap.xml` includes EN homepage.
- [ ] `sitemap.xml` includes portfolio and blog indexes.
- [ ] `sitemap.xml` includes existing portfolio case URLs.
- [ ] RU/EN section pages have canonical links.
- [ ] RU/EN section pages have `hreflang` links.

## Safety checks

- [ ] `index.html` was not visually changed in this foundation step.
- [ ] Existing custom domain remains `bndstudio.art`.
- [ ] Existing portfolio case pages are not manually duplicated or overwritten.
- [ ] Large existing `case-2` file remains handled by `main`, not copied manually into this branch.

## Before merge

- [ ] Compare branch against `main`.
- [ ] Confirm there are no unexpected deletions.
- [ ] Open Pull Request.
- [ ] Run external QA review before merge.
