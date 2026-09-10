"use client";

import dynamic from "next/dynamic";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import styles from "./hero-lab.module.css";

const HeroLabCanvas = dynamic(() => import("./HeroLabCanvas"), { ssr: false });

export default function HeroLab() {
  return (
    <main className={styles.root}>
      <div className={styles.canvas} aria-hidden="true">
        <HeroLabCanvas />
      </div>
      <div className={styles.light} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.frame} aria-hidden="true">
        <i className={styles.cornerTl} />
        <i className={styles.cornerTr} />
        <i className={styles.cornerBl} />
        <i className={styles.cornerBr} />
      </div>

      <header className={styles.header}>
        <a href="#hero-lab" className={styles.brand} aria-label="BND Studio">
          <strong>BND</strong>
          <span>DIGITAL SYSTEMS</span>
        </a>

        <nav className={styles.nav} aria-label="Навигация Hero Lab">
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
        <div className={styles.kicker}>
          <span>01 / BND STUDIO</span>
          <i />
          <span>INDEPENDENT DIGITAL ATELIER</span>
        </div>

        <div className={styles.statement}>
          <h1>
            <span>Цифровые</span>
            <span className={styles.indent}>системы,</span>
            <span className={styles.muted}>собранные</span>
            <span className={styles.last}>в одно целое.</span>
          </h1>

          <div className={styles.support}>
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

        <aside className={styles.materialMeta} aria-hidden="true">
          <span>BND / MATERIAL FIELD</span>
          <b>001</b>
          <i />
          <small>GRAPHITE / SILVER / CHAMPAGNE</small>
        </aside>

        <div className={styles.systemList} aria-hidden="true">
          <span>STRATEGY</span>
          <span>PRODUCT</span>
          <span>MEDIA</span>
          <span>AUTOMATION</span>
        </div>

        <div className={styles.bottomRail}>
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
    </main>
  );
}
