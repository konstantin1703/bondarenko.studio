import { test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const actualDir = path.resolve(process.cwd(), 'tests/visual/actual');
const validationDir = path.resolve(process.cwd(), 'stage11a-validation');

async function freeze(page: import('@playwright/test').Page) {
  await page.addStyleTag({
    content: '*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}.skip-link{display:none!important}',
  });
  await page.evaluate(() => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  });
}

async function prepare(
  page: import('@playwright/test').Page,
  width: number,
  height: number,
  selector?: string,
) {
  await page.setViewportSize({ width, height });
  await page.goto('/', { waitUntil: 'networkidle' });
  await freeze(page);
  if (selector) {
    await page.locator(selector).scrollIntoViewIfNeeded();
    await page.waitForTimeout(80);
  }
}

async function captureViewport(
  page: import('@playwright/test').Page,
  selector: string | undefined,
  width: number,
  height: number,
  fileName: string,
) {
  await prepare(page, width, height, selector);
  await page.screenshot({ path: path.join(actualDir, fileName), animations: 'disabled' });
}

async function captureElement(
  page: import('@playwright/test').Page,
  selector: string,
  width: number,
  fileName: string,
) {
  await prepare(page, width, 1200, selector);
  await page.locator(selector).screenshot({ path: path.join(actualDir, fileName), animations: 'disabled' });
}

async function sectionHeight(page: import('@playwright/test').Page, selector: string) {
  return Math.round(await page.locator(selector).evaluate((element) => element.getBoundingClientRect().height));
}

test.beforeAll(() => {
  fs.mkdirSync(actualDir, { recursive: true });
  fs.mkdirSync(validationDir, { recursive: true });
});

test('capture Stage 11A normative references and responsive states', async ({ page }) => {
  await captureViewport(page, undefined, 1630, 965, 'stage11a-hero-1630x965.png');
  await captureViewport(page, undefined, 390, 844, 'stage11a-hero-mobile-390x844.png');
  await captureViewport(page, '[data-visual-id="central-panels"]', 1536, 1024, 'stage11a-central-panels-1536x1024.png');
  await captureViewport(page, '[data-visual-id="central-panels"]', 390, 1800, 'stage11a-central-panels-mobile-390x1800.png');
  await captureViewport(page, '#configurator', 1672, 941, 'stage11a-configurator-1672x941.png');

  await prepare(page, 390, 1000, '#configurator');
  const mobileConfiguratorHeight = await sectionHeight(page, '#configurator');
  await page.locator('#configurator').screenshot({
    path: path.join(actualDir, `stage11a-configurator-mobile-390x${mobileConfiguratorHeight}.png`),
    animations: 'disabled',
  });
});

test('capture Stage 11A lower sections and full page', async ({ page }) => {
  await captureElement(page, '#projects', 1536, 'stage11a-projects-1536.png');
  await captureElement(page, '#workflow', 1536, 'stage11a-workflow-1536.png');
  await captureElement(page, '#technologies', 1536, 'stage11a-technologies-1536.png');
  await captureViewport(page, '#contacts', 1536, 900, 'stage11a-contact-footer-1536.png');

  await prepare(page, 1440, 1000);
  await page.screenshot({ path: path.join(actualDir, 'stage11a-full-page-1440.png'), fullPage: true, animations: 'disabled' });
  await prepare(page, 390, 1000);
  await page.screenshot({ path: path.join(actualDir, 'stage11a-full-page-390.png'), fullPage: true, animations: 'disabled' });
});

test('capture Stage 11A section sources for contact sheets', async ({ page }) => {
  const zones = [
    ['[data-visual-id="hero"]', 'hero'],
    ['#change', 'problem-explorer'],
    ['#products', 'product-assembler'],
    ['#configurator', 'configurator'],
    ['#projects', 'projects'],
    ['#workflow', 'workflow'],
    ['#technologies', 'technologies'],
    ['#contacts', 'contact'],
    ['#footer', 'footer'],
  ] as const;

  for (const [selector, slug] of zones) {
    await captureElement(page, selector, 1440, `stage11a-zone-${slug}.png`);
    await captureElement(page, selector, 390, `stage11a-zone-mobile-${slug}.png`);
  }
});

test('measure Stage 11A full-page hierarchy', async ({ page }) => {
  const sections = [
    ['Hero', '#home'],
    ['Problem Explorer', '#change'],
    ['Product Assembler', '#products'],
    ['Configurator', '#configurator'],
    ['Projects', '#projects'],
    ['Workflow', '#workflow'],
    ['Technologies', '#technologies'],
    ['Contact', '#contacts'],
    ['Footer', '#footer'],
  ] as const;

  async function collect(width: number) {
    await prepare(page, width, 1000);
    const heights: Record<string, number> = {};
    for (const [label, selector] of sections) heights[label] = await sectionHeight(page, selector);
    heights['Full page'] = await page.evaluate(() => document.documentElement.scrollHeight);
    const horizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    return { heights, horizontalOverflow };
  }

  const desktopState = await collect(1440);
  const mobileState = await collect(390);
  await prepare(page, 1536, 1024, '#change');

  const hierarchy = await page.evaluate(() => {
    const rect = (selector: string) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const box = element.getBoundingClientRect();
      return { x: Math.round(box.x), y: Math.round(box.y), width: Math.round(box.width), height: Math.round(box.height) };
    };
    const routeHost = document.querySelector('#change [data-route-profile] > svg');
    const groups = routeHost ? Array.from(routeHost.querySelectorAll(':scope > g')) : [];
    const routeHierarchy = groups.slice(0, 4).map((group, index) => {
      const style = getComputedStyle(group);
      return {
        tier: ['background', 'structural', 'active', 'nodes'][index],
        opacity: style.opacity,
        stroke: style.stroke,
        strokeWidth: style.strokeWidth,
      };
    });
    return {
      h1: rect('#home h1'),
      problemCore: rect('#change [data-problem-core]'),
      productCore: rect('#products [data-visual-id="octagonal-core"]'),
      contactFocalPoint: rect('#contacts h3'),
      routeHierarchy,
    };
  });

  const baseline = {
    desktop: {
      Hero: 965,
      'Problem Explorer': 500,
      'Product Assembler': 514,
      Configurator: 941,
      Projects: 700,
      Workflow: 700,
      Technologies: 720,
      Contact: 763,
      Footer: 355,
      'Full page': 6374,
    },
    mobile: {
      Hero: 1385,
      'Problem Explorer': 1909,
      'Product Assembler': 1521,
      Configurator: 3249,
      Projects: 1845,
      Workflow: 1336,
      Technologies: 1764,
      Contact: 1416,
      Footer: 758,
      'Full page': 15365,
    },
  };

  const configuratorReduction = Number(
    (((baseline.mobile.Configurator - mobileState.heights.Configurator) / baseline.mobile.Configurator) * 100).toFixed(1),
  );
  const payload = {
    baseline,
    actual: {
      desktop: desktopState.heights,
      mobile: mobileState.heights,
    },
    horizontalOverflow: {
      desktop: desktopState.horizontalOverflow,
      mobile: mobileState.horizontalOverflow,
    },
    configuratorReductionPercent: configuratorReduction,
    hierarchy,
  };
  fs.writeFileSync(path.join(validationDir, 'measurements.json'), `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
});
