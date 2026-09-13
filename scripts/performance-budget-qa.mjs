import { chromium, webkit } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const baseUrl = process.env.QA_BASE_URL ?? "http://127.0.0.1:3000";
const routes = ["/", "/studio", "/systems", "/brief"];
const budgets = {
  jsEncodedBytes: 8_000_000,
  jsRequests: 40,
  maxJsChunkBytes: 2_500_000,
  maxDesktopDpr: 1.4,
  maxActiveMaterials: 1,
  maxWebglContexts: {
    "/": 2,
    "/studio": 1,
    "/systems": 1,
    "/brief": 1,
  },
};

await mkdir("performance-budget-qa", { recursive: true });

function installContextProbe(page) {
  return page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    const tracked = new WeakSet();
    window.__bndWebglContextCount = 0;

    HTMLCanvasElement.prototype.getContext = function patchedGetContext(type, ...args) {
      const context = original.call(this, type, ...args);
      const kind = String(type).toLowerCase();
      if (
        context &&
        (kind === "webgl" || kind === "webgl2" || kind === "experimental-webgl") &&
        !tracked.has(this)
      ) {
        tracked.add(this);
        window.__bndWebglContextCount += 1;
      }
      return context;
    };
  });
}

async function collectRoute(browser, path, label, { resourceBudget = false, deviceScaleFactor = 1 } = {}) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor,
  });
  const page = await context.newPage();
  const consoleErrors = [];
  const failedRequests = [];

  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));
  page.on("requestfailed", (request) => failedRequests.push(`${request.method()} ${request.url()}`));

  await installContextProbe(page);
  const response = await page.goto(new URL(path, baseUrl).toString(), { waitUntil: "networkidle" });
  if (!response || response.status() !== 200) {
    throw new Error(`${label}${path}: expected 200, got ${response?.status() ?? "no response"}`);
  }
  await page.waitForTimeout(800);

  const snapshot = await page.evaluate(() => {
    const resources = performance.getEntriesByType("resource").map((entry) => ({
      name: entry.name,
      initiatorType: entry.initiatorType,
      encodedBodySize: entry.encodedBodySize || 0,
      transferSize: entry.transferSize || 0,
    }));
    const scripts = resources.filter((entry) => {
      try {
        return entry.initiatorType === "script" || new URL(entry.name).pathname.endsWith(".js");
      } catch {
        return entry.initiatorType === "script";
      }
    });
    const activeMaterials = document.querySelectorAll('[data-render-active="true"]').length;
    const realSurfaces = Array.from(
      document.querySelectorAll('[data-material-surface]:not([data-material-placeholder-state])'),
    );
    const dprRatios = realSurfaces.flatMap((surface) =>
      Array.from(surface.querySelectorAll("canvas")).map((canvas) => {
        const width = canvas.getBoundingClientRect().width;
        return width > 0 ? canvas.width / width : 0;
      }),
    );

    return {
      webglContexts: window.__bndWebglContextCount || 0,
      activeMaterials,
      realMaterialSurfaces: realSurfaces.length,
      maxCanvasDpr: dprRatios.length ? Math.max(...dprRatios) : 0,
      jsRequests: scripts.length,
      jsEncodedBytes: scripts.reduce((sum, entry) => sum + entry.encodedBodySize, 0),
      maxJsChunkBytes: scripts.reduce((max, entry) => Math.max(max, entry.encodedBodySize), 0),
      scripts: scripts
        .map((entry) => ({
          path: (() => {
            try {
              return new URL(entry.name).pathname;
            } catch {
              return entry.name;
            }
          })(),
          encodedBodySize: entry.encodedBodySize,
          transferSize: entry.transferSize,
        }))
        .sort((a, b) => b.encodedBodySize - a.encodedBodySize),
    };
  });

  const allowedContexts = budgets.maxWebglContexts[path];
  if (snapshot.webglContexts > allowedContexts) {
    throw new Error(`${label}${path}: ${snapshot.webglContexts} WebGL contexts exceeds ${allowedContexts}`);
  }
  if (snapshot.activeMaterials > budgets.maxActiveMaterials) {
    throw new Error(`${label}${path}: ${snapshot.activeMaterials} active material surfaces exceeds ${budgets.maxActiveMaterials}`);
  }
  if (deviceScaleFactor > 1 && snapshot.maxCanvasDpr > budgets.maxDesktopDpr + 0.03) {
    throw new Error(`${label}${path}: canvas DPR ${snapshot.maxCanvasDpr.toFixed(2)} exceeds ${budgets.maxDesktopDpr}`);
  }
  if (resourceBudget) {
    if (snapshot.jsRequests > budgets.jsRequests) {
      throw new Error(`${label}${path}: ${snapshot.jsRequests} JS requests exceeds ${budgets.jsRequests}`);
    }
    if (snapshot.jsEncodedBytes > budgets.jsEncodedBytes) {
      throw new Error(`${label}${path}: ${snapshot.jsEncodedBytes} JS bytes exceeds ${budgets.jsEncodedBytes}`);
    }
    if (snapshot.maxJsChunkBytes > budgets.maxJsChunkBytes) {
      throw new Error(`${label}${path}: max JS chunk ${snapshot.maxJsChunkBytes} exceeds ${budgets.maxJsChunkBytes}`);
    }
  }
  if (consoleErrors.length) throw new Error(`${label}${path}: console/page errors: ${consoleErrors.join(" | ")}`);
  if (failedRequests.length) throw new Error(`${label}${path}: failed requests: ${failedRequests.join(" | ")}`);

  await context.close();
  return snapshot;
}

