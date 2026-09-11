"use client";

import { useEffect, useRef, useState } from "react";

export function useRenderActivity(rootMargin = "120px 0px") {
  const hostRef = useRef<HTMLDivElement>(null);
  const [nearViewport, setNearViewport] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReducedMotion(motionQuery.matches);
    const syncVisibility = () => setPageVisible(document.visibilityState === "visible");
    const node = hostRef.current;
    const verticalMargin = Number.parseFloat(rootMargin) || 0;
    let frame = 0;

    const syncNearViewport = () => {
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const next = rect.bottom >= -verticalMargin && rect.top <= window.innerHeight + verticalMargin;
      setNearViewport((current) => (current === next ? current : next));
    };

    const scheduleGeometrySync = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        syncNearViewport();
      });
    };

    syncMotion();
    syncVisibility();
    syncNearViewport();

    motionQuery.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", syncVisibility);
    window.addEventListener("scroll", scheduleGeometrySync, { passive: true });
    window.addEventListener("resize", scheduleGeometrySync, { passive: true });

    let observer: IntersectionObserver | null = null;

    if (node && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        () => scheduleGeometrySync(),
        { root: null, rootMargin, threshold: 0.001 },
      );
      observer.observe(node);
    } else if (node) {
      syncNearViewport();
    } else {
      setNearViewport(true);
    }

    return () => {
      motionQuery.removeEventListener("change", syncMotion);
      document.removeEventListener("visibilitychange", syncVisibility);
      window.removeEventListener("scroll", scheduleGeometrySync);
      window.removeEventListener("resize", scheduleGeometrySync);
      if (frame) window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [rootMargin]);

  return {
    hostRef,
    reducedMotion,
    renderActive: nearViewport && pageVisible && !reducedMotion,
  };
}
