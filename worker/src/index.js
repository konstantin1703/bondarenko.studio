export default {
  async fetch(request, env, ctx) {
    const DEFAULT_ALLOWED_ORIGINS = [
      'https://bndstudio.art',
      'https://www.bndstudio.art',
    ];

    const MAX_BODY_LENGTH = Math.max(1000, Number(env.MAX_BODY_LENGTH || 20000));
    const COOLDOWN_SECONDS = Math.max(5, Number(env.COOLDOWN_SECONDS || 20));
    const MIN_SUBMIT_MS = Math.max(0, Number(env.MIN_SUBMIT_MS || 3000));
    const ALLOW_LOCAL_ORIGINS = env.ALLOW_LOCAL_ORIGINS === 'true';

    const allowedFromEnv = (env.ALLOWED_ORIGINS || '')
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean);

    const allowedOrigins = allowedFromEnv.length ? allowedFromEnv : DEFAULT_ALLOWED_ORIGINS;
    const origin = request.headers.get('Origin') || '';
    const url = new URL(request.url);

    const isLocalOrigin = (value) =>
      ALLOW_LOCAL_ORIGINS &&
      (value.startsWith('http://localhost') || value.startsWith('http://127.0.0.1'));

    const isAllowedOrigin = !origin || isLocalOrigin(origin) || allowedOrigins.includes(origin);

    const corsHeaders = {
      'Access-Control-Allow-Origin': origin || '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
      Vary: 'Origin',
    };

    const json = (body, status = 200, extraHeaders = {}) => {
      const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        ...extraHeaders,
      };

      if (isAllowedOrigin) {
        Object.assign(headers, corsHeaders);
      }

      return new Response(JSON.stringify(body), { status, headers });
    };

    const publicError = (status = 500) =>
      json(
        {
          ok: false,
          success: false,
          error: 'Request failed. Please try again later.',
        },
        status
      );

    if (url.pathname !== '/api/lead') {
      return json({ ok: false, success: false, error: 'Not Found' }, 404);
    }

    if (request.method === 'OPTIONS') {
      if (!isAllowedOrigin) return new Response(null, { status: 403 });
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return json({ ok: false, success: false, error: 'Method Not Allowed' }, 405, {
        Allow: 'POST, OPTIONS',
      });
    }

    if (!isAllowedOrigin) {
      return json({ ok: false, success: false, error: 'Origin not allowed' }, 403);
    }

    const contentType = request.headers.get('Content-Type') || '';
    if (!contentType.toLowerCase().includes('application/json')) {
      return json({ ok: false, success: false, error: 'Content-Type must be application/json' }, 400);
    }

    const contentLength = Number(request.headers.get('Content-Length') || 0);
    if (contentLength > MAX_BODY_LENGTH) {
      return json({ ok: false, success: false, error: 'Payload too large' }, 413);
    }

    let rawBody = '';
    try {
      rawBody = await request.text();
    } catch (_) {
      return publicError(400);
    }

    if (rawBody.length > MAX_BODY_LENGTH) {
      return json({ ok: false, success: false, error: 'Payload too large' }, 413);
    }

    let data;
    try {
      data = JSON.parse(rawBody);
    } catch (_) {
      return json({ ok: false, success: false, error: 'Invalid JSON' }, 400);
    }

    const sanitize = (value, max = 3500) => {
      if (typeof value !== 'string') return '';
      return value
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
        .trim()
        .slice(0, max);
    };

    const name = sanitize(data.name, 120);
    const email = sanitize(data.email, 180);
    const phone = sanitize(data.phone, 80);
    const message = sanitize(data.message, 3500);
    const company = sanitize(data.company, 200);
    const page = sanitize(data.page, 500);
    const clientTs = Number(data.client_ts || 0);

    if (company) {
      return json({ ok: true, success: true, message: 'Заявка отправлена' }, 200);
    }

    if (MIN_SUBMIT_MS > 0 && clientTs && Date.now() - clientTs < MIN_SUBMIT_MS) {
      return json({ ok: false, success: false, error: 'Please check the form and try again.' }, 400);
    }

    if (name.length < 2) {
      return json({ ok: false, success: false, error: 'Name is too short' }, 400);
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ ok: false, success: false, error: 'Invalid email' }, 400);
    }

    if (message.length < 10) {
      return json({ ok: false, success: false, error: 'Message is too short' }, 400);
    }

    const ip =
      request.headers.get('CF-Connecting-IP') ||
      request.headers.get('X-Forwarded-For') ||
      'unknown';

    try {
      const rateKey = new Request('https://rate.local/' + encodeURIComponent(ip));
      const hit = await caches.default.match(rateKey);

      if (hit) {
        return json({ ok: false, success: false, error: 'Too many requests. Please try again later.' }, 429);
      }

      const marker = new Response('ok', {
        headers: {
          'Cache-Control': `public, max-age=${COOLDOWN_SECONDS}`,
        },
      });

      ctx.waitUntil(caches.default.put(rateKey, marker));
    } catch (_) {
      // Best-effort rate limit. The lead flow should not fail if cache is temporarily unavailable.
    }

    if (!env.TELEGRAM_TOKEN || !env.CHAT_ID) {
      console.error('Lead worker is not configured: missing TELEGRAM_TOKEN or CHAT_ID.');
      return publicError(500);
    }

    const submittedAt = new Date().toISOString();

    const text =
      '📨 Новая заявка с сайта Bondarenko.studio\n\n' +
      '👤 Имя: ' + (name || '—') + '\n' +
      '✉️ Email: ' + (email || '—') + '\n' +
      '📱 Телефон: ' + (phone || '—') + '\n\n' +
      '💬 Сообщение:\n' + (message || '—') + '\n\n' +
      '🌐 Страница: ' + (page || '—') + '\n' +
      '🕒 Время сервера: ' + submittedAt + '\n' +
      '🧭 Client TS: ' + (clientTs || '—') + '\n' +
      '📍 IP: ' + ip;

    try {
      const telegramResponse = await fetch(
        `https://api.telegram.org/bot${env.TELEGRAM_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: env.CHAT_ID,
            text,
            disable_web_page_preview: true,
          }),
          signal: AbortSignal.timeout(10000),
        }
      );

      const telegramData = await telegramResponse.json().catch(() => ({}));

      if (!telegramResponse.ok || telegramData.ok !== true) {
        console.error('Telegram send failed', {
          status: telegramResponse.status,
          telegramData,
        });
        return publicError(500);
      }

      return json({ ok: true, success: true, message: 'Заявка отправлена' }, 200);
    } catch (error) {
      console.error('Lead send failed', error);
      return publicError(500);
    }
  },
};
