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
  return window.matchMedia("(max-width: 760px)").matches ? 64 : 76;
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
          duration: 1.0,
          smoothWheel: true,
          touchMultiplier: 1,
          wheelMultiplier: 0.88,
          anchors: false,
        });

    const tick = (time: number) => lenis?.raf(time * 1000);

    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
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
        void document.fonts.ready.then(() => {
          requestAnimationFrame(() => settleHashPosition(hash));
        });
      }

      if (!immediate && !reducedMotion) {
        window.setTimeout(() => settleHashPosition(hash), 1080);
      }
    };

    const scrollToHash = (hash: string, immediate = false) => {
      const scene = sceneFromHash(hash);
      const target = targetFromHash(hash);

      if (scene) activateScene(scene);

      if (!target) {
        if (hash === "#hero" || !hash) {
          setScrollPosition(0, immediate);
        }
        return;
      }

      setScrollPosition(targetTop(target), immediate);
      queueSettle(hash, immediate);
    };

    const context = gsap.context(() => {
      if (!reducedMotion) {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.from(element, {
            y: 28,
            filter: "blur(5px)",
            duration: 0.95,
            ease: "power3.out",
            clearProps: "transform,filter",
            scrollTrigger: {
              trigger: element,
              start: "top 91%",
              once: true,
            },
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
