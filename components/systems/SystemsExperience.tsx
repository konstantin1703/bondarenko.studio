"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowDownRight, ArrowLeft, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useLayoutEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import styles from "./systems.module.css";
import mobileStyles from "./systems-mobile.module.css";

const CapabilitiesLabCanvas = dynamic(
  () => import("@/components/capabilities-lab/CapabilitiesLabCanvas"),
  { ssr: false },
);

const ROUTES = [
  {
    code: "01",
    slug: "digital",
    name: "ЦИФРОВЫЕ СИСТЕМЫ",
    short: "САЙТЫ / ПРОДУКТЫ",
    title: "Web / продукт / платформа",
    intro: "Цифровая поверхность, продуктовая логика и интеграции проектируются как один маршрут — от первого взаимодействия до production-инфраструктуры.",
    modules: ["Архитектура интерфейса", "Web / Next.js", "Продуктовая логика", "API / интеграции", "Производительность / QA", "Развёртывание"],
    output: "ЦИФРОВОЙ ПРОДУКТ",
  },
  {
    code: "02",
    slug: "media",
    name: "МЕДИА-СИСТЕМЫ",
    short: "КОНТЕНТ / КАНАЛЫ",
    title: "Контент / каналы / дистрибуция",
    intro: "Смысл, форматы и площадки строятся вокруг одной системы дистрибуции: сайт, Telegram, видео и короткие форматы не спорят между собой.",
    modules: ["Архитектура контента", "YouTube", "Telegram", "Короткие форматы", "Публикационный процесс", "Дистрибуция"],
    output: "МЕДИА-КОНТУР",
  },
  {
    code: "03",
    slug: "automation",
    name: "АВТОМАТИЗАЦИЯ",
    short: "AI / БОТЫ / ПРОЦЕССЫ",
    title: "AI / боты / операции",
    intro: "Ручные операции превращаются в сценарии с понятными входами, состояниями и выходами — без магии вокруг AI и без хрупких связок.",
    modules: ["Telegram-боты", "AI-сценарии", "CRM", "Webhooks", "Внутренние инструменты", "Мониторинг"],
    output: "РАБОЧИЙ ПРОЦЕСС",
  },
] as const;

const LAYERS = [
  ["ВХОД", "Задача, аудитория, контекст и ограничения."],
  ["ЛОГИКА", "Сценарии, данные, состояния и правила поведения."],
  ["ИНТЕРФЕЙС", "Интерфейс, контент, каналы и материальный язык."],
  ["ЭКСПЛУАТАЦИЯ", "Интеграции, доставка, QA, телеметрия и поддержка."],
] as const;

