# BND.STUDIO — Stage 4 Toolchain

Checked on 23 July 2026 using Context7, official Next.js documentation, Playwright documentation, and npm package registry pages.

| Package/tool | Selected version | Source checked | Why selected | Notes |
|---|---:|---|---|---|
| Node.js | 22.16.0 environment | local runtime + Next.js requirements | Satisfies Next.js minimum Node 20.9 | Project engines remains >=20.9 |
| npm | 10.9.2 environment | local runtime | Required package manager | package-lock is required but could not be generated because the registry returned HTTP 503 |
| Next.js | 16.2.11 | npm registry + Next.js App Router installation docs | Current stable latest tag | App Router, Turbopack default |
| React | 19.2.8 | npm registry | Current stable latest tag | Paired with react-dom |
| React DOM | 19.2.8 | npm registry | Current stable latest tag | Version-aligned with React |
| TypeScript | 7.0.2 | npm registry | Current stable latest tag | Strict setup; compatibility validated by typecheck/build |
| Sass | 1.101.3 | npm registry | Current stable Dart Sass | Enables `.module.scss` without custom loader |
| ESLint | 10.7.0 | npm registry + Next.js ESLint docs | Current stable ESLint | Run `eslint .`; `next lint` removed in Next 16 |
| eslint-config-next | 16.2.10 | npm registry + Next.js ESLint docs | Latest available stable config at check time | One patch behind Next; validated by lint |
| Playwright Test | 1.61.1 | npm registry + Playwright docs | Current stable latest | Uses system Chromium path in this environment |
| Vitest | 4.1.10 | npm registry | Current stable latest | Lightweight node-based unit tests |
| Sharp | 0.34.1 | environment-compatible stable package | Overlay/diff generation | Does not overwrite reference images |

## Current setup notes

- App Router with `src/`, TypeScript, alias `@/*` and SCSS Modules.
- ESLint uses flat `eslint.config.mjs`; `next build` does not run lint automatically in Next 16.
- Fonts are not downloaded during Stage 4. CSS roles use the preliminary names Oswald, Manrope and IBM Plex Mono with safe fallbacks because the execution environment cannot guarantee font downloads.
- Playwright `webServer` launches the local app and uses `/usr/bin/chromium` to avoid downloading browser binaries into the archive.


## Validation status in this run

Package selection was researched, but dependency compatibility could not be validated locally because the configured package registry returned HTTP 503. The selected versions must be confirmed by a successful `npm install`, lint, typecheck and build before Stage 4 is accepted.
