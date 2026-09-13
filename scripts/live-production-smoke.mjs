const baseUrl = new URL(process.env.LIVE_BASE_URL ?? "https://bndstudio.art");
const expectedSha = process.env.EXPECTED_SHA?.trim() || null;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertLeadHeaders(response, label) {
  assert(response.headers.get("cache-control")?.includes("no-store"), `${label}: response is cacheable`);
  assert(response.headers.get("x-robots-tag")?.includes("noindex"), `${label}: missing API noindex header`);
}

async function request(path, init = {}) {
  const url = new URL(path, baseUrl);
  const response = await fetch(url, {
    cache: "no-store",
    ...init,
  });
  return response;
}

async function text(path, init = {}) {
  const response = await request(path, init);
  return { response, body: await response.text() };
}

async function json(path, init = {}) {
  const response = await request(path, init);
  const body = await response.json().catch(() => null);
  return { response, body };
}

console.log(`Live production smoke: ${baseUrl.origin}`);

const home = await text("/");
assert(home.response.status === 200, `home: expected 200, got ${home.response.status}`);
assert(home.body.includes("Цифровые системы"), "home: primary statement is missing");
assert(home.body.includes('type="application/ld+json"'), "home: JSON-LD is missing");
assert(home.body.includes('"@type":"Organization"'), "home: Organization JSON-LD is missing");
assert(home.body.includes('"@type":"WebSite"'), "home: WebSite JSON-LD is missing");
assert(home.body.includes('rel="canonical" href="https://bndstudio.art"'), "home: canonical is not apex production");
assert(!home.body.includes("v12-"), "home: legacy V12 markup leaked to production");
assert(!home.body.includes("v13-"), "home: legacy V13 markup leaked to production");

const requiredHeaders = [
  ["content-security-policy", null],
  ["x-content-type-options", "nosniff"],
  ["x-frame-options", "DENY"],
  ["referrer-policy", "strict-origin-when-cross-origin"],
  ["strict-transport-security", null],
];
for (const [name, expected] of requiredHeaders) {
  const value = home.response.headers.get(name);
  assert(value, `home: missing ${name}`);
  if (expected) assert(value.toLowerCase() === expected.toLowerCase(), `home: ${name}=${value}, expected ${expected}`);
}

const health = await json("/api/health");
assert(health.response.status === 200, `health: expected 200, got ${health.response.status}`);
assert(health.body?.ok === true, "health: ok is not true");
assert(health.response.headers.get("cache-control")?.includes("no-store"), "health: response is cacheable");
if (expectedSha) {
  assert(health.body?.build === expectedSha, `health: deployed SHA ${health.body?.build ?? "<null>"} does not match ${expectedSha}`);
  assert(health.body?.environment === "production", `health: expected production environment, got ${health.body?.environment ?? "<null>"}`);
}

const www = await fetch("https://www.bndstudio.art/", {
  redirect: "manual",
  cache: "no-store",
});
assert(www.status === 308, `www: expected 308, got ${www.status}`);
const location = www.headers.get("location") ?? "";
assert(location.startsWith("https://bndstudio.art/"), `www: unexpected redirect ${location || "<missing>"}`);

const robots = await text("/robots.txt");
assert(robots.response.status === 200, `robots: expected 200, got ${robots.response.status}`);
assert(robots.body.includes("Disallow: /api/"), "robots: /api/ is not disallowed");
assert(robots.body.includes("Sitemap: https://bndstudio.art/sitemap.xml"), "robots: production sitemap is missing");

const sitemap = await text("/sitemap.xml");
assert(sitemap.response.status === 200, `sitemap: expected 200, got ${sitemap.response.status}`);
assert(sitemap.body.includes("<loc>https://bndstudio.art</loc>"), "sitemap: apex URL is missing");

const manifest = await text("/manifest.webmanifest");
assert(manifest.response.status === 200, `manifest: expected 200, got ${manifest.response.status}`);
assert(manifest.body.includes('"BND Studio"'), "manifest: site name is missing");

const og = await request("/opengraph-image");
assert(og.status === 200, `opengraph-image: expected 200, got ${og.status}`);
assert(og.headers.get("content-type")?.includes("image/png"), `opengraph-image: unexpected content-type ${og.headers.get("content-type")}`);

const notFound = await text("/route-that-does-not-exist");
assert(notFound.response.status === 404, `404: expected 404, got ${notFound.response.status}`);
assert(notFound.body.includes("Такого маршрута нет"), "404: custom BND copy is missing");

for (const route of ["hero-lab", "diagnostics-lab", "capabilities-lab", "brief-lab", "footer-lab", "system-lab"]) {
  const result = await text(`/${route}`);
  assert(result.response.status === 404, `/${route}: expected 404, got ${result.response.status}`);
  assert(result.body.includes("Такого маршрута нет"), `/${route}: custom 404 is missing`);
}

const honeypot = await json("/api/lead", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ website: "live-smoke-bot-field" }),
});
assert(honeypot.response.status === 200, `lead honeypot: expected 200, got ${honeypot.response.status}`);
assert(honeypot.body?.ok === true, "lead honeypot: expected silent ok response");
assertLeadHeaders(honeypot.response, "lead honeypot");

const invalid = await json("/api/lead", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ name: "Live QA" }),
});
assert(invalid.response.status === 400, `lead invalid payload: expected 400, got ${invalid.response.status}`);
assertLeadHeaders(invalid.response, "lead invalid payload");

const malformed = await json("/api/lead", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: "{",
});
assert(malformed.response.status === 400, `lead malformed JSON: expected 400, got ${malformed.response.status}`);
assertLeadHeaders(malformed.response, "lead malformed JSON");

const oversized = await json("/api/lead", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ website: "x".repeat(24_100) }),
});
assert(oversized.response.status === 413, `lead oversized payload: expected 413, got ${oversized.response.status}`);
assertLeadHeaders(oversized.response, "lead oversized payload");

const crossSite = await json("/api/lead", {
  method: "POST",
  headers: {
    "content-type": "application/json",
    origin: "https://example.invalid",
    "sec-fetch-site": "cross-site",
  },
  body: JSON.stringify({ website: "would-otherwise-pass-honeypot" }),
});
assert(crossSite.response.status === 403, `lead cross-site: expected 403, got ${crossSite.response.status}`);
assertLeadHeaders(crossSite.response, "lead cross-site");

const wrongMedia = await json("/api/lead", {
  method: "POST",
  headers: { "content-type": "text/plain; application/json" },
  body: "live smoke",
});
assert(wrongMedia.response.status === 415, `lead media type: expected 415, got ${wrongMedia.response.status}`);
assertLeadHeaders(wrongMedia.response, "lead media type");

console.log("Live production smoke passed.");
