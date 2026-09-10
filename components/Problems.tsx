"use client";

import { useState } from "react";

const problems = [
  {
    title: "Медленный сайт",
    description:
      "Интерфейс тормозит, структура расползается, а продукт ощущается старее, чем он есть.",
    route: "Интерфейс / производительность / архитектура",
  },
  {
    title: "Слабая упаковка",
    description:
      "Ценность не считывается за первые секунды: смысл, визуал и предложение существуют отдельно.",
    route: "Стратегия / контент / визуальная система",
  },
  {
    title: "Ручная рутина",
    description:
      "Повторяющиеся операции съедают время и создают точки, где процесс постоянно ломается.",
    route: "Автоматизация / AI / CRM",
  },
  {
    title: "Разрозненный контент",
    description:
      "Сайт, Telegram, YouTube и материалы живут в разных мирах вместо единого медиа-контура.",
    route: "Контент / дистрибуция / аналитика",
  },
  {
    title: "Нет автоматизации",
    description:
      "Заявки, данные и коммуникации передаются вручную там, где должен работать сценарий.",
    route: "Боты / интеграции / API",
  },
] as const;

export default function Problems() {
  const [active, setActive] = useState(0);

  return (
    <section id="problems" className="section problems">
      <div className="site-shell">
        <div className="section-head section-head--split">
          <div className="section-index">
            <span>02</span>
            <i />
            <span>System diagnostics</span>
          </div>
          <div>
            <h2>
              Не лечим
              <br />
              отдельные симптомы.
            </h2>
            <p>
              Сначала находим место, где система теряет скорость, смысл или
              связность. Потом перестраиваем маршрут целиком.
            </p>
          </div>
        </div>

        <div className="problem-list">
          {problems.map((problem, index) => {
            const selected = active === index;

            return (
              <button
                className={`problem-row ${selected ? "is-active" : ""}`}
                type="button"
                key={problem.title}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                aria-pressed={selected}
              >
                <span className="problem-row__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="problem-row__body">
                  <strong>{problem.title}</strong>
                  <span className="problem-row__description">
                    {problem.description}
                  </span>
                </span>
                <span className="problem-row__route">{problem.route}</span>
                <span className="problem-row__signal" aria-hidden="true" />
              </button>
            );
          })}
        </div>

        <div className="problems__footer">
          <span>ХАОС</span>
          <i />
          <span>СТРУКТУРА</span>
          <i />
          <span>СИСТЕМА</span>
        </div>
      </div>
    </section>
  );
}
