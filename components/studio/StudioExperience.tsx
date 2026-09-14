"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowDownRight, ArrowLeft, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useLayoutEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import styles from "./studio.module.css";
import mobileStyles from "./studio-mobile.module.css";

const HeroLabCanvas = dynamic(() => import("@/components/hero-lab/HeroLabCanvas"), { ssr: false });

const MODES = [
  {
    id: "think",
    index: "01",
    name: "СМЫСЛ",
    title: "Собираем задачу до интерфейса.",
    copy: "Структура, продуктовая логика, сценарии и ограничения сначала становятся системой — и только потом визуалом.",
    signal: "СТРАТЕГИЯ / ПРОДУКТ / СТРУКТУРА",
  },
  {
    id: "make",
    index: "02",
    name: "СБОРКА",
    title: "Проектируем материальный цифровой опыт.",
    copy: "Типографика, motion, WebGL и интерфейс работают не как декор, а как один визуальный механизм с понятной иерархией.",
    signal: "ИНТЕРФЕЙС / MOTION / МАТЕРИАЛ",
  },
  {
    id: "connect",
    index: "03",
    name: "СВЯЗИ",
    title: "Связываем поверхности в один контур.",
    copy: "Сайт, Telegram, контент, AI и внешние сервисы проектируются как части одной архитектуры, а не как набор разрозненных каналов.",
    signal: "WEB / МЕДИА / AI / TELEGRAM",
  },
  {
    id: "run",
    index: "04",
    name: "ЗАПУСК",
    title: "Доводим систему до production-состояния.",
    copy: "QA, доступность, performance, deployment, наблюдаемость и эксплуатация входят в продуктовую работу, а не остаются на потом.",
    signal: "QA / ЗАПУСК / НАБЛЮДАЕМОСТЬ",
  },
] as const;

const PRINCIPLES = [
  ["01", "СНАЧАЛА СИСТЕМА", "Не проектируем экран отдельно от того, что он должен делать."],
  ["02", "ОДИН ЯЗЫК", "Стратегия, контент, интерфейс и технология держат одну логику."],
  ["03", "МАТЕРИАЛ + ЛОГИКА", "Визуальная выразительность должна иметь техническую причину существовать."],
  ["04", "ЗАПУСТИТЬ / ПРОВЕРИТЬ / УЛУЧШИТЬ", "Production — часть дизайна. Релиз без проверки не считается завершением."],
] as const;

type ModeId = (typeof MODES)[number]["id"];

