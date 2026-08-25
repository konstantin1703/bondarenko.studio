# Claude QA prompt — Sprint 1 foundation review

Project: `konstantin1703/bondarenko.studio`

Branch to review: `sprint-1-site-foundation`

Base branch: `main`

## Review goal

Perform a narrow QA review of Sprint 1 foundation changes only.

Do not judge the final design direction, homepage rewrite, full portfolio, or blog content. Those are future sprints.

## What changed

The branch prepares technical foundation files and basic RU/EN structure:

- `assets/css/main.css`
- `assets/js/main.js`
- `assets/img/`
- `robots.txt`
- `sitemap.xml`
- `en/index.html`
- `portfolio/index.html`
- `blog/index.html`
- `en/portfolio/index.html`
- `en/blog/index.html`
- `404.html`
- `.gitignore`
- `.editorconfig`
- `.nojekyll`
- documentation files in `docs/`
- updated `README.md`

## Check specifically

1. Are there unexpected deletions or overwritten existing pages?
2. Is `index.html` unchanged visually and structurally unless intentionally changed?
3. Are `robots.txt` and `sitemap.xml` valid enough for GitHub Pages and `bndstudio.art`?
4. Are canonical and hreflang tags reasonable on the new RU/EN foundation pages?
5. Are links obviously broken?
6. Does the branch avoid copying the large `portfolio/case-2-landing-text.html` file manually?
7. Is the PR scope still limited to foundation work?

## Expected answer format

Return:

- Verdict: merge / do not merge yet
- Critical issues
- Non-critical issues
- Suggested fixes before merge
- Suggested fixes for later sprints
