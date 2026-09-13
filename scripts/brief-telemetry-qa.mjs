import { webkit } from "@playwright/test";

const targetUrl = new URL("/", process.env.QA_BASE_URL ?? "http://127.0.0.1:3000").toString();
const browser = await webkit.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 430, height: 932 } });

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

try {
  await page.goto(targetUrl, { waitUntil: "networkidle" });
  await page.evaluate(() => {
    window.__bndTelemetryQA = [];
    window.va = (...args) => window.__bndTelemetryQA.push(args);
  });

  await page.evaluate(() => document.querySelector("#brief")?.scrollIntoView({ behavior: "auto", block: "start" }));
  const section = page.locator("#brief");

  await section.getByRole("button", { name: /Сайт/ }).first().click();
  await section.getByRole("button", { name: /Дальше/ }).click();
  await section.getByRole("button", { name: /Дизайн/ }).click();
  await section.getByRole("button", { name: /Дальше/ }).click();
  await section.getByRole("button", { name: /Масштабируемо/ }).click();
  await section.getByRole("button", { name: /Дальше/ }).click();
  await section.getByRole("button", { name: /2–4 недели/ }).click();
  await section.getByRole("button", { name: /\$5–15K/ }).click();
  await section.getByRole("button", { name: /Дальше/ }).click();
  await section.getByPlaceholder("Как к вам обращаться?").fill("Telemetry QA Private Name");
  await section.getByPlaceholder("@username или email").fill("private-telemetry@example.com");
  await section.getByPlaceholder("Что уже есть и какой результат нужен?").fill("Private description that must never enter analytics.");

  const endpoint = "**/api/lead";
  const submit = section.getByRole("button", { name: /Передать спецификацию/ });

  await page.route(endpoint, async (route) => {
    await route.fulfill({
      status: 502,
      contentType: "application/json",
      body: JSON.stringify({ error: "Synthetic delivery failure" }),
    });
  });
  await submit.click();
  await section.getByRole("alert").waitFor({ state: "visible", timeout: 2500 });
  await page.unroute(endpoint);

  await page.route(endpoint, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true }),
    });
  });
  await submit.click();
  await section.getByRole("heading", { name: "Спецификация отправлена." }).waitFor({ state: "visible", timeout: 2500 });
  await page.unroute(endpoint);

  const calls = await page.evaluate(() => window.__bndTelemetryQA);
  const events = calls.map(([kind, payload]) => ({ kind, ...payload }));
  const names = events.map((event) => event.name);

  assert(names[0] === "brief_start", `telemetry: first event must be brief_start, got ${names[0] ?? "<none>"}`);
  assert(names.filter((name) => name === "brief_start").length === 1, "telemetry: brief_start must fire once");
  assert(names.filter((name) => name === "brief_step").length === 4, `telemetry: expected four forward step events, got ${names.filter((name) => name === "brief_step").length}`);
  assert(names.filter((name) => name === "brief_submit").length === 2, "telemetry: retry must create a second submit event");
  assert(names.filter((name) => name === "brief_error").length === 1, "telemetry: delivery failure event is missing");
  assert(names.filter((name) => name === "brief_success").length === 1, "telemetry: success event is missing");

  for (const event of events) {
    assert(event.kind === "event", `telemetry: unexpected transport kind ${event.kind}`);
    const data = event.data ?? {};
    for (const forbidden of ["name", "contact", "description", "email", "telegram"]) {
      assert(!(forbidden in data), `telemetry: forbidden PII key ${forbidden} leaked into ${event.name}`);
    }
    const serialized = JSON.stringify(data);
    for (const privateValue of ["Telemetry QA Private Name", "private-telemetry@example.com", "Private description that must never enter analytics."]) {
      assert(!serialized.includes(privateValue), `telemetry: private form value leaked into ${event.name}`);
    }
  }

  const start = events.find((event) => event.name === "brief_start");
  assert(start?.data?.projectType === "site", "telemetry: brief_start project type is wrong");

  const error = events.find((event) => event.name === "brief_error");
  assert(error?.data?.reason === "http_502", `telemetry: expected http_502 reason, got ${error?.data?.reason ?? "<none>"}`);
  assert(error?.data?.attempt === 1, "telemetry: first failed attempt must be attempt 1");

  const success = events.find((event) => event.name === "brief_success");
  assert(success?.data?.attempt === 2, "telemetry: retry success must be attempt 2");
  assert(success?.data?.moduleCount === 1, "telemetry: module count is wrong");
  assert(success?.data?.priorityCount === 1, "telemetry: priority count is wrong");

  console.log(`Brief telemetry QA passed: ${names.join(" -> ")}`);
} finally {
  await browser.close();
}
