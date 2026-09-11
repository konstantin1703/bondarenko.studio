"use client";

import dynamic from "next/dynamic";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useLayoutEffect, useRef, useState } from "react";
import DeferredMaterialSurface from "@/components/system/DeferredMaterialSurface";
import styles from "./capabilities-lab.module.css";

const CapabilitiesLabCanvas = dynamic(() => import("./CapabilitiesLabCanvas"), { ssr: false });

const capabilities = [
  {
    title: "Цифровые системы",
    route: "WEB / PLATFORM / API",
    text: "Интерфейс, продуктовая логика и инфраструктура собираются как один контур — от первого экрана до интеграций и дальнейшего масштабирования.",
    modules: ["Сайты", "Платформы", "API", "Интеграции", "Масштабирование"],
    code: "SYSTEMS",
  },
  {
    title: "Медиа-проекты",
    route: "CONTENT / CHANNELS / DISTRIBUTION",
    text: "Контент, площадки и дистрибуция проектируются вместе, чтобы сайт, Telegram, YouTube и форматы усиливали один и тот же смысл.",
    modules: ["Контент", "YouTube", "Telegram", "Shorts", "Дистрибуция"],
    code: "MEDIA",
  },
  {
    title: "Автоматизация",
    route: "BOTS / CRM / AI",
    text: "Ручные операции, данные и коммуникации превращаются в измеримый сценарий — с ботами, CRM, AI и связями между системами.",
    modules: ["Telegram-боты", "CRM", "AI", "Webhooks", "Внутренние инструменты"],
    code: "AUTOMATION",
  },
] as const;

export default function CapabilitiesLab() {
  const [active, setActive] = useState(0);
  const detailRef = useRef<HTMLDivElement>(null);
  const current = capabilities[active];

  useLayoutEffect(() => {
    if (!detailRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline
        .fromTo(
          "[data-capability-route]",
          { scaleX: 0.28, transformOrigin: "left center" },
          { scaleX: 1, duration: 0.68, clearProps: "transform" },
          0,
        )
        .fromTo(
          "[data-capability-detail]",
          { y: 14, opacity: 0.2 },
          { y: 0, opacity: 1, duration: 0.56, clearProps: "transform,opacity" },
          0.04,
        )
        .fromTo(
          "[data-capability-module]",
          { x: -8, opacity: 0.25 },
          { x: 0, opacity: 1, duration: 0.44, stagger: 0.045, clearProps: "transform,opacity" },
          0.13,
        );
    }, detailRef);

    return () => context.revert();
  }, [active]);

  return (
    <section id="capabilities" className={styles.root} aria-labelledby="capabilities-title">
      <div className={styles.canvas} aria-hidden="true">
        <DeferredMaterialSurface name="capabilities">
          <CapabilitiesLabCanvas active={active} />
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
            <span>03 / CAPABILITIES</span>
            <i />
            <span>SYSTEM ROUTING</span>
          </div>

          <div className={styles.headingGrid}>
            <h2 id="capabilities-title">
              Одна система.<br />
              <em>Три контура.</em>
            </h2>
            <p>
              Под задачу подключаются только необходимые контуры. Они не живут
              как отдельные услуги — маршрут сходится в один работающий продукт.
            </p>
          </div>
        </header>

        <div className={styles.routing}>
          <div className={styles.routes} role="group" aria-label="Контуры возможностей">
            {capabilities.map((capability, index) => {
              const selected = active === index;
              return (
                <button
                  key={capability.title}
                  type="button"
                  className={`${styles.routeRow} ${selected ? styles.active : ""}`}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  aria-pressed={selected}
                >
                  <span className={styles.routeIndex}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.routeTitle}>{capability.title}</span>
                  <span className={styles.routeCode}>{capability.route}</span>
                  <span className={styles.routeLine} aria-hidden="true"><i /></span>
                  <span className={styles.routeNode} aria-hidden="true" />
                </button>
              );
            })}
          </div>

          <aside ref={detailRef} className={styles.detail} aria-live="polite">
            <div className={styles.detailTop}>
              <span>ACTIVE ROUTE</span>
              <b>0{active + 1}</b>
            </div>

            <div className={styles.detailRoute} data-capability-route aria-hidden="true" />

            <div key={current.title} className={styles.detailBody} data-capability-detail>
              <span className={styles.detailCode}>{current.code}</span>
              <strong>{current.title}</strong>
              <p>{current.text}</p>

              <div className={styles.payload} role="list" aria-label={`Модули: ${current.title}`}>
                {current.modules.map((module, index) => (
                  <div key={module} role="listitem" data-capability-module className={styles.payloadItem}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <b>{module}</b>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.output} aria-hidden="true">
              <span>ROUTE</span>
              <i />
              <span>ASSEMBLY</span>
              <i />
              <b>OUTPUT / 01</b>
            </div>
          </aside>
        </div>

        <footer className={styles.bottom}>
          <div>
            <span>INPUT</span>
            <i />
            <span>ROUTING</span>
            <i />
            <span>OUTPUT</span>
          </div>

          <a href="#brief">
            <span>Дальше: собрать проект</span>
            <ArrowDownRight aria-hidden="true" />
          </a>

          <a className={styles.projectLink} href="#brief">
            <span>Открыть бриф</span>
            <ArrowUpRight aria-hidden="true" />
          </a>
        </footer>
      </div>
    </section>
  );
}