export default function SystemsExperience() {
  const [active, setActive] = useState(0);
  const routeTabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const atlasReadingRef = useRef<HTMLDivElement>(null);
  const current = ROUTES[active];

  useLayoutEffect(() => {
    const panel = atlasReadingRef.current;
    if (!panel || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      gsap.fromTo("[data-systems-reading-motion]", { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.46, stagger: 0.04, ease: "power3.out", clearProps: "transform,opacity" });
      gsap.fromTo("[data-systems-module-row]", { x: 12, opacity: 0.2 }, { x: 0, opacity: 1, duration: 0.44, stagger: 0.035, ease: "power3.out", clearProps: "transform,opacity" });
    }, panel);

    return () => context.revert();
  }, [active]);

  function selectRoute(index: number, moveFocus = false) {
    if (!ROUTES[index]) return;
    if (moveFocus) routeTabRefs.current[index]?.focus({ preventScroll: true });
    setActive(index);
  }

  function handleRouteKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % ROUTES.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + ROUTES.length) % ROUTES.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = ROUTES.length - 1;
    else return;
    event.preventDefault();
    selectRoute(next, true);
  }

  return (
    <main className={`${styles.root} ${mobileStyles.root}`}>
      <section className={styles.hero} aria-labelledby="systems-title">
        <div className={styles.canvas} data-systems-canvas aria-hidden="true"><CapabilitiesLabCanvas active={active} /></div>
        <div className={styles.light} data-systems-light aria-hidden="true" />
        <div className={styles.grain} data-systems-grain aria-hidden="true" />
        <div className={styles.frame} aria-hidden="true"><i className={styles.cornerTl} /><i className={styles.cornerTr} /><i className={styles.cornerBl} /><i className={styles.cornerBr} /></div>

        <header className={styles.header}>
          <Link href="/" className={styles.brand} aria-label="BND Studio — главная"><strong>BND</strong><span>ЦИФРОВЫЕ СИСТЕМЫ</span></Link>
          <nav className={styles.nav} aria-label="Разделы сайта"><Link href="/studio">Студия</Link><span className={styles.activeNav}>Системы</span><Link href="/brief">Бриф</Link></nav>
          <Link href="/brief" className={styles.action}>Собрать проект <ArrowUpRight aria-hidden="true" /></Link>
        </header>

        <div className={styles.heroShell}>
          <div className={styles.kicker}><span>00 / СИСТЕМЫ</span><i /><span>АРХИТЕКТУРА МАРШРУТОВ</span></div>
          <div className={styles.heroTitle}><h1 id="systems-title">Не услуги.<br /><em>Контуры.</em></h1><p>Один проект может одновременно быть сайтом, медиа-машиной и автоматизацией. Архитектура важнее ярлыка.</p></div>

          <div className={styles.routeSelector} data-systems-route-selector role="tablist" aria-label="Контуры BND Studio">
            {ROUTES.map((route, index) => {
              const selected = active === index;
              return (
                <button key={route.slug} ref={(node) => { routeTabRefs.current[index] = node; }} id={`systems-route-${route.slug}`} type="button" role="tab" aria-selected={selected} aria-controls="systems-atlas-panel" tabIndex={selected ? 0 : -1} className={selected ? styles.routeActive : undefined} onMouseEnter={() => selectRoute(index)} onFocus={() => selectRoute(index)} onClick={() => selectRoute(index)} onKeyDown={(event) => handleRouteKeyDown(event, index)}>
                  <small>{route.code}</small><strong>{route.name}</strong><span>{selected ? "ВЫБРАНО" : route.short}</span>
                </button>
              );
            })}
          </div>

          <div className={styles.heroBottom}><span>ЗАДАЧА → КОНТУР → СБОРКА → ЗАПУСК</span><a href="#atlas">Открыть схему <ArrowDownRight aria-hidden="true" /></a></div>
        </div>
      </section>

      <section id="atlas" className={styles.atlas} aria-labelledby="atlas-title">
        <div className={styles.sectionIndex}><span>01 / СХЕМА СИСТЕМЫ</span><span>АКТИВНЫЙ КОНТУР / {current.code}</span></div>
        <div className={styles.atlasGrid}>
          <aside className={styles.atlasRoutes} aria-label="Контуры системы">{ROUTES.map((route, index) => <button key={route.slug} type="button" className={active === index ? styles.atlasRouteActive : undefined} aria-pressed={active === index} onClick={() => selectRoute(index)}><small>{route.code}</small><span>{route.name}</span></button>)}</aside>
          <div ref={atlasReadingRef} id="systems-atlas-panel" className={styles.atlasReading} role="tabpanel" aria-labelledby={`systems-route-${current.slug}`} tabIndex={0}>
            <div className={styles.readingMeta} data-systems-reading-motion><span>{current.name}</span><b>{current.output}</b></div>
            <h2 id="atlas-title" data-systems-reading-motion>{current.title}</h2><p className={styles.atlasIntro} data-systems-reading-motion>{current.intro}</p>
            <div className={styles.moduleRail} role="list" aria-label={`Модули ${current.name}`}>{current.modules.map((module, index) => <div key={module} role="listitem" className={styles.moduleRow} data-systems-module-row><small>{String(index + 1).padStart(2, "0")}</small><strong>{module}</strong><i aria-hidden="true" /><span aria-hidden="true">ГОТОВО</span></div>)}</div>
          </div>
        </div>
      </section>

      <section className={styles.layers} aria-labelledby="layers-title">
        <div className={styles.sectionIndex}><span>02 / СЛОИ СБОРКИ</span><span>БЕЗ ОТОРВАННЫХ РЕЗУЛЬТАТОВ</span></div>
        <div className={styles.layersTitle}><h2 id="layers-title">Система собирается слоями, но работает как одно целое.</h2></div>
        <div className={styles.layerRows}>{LAYERS.map(([name, copy], index) => <div key={name} className={styles.layerRow}><small>{String(index + 1).padStart(2, "0")}</small><strong>{name}</strong><p>{copy}</p><span aria-hidden="true">/ 0{index + 1}</span></div>)}</div>
      </section>

      <section className={styles.exit} aria-labelledby="systems-exit-title">
        <div className={styles.exitMeta}><span>03 / СБОРКА</span><span>BND / СПЕЦИФИКАЦИЯ ПРОЕКТА</span></div>
        <div className={styles.exitBody}><h2 id="systems-exit-title">Теперь не выбирать услугу. Собрать нужный контур под задачу.</h2><div className={styles.exitActions}><Link href="/brief" className={styles.primaryExit}>Открыть бриф <ArrowUpRight aria-hidden="true" /></Link><Link href="/studio" className={styles.secondaryExit}><ArrowLeft aria-hidden="true" /> Студия</Link></div></div>
        <div className={styles.exitRoute} aria-hidden="true"><span>WEB</span><i /><span>МЕДИА</span><i /><span>AI</span><i /><span>ЗАПУСК</span></div>
      </section>
    </main>
  );
}
