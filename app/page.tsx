"use client";

import { FormEvent, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownRight, ArrowLeft, ArrowRight, Bot, Check, CircleCheck,
  Cog, Database, Globe2, Layers3, Menu, Network, PenTool,
  PlayCircle, Search, Send, Sparkles, Target, X
} from "lucide-react";

const problems = [
  {
    title: "Продукт выглядит слабее, чем он есть",
    short: "Упаковка / интерфейс / позиционирование",
    before: ["ценность считывается не сразу", "визуальная система разрознена", "путь пользователя неочевиден"],
    system: ["аудит", "структура", "интерфейс"],
    after: ["ясная подача", "единый визуальный язык", "сильный пользовательский сценарий"],
  },
  {
    title: "Слишком много ручной работы",
    short: "Повторяющиеся операции / CRM / данные",
    before: ["данные переносятся вручную", "действия повторяются", "процессы зависят от человека"],
    system: ["сценарий", "интеграции", "автоматизация"],
    after: ["единый поток данных", "автоматические действия", "контроль из одного места"],
  },
  {
    title: "Контент и каналы существуют отдельно",
    short: "Telegram / YouTube / сайт / материалы",
    before: ["каналы не усиливают друг друга", "контент живёт фрагментами", "нет общей логики дистрибуции"],
    system: ["контент-модель", "медиа-система", "дистрибуция"],
    after: ["единая редакционная логика", "связанные каналы", "понятный цикл публикации"],
  },
  {
    title: "Проект сложно развивать",
    short: "Инструменты не связаны / всё приходится переделывать",
    before: ["каждый сервис живёт отдельно", "новые функции ломают старые", "архитектура не масштабируется"],
    system: ["архитектура", "модули", "API"],
    after: ["модульная система", "понятные связи", "рост без полной пересборки"],
  },
];

const productTypes = [
  ["Сайт / платформа", Globe2],
  ["Лендинг", Layers3],
  ["Медиа-система", PlayCircle],
  ["Telegram-бот", Send],
  ["Автоматизация", Cog],
  ["Упаковка продукта", Sparkles],
] as const;

const modules = ["Стратегия", "UI/UX", "Контент", "AI", "Telegram", "CRM", "API", "Аналитика"];
const priorities = ["Скорость запуска", "Качество интерфейса", "Автоматизация", "Масштабирование"];
const timelines = ["Срочно", "2–4 недели", "1–2 месяца", "Без жёсткого срока"];
const budgets = ["Нужен расчёт", "До 150 тыс. ₽", "150–350 тыс. ₽", "350 тыс. ₽+"];

function toggle(value: string, list: string[], setList: (value: string[]) => void) {
  setList(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
}

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="section-label">
      <span>{index} / 04</span>
      <i />
      <b>{children}</b>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <a href="#hero" className="brand"><b>BONDARENKO</b><span>.STUDIO</span></a>
        <nav>
          <a href="#change">Задачи</a>
          <a href="#architecture">Система</a>
          <a href="#constructor">Конструктор</a>
        </nav>
        <div className="site-header__end">
          <span>AI / MEDIA / AUTOMATION</span>
          <a href="#constructor" className="site-header__cta">Начать <ArrowDownRight size={15} /></a>
          <button onClick={() => setOpen(!open)} aria-label="Меню">
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="mobile-nav">
          <a href="#change" onClick={() => setOpen(false)}>Задачи</a>
          <a href="#architecture" onClick={() => setOpen(false)}>Система</a>
          <a href="#constructor" onClick={() => setOpen(false)}>Конструктор</a>
        </div>
      )}
    </header>
  );
}

