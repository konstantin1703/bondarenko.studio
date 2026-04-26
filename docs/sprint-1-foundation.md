# Sprint 1 — Project foundation

Branch: `sprint-1-site-foundation`

Goal: prepare the technical foundation for Bondarenko.studio without changing the current visual homepage.

## Completed foundation steps

- Created `assets/css/main.css` as the future shared stylesheet.
- Created `assets/js/main.js` as the future shared JavaScript file.
- Created `assets/img/` for future images and visual assets.
- Added `robots.txt`.
- Added `sitemap.xml`.
- Synced `CNAME` with the custom domain: `bndstudio.art`.
- Added base English homepage: `en/index.html`.
- Added Russian section index pages:
  - `portfolio/index.html`
  - `blog/index.html`
- Added English section index pages:
  - `en/portfolio/index.html`
  - `en/blog/index.html`
- Added language `hreflang` links on section index pages.
- Added the second portfolio case link to `portfolio/index.html`.
- Added the second portfolio case URL to `sitemap.xml`.
- Added `.gitignore`.
- Added `.editorconfig`.
- Added `.nojekyll` for GitHub Pages.
- Added `404.html`.
- Updated `README.md` to reflect the digital studio positioning.

## Not done yet

- CSS has not yet been moved out of `index.html`.
- JavaScript has not yet been moved out of `index.html`.
- Main homepage copy has not yet been rewritten.
- Mobile burger navigation has not yet been added.
- Full English homepage has not yet been built.
- Portfolio and blog content pages have not yet been created in full.
- The large existing file `portfolio/case-2-landing-text.html` remains in `main`; this sprint branch references it but does not duplicate it manually.

## Work rule

Do not push directly to `main`. Continue through PR review before merge.
