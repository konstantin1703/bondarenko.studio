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

function resolveHashTarget() {
  const hash = window.location.hash;
  if (!hash || hash === "#hero") return null;
  try {
    return document.querySelector<HTMLElement>(hash);
  } catch {
    return null;
  }
}

export default function MotionController() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    activateScene("hero");

    const lenis = reducedMotion
      ? null
      : new Lenis({
          duration: 1.0,
          smoothWheel: true,
          touchMultiplier: 1,
          wheelMultiplier: 0.88,
          anchors: { offset: -74 },
        });

    const tick = (time: number) => lenis?.raf(time * 1000);

    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

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

    const hashTarget = resolveHashTarget();
    if (hashTarget) {
      requestAnimationFrame(() => {
        if (lenis) {
          lenis.scrollTo(hashTarget, { immediate: true, offset: -74 });
        } else {
          window.scrollTo({ top: Math.max(0, hashTarget.offsetTop - 74), behavior: "auto" });
        }
        ScrollTrigger.refresh();
      });
    }

    return () => {
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
