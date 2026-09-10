"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const scenes = ["hero", "diagnostics", "capabilities", "brief"] as const;
type SceneName = (typeof scenes)[number];

function activateScene(scene: SceneName) {
  document.documentElement.dataset.scene = scene;
  window.dispatchEvent(new CustomEvent("bnd:scene", { detail: { scene } }));
}

function sceneFromHash(hash = window.location.hash): SceneName | null {
  const value = hash.replace(/^#/, "");
  return scenes.includes(value as SceneName) ? (value as SceneName) : null;
}

function targetFromHash(hash = window.location.hash) {
  if (!hash || hash === "#hero") return null;
  try {
    return document.querySelector<HTMLElement>(hash);
  } catch {
    return null;
  }
}

function headerOffset() {
  return window.matchMedia("(max-width: 820px)").matches ? 64 : 74;
}

function targetTop(target: HTMLElement) {
  return Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerOffset());
}

export default function MotionController() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const initialScene = sceneFromHash() ?? "hero";
    activateScene(initialScene);

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const lenis = reducedMotion
      ? null
      : new Lenis({
          duration: 1.08,
          smoothWheel: true,
          touchMultiplier: 1.03,
          wheelMultiplier: 0.86,
          anchors: false,
        });

    const tick = (time: number) => lenis?.raf(time * 1000);

    const updateProgress = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / max));
      document.documentElement.style.setProperty("--v13-scroll", progress.toFixed(4));
    };

    if (lenis) {
      lenis.on("scroll", () => {
        ScrollTrigger.update();
        updateProgress();
      });
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    } else {
      window.addEventListener("scroll", updateProgress, { passive: true });
    }

    const setScrollPosition = (top: number, immediate: boolean) => {
      if (lenis) {
        lenis.scrollTo(top, { immediate });
      } else {
        window.scrollTo({ top, behavior: immediate || reducedMotion ? "auto" : "smooth" });
      }
    };

    const settleHashPosition = (hash: string) => {
      const target = targetFromHash(hash);
      if (!target) return;
      const delta = target.getBoundingClientRect().top - headerOffset();
      if (Math.abs(delta) > 0.75) {
        setScrollPosition(Math.max(0, window.scrollY + delta), true);
      }
      ScrollTrigger.refresh();
      ScrollTrigger.update();
    };

    const queueSettle = (hash: string, immediate: boolean) => {
      requestAnimationFrame(() => requestAnimationFrame(() => settleHashPosition(hash)));
      if (document.fonts?.ready) {
        void document.fonts.ready.then(() => requestAnimationFrame(() => settleHashPosition(hash)));
      }
      if (!immediate && !reducedMotion) window.setTimeout(() => settleHashPosition(hash), 1120);
    };

    const scrollToHash = (hash: string, immediate = false) => {
      const scene = sceneFromHash(hash);
      const target = targetFromHash(hash);
      if (scene) activateScene(scene);
      if (!target) {
        if (hash === "#hero" || !hash) setScrollPosition(0, immediate);
        return;
      }
      setScrollPosition(targetTop(target), immediate);
      queueSettle(hash, immediate);
    };

    const context = gsap.context(() => {
      if (!reducedMotion) {
        const intro = gsap.timeline({ defaults: { ease: "power4.out" } });

        intro
          .from(".v12-header", { y: -24, opacity: 0, duration: 0.8 }, 0.05)
          .from(".v13-hero__kicker", { y: 14, opacity: 0, duration: 0.72 }, 0.16)
          .from(
            ".v13-hero__line b",
            {
              yPercent: 112,
              rotate: 1.5,
              filter: "blur(8px)",
              duration: 1.05,
              stagger: 0.085,
              clearProps: "transform,filter",
            },
            0.18,
          )
          .from(".v13-hero__support", { y: 24, opacity: 0, duration: 0.8 }, 0.64)
          .from(
            ".v13-hero__material",
            { x: 34, scale: 0.965, opacity: 0, filter: "blur(9px)", duration: 1.15, clearProps: "transform,filter" },
            0.44,
          )
          .from(".v13-hero__bottom", { y: 12, opacity: 0, duration: 0.65 }, 0.78);

        gsap.to(".v13-hero__material", {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.1,
          },
        });

        gsap.to(".v13-hero__copy", {
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.1,
          },
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          if (element.closest("#hero")) return;
          gsap.from(element, {
            y: 34,
            scale: 0.988,
            filter: "blur(7px)",
            duration: 1.05,
            ease: "power3.out",
            clearProps: "transform,filter",
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
              once: true,
            },
          });
        });

        gsap.utils.toArray<HTMLElement>(".v12-diagnostic-row").forEach((row, index) => {
          gsap.from(row, {
            x: -22,
            opacity: 0.25,
            duration: 0.72,
            delay: index * 0.035,
            clearProps: "transform,opacity",
            scrollTrigger: { trigger: ".v12-diagnostics__grid", start: "top 82%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>(".v12-capability").forEach((row, index) => {
          gsap.from(row, {
            y: 30,
            opacity: 0.3,
            duration: 0.82,
            delay: index * 0.06,
            clearProps: "transform,opacity",
            scrollTrigger: { trigger: row, start: "top 92%", once: true },
          });
        });
      }

      scenes.forEach((scene) => {
        const section = document.querySelector<HTMLElement>(`[data-scene="${scene}"]`);
        if (!section) return;
        ScrollTrigger.create({
          trigger: section,
          start: "top 58%",
          end: "bottom 42%",
          onEnter: () => activateScene(scene),
          onEnterBack: () => activateScene(scene),
        });
      });
    });

    updateProgress();
    ScrollTrigger.refresh();

    if (window.location.hash) {
      requestAnimationFrame(() => scrollToHash(window.location.hash, true));
    }

    const handleAnchorClick = (event: MouseEvent) => {
      const origin = event.target;
      if (!(origin instanceof Element)) return;
      const anchor = origin.closest<HTMLAnchorElement>('a[href^="#"]');
      const hash = anchor?.getAttribute("href");
      if (!anchor || !hash || hash === "#") return;
      const scene = sceneFromHash(hash);
      if (!scene) return;
      event.preventDefault();
      if (window.location.hash !== hash) window.history.pushState(null, "", hash);
      scrollToHash(hash, false);
    };

    const handleHashChange = () => scrollToHash(window.location.hash, false);

    document.addEventListener("click", handleAnchorClick);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("scroll", updateProgress);
      context.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (lenis) {
        gsap.ticker.remove(tick);
        lenis.destroy();
      }
    };
  }, []);

  return null;
}
