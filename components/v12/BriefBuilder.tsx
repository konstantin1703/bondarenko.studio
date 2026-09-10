"use client";

import { ArrowLeft, ArrowRight, Check, Loader2, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";

const projectTypes = [
  ["site", "Сайт", "Корпоративный сайт, портфолио или веб-продукт"],
  ["landing", "Лендинг", "Запуск продукта, услуги или отдельного предложения"],
  ["media", "Медиа-система", "Контент, площадки и дистрибуция"],
  ["telegram", "Telegram-бот", "Сервис, интерфейс или коммуникационный сценарий"],
  ["automation", "Автоматизация", "AI, CRM, API и связанные процессы"],
  ["packaging", "Упаковка", "Структура, смысл и визуальная система"],
] as const;

const modules = ["Стратегия", "Контент", "Дизайн", "AI", "CRM", "Интеграции", "Аналитика", "Запуск"] as const;
const priorities = ["Быстро", "Аккуратно", "Масштабируемо", "Без рутины", "Под ключ"] as const;
const timelines = ["Срочно", "2–4 недели", "1–2 месяца", "Гибко"] as const;
const budgets = ["до $5K", "$5–15K", "$15–50K", "$50K+"] as const;
const steps = ["Формат", "Модули", "Приоритет", "Рамки", "Контакт"] as const;

type Status = "idle" | "sending" | "success" | "error";

function toggle(value: string, current: string[]) {
  return current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
}

function broadcastFocus(value: number) {
  window.dispatchEvent(new CustomEvent("bnd:focus", { detail: { value } }));
}

export default function BriefBuilder() {
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

  useEffect(() => {
    broadcastFocus(status === "success" ? 5 : step);
  }, [step, status]);

  const typeLabel = projectTypes.find(([id]) => id === projectType)?.[1] ?? "—";

  const complete = useMemo(
    () => [
      Boolean(projectType),
      selectedModules.length > 0,
      selectedPriorities.length > 0,
      Boolean(timeline && budget),
      Boolean(name.trim() && contact.trim()),
    ],
    [projectType, selectedModules, selectedPriorities, timeline, budget, name, contact],
  );

  const progress = Math.round((complete.filter(Boolean).length / complete.length) * 100);
  const canAdvance = complete[step];
  const ready = complete.every(Boolean);
  const firstIncomplete = complete.findIndex((value) => !value);
  const maxUnlockedStep = firstIncomplete === -1 ? steps.length - 1 : firstIncomplete;

  function goToStep(index: number) {
    if (status === "success" || index > maxUnlockedStep) return;
    setStep(index);
  }

  function resetBrief() {
    setStep(0);
    setProjectType("");
    setSelectedModules([]);
    setSelectedPriorities([]);
    setTimeline("");
    setBudget("");
    setName("");
    setContact("");
    setDescription("");
    setStatus("idle");
    setMessage("");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ready || status === "sending") return;

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
      if (!response.ok) throw new Error(data?.error || "Не удалось отправить бриф.");

      setStatus("success");
      setMessage("");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Не удалось отправить бриф.");
    }
  }

  return (
    <section id="brief" className="v12-section v12-brief" data-scene="brief">
      <div className="v12-shell">
        <div className="v12-section-head" data-reveal>
          <span className="v12-section-number">03</span>
          <h2>Соберите конфигурацию проекта.</h2>
          <p>
            Пять коротких шагов вместо анкеты на двадцать полей. На выходе — структура,
            с которой уже можно говорить о реализации.
          </p>
        </div>

        <form className={`v12-configurator ${status === "success" ? "is-sent" : ""}`} onSubmit={submit} data-reveal>
          <input className="v12-honeypot" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

          <aside className="v12-configurator__rail">
            <div className="v12-progress">
              <span>PROJECT SPEC</span>
              <strong>{progress}%</strong>
              <i><b style={{ width: `${progress}%` }} /></i>
            </div>

            <nav aria-label="Этапы брифа">
              {steps.map((label, index) => {
                const locked = status === "success" || index > maxUnlockedStep;
                return (
                  <button
                    key={label}
                    type="button"
                    className={step === index && status !== "success" ? "is-active" : ""}
                    onClick={() => goToStep(index)}
                    aria-current={step === index && status !== "success" ? "step" : undefined}
                    aria-label={locked && status !== "success" ? `${label}. Сначала завершите предыдущий шаг.` : label}
                    disabled={locked}
                  >
                    <span>0{index + 1}</span>
                    <strong>{label}</strong>
                    <i className={complete[index] ? "is-complete" : ""} />
                  </button>
                );
              })}
            </nav>
          </aside>

          <div className="v12-configurator__stage">
            {status === "success" ? (
              <div className="v12-success-state" aria-live="polite">
                <span className="v12-success-state__code">TRANSMISSION COMPLETE</span>
                <div className="v12-success-state__mark" aria-hidden="true"><Check /></div>
                <h3>Конфигурация отправлена.</h3>
                <p>
                  Бриф собран и передан. Следующий шаг — разобрать задачу и выбрать
                  реалистичную архитектуру реализации.
                </p>
                <button type="button" onClick={resetBrief}>
                  <RotateCcw aria-hidden="true" />
                  Собрать новый бриф
                </button>
              </div>
            ) : (
              <>
                <div className="v12-step" key={step}>
                  {step === 0 ? (
                    <>
                      <StepHead number="01" title="Что нужно собрать?" text="Выберите основной формат. Состав системы уточним дальше." />
                      <div className="v12-option-list">
                        {projectTypes.map(([id, label, text], index) => (
                          <OptionRow
                            key={id}
                            index={index}
                            label={label}
                            text={text}
                            selected={projectType === id}
                            onClick={() => setProjectType(id)}
                          />
                        ))}
                      </div>
                    </>
                  ) : null}

                  {step === 1 ? (
                    <>
                      <StepHead number="02" title="Какие модули нужны?" text="Можно выбрать несколько. Это состав будущей системы, а не тарифный пакет." />
                      <div className="v12-token-grid">
                        {modules.map((item, index) => {
                          const selected = selectedModules.includes(item);
                          return (
                            <Token
                              key={item}
                              index={index}
                              label={item}
                              selected={selected}
                              onClick={() => setSelectedModules((current) => toggle(item, current))}
                            />
                          );
                        })}
                      </div>
                    </>
                  ) : null}

                  {step === 2 ? (
                    <>
                      <StepHead number="03" title="Что важнее?" text="Приоритеты задают порядок решений: скорость, качество сборки, масштабирование или минимум рутины." />
                      <div className="v12-token-grid v12-token-grid--single">
                        {priorities.map((item, index) => (
                          <Token
                            key={item}
                            index={index}
                            label={item}
                            selected={selectedPriorities.includes(item)}
                            onClick={() => setSelectedPriorities((current) => toggle(item, current))}
                          />
                        ))}
                      </div>
                    </>
                  ) : null}

                  {step === 3 ? (
                    <>
                      <StepHead number="04" title="Какие рамки?" text="Нужен не контрактный расчёт, а диапазон, чтобы сразу выбрать реалистичный масштаб решения." />
                      <ChoiceGroup label="СРОК" options={timelines} value={timeline} onChange={setTimeline} />
                      <ChoiceGroup label="БЮДЖЕТ" options={budgets} value={budget} onChange={setBudget} />
                    </>
                  ) : null}

                  {step === 4 ? (
                    <>
                      <StepHead number="05" title="Куда ответить?" text="Имя и Telegram или email. Контекст задачи можно дать в нескольких предложениях." />
                      <div className="v12-contact-grid">
                        <label>
                          <span>ИМЯ</span>
                          <input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Как к вам обращаться?" autoComplete="name" />
                        </label>
                        <label>
                          <span>TELEGRAM / EMAIL</span>
                          <input required value={contact} onChange={(event) => setContact(event.target.value)} placeholder="@username или email" autoComplete="email" />
                        </label>
                        <label className="v12-contact-grid__wide">
                          <span>ЗАДАЧА</span>
                          <textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={5} placeholder="Что уже есть и какой результат нужен?" />
                        </label>
                      </div>

                      <button className="v12-submit" type="submit" disabled={!ready || status === "sending"}>
                        {status === "sending" ? <Loader2 className="v12-spin" aria-hidden="true" /> : null}
                        <span>{status === "sending" ? "Отправляем" : "Отправить конфигурацию"}</span>
                        {status !== "sending" ? <ArrowRight aria-hidden="true" /> : null}
                      </button>

                      {message ? <p className={`v12-form-message is-${status}`} aria-live="polite">{message}</p> : null}
                    </>
                  ) : null}
                </div>

                <div className="v12-configurator__controls">
                  <button type="button" onClick={() => setStep((value) => Math.max(0, value - 1))} disabled={step === 0}>
                    <ArrowLeft aria-hidden="true" /> Назад
                  </button>
                  <span>0{step + 1} / 05</span>
                  <button
                    type="button"
                    onClick={() => setStep((value) => Math.min(4, value + 1))}
                    disabled={step === 4 || !canAdvance}
                  >
                    Дальше <ArrowRight aria-hidden="true" />
                  </button>
                </div>
              </>
            )}
          </div>

          <aside className="v12-configurator__summary">
            <div className="v12-summary__head">
              <span>ВАШ БРИФ</span>
              <i className={ready ? "is-ready" : ""} />
            </div>
            <Summary label="ФОРМАТ" value={typeLabel} />
            <SummaryList label="МОДУЛИ" values={selectedModules} />
            <SummaryList label="ПРИОРИТЕТ" values={selectedPriorities} />
            <div className="v12-summary__split">
              <Summary label="СРОК" value={timeline || "—"} />
              <Summary label="БЮДЖЕТ" value={budget || "—"} />
            </div>
            <Summary label="КОНТАКТ" value={contact || "—"} />
            <div className="v12-summary__status">
              <span>STATUS</span>
              <strong>{status === "success" ? "TRANSMITTED" : ready ? "READY TO SEND" : "CONFIGURING"}</strong>
            </div>
          </aside>
        </form>
      </div>
    </section>
  );
}

