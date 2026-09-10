"use client";

import { useState } from "react";

const problems = [
  {
    title: "Медленный сайт",
    text: "Скорость, структура и технический долг съедают доверие ещё до того, как пользователь понимает предложение.",
    route: "PERFORMANCE / UX / ARCHITECTURE",
  },
  {
    title: "Слабая упаковка",
    text: "Продукт может быть сильным, но смысл, визуал и предложение не складываются в ясную систему.",
    route: "STRATEGY / CONTENT / IDENTITY",
  },
  {
    title: "Ручная рутина",
    text: "Повторяющиеся операции забирают время и создают лишние точки отказа там, где должен работать сценарий.",
    route: "AUTOMATION / AI / CRM",
  },
  {
    title: "Разрозненный контент",
    text: "Сайт, Telegram, YouTube и материалы живут отдельно и не усиливают друг друга как единый медиа-контур.",
    route: "MEDIA / DISTRIBUTION / ANALYTICS",
  },
  {
    title: "Нет автоматизации",
    text: "Заявки, данные и коммуникации перемещаются вручную вместо того, чтобы проходить через связанный процесс.",
    route: "BOTS / API / INTEGRATIONS",
  },
] as const;

export default function Diagnostics() {
  const [active, setActive] = useState(0);

  return (
    <section id="diagnostics" className="v12-section v12-diagnostics" data-scene="diagnostics">
      <div className="v12-shell">
        <div className="v12-section-head" data-reveal>
          <span className="v12-section-number">01</span>
          <h2>Где система теряет результат.</h2>
          <p>
            Мы не начинаем с набора услуг. Сначала находим место, где теряются скорость,
            связность или смысл — и только потом проектируем решение.
          </p>
        </div>

        <div className="v12-diagnostics__grid">
          <div className="v12-diagnostics__list" data-reveal>
            {problems.map((problem, index) => (
              <button
                key={problem.title}
                type="button"
                className={`v12-diagnostic-row ${active === index ? "is-active" : ""}`}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                aria-pressed={active === index}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{problem.title}</strong>
                <i aria-hidden="true" />
              </button>
            ))}
          </div>

          <aside className="v12-diagnostics__detail" data-reveal aria-live="polite">
            <span className="v12-diagnostics__route">{problems[active].route}</span>
            <strong>{problems[active].title}</strong>
            <p>{problems[active].text}</p>
            <div className="v12-trace" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
