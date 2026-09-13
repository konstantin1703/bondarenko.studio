"use client";

import { useEffect } from "react";

const ANALYTICS_SCRIPT = "/_vercel/insights/script.js";
const PRODUCTION_HOSTS = new Set(["bndstudio.art", "www.bndstudio.art"]);

export default function VercelAnalyticsBridge() {
  useEffect(() => {
    if (!PRODUCTION_HOSTS.has(window.location.hostname)) return;
    if (document.querySelector(`script[data-bnd-analytics="vercel"]`)) return;

    const controller = new AbortController();
    let cancelled = false;

    void fetch(ANALYTICS_SCRIPT, {
      method: "HEAD",
      cache: "no-store",
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok || cancelled) return;

        const script = document.createElement("script");
        script.src = ANALYTICS_SCRIPT;
        script.defer = true;
        script.dataset.bndAnalytics = "vercel";
        document.head.appendChild(script);
      })
      .catch(() => {
        // Analytics is optional. Delivery and interaction must not depend on it.
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  return null;
}
