# Lead Worker

Cloudflare Worker for `POST /api/lead`. It receives lead form submissions from `bndstudio.art`, validates the payload, rate-limits repeated submissions and forwards clean requests to Telegram.

## Files

- `src/index.js` — versioned Worker source.
- `wrangler.toml.example` — safe deployment example without secrets.

## Required secrets

Set these in Cloudflare, never commit them:

```bash
wrangler secret put TELEGRAM_TOKEN
wrangler secret put CHAT_ID
```

## Recommended production vars

```text
ALLOWED_ORIGINS=https://bndstudio.art,https://www.bndstudio.art
COOLDOWN_SECONDS=20
MAX_BODY_LENGTH=20000
MIN_SUBMIT_MS=3000
ALLOW_LOCAL_ORIGINS=false
```

## Manual smoke checks

- `OPTIONS /api/lead` from allowed origin returns `204`.
- Valid `POST /api/lead` returns `200` and sends a Telegram message.
- Fast repeated submit returns `429`.
- Foreign `Origin` returns `403`.
- Wrong path returns `404`.
- Honeypot `company` returns success but does not send Telegram.
- Invalid JSON returns `400`.
- Oversized body returns `413`.
