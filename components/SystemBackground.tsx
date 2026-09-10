"use client";

import { useEffect } from "react";

export default function SystemBackground() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    const writePointer = (event: PointerEvent) => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        root.style.setProperty("--pointer-x", `${event.clientX}px`);
        root.style.setProperty("--pointer-y", `${event.clientY}px`);
      });
    };

    const writeScroll = () => {
      const max = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      root.style.setProperty(
        "--page-progress",
        String(Math.min(window.scrollY / max, 1)),
      );
    };

    window.addEventListener("pointermove", writePointer, { passive: true });
    window.addEventListener("scroll", writeScroll, { passive: true });
    writeScroll();

    return () => {
      window.removeEventListener("pointermove", writePointer);
      window.removeEventListener("scroll", writeScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="system-background" aria-hidden="true">
      <div className="system-background__grid" />
      <div className="system-background__glow" />
      <div className="system-background__beam" />
      <div className="system-background__vignette" />
    </div>
  );
}
