import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const failures = [];
const checks = [];

function check(name, condition, detail = '') {
  checks.push({ name, passed: Boolean(condition), detail });
  if (!condition) failures.push(`${name}${detail ? `: ${detail}` : ''}`);
}

function read(relativePath) {
  const full = path.join(root, relativePath);
  check(`file:${relativePath}`, fs.existsSync(full), fs.existsSync(full) ? 'present' : 'missing');
  return fs.existsSync(full) ? fs.readFileSync(full, 'utf8') : '';
}

const requiredFiles = [
  'package.json',
  'src/app/layout.tsx',
  'src/app/page.tsx',
  'src/components/layout/SiteFrame/index.tsx',
  'src/components/layout/Header/index.tsx',
  'src/components/layout/SectionFrame/index.tsx',
  'src/components/hud/CutCornerPanel/index.tsx',
  'src/components/hud/NestedFrame/index.tsx',
  'src/components/hud/HudPanel/index.tsx',
  'src/components/hud/MicroLabel/index.tsx',
  'src/components/hud/StatusConsole/index.tsx',
  'src/components/graphics/ConnectorLine/index.tsx',
  'src/components/hero/HeroFoundation/index.tsx',
  'src/components/central-panels/CentralPanelsFoundation/index.tsx',
  'src/components/problem-explorer/ProblemExplorerFoundation/index.tsx',
  'src/components/problem-explorer/ScenarioCard/index.tsx',
  'src/components/problem-explorer/SystemCore/index.tsx',
  'src/components/problem-explorer/SystemModuleShell/index.tsx',
  'src/components/product-assembler/ProductAssemblerFoundation/index.tsx',
  'src/components/product-assembler/ProductDirectionCard/index.tsx',
  'src/components/product-assembler/OctagonalCore/index.tsx',
  'src/domain/central-panels/types.ts',
  'src/data/central-panels-interactions.ts',
  'src/lib/central-panels/problem-resolver.ts',
  'src/lib/central-panels/product-resolver.ts',
  'src/components/configurator/ConfiguratorFoundation/index.tsx',
  'src/components/configurator/ConfiguratorProgress/index.tsx',
  'src/components/configurator/SelectableOptionCard/index.tsx',
  'src/components/architecture-preview/ArchitecturePreviewFoundation/index.tsx',
  'src/components/architecture-preview/ArchitectureNode/index.tsx',
  'src/data/configurator-fixtures.ts',
  'src/styles/foundations/_tokens.generated.scss',
  'playwright.config.ts',
  '.env.example',
];
for (const file of requiredFiles) read(file);

const pageSource = read('src/app/page.tsx');
for (const component of [
  'HeroFoundation', 'CentralPanelsFoundation', 'ConfiguratorFoundation',
  'ProjectsFoundation', 'WorkflowFoundation', 'TechnologiesFoundation',
  'ContactFoundation', 'TechFooter',
]) check(`section-component:${component}`, pageSource.includes(`<${component}`));

const centralPanelsSource = read('src/components/central-panels/CentralPanelsFoundation/index.tsx');
check('central-panels:problem-explorer', centralPanelsSource.includes('<ProblemExplorerFoundation'));
check('central-panels:product-assembler', centralPanelsSource.includes('<ProductAssemblerFoundation'));
check('central-panels:stage-8-fixture', centralPanelsSource.includes('data-fixture-version="stage-8"'));
check('central-panels:interactive-state', centralPanelsSource.includes('data-fixture-state="interactive"'));

const navigationSource = read('src/data/navigation.ts');
for (const anchor of ['#home', '#projects', '#contacts']) {
  check(`navigation-anchor:${anchor}`, navigationSource.includes(`'${anchor}'`));
}

