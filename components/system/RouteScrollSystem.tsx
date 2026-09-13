"use client";

import gsap from "gsap";
import { useLayoutEffect, useRef, useState } from "react";
import styles from "./route-scroll-system.module.css";

type RouteScrollSystemProps = {
  rootId: string;
  labels: readonly string[];
};

function visibleChildren(section: HTMLElement) {
  return Array.from(section.children).filter((node): node is HTMLElement => {
    if (!(node instanceof HTMLElement)) return false;
    return node.getAttribute("aria-hidden") !== "true";
  });
}

export default function RouteScrollSystem({ rootId, labels }: RouteScrollSystemProps) {
  const railRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    const routeRoot = document.getElementById(rootId);
    const rail = railRef.current;
    if (!routeRoot || !rail) return;

    const sections = Array.from(routeRoot.querySelectorAll<HTMLElement>("main > section"));
    if (sections.length === 0) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const updateRail = () => {
      frame = 0;
      const viewportAnchor = window.innerHeight * 0.46;
      let nearest = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const sectionAnchor = rect.top + Math.min(rect.height * 0.36, window.innerHeight * 0.44);
        const distance = Math.abs(sectionAnchor - viewportAnchor);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearest = index;
        }
      });

      setActiveIndex((current) => (current === nearest ? current : nearest));
      rail.dataset.activeIndex = String(nearest);

      const first = sections[0].getBoundingClientRect();
      const last = sections[sections.length - 1].getBoundingClientRect();
      const routeTop = window.scrollY + first.top;
      const routeBottom = window.scrollY + last.bottom - window.innerHeight;
      const span = Math.max(1, routeBottom - routeTop);
      const progress = Math.min(1, Math.max(0, (window.scrollY - routeTop) / span));
      rail.style.setProperty("--route-progress", progress.toFixed(4));
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateRail);
    };

    updateRail();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    let revealObserver: IntersectionObserver | null = null;
    const animatedSections = sections.slice(1);

    if (!reducedMotion && "IntersectionObserver" in window) {
      animatedSections.forEach((section) => {
        const children = visibleChildren(section);
        gsap.set(children, { y: 28, opacity: 0, willChange: "transform, opacity" });
      });

      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const section = entry.target as HTMLElement;
            const children = visibleChildren(section);
            gsap.to(children, {
              y: 0,
              opacity: 1,
              duration: 0.82,
              stagger: 0.085,
              ease: "power3.out",
              clearProps: "transform,opacity,willChange",
            });
            revealObserver?.unobserve(section);
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -14% 0px" },
      );

      animatedSections.forEach((section) => revealObserver?.observe(section));
    }

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      revealObserver?.disconnect();
      animatedSections.forEach((section) => gsap.killTweensOf(visibleChildren(section)));
    };
  }, [rootId, labels.length]);

  const safeIndex = Math.min(activeIndex, Math.max(0, labels.length - 1));

  return (
    <aside
      ref={railRef}
      className={styles.rail}
      data-route-scroll-system="true"
      data-active-index={safeIndex}
      aria-hidden="true"
    >
      <span className={styles.index}>{String(safeIndex + 1).padStart(2, "0")}</span>
      <div className={styles.track}>
        <i className={styles.fill} />
        {labels.map((label, index) => {
          const top = labels.length <= 1 ? 0 : (index / (labels.length - 1)) * 100;
          return (
            <span
              key={label}
              className={`${styles.node} ${index === safeIndex ? styles.nodeActive : ""}`}
              style={{ top: `${top}%` }}
            />
          );
        })}
      </div>
      <span className={styles.label}>{labels[safeIndex] ?? labels[0] ?? "ROUTE"}</span>
    </aside>
  );
}
