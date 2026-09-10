"use client";

import { useState } from "react";
import CoreVisual from "./CoreVisual";

const capabilities = [
  {
    index: "01",
    title: "Цифровые системы",
    description:
      "Проектируем интерфейс и инфраструктуру так, чтобы продукт было удобно использовать, развивать и масштабировать.",
    items: ["Сайты", "Платформы", "API", "Интеграции", "Масштабирование"],
  },
  {
    index: "02",
    title: "Медиа-проекты",
    description:
      "Соединяем площадки, форматы и дистрибуцию в один управляемый контур вместо набора разрозненных публикаций.",
    items: ["Контент", "YouTube", "Telegram", "Shorts", "Дистрибуция"],
  },
  {
    index: "03",
    title: "Автоматизация",
    description:
      "Убираем ручные переходы между сервисами и строим сценарии, которые сами передают данные и запускают нужные действия.",
    items: ["Telegram-боты", "CRM", "AI", "Webhooks", "Внутренние инструменты"],
  },
] as const;

export default function Capabilities() {
  const [active, setActive] = useState(0);

  return (
    <section id="systems" className="section capabilities">
      <div className="site-shell">
        <div className="section-head section-head--split">
          <div className="section-index">
            <span>03</span>
            <i />
            <span>Capabilities</span>
          </div>
          <div>
            <h2>
              Одна система.
              <br />
              Три контура.
            </h2>
            <p>
              Под задачу подключаются только нужные модули. Без универсального
              пакета услуг и без лишней инфраструктуры.
            </p>
          </div>
        </div>

        <div className="capabilities__layout">
          <div className="capability-list">
            {capabilities.map((capability, index) => (
              <button
                key={capability.title}
                type="button"
                className={`capability-row ${
                  active === index ? "is-active" : ""
                }`}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                aria-pressed={active === index}
              >
                <span className="capability-row__index">{capability.index}</span>
                <span className="capability-row__main">
                  <strong>{capability.title}</strong>
                  <span>{capability.description}</span>
                </span>
                <span className="capability-row__items">
                  {capability.items.map((item) => (
                    <em key={item}>{item}</em>
                  ))}
                </span>
              </button>
            ))}
          </div>

          <aside className="capabilities__core">
            <div className="capabilities__core-label">
              <span>ACTIVE ROUTE</span>
              <strong>{capabilities[active].title}</strong>
            </div>
            <CoreVisual variant="compact" active />
            <div className="capabilities__route">
              {capabilities[active].items.map((item, index) => (
                <span key={item}>
                  <i>{String(index + 1).padStart(2, "0")}</i>
                  {item}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