const coreSource = read('src/components/product-assembler/OctagonalCore/index.tsx');
for (const group of [
  'core-outer-silhouette', 'core-segmented-contour', 'core-corner-brackets',
  'core-secondary-frame', 'core-glass-shell', 'core-inner-segments',
  'core-central-panel', 'core-internal-nodes', 'core-labels', 'core-route-anchors',
]) check(`octagonal-core-group:${group}`, coreSource.includes(`id="${group}"`));
check('octagonal-core:no-raster-image', !/<image\b/i.test(coreSource));
check('octagonal-core:viewBox', coreSource.includes('viewBox="0 0 224 200"'));
check('octagonal-core:active-layers-prop', coreSource.includes('activeLayers?: readonly CoreLayerId[]'));
check('octagonal-core:primary-layer-prop', coreSource.includes('primaryLayer?: CoreLayerId'));
check('octagonal-core:prop-driven', coreSource.includes("data-primary': primaryLayer === layer"));

const problemSource = read('src/components/problem-explorer/ProblemExplorerFoundation/index.tsx');
const scenarioCardSource = read('src/components/problem-explorer/ScenarioCard/index.tsx');
const moduleSource = read('src/components/problem-explorer/SystemModuleShell/index.tsx');
const systemCoreSource = read('src/components/problem-explorer/SystemCore/index.tsx');
const productSource = read('src/components/product-assembler/ProductAssemblerFoundation/index.tsx');
const productCardSource = read('src/components/product-assembler/ProductDirectionCard/index.tsx');
const fixtureData = read('src/data/foundation-fixtures.ts');
const interactionData = read('src/data/central-panels-interactions.ts');
const interactionTypes = read('src/domain/central-panels/types.ts');
const problemResolver = read('src/lib/central-panels/problem-resolver.ts');
const productResolver = read('src/lib/central-panels/product-resolver.ts');
const centralInteractionSources = [
  problemSource, scenarioCardSource, moduleSource, systemCoreSource,
  productSource, productCardSource, coreSource, interactionData,
  interactionTypes, problemResolver, productResolver,
].join('\n');

