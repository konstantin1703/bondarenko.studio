"use client";

import dynamic from "next/dynamic";
import { ArrowRight, ArrowUp } from "lucide-react";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import DeferredMaterialSurface from "@/components/system/DeferredMaterialSurface";
import styles from "./footer-lab.module.css";

const FooterLabCanvas = dynamic(() => import("./FooterLabCanvas"), { ssr: false });

export default function FooterLab() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let context: gsap.Context | null = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || context) return;
        context = gsap.context(() => {
          const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
          timeline
            .fromTo("[data-footer-kicker]", { opacity: 0.22, x: -8 }, { opacity: 1, x: 0, duration: 0.38 })
            .fromTo("[data-footer-title]", { opacity: 0.34, y: 22 }, { opacity: 1, y: 0, duration: 0.68 }, 0.03)
            .fromTo("[data-footer-copy]", { opacity: 0.18, y: 12 }, { opacity: 1, y: 0, duration: 0.48 }, 0.12)
            .fromTo("[data-footer-route] > *", { opacity: 0.20, y: 6 }, { opacity: 1, y: 0, duration: 0.38, stagger: 0.045 }, 0.16)
            .fromTo("[data-footer-wordmark] span", { opacity: 0.22, yPercent: 12 }, { opacity: 1, yPercent: 0, duration: 0.68, stagger: 0.05 }, 0.20);
        }, root);
        observer.disconnect();
      },
      { threshold: 0.08, rootMargin: "0px 0px 18% 0px" },
    );

    observer.observe(root);
    return () => {
      observer.disconnect();
      context?.revert();
    };
  }, []);

  return (
    <footer id="footer" ref={rootRef} className={styles.root} aria-labelledby="footer-title">
      <div className={styles.canvas} aria-hidden="true">
        <DeferredMaterialSurface name="footer">
          <FooterLabCanvas />
        </DeferredMaterialSurface>
      </div>
      <div className={styles.light} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.frame} aria-hidden="true">
        <i className={styles.cornerTl} />
        <i className={styles.cornerTr} />
        <i className={styles.cornerBl} />
        <i className={styles.cornerBr} />
      </div>

      <div className={styles.shell}>
        <div className={styles.topline} data-footer-kicker>
          <span>05 / RESOLUTION</span>
          <i />
          <span>SYSTEM / COMPLETE</span>
        </div>

        <div className={styles.hero}>
          <div>
            <h2 id="footer-title" data-footer-title>
              Из разрозненных частей —<br />
              <em>в одну работающую систему.</em>
            </h2>
            <p data-footer-copy>
              Если задача уже понятна — соберите состав проекта в спецификации. Если нет — вернитесь к диагностике и начните с точки, где сейчас теряется результат.
            </p>
          </div>

          <div className={styles.actions} data-footer-copy>
            <a className={styles.primary} href="#brief">
              <span>Собрать проект</span>
              <ArrowRight aria-hidden="true" />
            </a>
            <a className={styles.secondary} href="#diagnostics">
              Вернуться к диагностике
            </a>
          </div>
        </div>

        <div className={styles.route} data-footer-route aria-label="Логика системы">
          <span><small>01</small><strong>DIAGNOSE</strong></span>
          <i />
          <span><small>02</small><strong>ROUTE</strong></span>
          <i />
          <span><small>03</small><strong>ASSEMBLE</strong></span>
          <i />
          <span className={styles.routeFinal}><small>04</small><strong>RESOLVE</strong></span>
        </div>

        <div className={styles.wordmark} data-footer-wordmark aria-label="BND Studio">
          <span>B</span><span>N</span><span>D</span>
        </div>

        <div className={styles.bottom}>
          <div>
            <strong>BND</strong>
            <span>DIGITAL SYSTEMS</span>
          </div>
          <p>Системы / медиа / автоматизация</p>
          <div>
            <a href="#hero"><ArrowUp aria-hidden="true" />Наверх</a>
            <span>© 2026 BND Studio</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
