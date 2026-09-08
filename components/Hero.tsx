"use client";

import { ArrowRight, Bot, Boxes, Layers3, PlayCircle } from "lucide-react";
import CoreVisual from "./CoreVisual";
import SectionLabel from "./SectionLabel";

const directions = [
  { icon: Boxes, title: "Цифровые системы", text: "Сайты, платформы и сервисы, собранные под конкретную задачу." },
  { icon: PlayCircle, title: "Медиа-проекты", text: "Контент, каналы, дистрибуция и инфраструктура медиа." },
  { icon: Bot, title: "Автоматизация", text: "Telegram-боты, AI, CRM, API и автоматизация процессов." },
  { icon: Layers3, title: "Упаковка продукта", text: "Стратегия, структура, UI/UX и подготовка к запуску." },
];

export default function Hero() {
  return (
    <section id="hero" className="section section--hero">
      <div className="site-shell">
        <SectionLabel index="01" label="ПРЕВРАЩАЕМ ИДЕИ В СИСТЕМЫ" />

        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker"><span /> СИСТЕМЫ СОЗДАЮТ ВОЗМОЖНОСТИ</div>
            <h1>
              Цифровые системы<span>.</span><br />
              Медиа-проекты<span>.</span><br />
              Автоматизация<span>.</span><br />
              Упаковка продукта<span>.</span>
            </h1>
            <p className="hero-lead">
              Проектирую и собираю сайты, медиа-системы, ботов и автоматизации, которые превращают идею в работающий цифровой продукт.
            </p>
            <div className="hero-actions">
              <a href="#systems" className="button button--primary">Смотреть возможности <ArrowRight size={17} /></a>
              <a href="#constructor" className="button button--ghost">Обсудить задачу</a>
            </div>
            <div className="hero-flow"><span>ИДЕЯ</span><i>→</i><span>СИСТЕМА</span><i>→</i><span>ЗАПУСК</span><i>→</i><span>РОСТ</span></div>
          </div>

          <div className="hero-core">
            <CoreVisual mode="hero" />
            <div className="status-card">
              <div className="status-card__head"><span className="status-dot" /> СТАТУС СИСТЕМЫ</div>
              <div><span>Ядро</span><strong>активно</strong></div>
              <div><span>Модули</span><strong>связаны</strong></div>
              <div><span>Сценарий</span><strong>готов</strong></div>
              <div><span>Режим</span><strong>рабочий</strong></div>
            </div>
          </div>
        </div>

        <div className="direction-grid">
          {directions.map((item, index) => (
            <article className="tech-card" key={item.title}>
              <div className="tech-card__head"><item.icon size={21} /><span>{String(index + 1).padStart(2, "0")}</span></div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <span className="tech-card__arrow">→</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
