"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { Check, Globe2, Layers3, PlayCircle, Send, Cog, Box, ArrowRight, CircleCheck, Loader2 } from "lucide-react";
import CoreVisual, { CoreModule } from "./CoreVisual";
import SectionLabel from "./SectionLabel";

const projectTypes = [
  { id: "site", label: "Сайт", desc: "Корпоративный сайт или веб-сервис", icon: Globe2 },
  { id: "landing", label: "Лендинг", desc: "Презентация продукта или запуска", icon: Layers3 },
  { id: "media", label: "Медиа-система", desc: "Контент, каналы и дистрибуция", icon: PlayCircle },
  { id: "telegram", label: "Telegram-бот", desc: "Бот, сервис или коммуникационный сценарий", icon: Send },
  { id: "automation", label: "Автоматизация", desc: "Процессы, AI, CRM и интеграции", icon: Cog },
  { id: "packaging", label: "Упаковка продукта", desc: "Стратегия, структура и визуальная подача", icon: Box },
];

const modules = ["Стратегия", "Контент", "Дизайн", "AI", "CRM", "Интеграции", "Аналитика", "Запуск"] as const;
const priorities = ["Быстро", "Аккуратно", "Масштабируемо", "Без рутины", "Под ключ"] as const;
const timelines = ["Срочно", "2–4 недели", "1–2 месяца", "Гибко"] as const;

const moduleMap: Record<(typeof modules)[number], CoreModule> = {
  "Стратегия": "strategy",
  "Контент": "content",
  "Дизайн": "interfaces",
  "AI": "ai",
  "CRM": "crm",
  "Интеграции": "automation",
  "Аналитика": "analytics",
  "Запуск": "launch",
};

type Status = "idle" | "sending" | "success" | "error";

