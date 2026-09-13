import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const baseUrl = process.env.QA_BASE_URL ?? "http://127.0.0.1:3000";
const siteOrigin = "https://bndstudio.art";
const siteUrl = `${siteOrigin}/`;
const siteDescription =
  "BND Studio проектирует сайты, медиа-системы, Telegram-продукты, AI-интеграции и автоматизацию как единую цифровую архитектуру.";

const routes = [
  {
    path: "/",
    title: "BND Studio — цифровые системы для бизнеса, медиа и продуктов",
    shareTitle: "BND Studio",
    description: siteDescription,
  },
  {
    path: "/studio",
    title: "Studio — BND Studio",
    shareTitle: "BND Studio — Studio",
    description:
      "BND Studio — независимая digital-студия, которая соединяет стратегию, интерфейсы, медиа, AI и автоматизацию в одну работающую систему.",
  },
  {
    path: "/systems",
    title: "Systems — BND Studio",
    shareTitle: "BND Studio — Systems",
    description:
      "Системы BND Studio: web, media, AI, Telegram и automation как связанные цифровые контуры, а не отдельные услуги.",
  },
  {
    path: "/brief",
    title: "Brief — BND Studio",
    shareTitle: "BND Studio — Brief",
    description:
      "Соберите проектную спецификацию BND Studio: формат, модули, приоритеты, сроки, бюджет и контакт в одном рабочем маршруте.",
  },
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function absoluteRoute(path) {
  return new URL(path, siteUrl).toString();
}

function canonicalRoute(path) {
  return path === "/" ? siteOrigin : `${siteOrigin}${path}`;
}

async function collectRoute(page, route) {
  const response = await page.goto(new URL(route.path, baseUrl).toString(), {
    waitUntil: "domcontentloaded",
  });
  assert(response?.status() === 200, `${route.path}: expected 200, got ${response?.status() ?? "no response"}`);

  const snapshot = await page.evaluate(() => {
    const meta = (selector, attribute = "content") =>
      Array.from(document.querySelectorAll(selector)).map((node) => node.getAttribute(attribute) || "");

    return {
      lang: document.documentElement.lang,
      title: document.title,
      canonical: meta('link[rel="canonical"]', "href"),
      description: meta('meta[name="description"]'),
      robots: meta('meta[name="robots"]'),
      ogTitle: meta('meta[property="og:title"]'),
      ogDescription: meta('meta[property="og:description"]'),
      ogUrl: meta('meta[property="og:url"]'),
      ogType: meta('meta[property="og:type"]'),
      ogLocale: meta('meta[property="og:locale"]'),
      ogSiteName: meta('meta[property="og:site_name"]'),
      ogImage: meta('meta[property="og:image"]'),
      twitterCard: meta('meta[name="twitter:card"]'),
      twitterTitle: meta('meta[name="twitter:title"]'),
      twitterDescription: meta('meta[name="twitter:description"]'),
      twitterImage: meta('meta[name="twitter:image"]'),
      jsonLd: Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(
        (node) => node.textContent || "",
      ),
    };
  });

  assert(snapshot.lang === "ru", `${route.path}: html lang=${snapshot.lang || "<missing>"}`);
  assert(snapshot.title === route.title, `${route.path}: title=${JSON.stringify(snapshot.title)}`);
  assert(snapshot.canonical.length === 1, `${route.path}: canonical count=${snapshot.canonical.length}`);
  assert(snapshot.canonical[0] === canonicalRoute(route.path), `${route.path}: canonical=${snapshot.canonical[0]}`);
  assert(snapshot.description.length === 1, `${route.path}: description count=${snapshot.description.length}`);
  assert(snapshot.description[0] === route.description, `${route.path}: description drifted`);
  assert(!snapshot.robots.some((value) => /noindex/i.test(value)), `${route.path}: noindex leaked into public route`);

  const singleton = [
    ["og:title", snapshot.ogTitle, route.shareTitle],
    ["og:description", snapshot.ogDescription, route.description],
    ["og:url", snapshot.ogUrl, absoluteRoute(route.path)],
    ["og:type", snapshot.ogType, "website"],
    ["og:locale", snapshot.ogLocale, "ru_RU"],
    ["og:site_name", snapshot.ogSiteName, "BND Studio"],
    ["twitter:card", snapshot.twitterCard, "summary_large_image"],
    ["twitter:title", snapshot.twitterTitle, route.shareTitle],
    ["twitter:description", snapshot.twitterDescription, route.description],
  ];

  for (const [label, values, expected] of singleton) {
    assert(values.length === 1, `${route.path}: ${label} count=${values.length}`);
    assert(values[0] === expected, `${route.path}: ${label}=${JSON.stringify(values[0])}, expected ${JSON.stringify(expected)}`);
  }

  for (const [label, values] of [
    ["og:image", snapshot.ogImage],
    ["twitter:image", snapshot.twitterImage],
  ]) {
    assert(values.length >= 1, `${route.path}: missing ${label}`);
    assert(
      values.some((value) => value.startsWith(`${siteOrigin}/opengraph-image`)),
      `${route.path}: ${label} is not the authored BND social image: ${JSON.stringify(values)}`,
    );
  }

  const structuredDocuments = snapshot.jsonLd.map((value, index) => {
    try {
      return JSON.parse(value);
    } catch {
      throw new Error(`${route.path}: JSON-LD script ${index + 1} is invalid JSON`);
    }
  });
  const nodes = structuredDocuments.flatMap((document) =>
    Array.isArray(document?.["@graph"]) ? document["@graph"] : [document],
  );
  const organizations = nodes.filter((node) => node?.["@type"] === "Organization");
  const websites = nodes.filter((node) => node?.["@type"] === "WebSite");
  const webPages = nodes.filter((node) => node?.["@type"] === "WebPage");

  assert(organizations.length === 1, `${route.path}: Organization nodes=${organizations.length}`);
  assert(websites.length === 1, `${route.path}: WebSite nodes=${websites.length}`);
  assert(webPages.length === 1, `${route.path}: WebPage nodes=${webPages.length}`);
  assert(organizations[0].url === siteUrl, `${route.path}: Organization url drifted`);
  assert(websites[0].url === siteUrl, `${route.path}: WebSite url drifted`);
  assert(websites[0].inLanguage === "ru", `${route.path}: WebSite language drifted`);
  assert(webPages[0].url === absoluteRoute(route.path), `${route.path}: WebPage url drifted`);
  assert(webPages[0].name === route.title, `${route.path}: WebPage name drifted`);
  assert(webPages[0].description === route.description, `${route.path}: WebPage description drifted`);
  assert(webPages[0].inLanguage === "ru", `${route.path}: WebPage language drifted`);
  assert(webPages[0].isPartOf?.["@id"] === `${siteUrl}#website`, `${route.path}: WebPage isPartOf drifted`);
  assert(webPages[0].publisher?.["@id"] === `${siteUrl}#organization`, `${route.path}: WebPage publisher drifted`);

  return {
    path: route.path,
    canonical: snapshot.canonical[0],
    title: snapshot.title,
    ogImage: snapshot.ogImage[0],
    twitterImage: snapshot.twitterImage[0],
    structuredTypes: nodes.map((node) => node?.["@type"]).filter(Boolean),
  };
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const report = [];
try {
  for (const route of routes) report.push(await collectRoute(page, route));
} finally {
  await browser.close();
}

const robotsResponse = await fetch(new URL("/robots.txt", baseUrl));
assert(robotsResponse.status === 200, `robots: expected 200, got ${robotsResponse.status}`);
const robots = await robotsResponse.text();
assert(robots.includes("Disallow: /api/"), "robots: /api/ must remain disallowed");
assert(robots.includes(`Sitemap: ${siteOrigin}/sitemap.xml`), "robots: canonical sitemap missing");

const sitemapResponse = await fetch(new URL("/sitemap.xml", baseUrl));
assert(sitemapResponse.status === 200, `sitemap: expected 200, got ${sitemapResponse.status}`);
const sitemap = await sitemapResponse.text();
const locations = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g), (match) => match[1]);
const expectedLocations = routes.map((route) => canonicalRoute(route.path));
assert(locations.length === expectedLocations.length, `sitemap: locations=${JSON.stringify(locations)}`);
for (const expected of expectedLocations) {
  assert(locations.includes(expected), `sitemap: missing ${expected}`);
}
assert(!sitemap.includes("-lab"), "sitemap: internal lab route leaked");

