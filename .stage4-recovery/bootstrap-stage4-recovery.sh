#!/usr/bin/env bash
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel)"
ARCHIVE_URL="https://raw.githubusercontent.com/konstantin1703/anna-copywriter-landing/main/BND_STAGE_4_FOUNDATION.zip"
ARCHIVE_SHA256="5139df17e259e1e9c2cea98c16655edbaf907efe4dd2c27e2599a72f1cd94e31"
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

cd "$ROOT"
mkdir -p docs/legacy

# Preserve root files whose purpose changes when the Next.js foundation becomes active.
[[ -f package.json ]] && cp package.json docs/legacy/package.static-site.json
[[ -f package-lock.json ]] && cp package-lock.json docs/legacy/package-lock.static-site.json
[[ -f README.md ]] && cp README.md docs/legacy/README.static-site.md
[[ -f .gitignore ]] && cp .gitignore docs/legacy/gitignore.static-site.txt

curl --fail --location --retry 4 --retry-delay 3 \
  "$ARCHIVE_URL" \
  --output "$TMP_DIR/BND_STAGE_4_FOUNDATION.zip"

echo "$ARCHIVE_SHA256  $TMP_DIR/BND_STAGE_4_FOUNDATION.zip" | sha256sum --check --status
unzip -q "$TMP_DIR/BND_STAGE_4_FOUNDATION.zip" -d "$TMP_DIR/extracted"
SOURCE="$TMP_DIR/extracted/bnd-studio"
[[ -d "$SOURCE/src" ]] || { echo "Stage 4 archive structure is invalid" >&2; exit 1; }

# Overlay the foundation without deleting the existing static website.
rsync -a \
  --exclude 'node_modules/' \
  --exclude '.next/' \
  --exclude 'package-lock.json' \
  "$SOURCE/" "$ROOT/"

# Previous blocked-run logs are historical and must not be mistaken for recovery evidence.
rm -rf docs/logs
mkdir -p docs/logs tests/visual/actual tests/visual/overlays tests/visual/diffs
: > docs/logs/.gitkeep

cat > package.json <<'JSON'
{
  "name": "bondarenko-studio",
  "version": "0.4.0",
  "private": true,
  "description": "BND.STUDIO Next.js Stage 4 foundation integrated alongside the existing static site sources.",
  "engines": { "node": ">=20.9.0" },
  "packageManager": "npm@10.9.2",
  "scripts": {
    "predev": "npm run tokens:build",
    "dev": "next dev",
    "prebuild": "npm run tokens:build",
    "build": "next build",
    "start": "next start",
    "lint": "eslint src scripts playwright.config.ts vitest.config.ts next.config.ts eslint.config.mjs",
    "typecheck": "tsc --noEmit",
    "tokens:build": "node scripts/generate-tokens.mjs",
    "source:check": "node scripts/source-foundation-check.mjs",
    "test": "vitest run",
    "test:e2e": "playwright test src/tests/e2e",
    "test:visual": "playwright test src/tests/visual",
    "visual:overlay": "node scripts/create-visual-overlay.mjs",
    "legacy:format": "prettier --write \"**/*.{html,css,js,md,json,yml,yaml}\"",
    "legacy:format:check": "prettier --check \"**/*.{html,css,js,md,json,yml,yaml}\"",
    "legacy:lint:js": "eslint \"assets/js/**/*.js\"",
    "legacy:lint:css": "stylelint \"assets/css/**/*.css\"",
    "legacy:validate:html": "html-validate \"**/*.html\"",
    "check:core": "npm run lint && npm run typecheck && npm run legacy:lint:js && npm run legacy:lint:css",
    "check:html": "npm run legacy:validate:html",
    "check": "npm run source:check && npm run check:core && npm run check:html"
  },
  "dependencies": {
    "next": "16.2.11",
    "react": "19.2.8",
    "react-dom": "19.2.8"
  },
  "devDependencies": {
    "@eslint/js": "^9.9.0",
    "@playwright/test": "1.61.1",
    "@types/node": "26.1.1",
    "@types/react": "19.2.17",
    "@types/react-dom": "19.2.3",
    "eslint": "10.7.0",
    "eslint-config-next": "16.2.10",
    "globals": "^15.9.0",
    "html-validate": "^8.21.0",
    "prettier": "^3.3.3",
    "sass": "1.101.3",
    "sharp": "0.34.1",
    "stylelint": "^16.8.2",
    "stylelint-config-standard": "^36.0.1",
    "typescript": "7.0.2",
    "vitest": "4.1.10"
  }
}
JSON