const chromiumBrowser = await chromium.launch({ headless: true });
const desktop = {};
try {
  for (const path of routes) {
    desktop[path] = await collectRoute(chromiumBrowser, path, "chromium-2x", {
      resourceBudget: true,
      deviceScaleFactor: 2,
    });
  }
} finally {
  await chromiumBrowser.close();
}

const webkitBrowser = await webkit.launch({ headless: true });
const mobile = {};
try {
  for (const path of routes) {
    const context = await webkitBrowser.newContext({
      viewport: { width: 430, height: 932 },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();
    await installContextProbe(page);
    const response = await page.goto(new URL(path, baseUrl).toString(), { waitUntil: "networkidle" });
    if (!response || response.status() !== 200) {
      throw new Error(`webkit-mobile${path}: expected 200, got ${response?.status() ?? "no response"}`);
    }
    await page.waitForTimeout(650);
    const snapshot = await page.evaluate(() => ({
      webglContexts: window.__bndWebglContextCount || 0,
      activeMaterials: document.querySelectorAll('[data-render-active="true"]').length,
    }));
    const allowedContexts = budgets.maxWebglContexts[path];
    if (snapshot.webglContexts > allowedContexts) {
      throw new Error(`webkit-mobile${path}: ${snapshot.webglContexts} WebGL contexts exceeds ${allowedContexts}`);
    }
    if (snapshot.activeMaterials > budgets.maxActiveMaterials) {
      throw new Error(`webkit-mobile${path}: ${snapshot.activeMaterials} active material surfaces exceeds ${budgets.maxActiveMaterials}`);
    }
    mobile[path] = snapshot;
    await context.close();
  }
} finally {
  await webkitBrowser.close();
}

const report = {
  generatedAt: new Date().toISOString(),
  baseUrl,
  budgets,
  desktop,
  mobile,
};

await writeFile("performance-budget-qa/report.json", `${JSON.stringify(report, null, 2)}\n`);

console.log("Performance budget report");
for (const path of routes) {
  const metric = desktop[path];
  console.log(
    `${path.padEnd(9)} webgl=${metric.webglContexts} active=${metric.activeMaterials} dpr=${metric.maxCanvasDpr.toFixed(2)} js=${(metric.jsEncodedBytes / 1024).toFixed(0)}KiB requests=${metric.jsRequests} maxChunk=${(metric.maxJsChunkBytes / 1024).toFixed(0)}KiB`,
  );
}