function IndustrialCore() {
  return (
    <motion.div
      className="industrial-core"
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="industrial-core__halo" />
      <div className="industrial-core__scan" />
      <svg viewBox="0 0 780 780" aria-label="BND Core" role="img">
        <defs>
          <linearGradient id="plateA" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1a4055" />
            <stop offset=".34" stopColor="#0c1b26" />
            <stop offset="1" stopColor="#02070b" />
          </linearGradient>
          <linearGradient id="plateB" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#19384a" />
            <stop offset=".45" stopColor="#07121a" />
            <stop offset="1" stopColor="#03070a" />
          </linearGradient>
          <linearGradient id="edge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#168cff" stopOpacity="0" />
            <stop offset=".48" stopColor="#6bd0ff" stopOpacity=".95" />
            <stop offset="1" stopColor="#168cff" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="coreGlow">
            <stop offset="0" stopColor="#168cff" stopOpacity=".30" />
            <stop offset=".7" stopColor="#168cff" stopOpacity=".04" />
            <stop offset="1" stopColor="#168cff" stopOpacity="0" />
          </radialGradient>
          <filter id="soft"><feGaussianBlur stdDeviation="18" /></filter>
          <filter id="deep"><feDropShadow dx="0" dy="34" stdDeviation="26" floodColor="#000" floodOpacity=".72" /></filter>
        </defs>

        <circle cx="390" cy="390" r="286" fill="none" stroke="#6bcaff" strokeOpacity=".07" />
        <circle cx="390" cy="390" r="238" fill="none" stroke="#6bcaff" strokeOpacity=".10" strokeDasharray="4 14" />
        <path d="M390 88v66M390 626v66M88 390h66M626 390h66" stroke="#6bcaff" strokeOpacity=".11" />
        <path d="M170 170l46 46M610 170l-46 46M170 610l46-46M610 610l-46-46" stroke="#6bcaff" strokeOpacity=".07" />

        <ellipse cx="390" cy="430" rx="205" ry="150" fill="url(#coreGlow)" filter="url(#soft)" />

        <g filter="url(#deep)">
          <path d="M251 204L442 164l129 94 31 170-83 151-183 50-154-88-35-185z" fill="url(#plateA)" stroke="#75cfff" strokeOpacity=".23" strokeWidth="2" />
          <path d="M286 242l144-28 98 70 23 129-63 113-137 38-118-66-25-140z" fill="url(#plateB)" stroke="#6fc8fb" strokeOpacity=".17" />
          <path d="M319 283l103-18 71 51 17 93-48 82-96 26-83-47-18-99z" fill="#06111a" stroke="#7dd4ff" strokeOpacity=".18" />
          <path d="M225 327l57-74 18 22-51 76z" fill="#0e2b3a" stroke="#68c8ff" strokeOpacity=".18" />
          <path d="M535 303l54 88-24 7-47-82z" fill="#0d2735" stroke="#68c8ff" strokeOpacity=".16" />
          <path d="M287 503l73 33-6 27-78-38z" fill="#0d2735" stroke="#68c8ff" strokeOpacity=".14" />
        </g>

        <g opacity=".7">
          <path d="M308 333h164" stroke="url(#edge)" strokeWidth="2" />
          <path d="M297 353h94" stroke="#61c7ff" strokeOpacity=".18" />
          <path d="M390 353h92" stroke="#61c7ff" strokeOpacity=".18" />
          <path d="M319 457h142" stroke="url(#edge)" strokeWidth="1.5" />
        </g>

        <rect x="327" y="342" width="126" height="104" rx="14" fill="#07121a" stroke="#7dd4ff" strokeOpacity=".34" />
        <rect x="346" y="359" width="88" height="50" rx="8" fill="#0d2635" stroke="#6bcaff" strokeOpacity=".24" />
        <path d="M357 420h66M350 432h80" stroke="#69caff" strokeOpacity=".20" />
        <path d="M334 365h-28M334 385h-46M334 405h-31M446 365h28M446 385h46M446 405h31" stroke="#69caff" strokeOpacity=".26" />

        <circle cx="172" cy="390" r="4" fill="#8bdcff" />
        <circle cx="608" cy="390" r="4" fill="#8bdcff" />
        <circle cx="390" cy="172" r="4" fill="#8bdcff" />
        <circle cx="390" cy="608" r="4" fill="#8bdcff" />
      </svg>

      <div className="industrial-core__plate">
        <span>BND</span>
        <b>CORE</b>
        <small>SYSTEM / ACTIVE</small>
      </div>

      <div className="industrial-core__tag industrial-core__tag--1">СТРАТЕГИЯ</div>
      <div className="industrial-core__tag industrial-core__tag--2">ИНТЕРФЕЙС</div>
      <div className="industrial-core__tag industrial-core__tag--3">AI / API</div>
      <div className="industrial-core__tag industrial-core__tag--4">АВТОМАТИЗАЦИЯ</div>
    </motion.div>
  );
}