cat > playwright.config.ts <<'TS'
import { defineConfig, devices } from '@playwright/test';

const systemChromiumPath = process.env.BND_SYSTEM_CHROMIUM_PATH?.trim();

export default defineConfig({
  testDir: './src/tests',
  timeout: 45_000,
  expect: { timeout: 8_000 },
  fullyParallel: false,
  workers: 1,
  reporter: [['list']],
  outputDir: 'test-results',
  use: {
    baseURL: 'http://127.0.0.1:3000',
    colorScheme: 'dark',
    locale: 'ru-RU',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [{
    name: 'chromium',
    use: {
      ...devices['Desktop Chrome'],
      browserName: 'chromium',
      launchOptions: systemChromiumPath ? { executablePath: systemChromiumPath } : undefined,
    },
  }],
  webServer: {
    command: 'npm run dev -- --hostname 127.0.0.1',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
TS

cat > .gitignore <<'EOF_IGNORE'
node_modules/
.next/
out/
dist/
build/
coverage/
.nyc_output/
.cache/
playwright-report/
test-results/
blob-report/
playwright/.cache/
.ms-playwright/
.env
.env.*
!.env.example
.dev.vars
.dev.vars.*
wrangler.toml
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.DS_Store
Thumbs.db
.vscode/
.idea/
*.swp
*.swo
*.tsbuildinfo
next-env.d.ts.tmp
EOF_IGNORE

cat > .env.example <<'EOF_ENV'
# Optional local browser override. Leave empty for Playwright-managed Chromium.
BND_SYSTEM_CHROMIUM_PATH=

# Stage 4 has no backend, database or notification secrets.
EOF_ENV

cat > README.md <<'EOF_README'
# BND.STUDIO — Stage 4 Foundation Recovery

Next.js foundation for the new BND.STUDIO platform interface, integrated without deleting the repository's legacy static HTML/CSS/JavaScript site.

This branch is Stage 4 recovery only. It does not contain Stage 5, the final Blender Core, WebGL, GSAP, Supabase, Telegram or a production backend.

## Install and run

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:3000`.

## Required validation

```bash
npm run tokens:build
npm run source:check
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
npm run test:visual
```

Optional system browser override:

```bash
BND_SYSTEM_CHROMIUM_PATH=/path/to/chromium npm run test:e2e
```

The Playwright config has no hard-coded Linux path.

## Repository integration

The existing `index.html`, `assets/`, internal pages, worker and historical documentation remain available for later migration. Conflicting root files from the static project are preserved in `docs/legacy/` before the Next.js foundation replaces their active role.

## Current limits

- Hero Core remains a replaceable placeholder/media contract.
- Central panels are honest static fixture states.
- Configurator is a layout foundation, not the full state machine.
- External services are disabled.
- Project cases and metrics are not invented.
EOF_README

cat > docs/BND_STAGE_4_REPOSITORY_INTEGRATION.md <<'EOF_DOC'
# Stage 4 repository integration

- Target repository: `konstantin1703/bondarenko.studio`.
- Target branch: `stage4-foundation-recovery`.
- Existing static site files are retained in place.
- Root conflicts (`package.json`, lock file, README and gitignore) are preserved under `docs/legacy/` before replacement.
- The Stage 4 source archive is downloaded from `konstantin1703/anna-copywriter-landing` and verified against SHA-256 `5139df17e259e1e9c2cea98c16655edbaf907efe4dd2c27e2599a72f1cd94e31`.
- Git blob verification performed before recovery: `5f7d00ade9be433a756b164761dab6af062af7e9` matches the local Stage 4 archive.
- No legacy HTML/CSS/JS pages are deleted.
- No secrets or production environment values are introduced.
EOF_DOC

cat > src/tests/e2e/browser-qa.spec.ts <<'TS_TEST'
import { expect, test } from '@playwright/test';

test('header and Hero remain usable at 200% browser zoom', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.evaluate(() => { document.documentElement.style.zoom = '2'; });
  await expect(page.getByRole('banner')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test('OctagonalCore scales without raster image elements', async ({ page }) => {
  await page.goto('/fixtures/octagonal-core');
  const core = page.locator('[data-visual-id="octagonal-core"]').first();
  await expect(core).toBeVisible();
  await expect(core.locator('image')).toHaveCount(0);
  const box = await core.boundingBox();
  expect(box?.width ?? 0).toBeGreaterThan(100);
  expect(box?.height ?? 0).toBeGreaterThan(90);
});
TS_TEST

npm run tokens:build
npm run source:check
