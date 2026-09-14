import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";

const baseUrl = new URL(process.env.QA_BASE_URL ?? "http://127.0.0.1:3000");
const outputDir = "link-integrity-qa";
const sourceRoutes = ["/", "/studio", "/systems", "/brief", "/route-that-does-not-exist"];
const legacyLabPaths = new Set([
  "/hero-lab",
  "/diagnostics-lab",
  "/capabilities-lab",
  "/brief-lab",
  "/footer-lab",
  "/system-lab",
]);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function normalizePath(url) {
  return `${url.pathname}${url.search}`;
}

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const report = {
  baseUrl: baseUrl.origin,
  sources: [],
  internalTargets: [],
  fragments: [],
  externalLinks: [],
};

try {
  const targetMap = new Map();
  const fragmentMap = new Map();
  const externalMap = new Map();

  for (const route of sourceRoutes) {
    const response = await page.goto(new URL(route, baseUrl).href, {
      waitUntil: "domcontentloaded",
      timeout: 20_000,
    });
    assert(response, `${route}: navigation produced no response`);
    const status = response.status();
    if (route === "/route-that-does-not-exist") {
      assert(status === 404, `${route}: expected 404, got ${status}`);
    } else {
      assert(status === 200, `${route}: expected 200, got ${status}`);
    }

    const hrefs = await page.locator("a[href]").evaluateAll((anchors) =>
      anchors.map((anchor) => ({
        href: anchor.getAttribute("href") ?? "",
        text: (anchor.textContent ?? "").replace(/\s+/g, " ").trim(),
        ariaLabel: anchor.getAttribute("aria-label") ?? "",
      })),
    );

    assert(hrefs.length > 0, `${route}: page exposes no links`);
    report.sources.push({ route, status, linkCount: hrefs.length });

    for (const link of hrefs) {
      const rawHref = link.href.trim();
      assert(rawHref && rawHref !== "#", `${route}: empty/hash-only href on ${link.text || link.ariaLabel || "unnamed link"}`);
      assert(!rawHref.toLowerCase().startsWith("javascript:"), `${route}: javascript: href detected`);

      let resolved;
      try {
        resolved = new URL(rawHref, new URL(route, baseUrl));
      } catch {
        throw new Error(`${route}: invalid href ${JSON.stringify(rawHref)}`);
      }

      if (!["http:", "https:"].includes(resolved.protocol)) {
        continue;
      }

      if (resolved.origin !== baseUrl.origin) {
        const key = resolved.href;
        if (!externalMap.has(key)) {
          externalMap.set(key, { href: resolved.href, sources: [] });
        }
        externalMap.get(key).sources.push(route);
        continue;
      }

      const path = normalizePath(resolved);
      assert(!legacyLabPaths.has(resolved.pathname), `${route}: legacy lab link leaked: ${resolved.pathname}`);
      assert(!resolved.pathname.startsWith("/api/"), `${route}: user-facing link points into API: ${resolved.pathname}`);

      if (!targetMap.has(path)) {
        targetMap.set(path, { path, sources: [] });
      }
      targetMap.get(path).sources.push({ route, text: link.text, ariaLabel: link.ariaLabel });

      if (resolved.hash) {
        const fragmentKey = `${path}${resolved.hash}`;
        if (!fragmentMap.has(fragmentKey)) {
          fragmentMap.set(fragmentKey, {
            path,
            hash: resolved.hash,
            sources: [],
          });
        }
        fragmentMap.get(fragmentKey).sources.push(route);
      }
    }
  }

  for (const target of targetMap.values()) {
    const response = await page.goto(new URL(target.path, baseUrl).href, {
      waitUntil: "domcontentloaded",
      timeout: 20_000,
    });
    assert(response, `${target.path}: no response while validating internal target`);
    const status = response.status();
    assert(status >= 200 && status < 400, `${target.path}: internal link resolves to HTTP ${status}`);
    report.internalTargets.push({ ...target, status });
  }

  for (const fragment of fragmentMap.values()) {
    await page.goto(new URL(fragment.path, baseUrl).href, {
      waitUntil: "domcontentloaded",
      timeout: 20_000,
    });
    const decodedId = decodeURIComponent(fragment.hash.slice(1));
    const exists = await page.evaluate((id) => Boolean(document.getElementById(id)), decodedId);
    assert(exists, `${fragment.path}${fragment.hash}: fragment target #${decodedId} does not exist`);
    report.fragments.push({ ...fragment, id: decodedId, exists });
  }

  report.externalLinks = [...externalMap.values()];

  const routeTargets = new Set(report.internalTargets.map((target) => target.path));
  for (const required of ["/", "/studio", "/systems", "/brief"]) {
    assert(routeTargets.has(required), `route graph: no authored link reaches ${required}`);
  }

  await writeFile(`${outputDir}/report.json`, JSON.stringify(report, null, 2));
  console.log("Link integrity QA passed");
  console.log(`sources=${report.sources.length} internal=${report.internalTargets.length} fragments=${report.fragments.length} external=${report.externalLinks.length}`);
} finally {
  await browser.close();
}
