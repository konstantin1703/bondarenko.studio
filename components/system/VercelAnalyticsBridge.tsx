"use client";

import { useEffect } from "react";

const ANALYTICS_SCRIPT = "/_vercel/insights/script.js";
const PRODUCTION_HOSTS = new Set(["bndstudio.art", "www.bndstudio.art"]);
const ANALYTICS_ENABLED = process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ENABLED === "1";

export default function VercelAnalyticsBridge() {
  useEffect(() => {
    if (!ANALYTICS_ENABLED || !PRODUCTION_HOSTS.has(window.location.hostname)) return;
    if (document.querySelector(`script[data-bnd-analytics="vercel"]`)) return;

    const script = document.createElement("script");
    script.src = ANALYTICS_SCRIPT;
    script.defer = true;
    script.dataset.bndAnalytics = "vercel";
    document.head.appendChild(script);

    return () => script.remove();
  }, []);

  return null;
}