function TransformationDiagram({ active }: { active: number }) {
  const item = problems[active];
  return (
    <div className="transform-panel">
      <div className="transform-panel__top">
        <span>СЦЕНАРИЙ / {String(active + 1).padStart(2, "0")}</span>
        <b>ACTIVE PATH</b>
      </div>

      <div className="transform-grid">
        <article className="transform-column">
          <span>БЫЛО</span>
          {item.before.map((value, index) => (
            <div key={value} className="transform-node transform-node--muted">
              <i>{String(index + 1).padStart(2, "0")}</i>
              <b>{value}</b>
            </div>
          ))}
        </article>

        <div className="transform-center">
          <div className="transform-center__rail"><span /><span /><span /></div>
          <div className="transform-center__system">
            <small>НАША СИСТЕМА</small>
            {item.system.map((value, index) => (
              <div key={value}><span>{String(index + 1).padStart(2, "0")}</span><b>{value}</b></div>
            ))}
          </div>
          <div className="transform-center__rail transform-center__rail--right"><span /><span /><span /></div>
        </div>

        <article className="transform-column transform-column--after">
          <span>СТАЛО</span>
          {item.after.map((value, index) => (
            <div key={value} className="transform-node transform-node--active">
              <i>{String(index + 1).padStart(2, "0")}</i>
              <b>{value}</b>
            </div>
          ))}
        </article>
      </div>

      <div className="transform-panel__result">
        <span>РЕЗУЛЬТАТ</span>
        <b>Один связанный сценарий вместо набора разрозненных действий.</b>
      </div>
    </div>
  );
}

