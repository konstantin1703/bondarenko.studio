"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type DeferredMaterialSurfaceProps = {
  children: ReactNode;
  name: string;
  rootMargin?: string;
};

export default function DeferredMaterialSurface({
  children,
  name,
  rootMargin = "240px 0px",
}: DeferredMaterialSurfaceProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (mounted) return;

    const node = hostRef.current;
    if (!node || !("IntersectionObserver" in window)) {
      setMounted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setMounted(true);
        observer.disconnect();
      },
      { root: null, rootMargin, threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [mounted, rootMargin]);

  useEffect(() => {
    if (!mounted || ready) return;

    const node = hostRef.current;
    if (!node) return;

    const hasRealSurface = () =>
      Array.from(node.querySelectorAll<HTMLElement>("[data-material-surface]")).some(
        (surface) =>
          surface.dataset.materialSurface === name &&
          !surface.hasAttribute("data-material-placeholder-state"),
      );

    if (hasRealSurface()) {
      setReady(true);
      return;
    }

    const observer = new MutationObserver(() => {
      if (!hasRealSurface()) return;
      setReady(true);
      observer.disconnect();
    });

    observer.observe(node, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [mounted, name, ready]);

  return (
    <div ref={hostRef} data-material-slot={name} style={{ width: "100%", height: "100%" }}>
      {mounted ? children : null}
      {!ready ? (
        <>
          <div
            data-material-surface={name}
            data-render-active="false"
            data-material-placeholder-state="true"
            aria-hidden="true"
            style={{ display: "none" }}
          />
          <canvas
            data-material-placeholder={name}
            aria-hidden="true"
            style={{ display: "block", width: "100%", height: "100%" }}
          />
        </>
      ) : null}
    </div>
  );
}
