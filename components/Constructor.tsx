"use client";

import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { FormEvent } from "react";

const projectTypes = [
  ["site", "Сайт", "Корпоративный сайт, портфолио или веб-продукт"],
  ["landing", "Лендинг", "Запуск продукта, услуги или отдельного предложения"],
  ["media", "Медиа-система", "Контент, площадки и дистрибуция"],
  ["telegram", "Telegram-бот", "Сервис, интерфейс или коммуникационный сценарий"],
  ["automation", "Автоматизация", "AI, CRM, API и связанные процессы"],
  ["packaging", "Упаковка", "Структура, смысл и визуальная система"],
] as const;

const modules = [
  "Стратегия",
  "Контент",
  "Дизайн",
  "AI",
  "CRM",
  "Интеграции",
  "Аналитика",
  "Запуск",
] as const;

const priorities = [
  "Быстро",
  "Аккуратно",
  "Масштабируемо",
  "Без рутины",
  "Под ключ",
] as const;

const timelines = ["Срочно", "2–4 недели", "1–2 месяца", "Гибко"] as const;
const budgets = ["до $5K", "$5–15K", "$15–50K", "$50K+"] as const;

const steps = [
  ["01", "Тип проекта"],
  ["02", "Модули"],
  ["03", "Приоритет"],
  ["04", "Рамки"],
  ["05", "Контакт"],
] as const;

type Status = "idle" | "sending" | "success" | "error";

