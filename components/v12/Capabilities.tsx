"use client";

import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

const capabilities = [
  {
    index: "01",
    title: "Цифровые системы",
    description:
      "Сайты и веб-продукты, которые не заканчиваются на интерфейсе: архитектура, API, интеграции и база для развития.",
    items: ["Сайты", "Платформы", "API", "Интеграции", "Масштабирование"],
    outcome: "FROM INTERFACE TO INFRASTRUCTURE",
  },
  {
    index: "02",
    title: "Медиа-проекты",
    description:
      "Контент и площадки собираются в один контур: сайт, YouTube, Telegram, короткие форматы, дистрибуция и аналитика.",
    items: ["Контент", "YouTube", "Telegram", "Shorts", "Дистрибуция"],
    outcome: "FROM CONTENT TO MEDIA SYSTEM",
  },
  {
    index: "03",
    title: "Автоматизация",
    description:
      "Связываем сервисы и процессы так, чтобы данные двигались сами, а повторяющиеся действия перестали быть ручной работой.",
    items: ["Боты", "CRM", "AI", "Webhooks", "Внутренние инструменты"],
    outcome: "FROM ROUTINE TO WORKING FLOW",
  },
] as const;

function broadcastFocus(value: number) {
  window.dispatchEvent(new CustomEvent("bnd:focus", { detail: { value } }));
}

export default function Capabilities() {
  const [active, setActive] = useState(0);

  function activate(index: number) {
    setActive(index);
    broadcastFocus(index);
  }

  return (
    <section id="capabilities" className="v12-section v12-capabilities" data-scene="capabilities">
      <div className="v12-shell">
        <div className="v12-section-head v12-section-head--wide" data-reveal>
          <span className="v12-section-number">02</span>
          <h2>Одна архитектура. Три контура.</h2>
          <p>
            Под задачу подключаются только нужные части. Система остаётся связной,
            даже если проект начинается с одного сайта, медиа-канала или бота.
          </p>
        </div>

        <div className="v12-capability-stack" data-reveal>
          {capabilities.map((capability, index) => {
            const selected = active === index;

            return (
              <article
                key={capability.title}
                className={`v12-capability ${selected ? "is-active" : ""}`}
                onMouseEnter={() => activate(index)}
                onFocus={() => activate(index)}
              >
                <button
                  type="button"
                  onClick={() => activate(index)}
                  aria-expanded={selected}
                  className="v12-capability__trigger"
                >
                  <span>{capability.index}</span>
                  <strong>{capability.title}</strong>
                  <ArrowUpRight aria-hidden="true" />
                </button>

                <div className="v12-capability__body">
                  <span className="v12-capability__outcome">{capability.outcome}</span>
                  <p>{capability.description}</p>
                  <div className="v12-capability__items" aria-label={`Состав направления «${capability.title}»`}>
                    {capability.items.map((item, itemIndex) => (
                      <span key={item}>
                        <i>0{itemIndex + 1}</i>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