export default function Constructor() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("");
  const [budget, setBudget] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const toggle = (value: string, list: string[], setter: (next: string[]) => void) => {
    setter(list.includes(value) ? list.filter(item => item !== value) : [...list, value]);
  };

  const completion = useMemo(() => {
    const fields = [selectedTypes.length > 0, selectedModules.length > 0, selectedPriorities.length > 0, !!timeline, !!budget, !!name.trim(), !!contact.trim(), !!description.trim()];
    return Math.round((fields.filter(Boolean).length / fields.length) * 100);
  }, [selectedTypes, selectedModules, selectedPriorities, timeline, budget, name, contact, description]);

  const currentStep = !selectedTypes.length ? 1 : !selectedModules.length ? 2 : (!timeline || !budget) ? 3 : 4;
  const isReady = selectedTypes.length > 0 && selectedModules.length > 0 && !!name.trim() && !!contact.trim();
  const activeCoreModules = selectedModules.map(item => moduleMap[item as keyof typeof moduleMap]).filter(Boolean);

  const summary = useMemo(() => {
    if (!selectedTypes.length) return "Выберите формат и модули — система соберёт краткое описание проекта.";
    const types = selectedTypes.map(id => projectTypes.find(item => item.id === id)?.label).filter(Boolean).join(", ");
    const mods = selectedModules.slice(0, 4).join(", ");
    return `${types}. ${mods ? `Ключевые модули: ${mods}. ` : ""}${selectedPriorities.length ? `Приоритет: ${selectedPriorities.join(", ").toLowerCase()}.` : ""}`;
  }, [selectedTypes, selectedModules, selectedPriorities]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isReady || status === "sending") return;
    setStatus("sending"); setMessage("");
    try {
      const formData = new FormData(event.currentTarget);
      const website = String(formData.get("website") || "");
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selectedTypes, selectedModules, selectedPriorities, timeline, budget, name, contact, description, website }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Не удалось отправить заявку");
      setStatus("success");
      setMessage("Заявка отправлена. Свяжусь с вами по указанному контакту.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Не удалось отправить заявку. Попробуйте ещё раз.");
    }
  }

  return (
    <section id="constructor" className="section section--constructor">
      <div className="site-shell">
        <SectionLabel index="04" label="КОНСТРУКТОР ЗАДАЧИ" />
        <div className="constructor-heading"><div><h2>Соберите задачу<br />под себя<span>.</span></h2><p>Выберите формат, модули и параметры. На выходе получится структурированный бриф для обсуждения.</p></div><div className="constructor-heading__mark">БРИФ → ЗАЯВКА → ПРОЕКТ</div></div>

        <form onSubmit={handleSubmit} className="constructor-grid">
          <input className="hp-field" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <aside className="brief-steps">
            <div className="brief-steps__title">КОНСТРУКТОР БРИФА</div>
            {[1,2,3,4].map((step, index) => {
              const labels = ["Что нужно", "Какие модули", "Сроки и бюджет", "Контакты"];
              const desc = ["Выберите формат проекта", "Добавьте необходимые блоки", "Укажите ориентиры", "Оставьте способ связи"];
              const done = currentStep > step || completion === 100;
              return <div className={`brief-step ${currentStep === step ? "is-active" : ""} ${done ? "is-done" : ""}`} key={step}><span>{done ? <Check size={15} /> : step}</span><div><strong>{labels[index]}</strong><small>{desc[index]}</small></div></div>;
            })}
            <div className="brief-progress"><div><span>{completion}%</span><span>заполнено</span></div><div className="brief-progress__track"><motion.span animate={{ width: `${completion}%` }} transition={{ duration: .35 }} /></div></div>
          </aside>

          <div className="constructor-form">
            <fieldset className="constructor-block">
              <div className="constructor-block__head"><legend>Что нужно собрать</legend><span>Можно выбрать несколько вариантов</span></div>
              <div className="project-type-grid">
                {projectTypes.map(type => {
                  const selected = selectedTypes.includes(type.id);
                  return <button type="button" aria-pressed={selected} key={type.id} onClick={() => toggle(type.id, selectedTypes, setSelectedTypes)} className={`select-card ${selected ? "is-selected" : ""}`}><type.icon size={20} /><strong>{type.label}</strong><small>{type.desc}</small><span className="select-card__check">{selected ? <Check size={14} /> : null}</span></button>;
                })}
              </div>
            </fieldset>

            <fieldset className="constructor-block">
              <div className="constructor-block__head"><legend>Нужные модули</legend><span>{selectedModules.length} из {modules.length} выбрано</span></div>
              <div className="chip-row">{modules.map(item => <button type="button" aria-pressed={selectedModules.includes(item)} className={`chip ${selectedModules.includes(item) ? "is-selected" : ""}`} key={item} onClick={() => toggle(item, selectedModules, setSelectedModules)}>{selectedModules.includes(item) && <Check size={13} />}{item}</button>)}</div>
              <div className="config-core"><CoreVisual mode="configurator" activeModules={activeCoreModules} compact /><div><span>КОНФИГУРАЦИЯ</span><strong>{selectedModules.length ? "Модули подключены" : "Ожидает выбора"}</strong><small>Визуальное ядро реагирует на выбранную конфигурацию.</small></div></div>
            </fieldset>

            <fieldset className="constructor-block">
              <div className="constructor-block__head"><legend>Приоритеты</legend><span>Что важнее в первую очередь?</span></div>
              <div className="chip-row">{priorities.map(item => <button type="button" aria-pressed={selectedPriorities.includes(item)} className={`chip ${selectedPriorities.includes(item) ? "is-selected" : ""}`} key={item} onClick={() => toggle(item, selectedPriorities, setSelectedPriorities)}>{selectedPriorities.includes(item) && <Check size={13} />}{item}</button>)}</div>
            </fieldset>

            <div className="constructor-two-col">
              <fieldset className="constructor-block"><div className="constructor-block__head"><legend>Сроки</legend><span>Когда нужен запуск?</span></div><div className="option-list">{timelines.map(item => <button type="button" aria-pressed={timeline === item} className={timeline === item ? "is-selected" : ""} key={item} onClick={() => setTimeline(item)}><span>{timeline === item ? <CircleCheck size={16} /> : <i />}</span>{item}</button>)}</div></fieldset>
              <fieldset className="constructor-block"><div className="constructor-block__head"><legend>Бюджет</legend><span>Если ориентир уже есть</span></div><label className="single-field"><span>Ориентировочный бюджет</span><input value={budget} onChange={e => setBudget(e.target.value)} placeholder="Например: нужен расчёт / есть фиксированный бюджет" /></label></fieldset>
            </div>

            <fieldset className="constructor-block constructor-contacts"><div className="constructor-block__head"><legend>Контакты</legend><span>Достаточно Telegram или email</span></div><div className="form-grid"><label><span>Имя</span><input required value={name} onChange={e => setName(e.target.value)} placeholder="Как к вам обращаться?" /></label><label><span>Telegram или email</span><input required value={contact} onChange={e => setContact(e.target.value)} placeholder="@username или name@domain.com" /></label><label className="form-grid__wide"><span>Коротко о задаче</span><textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Что хотите сделать, что уже есть и какой результат нужен?" rows={5} /></label></div></fieldset>
          </div>

          <aside className="brief-preview">
            <div className="brief-preview__top"><div><span className="brief-preview__icon">BND</span><h3>Ваш бриф</h3></div><span className={`brief-status ${isReady ? "is-ready" : ""}`}><i />{isReady ? "готов к отправке" : "заполняется"}</span></div>
            <BriefRow label="Формат проекта" values={selectedTypes.map(id => projectTypes.find(item => item.id === id)?.label || "")} />
            <BriefRow label="Модули" values={selectedModules} />
            <BriefRow label="Приоритеты" values={selectedPriorities} />
            <div className="brief-preview__split"><div><span>Сроки</span><strong>{timeline || "—"}</strong></div><div><span>Бюджет</span><strong>{budget || "—"}</strong></div></div>
            <div className="brief-preview__summary"><span>Предварительное описание</span><p>{summary}</p></div>
            <div className="brief-preview__contact"><span>Контакт</span><strong>{contact || "—"}</strong></div>
            <button className="button button--primary button--full" type="submit" disabled={!isReady || status === "sending"}>{status === "sending" ? <><Loader2 className="spin" size={17} /> Отправляем…</> : <>Отправить заявку <ArrowRight size={17} /></>}</button>
            {process.env.NEXT_PUBLIC_TELEGRAM_URL && <a className="button button--ghost button--full" href={process.env.NEXT_PUBLIC_TELEGRAM_URL} target="_blank" rel="noreferrer">Обсудить напрямую</a>}
            {message && <p aria-live="polite" className={`form-message form-message--${status}`}>{message}</p>}
            <div className="brief-preview__note"><span>AI</span><p>Бриф помогает быстро понять объём и подготовить следующий шаг. Финальная оценка формируется после обсуждения задачи.</p></div>
          </aside>
        </form>
      </div>
    </section>
  );
}

function BriefRow({ label, values }: { label: string; values: string[] }) {
  return <div className="brief-preview__row"><span>{label}</span><div>{values.length ? values.map(value => <em key={value}>{value}</em>) : <small>Не выбрано</small>}</div></div>;
}
