"use client";

import { useState } from "react";
import HybridCore3D from "@/components/HybridCore3D";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="hero-page" id="hero">
      <header className="hero-header">
        <div className="hero-shell hero-header__inner">
          <a className="brand" href="#hero"><b>BONDARENKO</b><span>.STUDIO</span></a>

          <nav className="desktop-nav">
            <a href="#system">Система</a>
            <a href="#services">Услуги</a>
            <a href="#process">Процесс</a>
            <a href="#cases">Кейсы</a>
            <a href="#contact">Контакты</a>
          </nav>

          <div className="header-actions">
            <a className="header-cta" href="#contact">Оставить задачу <span>→</span></a>
            <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Меню">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="mobile-menu hero-shell">
            <a href="#system" onClick={() => setMenuOpen(false)}>Система</a>
            <a href="#services" onClick={() => setMenuOpen(false)}>Услуги</a>
            <a href="#process" onClick={() => setMenuOpen(false)}>Процесс</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Контакты</a>
          </div>
        )}
      </header>

      <section className="hero-shell hero-stage">
        <div className="hero-copy">
          <div className="online-line">
            <i></i>
            <span>СИСТЕМА</span>
            <b>ONLINE</b>
          </div>

          <p className="technical-kicker">DIGITAL SYSTEMS FOR REAL PROJECTS</p>

          <h1>
            Собираю<br />
            цифровые<br />
            продукты<br />
            <em>как систему.</em>
          </h1>

          <p className="hero-lead">
            Стратегия, интерфейс, контент, AI, Telegram и автоматизация —
            в одной архитектуре, где каждый модуль решает свою задачу
            и усиливает остальные.
          </p>

          <div className="hero-actions">
            <a className="primary-button" href="#contact">Собрать задачу <span>→</span></a>
            <a className="secondary-button" href="#system">Посмотреть систему</a>
          </div>

          <div className="hero-steps">
            {[
              ["01", "ИДЕЯ"],
              ["02", "АРХИТЕКТУРА"],
              ["03", "СБОРКА"],
              ["04", "ЗАПУСК"],
            ].map(([n, label], index) => (
              <div className="hero-step" key={n}>
                <div><b>{n}</b>{index < 3 && <span></span>}</div>
                <small>{label}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="core-stage">
          <div className="core-light core-light--a"></div>
          <div className="core-light core-light--b"></div>

          <HybridCore3D />

          <div className="core-callout callout-strategy">
            <b>СИСТЕМЫ</b>
            <span>Web / платформы</span>
            <span>API / архитектура</span>
          </div>

          <div className="core-callout callout-interface">
            <b>МЕДИА</b>
            <span>Контент / YouTube</span>
            <span>Telegram</span>
          </div>

          <div className="core-callout callout-ai">
            <b>АВТОМАТИЗАЦИЯ</b>
            <span>Боты / CRM</span>
            <span>AI / интеграции</span>
          </div>

          <div className="core-callout callout-content">
            <b>BND CORE</b>
            <span>Модули связаны</span>
            <span>Система активна</span>
          </div>

          <div className="core-id">
            <i></i>
            <div><b>BND CORE</b><span>WEBGL / SYSTEM ACTIVE</span></div>
          </div>
        </div>

        <div className="hero-bottom">
          <div className="hero-bottom__note"><span>//</span> ТЕХНОЛОГИИ, КОТОРЫЕ РАБОТАЮТ ВМЕСТЕ</div>
          <div className="hero-bottom__formula">ПРОДУКТ <i>×</i> КОНТЕНТ <i>×</i> АВТОМАТИЗАЦИЯ <i>×</i> РОСТ</div>
          <a href="#system">SCROLL ДАЛЬШЕ ↓</a>
        </div>
      </section>

      <section id="system" className="placeholder-section hero-shell">
        <span>V5 / HYBRID HERO TEST</span>
        <h2>Следующий блок собираем только после утверждения первого экрана.</h2>
      </section>

      <div id="services"></div><div id="process"></div><div id="cases"></div><div id="contact"></div>
    </main>
  );
}
