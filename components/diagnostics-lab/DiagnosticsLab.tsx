"use client";

import dynamic from "next/dynamic";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { Fragment, useLayoutEffect, useRef, useState } from "react";
import DeferredMaterialSurface from "@/components/system/DeferredMaterialSurface";
import styles from "./diagnostics-lab.module.css";

const DiagnosticsLabCanvas = dynamic(() => import("./DiagnosticsLabCanvas"), { ssr: false });

const problems = [
  {
    title: "Медленный сайт",
    route: "ПРОИЗВОДИТЕЛЬНОСТЬ / UX / АРХИТЕКТУРА",
    text: "Скорость, структура и технический долг съедают доверие ещё до того, как пользователь успевает понять предложение.",
    signal: "ЗАДЕРЖКА",
  },
  {
    title: "Слабая упаковка",
    route: "СТРАТЕГИЯ / КОНТЕНТ / АЙДЕНТИКА",
    text: "Сильный продукт не считывается, если смысл, визуал и предложение не складываются в одну ясную систему.",
    signal: "ЯСНОСТЬ",
  },
  {
    title: "Ручная рутина",
    route: "АВТОМАТИЗАЦИЯ / AI / CRM",
    text: "Повторяющиеся операции забирают время и создают лишние точки отказа там, где должен работать сценарий.",
    signal: "ТРЕНИЕ",
  },
  {
    title: "Разрозненный контент",
    route: "МЕДИА / ДИСТРИБУЦИЯ / АНАЛИТИКА",
    text: "Сайт, Telegram, YouTube и материалы существуют отдельно и не усиливают друг друга как единый медиа-контур.",
    signal: "РАЗРЫВ",
  },
  {
    title: "Нет автоматизации",
    route: "БОТЫ / API / ИНТЕГРАЦИИ",
    text: "Заявки, данные и коммуникации двигаются вручную вместо связанного процесса, который можно измерять и развивать.",
    signal: "РУЧНОЙ ТРУД",
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

  function previewOnFinePointer(index: number) {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) setActive(index);
  }

  return (
    <section id="diagnostics" className={styles.root} aria-labelledby="diagnostics-title">
      <div className={styles.canvas} aria-hidden="true">
        <DeferredMaterialSurface name="diagnostics">
          <DiagnosticsLabCanvas active={active} />
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
        <header className={styles.heading}>
          <div className={styles.kicker}>
            <span>02 / ДИАГНОСТИКА</span>
            <i />
            <span>КАРТА ПОТЕРЬ</span>
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
          <div className={styles.list} role="group" aria-label="Диагностические состояния">
            {problems.map((problem, index) => {
              const selected = active === index;
              const detailId = `diagnostic-mobile-detail-${index}`;
              return (
                <Fragment key={problem.title}>
                  <button
                    type="button"
                    className={`${styles.row} ${selected ? styles.active : ""}`}
                    onMouseEnter={() => previewOnFinePointer(index)}
                    onClick={() => setActive(index)}
                    aria-pressed={selected}
                    aria-expanded={selected}
                    aria-controls={detailId}
                  >
                    <span className={styles.rowIndex}>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{problem.title}</strong>
                    <span className={styles.rowSignal}>{problem.signal}</span>
                    <i aria-hidden="true" />
                  </button>
                  {selected ? (
                    <div id={detailId} className={styles.mobileDetail} aria-live="polite">
                      <span>{problem.route}</span>
                      <p>{problem.text}</p>
                    </div>
                  ) : null}
                </Fragment>
              );
            })}
          </div>

          <aside ref={detailRef} className={styles.detail} aria-live="polite">
            <div className={styles.detailTop}>
              <span>АКТИВНАЯ ПОТЕРЯ</span>
              <b>0{active + 1}</b>
            </div>
            <div className={styles.route} data-diagnostic-route aria-hidden="true" />
            <div key={current.title} data-diagnostic-detail className={styles.detailBody}>
              <span className={styles.routeLabel}>{current.route}</span>
              <strong>{current.title}</strong>
              <p>{current.text}</p>
            </div>
            <div className={styles.measure} aria-hidden="true">
              <span>ВХОД</span>
              <i />
              <span>РАЗРЫВ</span>
              <i />
              <span>МАРШРУТ</span>
            </div>
          </aside>
        </div>

        <footer className={styles.bottom}>
          <div>
            <span>ХАОС</span>
            <i />
            <span>СТРУКТУРА</span>
            <i />
            <span>СИСТЕМА</span>
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
