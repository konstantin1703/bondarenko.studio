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

    syncMotion();
    syncVisibility();

    motionQuery.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", syncVisibility);

    const node = hostRef.current;
    let observer: IntersectionObserver | null = null;

    if (node && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => setNearViewport(Boolean(entry?.isIntersecting)),
        { root: null, rootMargin, threshold: 0.001 },
      );
      observer.observe(node);
    } else {
      setNearViewport(true);
    }

    return () => {
      motionQuery.removeEventListener("change", syncMotion);
      document.removeEventListener("visibilitychange", syncVisibility);
      observer?.disconnect();
    };
  }, [rootMargin]);

  return {
    hostRef,
    reducedMotion,
    renderActive: nearViewport && pageVisible && !reducedMotion,
  };
}
