"use client";

import dynamic from "next/dynamic";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useLayoutEffect, useRef, useState } from "react";
import styles from "./diagnostics-lab.module.css";

const DiagnosticsLabCanvas = dynamic(() => import("./DiagnosticsLabCanvas"), { ssr: false });

const problems = [
  {
    title: "Медленный сайт",
    route: "PERFORMANCE / UX / ARCHITECTURE",
    text: "Скорость, структура и технический долг съедают доверие ещё до того, как пользователь успевает понять предложение.",
    signal: "LATENCY",
  },
  {
    title: "Слабая упаковка",
    route: "STRATEGY / CONTENT / IDENTITY",
    text: "Сильный продукт не считывается, если смысл, визуал и предложение не складываются в одну ясную систему.",
    signal: "CLARITY",
  },
  {
    title: "Ручная рутина",
    route: "AUTOMATION / AI / CRM",
    text: "Повторяющиеся операции забирают время и создают лишние точки отказа там, где должен работать сценарий.",
    signal: "FRICTION",
  },
  {
    title: "Разрозненный контент",
    route: "MEDIA / DISTRIBUTION / ANALYTICS",
    text: "Сайт, Telegram, YouTube и материалы существуют отдельно и не усиливают друг друга как единый медиа-контур.",
    signal: "DISCONNECT",
  },
  {
    title: "Нет автоматизации",
    route: "BOTS / API / INTEGRATIONS",
    text: "Заявки, данные и коммуникации двигаются вручную вместо связанного процесса, который можно измерять и развивать.",
    signal: "MANUAL LOAD",
  },
] as const;

export default function DiagnosticsLab() {
  const [active, setActive] = useState(0);
  const detailRef = useRef<HTMLDivElement>(null);
  const current = problems[active];

  useLayoutEffect(() => {
    if (!detailRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-diagnostic-detail]",
        { y: 16, opacity: 0.2 },
        { y: 0, opacity: 1, duration: 0.58, ease: "power3.out", clearProps: "transform,opacity" },
      );
      gsap.fromTo(
        "[data-diagnostic-route]",
        { scaleX: 0.35, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.72, ease: "power3.out", clearProps: "transform" },
      );
    }, detailRef);

    return () => context.revert();
  }, [active]);

  return (
    <section id="diagnostics" className={styles.root} aria-labelledby="diagnostics-title">
      <div className={styles.canvas} aria-hidden="true">
        <DiagnosticsLabCanvas active={active} />
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
        <header className={styles.heading}>
          <div className={styles.kicker}>
            <span>02 / DIAGNOSTICS</span>
            <i />
            <span>LOSS MAPPING</span>
          </div>
          <div className={styles.headingGrid}>
            <h2 id="diagnostics-title">
              Где система<br />
              <em>теряет результат.</em>
            </h2>
            <p>
              Не начинаем с перечня услуг. Сначала находим разрыв — в скорости,
              смысле, контенте или процессе — и только потом собираем маршрут.
            </p>
          </div>
        </header>

        <div className={styles.instrument}>
          <div className={styles.list} role="list" aria-label="Диагностические состояния">
            {problems.map((problem, index) => {
              const selected = active === index;
              return (
                <button
                  key={problem.title}
                  type="button"
                  className={`${styles.row} ${selected ? styles.active : ""}`}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  aria-pressed={selected}
                >
                  <span className={styles.rowIndex}>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{problem.title}</strong>
                  <span className={styles.rowSignal}>{problem.signal}</span>
                  <i aria-hidden="true" />
                </button>
              );
            })}
          </div>

          <aside ref={detailRef} className={styles.detail} aria-live="polite">
            <div className={styles.detailTop}>
              <span>ACTIVE LOSS</span>
              <b>0{active + 1}</b>
            </div>
            <div className={styles.route} data-diagnostic-route aria-hidden="true" />
            <div key={current.title} data-diagnostic-detail className={styles.detailBody}>
              <span className={styles.routeLabel}>{current.route}</span>
              <strong>{current.title}</strong>
              <p>{current.text}</p>
            </div>
            <div className={styles.measure} aria-hidden="true">
              <span>INPUT</span>
              <i />
              <span>LOSS</span>
              <i />
              <span>ROUTE</span>
            </div>
          </aside>
        </div>

        <footer className={styles.bottom}>
          <div>
            <span>CHAOS</span>
            <i />
            <span>STRUCTURE</span>
            <i />
            <span>SYSTEM</span>
          </div>
          <a href="#capabilities">
            <span>Дальше: возможности</span>
            <ArrowDownRight aria-hidden="true" />
          </a>
          <a className={styles.projectLink} href="#brief">
            <span>Собрать проект</span>
            <ArrowUpRight aria-hidden="true" />
          </a>
        </footer>
      </div>
    </section>
  );
}
