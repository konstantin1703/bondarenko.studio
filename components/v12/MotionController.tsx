"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const scenes = ["hero", "diagnostics", "capabilities", "brief"] as const;

type SceneName = (typeof scenes)[number];

function activateScene(scene: SceneName) {
  document.documentElement.dataset.scene = scene;
  window.dispatchEvent(
    new CustomEvent("bnd:scene", {
      detail: { scene },
    }),
  );
}

export default function MotionController() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    activateScene("hero");

    const lenis = reducedMotion
      ? null
      : new Lenis({
          duration: 1.05,
          smoothWheel: true,
          touchMultiplier: 1,
          wheelMultiplier: 0.9,
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
          gsap.fromTo(
            element,
            { y: 34, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.05,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 88%",
                once: true,
              },
            },
          );
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
