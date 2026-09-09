"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Box, Play, Zap, ArrowRight, Menu, X } from "lucide-react";

const directions = [
  {
    id: "01",
    title: "ЦИФРОВЫЕ СИСТЕМЫ",
    meta: "WEB / PLATFORMS / API / МАСШТАБИРОВАНИЕ",
    tone: "blue",
    icon: Box,
    className: "system-card--systems",
  },
  {
    id: "02",
    title: "МЕДИА-ПРОЕКТЫ",
    meta: "КОНТЕНТ / YOUTUBE / TELEGRAM",
    tone: "violet",
    icon: Play,
    className: "system-card--media",
  },
  {
    id: "03",
    title: "АВТОМАТИЗАЦИЯ",
    meta: "БОТЫ / CRM / AI",
    tone: "cyan",
    icon: Zap,
    className: "system-card--automation",
  },
];

function CoreCube() {
  return (
    <div className="core-cube-wrap" aria-hidden="true">
      <svg viewBox="0 0 320 320" className="core-cube-svg" role="img">
        <defs>
          <linearGradient id="frontFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0d5cff" stopOpacity=".22" />
            <stop offset="1" stopColor="#04111d" stopOpacity=".72" />
          </linearGradient>
          <linearGradient id="sideFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#12cfff" stopOpacity=".14" />
            <stop offset="1" stopColor="#020911" stopOpacity=".76" />
          </linearGradient>
          <linearGradient id="topFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3bd6ff" stopOpacity=".22" />
            <stop offset="1" stopColor="#0a4eff" stopOpacity=".08" />
          </linearGradient>
          <filter id="softGlow" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="hardGlow" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="2.3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="core-orbits" fill="none">
          <ellipse cx="160" cy="185" rx="130" ry="45" stroke="#147fff" strokeOpacity=".22" />
          <ellipse cx="160" cy="185" rx="101" ry="35" stroke="#58cfff" strokeOpacity=".32" />
          <ellipse cx="160" cy="185" rx="72" ry="25" stroke="#7ee7ff" strokeOpacity=".18" />
        </g>

        <g className="core-rays" stroke="#178aff" strokeOpacity=".26">
          <path d="M160 20V300" />
          <path d="M32 185H288" />
          <path d="M62 88L258 282" />
          <path d="M258 88L62 282" />
        </g>

        <g filter="url(#softGlow)" className="core-cube">
          <polygon points="160,70 243,115 160,160 77,115" fill="url(#topFill)" stroke="#6adfff" strokeWidth="1.6" />
          <polygon points="77,115 160,160 160,252 77,205" fill="url(#frontFill)" stroke="#258cff" strokeWidth="1.6" />
          <polygon points="160,160 243,115 243,205 160,252" fill="url(#sideFill)" stroke="#28cfff" strokeWidth="1.6" />
          <path d="M160 70V160M77 115L160 160L243 115M160 160V252" stroke="#b9f1ff" strokeOpacity=".42" />
        </g>

        <g filter="url(#hardGlow)" fill="#95edff">
          <circle cx="160" cy="70" r="3.2" />
          <circle cx="77" cy="115" r="2.5" />
          <circle cx="243" cy="115" r="2.5" />
          <circle cx="160" cy="252" r="3.2" />
        </g>
      </svg>

      <div className="core-copy">
        <span>BND CORE</span>
        <small>SYSTEM CORE</small>
      </div>

      <span className="micro-cube micro-cube--1" />
      <span className="micro-cube micro-cube--2" />
      <span className="micro-cube micro-cube--3" />
      <span className="micro-cube micro-cube--4" />
    </div>
  );
}

