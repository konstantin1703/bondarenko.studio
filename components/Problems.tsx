"use client";

import { useState } from "react";
import { Gauge, PackageSearch, Cog, Files, Network, Rocket, Search, Layers3, PenTool, Wrench, CircleCheck } from "lucide-react";
import CoreVisual, { CoreModule } from "./CoreVisual";
import SectionLabel from "./SectionLabel";

const problems: Array<{title:string; description:string; icon: typeof Gauge; modules: CoreModule[]}> = [
  { title: "Медленный сайт", description: "Сложный интерфейс, низкая скорость и ощущение устаревшего продукта.", icon: Gauge, modules: ["interfaces", "strategy", "analytics"] },
  { title: "Слабая упаковка", description: "Ценность продукта не считывается, а подача теряется среди конкурентов.", icon: PackageSearch, modules: ["strategy", "content", "interfaces"] },
  { title: "Ручная рутина", description: "Повторяющиеся действия забирают время и создают лишние ошибки.", icon: Cog, modules: ["automation", "ai", "crm"] },
  { title: "Разрозненный контент", description: "Каналы и материалы существуют отдельно и не работают как единая система.", icon: Files, modules: ["content", "automation", "analytics"] },
  { title: "Нет автоматизации", description: "Процессы завязаны на ручные действия вместо понятного сценария.", icon: Network, modules: ["automation", "ai", "telegram"] },
  { title: "Сложный запуск", description: "Непонятно, с чего начать, что делать первым и как собрать всё вместе.", icon: Rocket, modules: ["strategy", "interfaces", "launch"] },
];

const process = [
  { icon: Search, title: "Аудит", text: "Разбираю текущую ситуацию и нахожу ключевую точку приложения усилий." },
  { icon: Layers3, title: "Структура", text: "Формирую архитектуру решения и связь между модулями." },
  { icon: PenTool, title: "Дизайн", text: "Создаю интерфейс и визуальную систему вокруг задачи." },
  { icon: Wrench, title: "Сборка", text: "Разрабатываю, интегрирую и автоматизирую необходимые процессы." },
  { icon: CircleCheck, title: "Запуск", text: "Проверяю сценарии, запускаю продукт и готовлю его к развитию." },
];

export default function Problems() {
  const [active, setActive] = useState(0);

  return (
    <section id="problems" className="section">
      <div className="site-shell">
        <SectionLabel index="02" label="ЧТО МОЖНО ИЗМЕНИТЬ" />

        <div className="problems-layout">
          <div className="problems-list">
            <h2>Что можно<br />изменить<span>.</span></h2>
            <p className="section-lead">Частые проблемы. Системные решения вместо набора случайных действий.</p>
            <div className="problem-cards">
              {problems.map((item, index) => (
                <button key={item.title} className={`problem-card ${active === index ? "is-active" : ""}`} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)}>
                  <span className="problem-card__num">{String(index + 1).padStart(2, "0")}</span>
                  <item.icon size={19} />
                  <span className="problem-card__copy"><strong>{item.title}</strong><small>{item.description}</small></span>
                  <span className="problem-card__arrow">→</span>
                </button>
              ))}
            </div>
          </div>

          <div className="engine-stage">
            <div className="engine-stage__label">АКТИВНЫЕ МОДУЛИ</div>
            <CoreVisual mode="engine" activeModules={problems[active].modules} />
            <div className="engine-stage__caption">ХАОС <span>→</span> СТРУКТУРА <span>→</span> СИСТЕМА</div>
          </div>

          <aside className="process-panel">
            <h3>Как это работает</h3>
            <p>От проблемы к понятному результату за пять этапов.</p>
            <div className="process-stack">
              {process.map((item, index) => (
                <div className="process-step" key={item.title}>
                  <span className="process-step__num">{String(index + 1).padStart(2, "0")}</span>
                  <item.icon size={20} />
                  <div><strong>{item.title}</strong><small>{item.text}</small></div>
                </div>
              ))}
            </div>
            <a className="button button--primary button--full" href="#constructor">Начать проект →</a>
          </aside>
        </div>

        <div className="system-strip">
          <div><span>01</span><strong>Модульный подход</strong><small>Каждая часть решает свою задачу и соединяется с остальными.</small></div>
          <div><span>02</span><strong>Живой сценарий</strong><small>Сайт, бот, контент и автоматизация работают не по отдельности.</small></div>
          <div><span>03</span><strong>Масштабируемая архитектура</strong><small>Систему можно развивать без полной пересборки проекта.</small></div>
        </div>
      </div>
    </section>
  );
}