export default function StudioExperience() {
  const rootRef = useRef<HTMLElement>(null);
  const modeReadingRef = useRef<HTMLDivElement>(null);
  const modeButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [activeMode, setActiveMode] = useState<ModeId>("think");
  const current = MODES.find((mode) => mode.id === activeMode) ?? MODES[0];

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power4.out" } });
      timeline
        .fromTo("[data-studio-nav]", { y: -14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.62 }, 0.02)
        .fromTo("[data-studio-frame]", { opacity: 0 }, { opacity: 1, duration: 0.9 }, 0.04)
        .fromTo("[data-studio-canvas]", { opacity: 0 }, { opacity: 1, duration: 1.25 }, 0.08)
        .fromTo("[data-studio-kicker]", { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.58 }, 0.14)
        .fromTo("[data-studio-word] span", { yPercent: 112, rotate: 0.8 }, { yPercent: 0, rotate: 0, duration: 0.94, stagger: 0.045, clearProps: "transform" }, 0.18)
        .fromTo("[data-studio-copy]", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.72 }, 0.56)
        .fromTo("[data-studio-meta]", { x: 12, opacity: 0 }, { x: 0, opacity: 1, duration: 0.62 }, 0.64);
    }, root);
    return () => context.revert();
  }, []);

  useLayoutEffect(() => {
    const panel = modeReadingRef.current;
    if (!panel || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      gsap.fromTo("[data-studio-mode-motion]", { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.48, stagger: 0.045, ease: "power3.out", clearProps: "transform,opacity" });
      gsap.fromTo("[data-studio-mode-line]", { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.58, ease: "power3.out", clearProps: "transform" });
    }, panel);
    return () => context.revert();
  }, [activeMode]);

  function selectMode(index: number, moveFocus = false) {
    const mode = MODES[index];
    if (!mode) return;
    if (moveFocus) modeButtonRefs.current[index]?.focus({ preventScroll: true });
    setActiveMode(mode.id);
  }

  function handleModeKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % MODES.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + MODES.length) % MODES.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = MODES.length - 1;
    else return;
    event.preventDefault();
    selectMode(next, true);
  }

  return (
    <main ref={rootRef} className={`${styles.root} ${mobileStyles.root}`}>
      <section className={styles.hero} aria-labelledby="studio-title">
        <div className={styles.canvas} data-studio-canvas aria-hidden="true"><HeroLabCanvas /></div>
        <div className={styles.light} data-studio-light aria-hidden="true" />
        <div className={styles.grain} data-studio-grain aria-hidden="true" />
        <div className={styles.frame} data-studio-frame aria-hidden="true"><i className={styles.cornerTl} /><i className={styles.cornerTr} /><i className={styles.cornerBl} /><i className={styles.cornerBr} /></div>

        <header className={styles.header} data-studio-nav>
          <Link href="/" className={styles.brand} aria-label="BND Studio — главная"><strong>BND</strong><span>ЦИФРОВЫЕ СИСТЕМЫ</span></Link>
          <nav className={styles.nav} aria-label="Разделы сайта"><span className={styles.active}>Студия</span><Link href="/systems">Системы</Link><Link href="/brief">Бриф</Link></nav>
          <Link href="/brief" className={styles.action}>Собрать проект <ArrowUpRight aria-hidden="true" /></Link>
        </header>

        <div className={styles.heroShell}>
          <div className={styles.kicker} data-studio-kicker><span>00 / СТУДИЯ</span><i /><span>НЕЗАВИСИМАЯ ЦИФРОВАЯ СТУДИЯ</span></div>
          <div className={styles.word} id="studio-title" data-studio-word aria-label="BND Studio"><span>B</span><span>N</span><span>D</span></div>
          <div className={styles.heroCopy} data-studio-copy>
            <p>Не агентство с набором услуг. Не продакшн, который заканчивается на макете. BND собирает цифровые системы целиком — от логики до живого production.</p>
            <Link href="#operating-system" className={styles.inlineLink}>Как устроена студия <ArrowDownRight aria-hidden="true" /></Link>
          </div>
          <aside className={styles.heroMeta} data-studio-meta aria-hidden="true"><span>BND / ПОЛЕ СТУДИИ</span><b>2026</b><i /><small>ДИЗАЙН / ИНЖЕНЕРИЯ / МЕДИА / АВТОМАТИЗАЦИЯ</small></aside>
          <div className={styles.heroRail} data-studio-copy><span>НЕЗАВИСИМАЯ / РАСПРЕДЕЛЁННАЯ</span><span>ДИЗАЙН / ИНЖЕНЕРИЯ</span><span>WEB / ПРОДУКТ / СИСТЕМЫ</span></div>
        </div>
      </section>

      <section id="operating-system" className={styles.operating} aria-labelledby="operating-title">
        <div className={styles.sectionHead}><span>01 / КАК РАБОТАЕМ</span><p>Четыре режима одной студии. Переключаются не отделы — переключается фокус системы.</p></div>
        <div className={styles.operatingGrid}>
          <div className={styles.modeList} role="tablist" aria-label="Режимы работы BND Studio">
            {MODES.map((mode, index) => {
              const active = mode.id === activeMode;
              return (
                <button key={mode.id} ref={(node) => { modeButtonRefs.current[index] = node; }} id={`studio-mode-${mode.id}`} type="button" role="tab" aria-selected={active} aria-controls="studio-mode-panel" tabIndex={active ? 0 : -1} className={active ? styles.modeActive : undefined} onClick={() => selectMode(index)} onKeyDown={(event) => handleModeKeyDown(event, index)}>
                  <small>{mode.index}</small><strong>{mode.name}</strong><span>{active ? "АКТИВНО" : "РЕЖИМ"}</span>
                </button>
              );
            })}
          </div>

          <div ref={modeReadingRef} id="studio-mode-panel" className={styles.modeReading} role="tabpanel" aria-labelledby={`studio-mode-${activeMode}`} tabIndex={0}>
            <div className={styles.modeSignal} aria-hidden="true" data-studio-mode-motion><span>{current.signal}</span><i data-studio-mode-line /><b>{current.index}</b></div>
            <h2 id="operating-title" data-studio-mode-motion>{current.title}</h2><p data-studio-mode-motion>{current.copy}</p>
            <div className={styles.modeCoordinates} aria-hidden="true" data-studio-mode-motion><span>ВХОД</span><i /><span>СТРУКТУРА</span><i /><span>РЕЗУЛЬТАТ</span></div>
          </div>
        </div>
      </section>

      <section className={styles.principles} aria-labelledby="principles-title">
        <div className={styles.sectionHead}><span>02 / ПРИНЦИПЫ</span><p>Не манифест ради манифеста. Это ограничения, по которым принимаются дизайн- и инженерные решения.</p></div>
        <div className={styles.principleTitle}><h2 id="principles-title">Работа должна ощущаться цельной ещё до того, как пользователь поймёт почему.</h2></div>
        <div className={styles.principleRows}>{PRINCIPLES.map(([index, name, copy]) => <div key={index} className={styles.principleRow}><small>{index}</small><strong>{name}</strong><p>{copy}</p><span aria-hidden="true">↗</span></div>)}</div>
      </section>

      <section className={styles.exit} aria-labelledby="exit-title">
        <div className={styles.exitGrid} aria-hidden="true" />
        <div className={styles.exitTopline}><span>03 / ДАЛЬШЕ</span><span>СТУДИЯ → СИСТЕМЫ</span></div>
        <div className={styles.exitBody}><h2 id="exit-title">Смотреть не список услуг. Смотреть, как собирается система.</h2><div><Link href="/systems" className={styles.exitPrimary}>Открыть системы <ArrowUpRight aria-hidden="true" /></Link><Link href="/" className={styles.exitSecondary}><ArrowLeft aria-hidden="true" /> На главную</Link></div></div>
        <div className={styles.exitWord} aria-hidden="true">BND</div>
      </section>
    </main>
  );
}