const manifestResponse = await fetch(new URL("/manifest.webmanifest", baseUrl));
assert(manifestResponse.status === 200, `manifest: expected 200, got ${manifestResponse.status}`);
const manifest = await manifestResponse.json();
assert(manifest.name === "BND Studio", `manifest: name=${manifest.name}`);
assert(manifest.short_name === "BND", `manifest: short_name=${manifest.short_name}`);
assert(manifest.start_url === "/", `manifest: start_url=${manifest.start_url}`);
assert(manifest.scope === "/", `manifest: scope=${manifest.scope}`);
assert(manifest.lang === "ru", `manifest: lang=${manifest.lang}`);
assert(manifest.display === "standalone", `manifest: display=${manifest.display}`);
assert(manifest.theme_color === "#050608", `manifest: theme_color=${manifest.theme_color}`);
assert(manifest.background_color === "#050608", `manifest: background_color=${manifest.background_color}`);
assert(Array.isArray(manifest.icons) && manifest.icons.some((icon) => icon.src === "/icon.svg"), "manifest: icon.svg missing");

await mkdir("metadata-integrity-qa", { recursive: true });
await writeFile(
  "metadata-integrity-qa/report.json",
  `${JSON.stringify({ generatedAt: new Date().toISOString(), baseUrl, routes: report }, null, 2)}\n`,
);

console.log("Metadata integrity QA passed");
for (const item of report) {
  console.log(`${item.path.padEnd(9)} ${item.canonical} :: ${item.structuredTypes.join(" / ")}`);
}
