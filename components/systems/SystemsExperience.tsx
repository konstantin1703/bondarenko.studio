"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowDownRight, ArrowLeft, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import styles from "./systems.module.css";

const CapabilitiesLabCanvas = dynamic(
  () => import("@/components/capabilities-lab/CapabilitiesLabCanvas"),
  { ssr: false },
);

const ROUTES = [
  {
    code: "01",
    slug: "digital",
    name: "DIGITAL SYSTEMS",
    title: "Web / Product / Platform",
    intro:
      "Цифровая поверхность, продуктовая логика и интеграции проектируются как один маршрут — от первого взаимодействия до production-инфраструктуры.",
    modules: ["Interface architecture", "Web / Next.js", "Product logic", "API / integrations", "Performance / QA", "Deployment"],
    output: "PRODUCT SURFACE",
  },
  {
    code: "02",
    slug: "media",
    name: "MEDIA SYSTEMS",
    title: "Content / Channels / Distribution",
    intro:
      "Смысл, форматы и площадки строятся вокруг одной системы дистрибуции: сайт, Telegram, видео и короткие форматы не спорят между собой.",
    modules: ["Content architecture", "YouTube", "Telegram", "Short-form", "Publishing flow", "Distribution"],
    output: "MEDIA ENGINE",
  },
  {
    code: "03",
    slug: "automation",
    name: "AUTOMATION",
    title: "AI / Bots / Operations",
    intro:
      "Ручные операции превращаются в сценарии с понятными входами, состояниями и выходами — без магии вокруг AI и без хрупких связок.",
    modules: ["Telegram bots", "AI workflows", "CRM", "Webhooks", "Internal tools", "Monitoring"],
    output: "OPERATING LOOP",
  },
] as const;

const LAYERS = [
  ["INPUT", "Задача, аудитория, контекст и ограничения."],
  ["LOGIC", "Сценарии, данные, состояния и правила поведения."],
  ["SURFACE", "Интерфейс, контент, каналы и материальный язык."],
  ["RUNTIME", "Интеграции, delivery, QA, telemetry и эксплуатация."],
] as const;

export default function SystemsExperience() {
  const [active, setActive] = useState(0);
  const current = ROUTES[active];

  return (
    <main className={styles.root}>
      <section className={styles.hero} aria-labelledby="systems-title">
        <div className={styles.canvas} aria-hidden="true">
          <CapabilitiesLabCanvas active={active} />
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
          <Link href="/" className={styles.brand} aria-label="BND Studio — главная">
            <strong>BND</strong>
            <span>DIGITAL SYSTEMS</span>
          </Link>
          <nav className={styles.nav} aria-label="Разделы сайта">
            <Link href="/studio">Studio</Link>
            <span className={styles.activeNav}>Systems</span>
            <Link href="/#brief">Brief</Link>
          </nav>
          <Link href="/#brief" className={styles.action}>
            Собрать проект <ArrowUpRight aria-hidden="true" />
          </Link>
        </header>

        <div className={styles.heroShell}>
          <div className={styles.kicker}>
            <span>00 / SYSTEMS</span>
            <i />
            <span>ROUTING ARCHITECTURE</span>
          </div>

          <div className={styles.heroTitle}>
            <h1 id="systems-title">
              Не услуги.<br />
              <em>Контуры.</em>
            </h1>
            <p>
              Один проект может одновременно быть сайтом, медиа-машиной и автоматизацией.
              Архитектура важнее ярлыка.
            </p>
          </div>

          <div className={styles.routeSelector} role="tablist" aria-label="Контуры BND Studio">
            {ROUTES.map((route, index) => {
              const selected = active === index;
              return (
                <button
                  key={route.slug}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  className={selected ? styles.routeActive : undefined}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                >
                  <small>{route.code}</small>
                  <strong>{route.name}</strong>
                  <span>{selected ? "LIVE" : "ROUTE"}</span>
                </button>
              );
            })}
          </div>

          <div className={styles.heroBottom}>
            <span>INPUT → ROUTE → ASSEMBLE → RUN</span>
            <a href="#atlas">Открыть atlas <ArrowDownRight aria-hidden="true" /></a>
          </div>
        </div>
      </section>

      <section id="atlas" className={styles.atlas} aria-labelledby="atlas-title">
        <div className={styles.sectionIndex}>
          <span>01 / SYSTEM ATLAS</span>
          <span>ACTIVE ROUTE / {current.code}</span>
        </div>

        <div className={styles.atlasGrid}>
          <aside className={styles.atlasRoutes}>
            {ROUTES.map((route, index) => (
              <button
                key={route.slug}
                type="button"
                className={active === index ? styles.atlasRouteActive : undefined}
                onClick={() => setActive(index)}
              >
                <small>{route.code}</small>
                <span>{route.name}</span>
              </button>
            ))}
          </aside>

          <div className={styles.atlasReading} aria-live="polite">
            <div className={styles.readingMeta}>
              <span>{current.name}</span>
              <b>{current.output}</b>
            </div>
            <h2 id="atlas-title">{current.title}</h2>
            <p className={styles.atlasIntro}>{current.intro}</p>

            <div className={styles.moduleRail} role="list" aria-label={`Модули ${current.name}`}>
              {current.modules.map((module, index) => (
                <div key={module} role="listitem" className={styles.moduleRow}>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  <strong>{module}</strong>
                  <i aria-hidden="true" />
                  <span aria-hidden="true">READY</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.layers} aria-labelledby="layers-title">
        <div className={styles.sectionIndex}>
          <span>02 / ASSEMBLY LAYERS</span>
          <span>NO DETACHED DELIVERABLES</span>
        </div>

        <div className={styles.layersTitle}>
          <h2 id="layers-title">Система собирается слоями, но работает как одно целое.</h2>
        </div>

        <div className={styles.layerRows}>
          {LAYERS.map(([name, copy], index) => (
            <div key={name} className={styles.layerRow}>
              <small>{String(index + 1).padStart(2, "0")}</small>
              <strong>{name}</strong>
              <p>{copy}</p>
              <span aria-hidden="true">/ 0{index + 1}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.exit} aria-labelledby="systems-exit-title">
        <div className={styles.exitMeta}>
          <span>03 / ASSEMBLE</span>
          <span>BND / PROJECT SPECIFICATION</span>
        </div>
        <div className={styles.exitBody}>
          <h2 id="systems-exit-title">Теперь не выбирать услугу. Собрать нужный контур под задачу.</h2>
          <div className={styles.exitActions}>
            <Link href="/#brief" className={styles.primaryExit}>
              Открыть Brief <ArrowUpRight aria-hidden="true" />
            </Link>
            <Link href="/studio" className={styles.secondaryExit}>
              <ArrowLeft aria-hidden="true" /> Studio
            </Link>
          </div>
        </div>
        <div className={styles.exitRoute} aria-hidden="true">
          <span>WEB</span><i />
          <span>MEDIA</span><i />
          <span>AI</span><i />
          <span>RUN</span>
        </div>
      </section>
    </main>
  );
}
