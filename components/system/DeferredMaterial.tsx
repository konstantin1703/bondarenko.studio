"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

export default function DeferredMaterial({
  surface,
  children,
  rootMargin = "720px 0px",
}: {
  surface: string;
  children: ReactNode;
  rootMargin?: string;
}) {
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
      { root: null, rootMargin, threshold: 0.001 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [mounted, rootMargin]);

  return (
    <div
      ref={hostRef}
      data-material-deferred={mounted ? "mounted" : "idle"}
      data-material-surface={mounted ? undefined : surface}
      data-render-active={mounted ? undefined : "false"}
      style={{ width: "100%", height: "100%" }}
    >
      {mounted ? (
        children
      ) : (
        <canvas
          aria-hidden="true"
          data-material-placeholder={surface}
          width={1}
          height={1}
          style={{ display: "block", width: "100%", height: "100%" }}
        />
      )}
    </div>
  );
}