check('problem-explorer:client-shell', problemSource.includes("'use client'"));
check('problem-explorer:local-state', problemSource.includes('useState<ProblemScenarioId>'));
check('problem-explorer:six-controls-source', (interactionData.match(/id: '(?:manual-automation|telegram-product|web-service|api-integration|ai-process|internal-crm)'/g) ?? []).length === 6);
check('problem-explorer:scenario-buttons', scenarioCardSource.includes('<button') && scenarioCardSource.includes('aria-pressed={selected}'));
check('problem-explorer:system-core', problemSource.includes('<SystemCore'));
check('problem-explorer:six-modules', problemResolver.includes("id: 'result'"));
check('problem-explorer:module-emphasis', moduleSource.includes("data-state={emphasis}"));
check('problem-explorer:dynamic-process', problemSource.includes('viewModel.processSteps.map'));
check('problem-explorer:live-region', problemSource.includes('aria-live="polite"'));
check('problem-explorer:resolver-pure', !/useState|useEffect|document\.|window\.|fetch\s*\(/.test(problemResolver));
check('problem-explorer:fallback', problemResolver.includes('DEFAULT_PROBLEM_SCENARIO_ID'));

check('product-assembler:client-shell', productSource.includes("'use client'"));
check('product-assembler:local-state', productSource.includes('useState<ProductDirectionId>'));
check('product-assembler:four-controls-source', (interactionData.match(/id: '(?:ai-web|telegram|api-automation|crm-internal)'/g) ?? []).length === 4);
check('product-assembler:direction-buttons', productCardSource.includes('<button') && productCardSource.includes('aria-pressed={selected}'));
check('product-assembler:dynamic-core', productSource.includes('activeLayers={viewModel.activeLayers}'));
check('product-assembler:dynamic-stack', productSource.includes('viewModel.stack.map'));
check('product-assembler:dynamic-capabilities', productSource.includes('viewModel.capabilityLabels.map'));
check('product-assembler:workflow', productSource.includes('workflowStages.map'));
check('product-assembler:live-region', productSource.includes('aria-live="polite"'));
check('product-assembler:resolver-pure', !/useState|useEffect|document\.|window\.|fetch\s*\(/.test(productResolver));
check('product-assembler:fallback', productResolver.includes('DEFAULT_PRODUCT_DIRECTION_ID'));

check('central-interactions:no-global-state', !/zustand|redux|createContext\s*\(/i.test(centralInteractionSources));
check('central-interactions:no-persistence', !/localStorage|sessionStorage|URLSearchParams/i.test(centralInteractionSources));
check('central-interactions:no-network', !/fetch\s*\(|axios|XMLHttpRequest|WebSocket/i.test(centralInteractionSources));
check('central-interactions:no-server-actions', !/["']use server["']/.test(centralInteractionSources));
check('central-interactions:no-hash-links', !/href=["']#["']/.test(centralInteractionSources));
check('central-interactions:no-raster', !/<(?:img|image|canvas)\b/i.test(centralInteractionSources));

const configuratorSource = read('src/components/configurator/ConfiguratorFoundation/index.tsx');
const progressSource = read('src/components/configurator/ConfiguratorProgress/index.tsx');
const optionSource = read('src/components/configurator/SelectableOptionCard/index.tsx');
const previewSource = read('src/components/architecture-preview/ArchitecturePreviewFoundation/index.tsx');
const configuratorData = read('src/data/configurator-fixtures.ts');
check('configurator:stage-7-fixture', configuratorSource.includes('data-fixture-version="stage-7"'));
check('configurator:semantic-h2', configuratorSource.includes('<h2 id="configurator-title">'));
check('configurator:five-progress-steps', (configuratorData.match(/state: '(?:active|upcoming)'/g) ?? []).length === 5);
check('configurator:one-active-progress-step', (configuratorData.match(/state: 'active'/g) ?? []).length === 1);
check('configurator:six-scenarios-source', fixtureData.includes("['06', 'Собрать внутренний инструмент / CRM'"));
check('configurator:one-selected-fixture', configuratorData.includes('selected: index === 0'));
check('configurator:static-options', configuratorSource.includes('configuratorScenarios.map'));
check('configurator:no-form', !/<form\b/i.test(configuratorSource));
check('configurator:no-inputs', !/<(?:input|select|textarea)\b/i.test(`${configuratorSource}\n${optionSource}`));
check('configurator:disabled-back', /className=\{styles\.back\} disabled/.test(configuratorSource));
check('configurator:disabled-next', /className=\{styles\.next\} disabled/.test(configuratorSource));
check('configurator:semantic-progress', progressSource.includes('<ol>') && progressSource.includes("aria-current={step.state === 'active' ? 'step'"));
check('configurator:architecture-preview', configuratorSource.includes('<ArchitecturePreviewFoundation'));
check('configurator:five-architecture-nodes', (configuratorData.match(/position: '(?:source|ai|data|integration|output)'/g) ?? []).length === 5);
check('configurator:no-raster-preview', !/<(?:img|image|canvas)\b/i.test(previewSource));
check('configurator:no-submit', !/type="submit"|onSubmit|requestSubmit/i.test(configuratorSource));
check('configurator:no-client-persistence', !/localStorage|sessionStorage|URLSearchParams/i.test(`${configuratorSource}\n${progressSource}\n${optionSource}\n${previewSource}`));
check('configurator:no-client-network', !/fetch\s*\(|axios|XMLHttpRequest|WebSocket/i.test(`${configuratorSource}\n${progressSource}\n${optionSource}\n${previewSource}`));

const generatedTokens = read('src/styles/foundations/_tokens.generated.scss');
const variableCount = (generatedTokens.match(/^  --bnd-/gm) ?? []).length;
check('tokens:more-than-200-variables', variableCount > 200, String(variableCount));
for (const token of [
  '--bnd-color-background-primary:', '--bnd-color-surface-panel-default:',
  '--bnd-space-4:', '--bnd-border-width-standard:', '--bnd-corner-cut-md:',
  '--bnd-motion-duration-standard:', '--bnd-typography-display-xl-desktop:',
]) check(`token:${token}`, generatedTokens.includes(token));

const packageJson = JSON.parse(read('package.json'));
for (const script of ['dev', 'build', 'start', 'lint', 'typecheck', 'tokens:build', 'test', 'test:e2e', 'test:visual', 'visual:overlay']) {
  check(`script:${script}`, Boolean(packageJson.scripts?.[script]));
}
const packageText = JSON.stringify(packageJson).toLowerCase();
for (const forbidden of ['three', '@react-three/fiber', 'gsap', 'zustand', 'redux', '@supabase/supabase-js']) {
  check(`forbidden-dependency:${forbidden}`, !packageText.includes(`"${forbidden}"`));
}

const allSource = [];
function walk(directory) {
  if (!fs.existsSync(directory)) return;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(ts|tsx|mjs)$/.test(entry.name)) allSource.push(fs.readFileSync(full, 'utf8'));
  }
}
walk(path.join(root, 'src'));
const joined = allSource.join('\n');
check('source:no-client-server-import', !joined.includes('@/lib/server/'));
check('source:no-positive-tabindex', !/tabIndex\s*=\s*\{?[1-9]/.test(joined));
check('source:has-skip-link', joined.includes('Перейти к основному содержанию'));
check('source:lang-ru', read('src/app/layout.tsx').includes('lang="ru"'));
const heroSource = read('src/components/hero/HeroFoundation/index.tsx');
const heroCopySource = read('src/components/hero/HeroCopy/index.tsx');
check('home:single-h1-in-hero', (heroCopySource.match(/<h1\b/g) ?? []).length === 1, String((heroCopySource.match(/<h1\b/g) ?? []).length));
check('hero:stage-5-1-fixture', heroSource.includes('data-fixture-version="stage-5-1"'));
check('hero:media-contract', heroSource.includes('data-hero-media-contract="static-placeholder"'));
check('hero:hud-layer', heroSource.includes('<HeroHudLayer'));
const privacySource = read('src/app/privacy/page.tsx');
check('privacy:single-h1', (privacySource.match(/<h1\b/g) ?? []).length === 1, String((privacySource.match(/<h1\b/g) ?? []).length));
check('source:no-interactive-div', !/<div[^>]+onClick=/i.test(joined));
check('fixtures:hero', joined.includes('data-visual-id="hero"'));
check('fixtures:central-panels', centralPanelsSource.includes('data-visual-id="central-panels"'));
check('fixtures:configurator', configuratorSource.includes('data-visual-id="configurator"'));
check('fixtures:stage-4', joined.includes('data-fixture-version="stage-4"'));

const envExample = read('.env.example');
check('security:no-env-local', !fs.existsSync(path.join(root, '.env.local')));
check('security:env-example-no-values', envExample.split('\n').filter((line) => /^[A-Z0-9_]+=/.test(line)).every((line) => line.endsWith('=')));
check('security:no-supabase-key', !/SUPABASE_(?:SERVICE_ROLE|ANON)_KEY\s*=\s*[^\s'"`]+/i.test(joined));
check('security:no-telegram-token', !/\b\d{8,12}:[A-Za-z0-9_-]{30,}\b/.test(joined));
check('security:no-openai-key', !/\bsk-[A-Za-z0-9_-]{20,}\b/.test(joined));
check('security:no-webhook-secret', !/WEBHOOK_SECRET\s*=\s*[^\s'"`]+/i.test(joined));
check('security:no-use-server', !/["']use server["']/.test(joined));

const report = { passed: failures.length === 0, checks: checks.length, failures, variableCount };
console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exit(1);