function StepHead({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <div className="v12-step__head">
      <span>{number}</span>
      <div><h3>{title}</h3><p>{text}</p></div>
    </div>
  );
}

function OptionRow({ index, label, text, selected, onClick }: { index: number; label: string; text: string; selected: boolean; onClick: () => void }) {
  return (
    <button type="button" className={`v12-option ${selected ? "is-selected" : ""}`} onClick={onClick} aria-pressed={selected}>
      <span>0{index + 1}</span>
      <strong>{label}</strong>
      <small>{text}</small>
      <i>{selected ? <Check aria-hidden="true" /> : null}</i>
    </button>
  );
}

function Token({ index, label, selected, onClick }: { index: number; label: string; selected: boolean; onClick: () => void }) {
  return (
    <button type="button" className={`v12-token ${selected ? "is-selected" : ""}`} onClick={onClick} aria-pressed={selected}>
      <span>0{index + 1}</span><strong>{label}</strong><i>{selected ? <Check aria-hidden="true" /> : null}</i>
    </button>
  );
}

function ChoiceGroup<T extends readonly string[]>({ label, options, value, onChange }: { label: string; options: T; value: string; onChange: (value: string) => void }) {
  return (
    <div className="v12-choice-group">
      <span>{label}</span>
      <div>
        {options.map((option) => (
          <button type="button" key={option} className={value === option ? "is-selected" : ""} onClick={() => onChange(option)} aria-pressed={value === option}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return <div className="v12-summary"><span>{label}</span><strong>{value}</strong></div>;
}

function SummaryList({ label, values }: { label: string; values: string[] }) {
  return (
    <div className="v12-summary">
      <span>{label}</span>
      <div className="v12-summary__values">
        {values.length ? values.map((value) => <em key={value}>{value}</em>) : <strong>—</strong>}
      </div>
    </div>
  );
}