function SystemMap() {
  return (
    <div className="system-map">
      <div className="system-map__grid" aria-hidden="true" />
      <div className="system-map__halo" aria-hidden="true" />
      <div className="system-map__beam" aria-hidden="true" />

      <svg className="system-map__routes" viewBox="0 0 760 650" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="routeA" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#1184ff" stopOpacity=".08" />
            <stop offset=".55" stopColor="#56d6ff" stopOpacity=".82" />
            <stop offset="1" stopColor="#1184ff" stopOpacity=".08" />
          </linearGradient>
          <filter id="routeGlow">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g stroke="url(#routeA)" strokeWidth="1.3" fill="none" filter="url(#routeGlow)">
          <path d="M365 303 L220 165 L145 165" />
          <path d="M395 303 L540 165 L615 165" />
          <path d="M390 370 L520 500 L615 500" />
        </g>

        <g className="route-packets" fill="#d8f7ff" filter="url(#routeGlow)">
          <circle cx="0" cy="0" r="3">
            <animateMotion dur="4.8s" repeatCount="indefinite" path="M365 303 L220 165 L145 165" />
          </circle>
          <circle cx="0" cy="0" r="3">
            <animateMotion dur="5.4s" repeatCount="indefinite" begin=".8s" path="M395 303 L540 165 L615 165" />
          </circle>
          <circle cx="0" cy="0" r="3">
            <animateMotion dur="5.9s" repeatCount="indefinite" begin="1.4s" path="M390 370 L520 500 L615 500" />
          </circle>
        </g>

        <g fill="#63d8ff" filter="url(#routeGlow)">
          <circle cx="220" cy="165" r="4" />
          <circle cx="540" cy="165" r="4" />
          <circle cx="520" cy="500" r="4" />
        </g>
      </svg>

      {directions.map(({ id, title, meta, tone, icon: Icon, className }, index) => (
        <motion.article
          key={id}
          className={`system-card ${className} system-card--${tone}`}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .55, delay: .18 + index * .09 }}
          whileHover={{ y: -4 }}
        >
          <div className="system-card__top">
            <b>{id}</b>
            <span className="system-card__icon"><Icon size={20} strokeWidth={1.8} /></span>
          </div>
          <h3>{title}</h3>
          <p>{meta}</p>
        </motion.article>
      ))}

      <motion.div
        className="system-core"
        initial={{ opacity: 0, scale: .94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: .7, ease: "easeOut" }}
      >
        <CoreCube />
      </motion.div>

      <div className="system-aside">
        <span>СТРАТЕГИЯ</span>
        <span>ИНТЕРФЕЙС</span>
        <span>КОНТЕНТ</span>
        <span>AI</span>
        <span>АВТОМАТИЗАЦИЯ</span>
      </div>

      <div className="system-manifest">
        <i>/</i>
        <span>БОЛЬШЕ<br />ЧЕМ ПРОСТО<br />САЙТЫ</span>
      </div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="v7-page" id="hero">
      <header className="v7-header">
        <div className="v7-shell v7-header__inner">
          <a className="brand" href="#hero">
            <b>BONDARENKO</b><span>.STUDIO</span>
          </a>

          <nav className="desktop-nav" aria-label="Основная навигация">
            <a href="#problems">Проблемы</a>
            <a href="#capabilities">Возможности</a>
            <a href="#brief">Конструктор</a>
          </nav>

          <div className="header-actions">
            <a className="header-cta" href="#brief">Собрать бриф <ArrowRight size={15} /></a>
            <button
              className="menu-button"
              type="button"
              onClick={() => setMenuOpen(v => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="mobile-menu v7-shell">
            <a href="#problems" onClick={() => setMenuOpen(false)}>Проблемы</a>
            <a href="#capabilities" onClick={() => setMenuOpen(false)}>Возможности</a>
            <a href="#brief" onClick={() => setMenuOpen(false)}>Конструктор</a>
          </div>
        )}
      </header>

      <section className="hero-v7 v7-shell">
        <div className="hero-v7__ambient" aria-hidden="true">
          <span className="planet" />
          <span className="horizon" />
          <span className="stars stars--a" />
          <span className="stars stars--b" />
        </div>

        <div className="hero-v7__copy">
          <div className="online-line">
            <i />
            <span>СИСТЕМА / ONLINE</span>
          </div>

          <h1>
            Собираю<br />
            цифровые продукты<br />
            <em>как систему.</em>
          </h1>

          <p>
            Стратегия, интерфейс, контент, AI, Telegram и автоматизация —
            в одной архитектуре.
          </p>

          <div className="hero-v7__actions">
            <a className="primary-button" href="#brief">
              Собрать задачу <ArrowRight size={18} />
            </a>
            <a className="secondary-button" href="#system">
              <span className="play-ring"><Play size={15} fill="currentColor" /></span>
              Посмотреть систему
            </a>
          </div>

          <div className="hero-manifest">
            <span>ПРОСТЫЕ ИДЕИ.</span>
            <span>СЛОЖНЫЕ СИСТЕМЫ.</span>
            <span>РЕАЛЬНЫЕ РЕЗУЛЬТАТЫ.</span>
          </div>
        </div>

        <div className="hero-v7__visual" id="system">
          <SystemMap />
        </div>
      </section>

      <section className="v7-shell production-note" id="problems">
        <span>V7 / HERO PRODUCTION</span>
        <h2>Следующий этап — переносим эту же айдентику в «Проблемы», «Возможности» и «Конструктор» после утверждения Hero.</h2>
      </section>

      <div id="capabilities" />
      <div id="brief" />
    </main>
  );
}