function toggleValue(value: string, list: string[]) {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

export default function Constructor() {
  const [step, setStep] = useState(0);
  const [projectType, setProjectType] = useState("");
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("");
  const [budget, setBudget] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const typeLabel =
    projectTypes.find(([id]) => id === projectType)?.[1] || "Не выбран";

  const completion = useMemo(() => {
    const done = [
      Boolean(projectType),
      selectedModules.length > 0,
      selectedPriorities.length > 0,
      Boolean(timeline && budget),
      Boolean(name.trim() && contact.trim()),
    ];
    return Math.round((done.filter(Boolean).length / done.length) * 100);
  }, [
    projectType,
    selectedModules,
    selectedPriorities,
    timeline,
    budget,
    name,
    contact,
  ]);

  const isReady =
    Boolean(projectType) &&
    selectedModules.length > 0 &&
    Boolean(name.trim()) &&
    Boolean(contact.trim());

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isReady || status === "sending") return;

    setStatus("sending");
    setMessage("");

    try {
      const formData = new FormData(event.currentTarget);
      const website = String(formData.get("website") || "");

      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedTypes: projectType ? [projectType] : [],
          selectedModules,
          selectedPriorities,
          timeline,
          budget,
          name,
          contact,
          description,
          website,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Не удалось отправить заявку.");
      }

      setStatus("success");
      setMessage("Бриф отправлен. Свяжусь по указанному контакту.");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Не удалось отправить заявку. Попробуйте ещё раз.",
      );
    }
  }

  return (
    <section id="constructor" className="section constructor">
      <div className="site-shell">
        <div className="section-head section-head--split">
          <div className="section-index">
            <span>04</span>
            <i />
            <span>Project configurator</span>
          </div>
          <div>
            <h2>
              Соберите
              <br />
              конфигурацию.
            </h2>
            <p>
              Пять шагов вместо длинной формы. На выходе — структурированный
              бриф, с которым уже можно обсуждать реализацию.
            </p>
          </div>
        </div>

        <form className="configurator" onSubmit={handleSubmit}>
          <input
            className="hp-field"
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <aside className="configurator__nav">
            <div className="configurator__progress">
              <span>PROJECT SPEC</span>
              <strong>{completion}%</strong>
              <div>
                <i style={{ width: `${completion}%` }} />
              </div>
            </div>

            <nav aria-label="Шаги конструктора">
              {steps.map(([number, label], index) => (
                <button
                  key={number}
                  type="button"
                  className={step === index ? "is-active" : ""}
                  onClick={() => setStep(index)}
                  aria-current={step === index ? "step" : undefined}
                >
                  <span>{number}</span>
                  <strong>{label}</strong>
                  <i aria-hidden="true" />
                </button>
              ))}
            </nav>
          </aside>

          <div className="configurator__stage">
            <AnimatePresence mode="wait">
              <motion.div
                className="config-step"
                key={step}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.24 }}
              >
                {step === 0 ? (
                  <>
                    <StepHeading
                      number="01"
                      title="Что нужно собрать?"
                      text="Выберите основной формат. Модули добавим следующим шагом."
                    />
                    <div className="option-stack">
                      {projectTypes.map(([id, label, desc], index) => (
                        <OptionRow
                          key={id}
                          code={String(index + 1).padStart(2, "0")}
                          title={label}
                          description={desc}
                          selected={projectType === id}
                          onClick={() => setProjectType(id)}
                        />
                      ))}
                    </div>
                  </>
                ) : null}

                {step === 1 ? (
                  <>
                    <StepHeading
                      number="02"
                      title="Какие модули нужны?"
                      text="Можно выбрать несколько. Это состав будущей системы, а не пакет услуг."
                    />
                    <div className="token-grid">
                      {modules.map((item, index) => {
                        const selected = selectedModules.includes(item);
                        return (
                          <button
                            type="button"
                            key={item}
                            className={`config-token ${
                              selected ? "is-selected" : ""
                            }`}
                            onClick={() =>
                              setSelectedModules((current) =>
                                toggleValue(item, current),
                              )
                            }
                            aria-pressed={selected}
                          >
                            <span>{String(index + 1).padStart(2, "0")}</span>
                            <strong>{item}</strong>
                            <i>{selected ? <Check aria-hidden="true" /> : null}</i>
                          </button>
                        );
                      })}
                    </div>
                  </>
                ) : null}

                {step === 2 ? (
                  <>
                    <StepHeading
                      number="03"
                      title="Что важнее?"
                      text="Отметьте приоритеты — они зададут порядок решений внутри проекта."
                    />
                    <div className="option-stack option-stack--compact">
                      {priorities.map((item, index) => (
                        <OptionRow
                          key={item}
                          code={String(index + 1).padStart(2, "0")}
                          title={item}
                          description={
                            selectedPriorities.includes(item)
                              ? "Добавлено в приоритет"
                              : "Добавить в конфигурацию"
                          }
                          selected={selectedPriorities.includes(item)}
                          onClick={() =>
                            setSelectedPriorities((current) =>
                              toggleValue(item, current),
                            )
                          }
                        />
                      ))}
                    </div>
                  </>
                ) : null}

                {step === 3 ? (
                  <>
                    <StepHeading
                      number="04"
                      title="Срок и бюджет"
                      text="Нужны не точные цифры, а рамки, от которых можно оттолкнуться."
                    />
                    <div className="config-choice-group">
                      <span>СРОК</span>
                      <div className="choice-line">
                        {timelines.map((item) => (
                          <button
                            type="button"
                            key={item}
                            className={timeline === item ? "is-selected" : ""}
                            onClick={() => setTimeline(item)}
                            aria-pressed={timeline === item}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="config-choice-group">
                      <span>БЮДЖЕТ</span>
                      <div className="choice-line">
                        {budgets.map((item) => (
                          <button
                            type="button"
                            key={item}
                            className={budget === item ? "is-selected" : ""}
                            onClick={() => setBudget(item)}
                            aria-pressed={budget === item}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                ) : null}

                {step === 4 ? (
                  <>
                    <StepHeading
                      number="05"
                      title="Куда ответить?"
                      text="Достаточно имени и Telegram или email. Описание задачи можно оставить коротким."
                    />
                    <div className="contact-grid">
                      <label>
                        <span>ИМЯ</span>
                        <input
                          required
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                          placeholder="Как к вам обращаться?"
                        />
                      </label>
                      <label>
                        <span>TELEGRAM / EMAIL</span>
                        <input
                          required
                          value={contact}
                          onChange={(event) => setContact(event.target.value)}
                          placeholder="@username или name@domain.com"
                        />
                      </label>
                      <label className="contact-grid__wide">
                        <span>ЗАДАЧА</span>
                        <textarea
                          value={description}
                          onChange={(event) => setDescription(event.target.value)}
                          rows={5}
                          placeholder="Что уже есть и какой результат нужен?"
                        />
                      </label>
                    </div>

                    <button
                      className="submit-project"
                      type="submit"
                      disabled={!isReady || status === "sending"}
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 className="spin" aria-hidden="true" />
                          Отправляем
                        </>
                      ) : (
                        <>
                          Отправить конфигурацию
                          <ArrowRight aria-hidden="true" />
                        </>
                      )}
                    </button>

                    {message ? (
                      <p
                        className={`config-message config-message--${status}`}
                        aria-live="polite"
                      >
                        {message}
                      </p>
                    ) : null}
                  </>
                ) : null}
              </motion.div>
            </AnimatePresence>

            <div className="configurator__controls">
              <button
                type="button"
                onClick={() => setStep((value) => Math.max(0, value - 1))}
                disabled={step === 0}
              >
                <ArrowLeft aria-hidden="true" />
                Назад
              </button>
              <span>
                {String(step + 1).padStart(2, "0")} /{" "}
                {String(steps.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={() =>
                  setStep((value) => Math.min(steps.length - 1, value + 1))
                }
                disabled={step === steps.length - 1}
              >
                Дальше
                <ArrowRight aria-hidden="true" />
              </button>
            </div>
          </div>

          <aside className="configurator__summary">
            <div className="summary-head">
              <span>BND / PROJECT SPEC</span>
              <i className={isReady ? "is-ready" : ""} />
            </div>

            <SummaryBlock label="ФОРМАТ" value={typeLabel} />
            <SummaryList label="МОДУЛИ" values={selectedModules} />
            <SummaryList label="ПРИОРИТЕТ" values={selectedPriorities} />

            <div className="summary-split">
              <SummaryBlock label="СРОК" value={timeline || "—"} />
              <SummaryBlock label="БЮДЖЕТ" value={budget || "—"} />
            </div>

            <SummaryBlock label="КОНТАКТ" value={contact || "—"} />

            <div className="summary-footer">
              <span>CONFIGURATION STATUS</span>
              <strong>{isReady ? "READY TO SEND" : "IN PROGRESS"}</strong>
            </div>
          </aside>
        </form>
      </div>
    </section>
  );
}

function StepHeading({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="config-step__head">
      <span>{number}</span>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}

function OptionRow({
  code,
  title,
  description,
  selected,
  onClick,
}: {
  code: string;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`config-option ${selected ? "is-selected" : ""}`}
      onClick={onClick}
      aria-pressed={selected}
    >
      <span>{code}</span>
      <strong>{title}</strong>
      <small>{description}</small>
      <i>{selected ? <Check aria-hidden="true" /> : null}</i>
    </button>
  );
}

function SummaryBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="summary-block">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function SummaryList({ label, values }: { label: string; values: string[] }) {
  return (
    <div className="summary-block">
      <span>{label}</span>
      <div className="summary-values">
        {values.length
          ? values.map((value) => <em key={value}>{value}</em>)
          : <strong>—</strong>}
      </div>
    </div>
  );
}
