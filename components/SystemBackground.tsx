"use client";

import { useEffect } from "react";

const sceneIds = ["hero", "problems", "systems", "constructor"] as const;

export default function SystemBackground() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let pointerX = window.innerWidth * 0.72;
    let pointerY = window.innerHeight * 0.28;
    let scrollY = window.scrollY;
    let raf = 0;

    const commitFrame = () => {
      raf = 0;
      const max = Math.max(root.scrollHeight - window.innerHeight, 1);
      root.style.setProperty("--page-progress", String(Math.min(scrollY / max, 1)));

      if (!reducedMotion) {
        root.style.setProperty("--pointer-x", `${pointerX}px`);
        root.style.setProperty("--pointer-y", `${pointerY}px`);
      }
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(commitFrame);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      schedule();
    };

    const onScroll = () => {
      scrollY = window.scrollY;
      schedule();
    };

    root.dataset.scene = "hero";
    schedule();

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = sceneIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          root.dataset.scene = visible.target.id;
        }
      },
      {
        rootMargin: "-18% 0px -42% 0px",
        threshold: [0.05, 0.18, 0.35, 0.55],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
      delete root.dataset.scene;
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
