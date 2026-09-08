"use client";

import { Globe2, PlayCircle, Bot, Layers3, Search, PenTool, Braces, Send, BarChart3, ArrowRight, Target, Rocket } from "lucide-react";
import CoreVisual from "./CoreVisual";
import SectionLabel from "./SectionLabel";

const capabilities = [
  { icon: Globe2, title: "Цифровые системы", desc: "Сайты, лендинги, платформы, сервисы и API-интеграции.", tags: ["ВЕБ", "API", "ПЛАТФОРМЫ"] },
  { icon: PlayCircle, title: "Медиа-проекты", desc: "YouTube, Telegram, контентные системы, дистрибуция и оформление.", tags: ["КОНТЕНТ", "ВИДЕО", "МЕДИА"] },
  { icon: Bot, title: "Автоматизация", desc: "Telegram-боты, CRM, AI-сценарии и внутренние инструменты.", tags: ["AI", "CRM", "БОТЫ"] },
  { icon: Layers3, title: "Упаковка продукта", desc: "Позиционирование, структура, UI/UX и подготовка к запуску.", tags: ["СТРАТЕГИЯ", "UI/UX", "ЗАПУСК"] },
];

const stack = [
  [Search, "Стратегия", "Анализ, аудит, план"],
  [PenTool, "UI/UX", "Интерфейсы, сценарии, визуальная система"],
  [Layers3, "Контент", "Смысл, структура, форматы"],
  [Braces, "AI-сценарии", "Автоматизация и интеграционные сценарии"],
  [Globe2, "Сайты", "Разработка и инфраструктура"],
  [Send, "Telegram-боты", "Коммуникации и сервисы"],
  [BarChart3, "Поддержка запуска", "Аналитика и развитие"],
] as const;

const workflow = [
  [Search, "Погружение", "Изучаем задачу, аудиторию, ограничения и цели."],
  [Target, "Стратегия", "Определяем решение, приоритеты и архитектуру."],
  [PenTool, "Дизайн и сборка", "Проектируем интерфейс, разрабатываем и интегрируем."],
  [Rocket, "Запуск", "Тестируем сценарии и выводим систему в работу."],
  [BarChart3, "Рост", "Развиваем, автоматизируем и масштабируем то, что уже работает."],
] as const;

export default function Capabilities() {
  return (
    <section id="systems" className="section">
      <div className="site-shell">
        <SectionLabel index="03" label="ИЗ ЧЕГО СОСТОИТ ЦИФРОВОЙ ПРОДУКТ" />

        <div className="capabilities-layout">
          <div className="capabilities-copy">
            <h2>Собираем<br />цифровые<br />продукты<span>.</span></h2>
            <div className="capabilities-manifesto">
              <strong>Системы.</strong><strong>Медиа.</strong><strong>Автоматизация.</strong><strong>Реальный результат.</strong>
            </div>
            <p>Соединяем стратегию, дизайн, контент и технологии, чтобы отдельные инструменты работали как единый продукт.</p>
          </div>

          <div className="system-stage">
            <CoreVisual mode="system" />
            <div className="system-stage__nodes">
              {capabilities.map((item, index) => (
                <article key={item.title} className={`system-node system-node--${index + 1}`}>
                  <item.icon size={19} /><strong>{item.title}</strong><small>{item.desc}</small>
                  <div>{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                </article>
              ))}
            </div>
          </div>

          <aside className="stack-panel">
            <div className="stack-panel__header"><h3>Принципы и стек</h3><span>НА ЧЁМ СТРОИМ</span></div>
            {stack.map(([Icon, title, desc], index) => (
              <div className="stack-row" key={title}>
                <span className="stack-row__num">{String(index + 1).padStart(2, "0")}</span><Icon size={18} />
                <div><strong>{title}</strong><small>{desc}</small></div><ArrowRight size={15} />
              </div>
            ))}
            <div className="stack-panel__footer">ТЕХНОЛОГИИ + СТРАТЕГИЯ + ПРОЦЕСС = РАБОТАЮЩАЯ СИСТЕМА</div>
          </aside>
        </div>

        <div className="workflow-block">
          <div className="workflow-block__head"><h3>Как мы работаем</h3><span>ОТ ИДЕИ К РЕЗУЛЬТАТУ</span></div>
          <div className="workflow-grid">
            {workflow.map(([Icon, title, desc], index) => (
              <article className="workflow-card" key={title}>
                <div className="workflow-card__top"><span>{String(index + 1).padStart(2, "0")}</span><Icon size={20} /></div>
                <strong>{title}</strong><p>{desc}</p><span className="workflow-card__line" />
              </article>
            ))}
          </div>
          <div className="workflow-cta"><div><small>ГОТОВЫ ОБСУДИТЬ ЗАДАЧУ?</small><strong>Соберите первый бриф за пару минут.</strong></div><a href="#constructor" className="button button--primary">Начать проект <ArrowRight size={17} /></a></div>
        </div>
      </div>
    </section>
  );
}
