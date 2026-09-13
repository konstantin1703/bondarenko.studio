import { chromium, webkit } from "@playwright/test";
import { mkdir } from "node:fs/promises";

await mkdir("route-choreography-qa", { recursive: true });

const baseUrl = process.env.QA_BASE_URL ?? "http://127.0.0.1:3000";

const routes = [
  { path: "/studio", rootId: "studio-main", label: "studio" },
  { path: "/systems", rootId: "systems-main", label: "systems" },
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function sectionSnapshot(page, rootId, index) {
  return page.evaluate(
    ({ rootId: id, index: sectionIndex }) => {
      const sections = Array.from(document.querySelectorAll(`#${id} main > section`));
      const section = sections[sectionIndex];
      if (!(section instanceof HTMLElement)) return null;
      const children = Array.from(section.children).filter(
        (node) => node instanceof HTMLElement && node.getAttribute("aria-hidden") !== "true",
      );
      return {
        count: sections.length,
        rectTop: section.getBoundingClientRect().top,
        children: children.map((node) => {
          const style = getComputedStyle(node);
          return {
            opacity: Number(style.opacity),
            transform: style.transform,
          };
        }),
      };
    },
    { rootId, index },
  );
}

async function scrollToSection(page, rootId, index) {
  await page.evaluate(
    ({ rootId: id, index: sectionIndex }) => {
      const sections = document.querySelectorAll(`#${id} main > section`);
      sections[sectionIndex]?.scrollIntoView({ behavior: "instant", block: "start" });
    },
    { rootId, index },
  );
}

async function waitForSectionSettled(page, rootId, index) {
  await page.waitForFunction(
    ({ rootId: id, index: sectionIndex }) => {
      const sections = Array.from(document.querySelectorAll(`#${id} main > section`));
      const section = sections[sectionIndex];
      if (!(section instanceof HTMLElement)) return false;
      const children = Array.from(section.children).filter(
        (node) => node instanceof HTMLElement && node.getAttribute("aria-hidden") !== "true",
      );
      return (
        children.length > 0 &&
        children.every((node) => Number(getComputedStyle(node).opacity) >= 0.98)
      );
    },
    { rootId, index },
    { timeout: 3000, polling: 50 },
  );
}

async function assertSectionSettled(page, rootId, routeLabel, index) {
  const snapshot = await sectionSnapshot(page, rootId, index);
  assert(snapshot, `${routeLabel}: missing section ${index}`);
  assert(snapshot.count === 4, `${routeLabel}: expected 4 sections, got ${snapshot.count}`);
  assert(snapshot.children.length > 0, `${routeLabel}: section ${index} has no visible structural children`);
  for (const [childIndex, child] of snapshot.children.entries()) {
    assert(child.opacity >= 0.98, `${routeLabel}: section ${index} child ${childIndex} opacity=${child.opacity}`);
  }
}

async function runDesktop(browserType, browserLabel) {
  const browser = await browserType.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];

  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });

  for (const route of routes) {
    await page.goto(new URL(route.path, baseUrl).toString(), { waitUntil: "networkidle" });
    const rail = page.locator('[data-route-scroll-system="true"]');
    assert((await rail.count()) === 1, `${route.label}/${browserLabel}: route rail missing`);
    assert(await rail.isVisible(), `${route.label}/${browserLabel}: route rail should be visible on desktop`);

    const initialIndex = Number(await rail.getAttribute("data-active-index"));
    assert(initialIndex === 0, `${route.label}/${browserLabel}: initial active index=${initialIndex}`);

    let previousProgress = -1;
    for (let index = 1; index < 4; index += 1) {
      await scrollToSection(page, route.rootId, index);
      await waitForSectionSettled(page, route.rootId, index);
      await assertSectionSettled(page, route.rootId, `${route.label}/${browserLabel}`, index);

      const progress = Number(
        await rail.evaluate((node) => getComputedStyle(node).getPropertyValue("--route-progress").trim()),
      );
      assert(Number.isFinite(progress), `${route.label}/${browserLabel}: progress is not numeric`);
      assert(progress >= previousProgress, `${route.label}/${browserLabel}: route progress regressed`);
      previousProgress = progress;

      if (index === 1 || index === 3) {
        await page.screenshot({
          path: `route-choreography-qa/${route.label}-${index === 1 ? "middle" : "exit"}-${browserLabel}.png`,
          fullPage: false,
        });
      }
    }
  }

  assert(errors.length === 0, `${browserLabel}: ${errors.join("\n")}`);
  await browser.close();
}

async function runMobile() {
  const browser = await webkit.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 430, height: 932 } });
  const errors = [];

  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });

  for (const route of routes) {
    await page.goto(new URL(route.path, baseUrl).toString(), { waitUntil: "networkidle" });
    const rail = page.locator('[data-route-scroll-system="true"]');
    assert((await rail.count()) === 1, `${route.label}/webkit-430: route rail missing`);
    assert(!(await rail.isVisible()), `${route.label}/webkit-430: route rail must stay hidden on mobile`);

    await scrollToSection(page, route.rootId, 1);
    await waitForSectionSettled(page, route.rootId, 1);
    await assertSectionSettled(page, route.rootId, `${route.label}/webkit-430`, 1);
    await page.screenshot({
      path: `route-choreography-qa/${route.label}-middle-webkit-430.png`,
      fullPage: false,
    });
  }

  assert(errors.length === 0, `webkit-430: ${errors.join("\n")}`);
  await browser.close();
}

async function runReducedMotion() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 430, height: 932 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();

  for (const route of routes) {
    await page.goto(new URL(route.path, baseUrl).toString(), { waitUntil: "networkidle" });
    await scrollToSection(page, route.rootId, 1);
    await waitForSectionSettled(page, route.rootId, 1);
    await assertSectionSettled(page, route.rootId, `${route.label}/reduced-motion`, 1);
  }

  await browser.close();
}

await runDesktop(chromium, "chromium");
await runDesktop(webkit, "webkit");
await runMobile();
await runReducedMotion();

console.log("Route choreography QA passed");
