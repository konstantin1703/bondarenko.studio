"use client";

import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

const capabilities = [
  {
    index: "01",
    title: "Цифровые системы",
    description:
      "Сайты и веб-продукты, которые не заканчиваются на интерфейсе: архитектура, API, интеграции и база для масштабирования.",
    items: ["Сайты", "Платформы", "API", "Интеграции", "Масштабирование"],
  },
  {
    index: "02",
    title: "Медиа-проекты",
    description:
      "Контент и площадки работают как единый контур: сайт, YouTube, Telegram, короткие форматы и дистрибуция.",
    items: ["Контент", "YouTube", "Telegram", "Shorts", "Дистрибуция"],
  },
  {
    index: "03",
    title: "Автоматизация",
    description:
      "Связываем сервисы и процессы так, чтобы данные двигались сами, а повторяющиеся действия перестали быть ручной работой.",
    items: ["Боты", "CRM", "AI", "Webhooks", "Внутренние инструменты"],
  },
] as const;

export default function Capabilities() {
  const [active, setActive] = useState(0);

  return (
    <section id="capabilities" className="v12-section v12-capabilities" data-scene="capabilities">
      <div className="v12-shell">
        <div className="v12-section-head v12-section-head--wide" data-reveal>
          <span className="v12-section-number">02</span>
          <h2>Не услуги. Контуры одной системы.</h2>
          <p>
            Под конкретную задачу подключаются только нужные части. Архитектура остаётся единой,
            даже если проект начинается с одного сайта или Telegram-бота.
          </p>
        </div>

        <div className="v12-capability-stack" data-reveal>
          {capabilities.map((capability, index) => {
            const selected = active === index;

            return (
              <article
                key={capability.title}
                className={`v12-capability ${selected ? "is-active" : ""}`}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
              >
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  aria-expanded={selected}
                  className="v12-capability__trigger"
                >
                  <span>{capability.index}</span>
                  <strong>{capability.title}</strong>
                  <ArrowUpRight aria-hidden="true" />
                </button>

                <div className="v12-capability__body">
                  <p>{capability.description}</p>
                  <div className="v12-capability__items">
                    {capability.items.map((item) => (
                      <span key={item}>{item}</span>
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
