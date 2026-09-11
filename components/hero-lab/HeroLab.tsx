"use client";

import dynamic from "next/dynamic";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import styles from "./hero-lab.module.css";

const HeroLabCanvas = dynamic(() => import("./HeroLabCanvas"), { ssr: false });

export default function HeroLab() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power4.out" } });

      timeline
        .fromTo("[data-hero-nav]", { y: -16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.04)
        .fromTo("[data-hero-frame]", { opacity: 0 }, { opacity: 1, duration: 0.95 }, 0.04)
        .fromTo("[data-hero-canvas]", { opacity: 0 }, { opacity: 1, duration: 1.35 }, 0.1)
        .fromTo("[data-hero-kicker]", { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 }, 0.18)
        .fromTo(
          "[data-hero-line] > b",
          { yPercent: 112, rotate: 1.15 },
          { yPercent: 0, rotate: 0, duration: 1.02, stagger: 0.075, clearProps: "transform" },
          0.2,
        )
        .fromTo("[data-hero-support]", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.74 }, 0.63)
        .fromTo("[data-hero-meta]", { x: 16, opacity: 0 }, { x: 0, opacity: 1, duration: 0.74 }, 0.72)
        .fromTo("[data-hero-bottom]", { y: 9, opacity: 0 }, { y: 0, opacity: 1, duration: 0.62 }, 0.84);
    }, rootRef);

    return () => context.revert();
  }, []);

  return (
    <div id="hero" ref={rootRef} className={styles.root}>
      <div className={styles.canvas} data-hero-canvas aria-hidden="true">
        <HeroLabCanvas />
      </div>
      <div className={styles.light} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.frame} data-hero-frame aria-hidden="true">
        <i className={styles.cornerTl} />
        <i className={styles.cornerTr} />
        <i className={styles.cornerBl} />
        <i className={styles.cornerBr} />
      </div>

      <header className={styles.header} data-hero-nav>
        <a href="#hero" className={styles.brand} aria-label="BND Studio — наверх">
          <strong>BND</strong>
          <span>DIGITAL SYSTEMS</span>
        </a>

        <nav className={styles.nav} aria-label="Навигация BND Studio">
          <a href="#diagnostics">Диагностика</a>
          <a href="#capabilities">Возможности</a>
          <a href="#brief">Бриф</a>
        </nav>

        <a href="#brief" className={styles.headerAction}>
          Обсудить проект
          <ArrowUpRight aria-hidden="true" />
        </a>
      </header>

      <section id="hero-lab" className={styles.stage}>
        <div className={styles.kicker} data-hero-kicker>
          <span>01 / BND STUDIO</span>
          <i />
          <span>INDEPENDENT DIGITAL ATELIER</span>
        </div>

        <div className={styles.statement}>
          <h1 aria-label="Цифровые системы, собранные в одно целое.">
            <span data-hero-line><b>Цифровые</b></span>
            <span className={styles.indent} data-hero-line><b>системы,</b></span>
            <span className={styles.muted} data-hero-line><b>собранные</b></span>
            <span className={styles.last} data-hero-line><b>в одно целое.</b></span>
          </h1>

          <div className={styles.support} data-hero-support>
            <p>
              Стратегия, интерфейс, контент, Telegram, AI и автоматизация —
              проектируем как один работающий контур под конкретную задачу.
            </p>

            <a href="#brief" className={styles.primaryAction}>
              <span>Собрать проект</span>
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>

        <aside className={styles.materialMeta} data-hero-meta aria-hidden="true">
          <span>BND / MATERIAL FIELD</span>
          <b>001</b>
          <i />
          <small>GRAPHITE / SILVER / CHAMPAGNE</small>
        </aside>

        <div className={styles.systemList} data-hero-meta aria-hidden="true">
          <span>STRATEGY</span>
          <span>PRODUCT</span>
          <span>MEDIA</span>
          <span>AUTOMATION</span>
        </div>

        <div className={styles.bottomRail} data-hero-bottom>
          <div>
            <span>WEB</span>
            <span>MEDIA</span>
            <span>AI</span>
            <span>AUTOMATION</span>
          </div>

          <a href="#diagnostics" className={styles.scrollCue}>
            <span>Смотреть систему</span>
            <ArrowDownRight aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  );
}