function Architecture() {
  const nodes = [
    ["Стратегия", "ПОЗИЦИОНИРОВАНИЕ / СТРУКТУРА", Target],
    ["Интерфейс", "WEB / UI / UX", PenTool],
    ["Медиа", "CONTENT / VIDEO / TELEGRAM", PlayCircle],
    ["Автоматизация", "AI / API / CRM / BOTS", Bot],
  ] as const;

  return (
    <div className="architecture-map">
      <div className="architecture-map__desktop">
        <div className="architecture-node architecture-node--1">
          <Target size={18} /><div><b>Стратегия</b><small>ПОЗИЦИОНИРОВАНИЕ / СТРУКТУРА</small></div>
        </div>
        <div className="architecture-node architecture-node--2">
          <PenTool size={18} /><div><b>Интерфейс</b><small>WEB / UI / UX</small></div>
        </div>
        <div className="architecture-node architecture-node--3">
          <PlayCircle size={18} /><div><b>Медиа</b><small>CONTENT / VIDEO / TELEGRAM</small></div>
        </div>
        <div className="architecture-node architecture-node--4">
          <Bot size={18} /><div><b>Автоматизация</b><small>AI / API / CRM / BOTS</small></div>
        </div>

        <div className="architecture-hub"><span>BND</span><b>NODE</b><small>PROJECT SYSTEM</small></div>

        <svg viewBox="0 0 900 600" preserveAspectRatio="none" aria-hidden="true">
          <path d="M450 300L185 120" />
          <path d="M450 300L715 120" />
          <path d="M450 300L185 480" />
          <path d="M450 300L715 480" />
        </svg>
      </div>

      <div className="architecture-map__mobile">
        <div className="architecture-mobile__hub"><span>BND</span><b>SYSTEM</b></div>
        <div className="architecture-mobile__line" />
        {nodes.map(([title, note, Icon]) => (
          <article key={title}>
            <Icon size={18} />
            <div><b>{title}</b><small>{note}</small></div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Picker({ title, items, value, onPick }: { title: string; items: string[]; value: string; onPick: (value: string) => void }) {
  return (
    <div className="picker">
      <span>{title}</span>
      <div>
        {items.map((item) => (
          <button type="button" key={item} onClick={() => onPick(item)} className={value === item ? "is-selected" : ""}>
            {value === item ? <CircleCheck size={15} /> : <i />}{item}
          </button>
        ))}
      </div>
    </div>
  );
}

function BriefItem({ label, value }: { label: string; value: string }) {
  return <div className="brief-item"><span>{label}</span><b>{value}</b></div>;
}

export default function Home() {
  const [problem, setProblem] = useState(0);
  const [step, setStep] = useState(0);
  const [type, setType] = useState("");
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [priority, setPriority] = useState("");
  const [timeline, setTimeline] = useState("");
  const [budget, setBudget] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const canNext = [
    !!type,
    selectedModules.length > 0,
    !!priority && !!timeline,
    !!name.trim() && !!contact.trim(),
  ][step];

  const summary = useMemo(() => ({
    type: type || "Не выбрано",
    modules: selectedModules.length ? selectedModules.join(" · ") : "Не выбрано",
    priority: priority || "—",
    timing: timeline || "—",
    budget: budget || "—",
  }), [type, selectedModules, priority, timeline, budget]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          modules: selectedModules,
          priority,
          timeline,
          budget,
          name,
          contact,
          description,
          website: "",
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Не удалось отправить заявку.");
      setStatus("success");
      setMessage("Бриф отправлен.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Не удалось отправить заявку.");
    }
  }

  return (
    <>
      <Header />
      <main>
        <section id="hero" className="section hero">
          <div className="signal-line signal-line--hero" />
          <div className="shell">
            <SectionLabel index="01">ЦИФРОВАЯ СИСТЕМА</SectionLabel>

            <div className="hero-grid">
              <div className="hero-copy">
                <span className="hero-kicker"><i /> НЕ НАБОР УСЛУГ. ОДНА СИСТЕМА.</span>
                <h1>Собираю цифровые продукты <em>как систему.</em></h1>
                <p>Стратегия, интерфейс, контент, AI, Telegram и автоматизация — в одной архитектуре, где каждый модуль решает свою задачу и усиливает остальные.</p>
                <div className="hero-actions">
                  <a className="button button--primary" href="#constructor">Собрать задачу <ArrowRight size={16} /></a>
                  <a className="button" href="#architecture">Посмотреть систему</a>
                </div>
                <div className="hero-rail">
                  <span>ИДЕЯ</span><i>→</i><span>АРХИТЕКТУРА</span><i>→</i><span>СБОРКА</span><i>→</i><span>ЗАПУСК</span>
                </div>
              </div>

              <div className="hero-core">
                <IndustrialCore />
                <div className="core-status core-status--a"><i /><span>СИСТЕМА</span><b>ONLINE</b></div>
                <div className="core-status core-status--b"><span>МОДУЛИ</span><b>CONNECTED</b></div>
              </div>
            </div>

            <div className="hero-capabilities">
              {[
                [Globe2, "Сайты и продукты", "WEB / UI / API"],
                [PlayCircle, "Медиа-системы", "CONTENT / MEDIA"],
                [Bot, "AI и Telegram", "AI / BOTS / CRM"],
                [Cog, "Автоматизация", "WORKFLOWS / API"],
              ].map(([Icon, title, note], index) => (
                <article key={String(title)}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <Icon size={18} />
                  <div><b>{String(title)}</b><small>{String(note)}</small></div>
                  <ArrowDownRight size={14} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="change" className="section">
          <div className="signal-line signal-line--transform" />
          <div className="shell">
            <SectionLabel index="02">ЧТО МОЖНО ИЗМЕНИТЬ</SectionLabel>
            <div className="section-head">
              <h2>Проблема редко находится <span>в одном месте.</span></h2>
              <p>Если интерфейс, контент, коммуникации и процессы живут отдельно, продукт начинает терять скорость. Здесь важен не отдельный экран — важна связка.</p>
            </div>

            <div className="change-layout">
              <div className="problem-list">
                {problems.map((item, index) => (
                  <button type="button" key={item.title} onClick={() => setProblem(index)} className={problem === index ? "is-active" : ""}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div><b>{item.title}</b><small>{item.short}</small></div>
                    <ArrowRight size={15} />
                  </button>
                ))}
              </div>
              <TransformationDiagram active={problem} />
            </div>
          </div>
        </section>

        <section id="architecture" className="section">
          <div className="signal-line signal-line--architecture" />
          <div className="shell">
            <SectionLabel index="03">АРХИТЕКТУРА ПРОДУКТА</SectionLabel>
            <div className="section-head">
              <h2>Цифровой продукт состоит <span>из связей.</span></h2>
              <p>Подключаем не всё подряд, а только нужные модули. Центр системы остаётся компактным, а каждая часть отвечает за конкретный результат.</p>
            </div>

            <div className="architecture-layout">
              <Architecture />
              <aside className="architecture-side">
                <div className="architecture-side__head">
                  <span>ПРИНЦИП</span>
                  <b>Сначала архитектура. Потом инструменты.</b>
                </div>
                {[
                  ["01", "Погружение", "Разбираем задачу, ограничения и текущую систему."],
                  ["02", "Схема решения", "Определяем модули и связи между ними."],
                  ["03", "Дизайн и сборка", "Создаём интерфейс, контент и интеграции."],
                  ["04", "Запуск и развитие", "Тестируем сценарии и развиваем продукт."],
                ].map(([num, title, text]) => (
                  <div className="architecture-side__row" key={num}>
                    <span>{num}</span>
                    <div><b>{title}</b><small>{text}</small></div>
                  </div>
                ))}
                <a href="#constructor" className="button button--primary">Собрать свой проект <ArrowRight size={16} /></a>
              </aside>
            </div>
          </div>
        </section>

        <section id="constructor" className="section constructor-section">
          <div className="signal-line signal-line--constructor" />
          <div className="shell">
            <SectionLabel index="04">КОНСТРУКТОР ЗАДАЧИ</SectionLabel>
            <div className="section-head constructor-head">
              <div>
                <h2>Соберите первый бриф <span>за несколько шагов.</span></h2>
                <p>Это не калькулятор цены. Это способ быстро сформировать структуру задачи для нормального разговора о проекте.</p>
              </div>
              <b>{String(step + 1).padStart(2, "0")} / 04</b>
            </div>

            <form className="constructor" onSubmit={submit}>
              <div className="constructor-main">
                <div className="stepper">
                  {["Формат", "Модули", "Параметры", "Контакты"].map((label, index) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => index <= step && setStep(index)}
                      className={index === step ? "is-active" : index < step ? "is-done" : ""}
                    >
                      <span>{index < step ? <Check size={12} /> : index + 1}</span>
                      <b>{label}</b>
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    className="constructor-stage"
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -18 }}
                    transition={{ duration: .22 }}
                  >
                    {step === 0 && (
                      <>
                        <div className="stage-head"><span>ШАГ 01</span><h3>Что нужно собрать?</h3><p>Выберите основной формат. Остальное можно подключить как модули.</p></div>
                        <div className="project-grid">
                          {productTypes.map(([title, Icon]) => (
                            <button type="button" key={title} onClick={() => setType(title)} className={type === title ? "is-selected" : ""}>
                              <Icon size={20} /><b>{title}</b><span>{type === title && <CircleCheck size={16} />}</span>
                            </button>
                          ))}
                        </div>
                      </>
                    )}

                    {step === 1 && (
                      <>
                        <div className="stage-head"><span>ШАГ 02</span><h3>Какие модули подключить?</h3><p>Выберите всё, что должно войти в систему.</p></div>
                        <div className="module-grid">
                          {modules.map((item) => (
                            <button type="button" key={item} onClick={() => toggle(item, selectedModules, setSelectedModules)} className={selectedModules.includes(item) ? "is-selected" : ""}>
                              <span>{selectedModules.includes(item) ? <Check size={13} /> : "+"}</span><b>{item}</b>
                            </button>
                          ))}
                        </div>
                        <div className="config-strip">
                          <div className="config-strip__head"><span>PROJECT CONFIGURATION</span><b>{selectedModules.length} MODULES CONNECTED</b></div>
                          <div className="config-strip__line">
                            {selectedModules.length ? selectedModules.map((item, index) => (
                              <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><b>{item}</b></div>
                            )) : <small>Выберите хотя бы один модуль.</small>}
                          </div>
                        </div>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <div className="stage-head"><span>ШАГ 03</span><h3>Параметры проекта</h3><p>Ориентиры нужны, чтобы сразу понимать рамки задачи.</p></div>
                        <Picker title="Главный приоритет" items={priorities} value={priority} onPick={setPriority} />
                        <Picker title="Срок" items={timelines} value={timeline} onPick={setTimeline} />
                        <Picker title="Бюджет" items={budgets} value={budget} onPick={setBudget} />
                      </>
                    )}

                    {step === 3 && (
                      <>
                        <div className="stage-head"><span>ШАГ 04</span><h3>Куда написать?</h3><p>Оставьте контакт и коротко опишите задачу.</p></div>
                        <div className="contact-grid">
                          <label><span>Имя</span><input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Как к вам обращаться?" /></label>
                          <label><span>Telegram или email</span><input required value={contact} onChange={(e) => setContact(e.target.value)} placeholder="@username или name@domain.com" /></label>
                          <label className="wide"><span>О задаче</span><textarea rows={6} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Что уже есть, что нужно изменить и какой результат нужен?" /></label>
                        </div>
                        {message && <p className={"form-message " + status}>{message}</p>}
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="constructor-nav">
                  <button type="button" className="button" disabled={step === 0} onClick={() => setStep(Math.max(0, step - 1))}><ArrowLeft size={15} /> Назад</button>
                  {step < 3 ? (
                    <button type="button" className="button button--primary" disabled={!canNext} onClick={() => setStep(step + 1)}>Дальше <ArrowRight size={15} /></button>
                  ) : (
                    <button type="submit" className="button button--primary" disabled={!canNext || status === "sending"}>
                      {status === "sending" ? "Отправляем…" : <>Отправить бриф <ArrowRight size={15} /></>}
                    </button>
                  )}
                </div>
              </div>

              <aside className="brief">
                <div className="brief__top"><div><span>BND</span><b>ВАШ БРИФ</b></div><small><i /> LIVE</small></div>
                <BriefItem label="Формат" value={summary.type} />
                <BriefItem label="Модули" value={summary.modules} />
                <BriefItem label="Приоритет" value={summary.priority} />
                <div className="brief__pair"><BriefItem label="Срок" value={summary.timing} /><BriefItem label="Бюджет" value={summary.budget} /></div>
                <div className="brief__status"><Database size={16} /><div><span>СТРУКТУРА ПРОЕКТА</span><b>{Math.round(((step + 1) / 4) * 100)}% сформировано</b></div></div>
                <div className="brief__line"><motion.span animate={{ width: ((step + 1) / 4) * 100 + "%" }} /></div>
                <p>Финальная оценка и архитектура формируются после короткого обсуждения задачи.</p>
              </aside>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="shell">
          <a className="brand" href="#hero"><b>BONDARENKO</b><span>.STUDIO</span></a>
          <p>Цифровые продукты как система.</p>
          <div><span>WEB</span><span>AI</span><span>MEDIA</span><span>AUTOMATION</span></div>
        </div>
      </footer>
    </>
  );
}
