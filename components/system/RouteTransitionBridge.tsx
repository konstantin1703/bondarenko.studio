"use client";

import gsap from "gsap";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./route-transition.module.css";

const ROUTE_LABELS: Record<string, string> = {
  "/": "HOME",
  "/studio": "STUDIO",
  "/systems": "SYSTEMS",
  "/brief": "BRIEF",
};

const ROUTE_FOCUS_TARGETS: Record<string, string> = {
  "/": "main-content",
  "/studio": "studio-main",
  "/systems": "systems-main",
  "/brief": "brief-main",
};

function routeLabel(url: URL) {
  if (url.hash === "#brief") return "BRIEF";
  const inferred = url.pathname.replace(/^\//, "").toUpperCase();
  return (ROUTE_LABELS[url.pathname] ?? inferred) || "HOME";
}

function pathnameLabel(pathname: string) {
  const inferred = pathname.replace(/^\//, "").toUpperCase();
  return (ROUTE_LABELS[pathname] ?? inferred) || "HOME";
}

function isPlainInternalNavigation(event: MouseEvent, anchor: HTMLAnchorElement) {
  if (event.defaultPrevented || event.button !== 0) return false;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
  if (anchor.target && anchor.target !== "_self") return false;
  if (anchor.hasAttribute("download")) return false;

  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) {
    return false;
  }

  return true;
}

export default function RouteTransitionBridge() {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const upperRef = useRef<HTMLDivElement>(null);
  const lowerRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const pendingRef = useRef(false);
  const previousPathRef = useRef(pathname);
  const [destinationLabel, setDestinationLabel] = useState("SYSTEM");
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const anchor = target?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || !isPlainInternalNavigation(event, anchor)) return;

      const destination = new URL(anchor.href, window.location.href);
      if (destination.origin !== window.location.origin) return;
      if (destination.pathname.startsWith("/api/") || destination.pathname.startsWith("/_next/")) return;
      if (destination.pathname === window.location.pathname) return;

      const destinationHref = `${destination.pathname}${destination.search}${destination.hash}`;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reducedMotion) {
        event.preventDefault();
        event.stopPropagation();
        router.push(destinationHref);
        return;
      }

      const overlay = overlayRef.current;
      const upper = upperRef.current;
      const lower = lowerRef.current;
      const meta = metaRef.current;
      if (!overlay || !upper || !lower || !meta || pendingRef.current) return;

      event.preventDefault();
      event.stopPropagation();

      pendingRef.current = true;
      setDestinationLabel(routeLabel(destination));
      overlay.dataset.state = "covering";
      overlay.style.pointerEvents = "auto";

      gsap.killTweensOf([upper, lower, meta]);
      gsap
        .timeline({ defaults: { ease: "power3.inOut" } })
        .to(upper, { yPercent: 0, duration: 0.42 }, 0)
        .to(lower, { yPercent: 0, duration: 0.42 }, 0)
        .to(meta, { opacity: 1, y: 0, duration: 0.24, ease: "power2.out" }, 0.16)
        .call(() => {
          router.push(destinationHref);
        });
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [router]);

  useEffect(() => {
    if (previousPathRef.current === pathname) return;
    previousPathRef.current = pathname;

    let frame = 0;
    let settleTimer = 0;
    let verifyTimer = 0;
    let cancelled = false;
    let attempts = 0;
    const exactTargetId = ROUTE_FOCUS_TARGETS[pathname];

    const announce = () => setAnnouncement(`${pathnameLabel(pathname)} — страница открыта`);

    const handOffFocus = () => {
      if (cancelled) return;

      const focusTarget = exactTargetId
        ? document.getElementById(exactTargetId)
        : document.querySelector<HTMLElement>("main");

      if (!focusTarget) {
        attempts += 1;
        if (attempts < 60) frame = requestAnimationFrame(handOffFocus);
        return;
      }

      settleTimer = window.setTimeout(() => {
        if (cancelled) return;
        if (!focusTarget.isConnected) {
          attempts += 1;
          if (attempts < 60) frame = requestAnimationFrame(handOffFocus);
          return;
        }

        focusTarget.focus({ preventScroll: true });

        verifyTimer = window.setTimeout(() => {
          if (cancelled) return;
          if (document.activeElement === focusTarget) {
            announce();
            return;
          }

          const activeElement = document.activeElement;
          const navigationResetFocus = !activeElement
            || activeElement === document.body
            || activeElement === document.documentElement;

          if (navigationResetFocus && attempts < 12) {
            attempts += 1;
            frame = requestAnimationFrame(handOffFocus);
            return;
          }

          // Do not steal focus if the user has already moved to another meaningful control.
          announce();
        }, 60);
      }, 90);
    };

    frame = requestAnimationFrame(handOffFocus);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.clearTimeout(settleTimer);
      window.clearTimeout(verifyTimer);
    };
  }, [pathname]);

  useEffect(() => {
    if (!pendingRef.current) return;

    const overlay = overlayRef.current;
    const upper = upperRef.current;
    const lower = lowerRef.current;
    const meta = metaRef.current;
    if (!overlay || !upper || !lower || !meta) return;

    pendingRef.current = false;
    overlay.dataset.state = "revealing";

    const frame = requestAnimationFrame(() => {
      gsap.killTweensOf([upper, lower, meta]);
      gsap
        .timeline({ defaults: { ease: "power3.inOut" } })
        .to(meta, { opacity: 0, y: -6, duration: 0.18, ease: "power2.in" }, 0)
        .to(upper, { yPercent: -100, duration: 0.5 }, 0.05)
        .to(lower, { yPercent: 100, duration: 0.5 }, 0.05)
        .call(() => {
          overlay.dataset.state = "idle";
          overlay.style.pointerEvents = "none";
        });
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <>
      <p
        className={styles.announcer}
        data-route-announcer="true"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </p>
      <div
        ref={overlayRef}
        className={styles.root}
        data-route-transition="true"
        data-state="idle"
        aria-hidden="true"
      >
        <div ref={upperRef} className={`${styles.panel} ${styles.upper}`} />
        <div ref={lowerRef} className={`${styles.panel} ${styles.lower}`} />
        <div ref={metaRef} className={styles.meta}>
          <span>BND / ROUTE</span>
          <i />
          <strong>{destinationLabel}</strong>
        </div>
        <span className={`${styles.corner} ${styles.cornerLeft}`} />
        <span className={`${styles.corner} ${styles.cornerRight}`} />
      </div>
    </>
  );
}
