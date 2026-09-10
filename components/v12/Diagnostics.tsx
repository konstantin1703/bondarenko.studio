"use client";

import { useState } from "react";

const problems = [
  {
    title: "Медленный сайт",
    text: "Скорость, структура и технический долг съедают доверие ещё до того, как пользователь успевает понять предложение.",
    route: "PERFORMANCE / UX / ARCHITECTURE",
  },
  {
    title: "Слабая упаковка",
    text: "Сильный продукт не считывается, если смысл, визуал и предложение не складываются в одну ясную систему.",
    route: "STRATEGY / CONTENT / IDENTITY",
  },
  {
    title: "Ручная рутина",
    text: "Повторяющиеся операции забирают время и создают лишние точки отказа там, где должен работать сценарий.",
    route: "AUTOMATION / AI / CRM",
  },
  {
    title: "Разрозненный контент",
    text: "Сайт, Telegram, YouTube и материалы существуют отдельно и не усиливают друг друга как единый медиа-контур.",
    route: "MEDIA / DISTRIBUTION / ANALYTICS",
  },
  {
    title: "Нет автоматизации",
    text: "Заявки, данные и коммуникации двигаются вручную вместо связанного процесса, который можно измерять и развивать.",
    route: "BOTS / API / INTEGRATIONS",
  },
] as const;

function broadcastFocus(value: number) {
  window.dispatchEvent(new CustomEvent("bnd:focus", { detail: { value } }));
}

export default function Diagnostics() {
  const [active, setActive] = useState(0);

  function activate(index: number) {
    setActive(index);
    broadcastFocus(index);
  }

  const current = problems[active];

  return (
    <section id="diagnostics" className="v12-section v12-diagnostics" data-scene="diagnostics">
      <div className="v12-shell">
        <div className="v12-section-head" data-reveal>
          <span className="v12-section-number">01</span>
          <h2>Где теряется результат.</h2>
          <p>
            Не начинаем с перечня услуг. Сначала находим разрыв — в скорости,
            смысле, контенте или процессе — и проектируем систему вокруг него.
          </p>
        </div>

        <div className="v12-diagnostics__grid">
          <div className="v12-diagnostics__list" data-reveal>
            {problems.map((problem, index) => (
              <button
                key={problem.title}
                type="button"
                className={`v12-diagnostic-row ${active === index ? "is-active" : ""}`}
                onMouseEnter={() => activate(index)}
                onFocus={() => activate(index)}
                onClick={() => activate(index)}
                aria-pressed={active === index}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{problem.title}</strong>
                <i aria-hidden="true" />
              </button>
            ))}
          </div>

          <aside className="v12-diagnostics__detail" data-reveal aria-live="polite">
            <span className="v12-diagnostics__route">{current.route}</span>
            <span className="v12-diagnostics__ghost" aria-hidden="true">
              0{active + 1}
            </span>
            <strong>{current.title}</strong>
            <p>{current.text}</p>
            <div className="v12-diagnostics__measure" aria-hidden="true">
              <span>INPUT</span>
              <i />
              <span>LOSS</span>
              <i />
              <span>ROUTE</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
