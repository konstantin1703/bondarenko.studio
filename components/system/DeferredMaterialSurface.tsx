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

  return (
    <div ref={hostRef} data-material-slot={name} style={{ width: "100%", height: "100%" }}>
      {mounted ? (
        children
      ) : (
        <>
          <div
            data-material-surface={name}
            data-render-active="false"
            aria-hidden="true"
            style={{ display: "none" }}
          />
          <canvas
            data-material-placeholder={name}
            aria-hidden="true"
            style={{ display: "block", width: "100%", height: "100%" }}
          />
        </>
      )}
    </div>
  );
}
