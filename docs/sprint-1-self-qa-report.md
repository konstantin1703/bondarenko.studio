# Sprint 1 — Self-QA report

Branch: `sprint-1-site-foundation`
Base: `main`

## Verdict

Ready for Pull Request with one important note: the branch is still behind `main` by 6 commits, so PR review must check merge/conflict status before final merge.

## Branch status at self-QA

- Branch status: diverged from `main`.
- Ahead of `main`: 42 commits before this report.
- Behind `main`: 6 commits.
- No unexpected file deletion detected in the branch diff.

## Confirmed changes

### Foundation files

- `.editorconfig` added.
- `.gitignore` added.
- `.nojekyll` added for GitHub Pages.
- `404.html` added.
- `CNAME` added with custom domain `bndstudio.art`.
- `README.md` updated for studio positioning.
- `.github/pull_request_template.md` added.

### Assets

- `assets/css/main.css` added and contains extracted homepage CSS.
- `assets/js/main.js` added and contains extracted homepage JavaScript.
- `assets/img/.gitkeep` added.

### Pages and structure

- `portfolio/index.html` added.
- `blog/index.html` added.
- `en/index.html` added.
- `en/portfolio/index.html` added.
- `en/blog/index.html` added.

### Homepage refactor

- Inline CSS was moved from `index.html` to `assets/css/main.css`.
- Inline JS was moved from `index.html` to `assets/js/main.js`.
- `index.html` now links external CSS and JS.
- Homepage SEO was updated:
  - title;
  - description;
  - canonical;
  - hreflang `ru` / `en` / `x-default`.
- RU homepage now has an `EN` language switcher linking to `/en/`.

### Form and modal

- Modal markup remains in `index.html`.
- Modal behavior remains in `assets/js/main.js`.
- Form endpoint remains `https://leads-inbox.byxapckuu.workers.dev/api/lead`.
- Honeypot field `company` remains present.
- Hidden field `client_ts` remains present.
- Submit button disables during request.
- Form success handling was fixed to accept both `data.ok` and `data.success`.

### SEO service files

- `robots.txt` allows crawling and points to `https://bndstudio.art/sitemap.xml`.
- `sitemap.xml` includes:
  - `/`
  - `/en/`
  - `/portfolio/`
  - `/en/portfolio/`
  - `/portfolio/case-1-studio.html`
  - `/portfolio/case-2-landing-text.html`
  - `/blog/`
  - `/en/blog/`

## Known limitations

- Browser-level QA is still required after preview/PR:
  - theme toggle;
  - FAQ accordion;
  - modal open/close;
  - Escape close;
  - overlay click close;
  - invalid form validation;
  - successful lead form submit.
- The branch still references `portfolio/case-2-landing-text.html`, which exists in `main`; the large file was not manually copied into this branch.
- Full visual redesign, full EN homepage, real blog pages and full portfolio buildout are outside this Sprint 1 foundation scope.

## Recommended next step

Open Pull Request from `sprint-1-site-foundation` into `main`, then run external QA review using `docs/claude-sprint-1-review-prompt.md`.
