"use client";

import dynamic from "next/dynamic";
import { ArrowLeft, ArrowRight, Check, Loader2, RotateCcw } from "lucide-react";
import gsap from "gsap";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import DeferredMaterialSurface from "@/components/system/DeferredMaterialSurface";
import styles from "./brief-lab.module.css";

const BriefLabCanvas = dynamic(() => import("./BriefLabCanvas"), { ssr: false });

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
const steps = ["Тип проекта", "Модули", "Приоритет", "Рамки", "Контакт"] as const;
const SUBMIT_TIMEOUT_MS = 12_000;

type Status = "idle" | "sending" | "success" | "error";

function toggle(value: string, current: string[]) {
  return current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
}

export default function BriefLab() {
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
  const stageRef = useRef<HTMLDivElement>(null);

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

  const completeCount = complete.filter(Boolean).length;
  const progress = Math.round((completeCount / complete.length) * 100);
  const ready = complete.every(Boolean);
  const canAdvance = complete[step];
  const firstIncomplete = complete.findIndex((value) => !value);
  const maxUnlockedStep = firstIncomplete === -1 ? steps.length - 1 : firstIncomplete;
  const typeLabel = projectTypes.find(([id]) => id === projectType)?.[1] ?? "—";

  useLayoutEffect(() => {
    if (!stageRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline
        .fromTo("[data-stage-kicker]", { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.36 })
        .fromTo("[data-stage-title]", { opacity: 0.2, y: 16 }, { opacity: 1, y: 0, duration: 0.52 }, 0.03)
        .fromTo("[data-stage-option]", { opacity: 0.12, y: 10 }, { opacity: 1, y: 0, duration: 0.42, stagger: 0.035 }, 0.10);
    }, stageRef);
    return () => context.revert();
  }, [step]);

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

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);

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
        signal: controller.signal,
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.error || "Не удалось отправить бриф. Попробуйте ещё раз.");
      }
      setStatus("success");
    } catch (error) {
      setStatus("error");
      if (error instanceof DOMException && error.name === "AbortError") {
        setMessage("Сеть отвечает слишком долго. Проверьте соединение и попробуйте ещё раз.");
      } else {
        setMessage(error instanceof Error ? error.message : "Не удалось отправить бриф. Попробуйте ещё раз.");
      }
    } finally {
      window.clearTimeout(timeout);
    }
  }

  return (
    <section id="brief" className={styles.root} aria-labelledby="brief-title">
      <div className={styles.canvas} aria-hidden="true">
        <DeferredMaterialSurface name="brief" rootMargin="360px 0px">
          <BriefLabCanvas step={step} progress={completeCount} />
        </DeferredMaterialSurface>
      </div>
      <div className={styles.light} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.frame} aria-hidden="true">
        <i className={styles.cornerTl} />
        <i className={styles.cornerTr} />
        <i className={styles.cornerBl} />
        <i className={styles.cornerBr} />
      </div>

      <div className={styles.shell}>
        <header className={styles.heading}>
          <div className={styles.kicker}>
            <span>04 / PROJECT SPEC</span>
            <i />
            <span>ASSEMBLY INTERFACE</span>
          </div>
          <div className={styles.headingGrid}>
            <h2 id="brief-title">
              Соберите проект.<br />
              <em>Не заполняйте анкету.</em>
            </h2>
            <p>
              Пять решений превращают задачу в рабочую спецификацию. Вы выбираете состав,
              рамки и приоритет — система собирает маршрут проекта справа.
            </p>
          </div>
        </header>

        <form className={styles.configurator} onSubmit={submit} aria-busy={status === "sending"}>
          <input className={styles.honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

          <aside className={styles.rail} aria-label="Этапы брифа">
            <div className={styles.progressHead}>
              <span>ASSEMBLY</span>
              <strong>{String(progress).padStart(2, "0")}%</strong>
            </div>
            <div className={styles.progressLine} aria-hidden="true">
              <i style={{ transform: `scaleX(${progress / 100})` }} />
              {steps.map((label, index) => (
                <b key={label} className={complete[index] ? styles.nodeComplete : step === index ? styles.nodeActive : ""} />
              ))}
            </div>

            <nav>
              {steps.map((label, index) => {
                const locked = status === "success" || index > maxUnlockedStep;
                const active = status !== "success" && step === index;
                return (
                  <button
                    key={label}
                    type="button"
                    className={active ? styles.railActive : ""}
                    onClick={() => goToStep(index)}
                    disabled={locked}
                    aria-current={active ? "step" : undefined}
                    aria-label={locked && status !== "success" ? `${label}. Сначала завершите предыдущий этап.` : label}
                  >
                    <span>0{index + 1}</span>
                    <strong>{label}</strong>
                    <i className={complete[index] ? styles.checkComplete : ""}>{complete[index] ? <Check aria-hidden="true" /> : null}</i>
                  </button>
                );
              })}
            </nav>
          </aside>

          <div ref={stageRef} className={styles.stage} aria-live="polite">
            {status === "success" ? (
              <div className={styles.success}>
                <span>TRANSMISSION COMPLETE</span>
                <i aria-hidden="true"><Check /></i>
                <h3>Спецификация отправлена.</h3>
                <p>Бриф собран и передан. Следующий шаг — проверить задачу и предложить реалистичную архитектуру реализации.</p>
                <button type="button" onClick={resetBrief}><RotateCcw aria-hidden="true" />Собрать новый проект</button>
              </div>
            ) : (
              <>
                {step === 0 ? (
                  <Stage number="01" title="Что нужно собрать?" text="Выберите основной формат. Модули и инфраструктуру подключим на следующем этапе.">
                    <div className={styles.rows}>
                      {projectTypes.map(([id, label, text], index) => (
                        <OptionRow key={id} index={index} label={label} text={text} selected={projectType === id} onClick={() => setProjectType(id)} />
                      ))}
                    </div>
                  </Stage>
                ) : null}

                {step === 1 ? (
                  <Stage number="02" title="Какие модули войдут в систему?" text="Можно выбрать несколько. Это состав решения, а не тарифный пакет.">
                    <div className={styles.matrix}>
                      {modules.map((item, index) => (
                        <Token key={item} index={index} label={item} selected={selectedModules.includes(item)} onClick={() => setSelectedModules((current) => toggle(item, current))} />
                      ))}
                    </div>
                  </Stage>
                ) : null}

                {step === 2 ? (
                  <Stage number="03" title="Что задаёт порядок решений?" text="Выберите один или несколько приоритетов — они определят компромиссы внутри архитектуры.">
                    <div className={styles.priorityList}>
                      {priorities.map((item, index) => (
                        <Token key={item} index={index} label={item} selected={selectedPriorities.includes(item)} onClick={() => setSelectedPriorities((current) => toggle(item, current))} />
                      ))}
                    </div>
                  </Stage>
                ) : null}

                {step === 3 ? (
                  <Stage number="04" title="В каких рамках собираем?" text="Диапазон нужен, чтобы сразу выбрать реалистичный масштаб и не проектировать в вакууме.">
                    <ChoiceGroup label="СРОК" options={timelines} value={timeline} onChange={setTimeline} />
                    <ChoiceGroup label="БЮДЖЕТ" options={budgets} value={budget} onChange={setBudget} />
                  </Stage>
                ) : null}

                {step === 4 ? (
                  <Stage number="05" title="Куда вернуть решение?" text="Имя и Telegram или email. Контекст задачи можно дать несколькими предложениями.">
                    <div className={styles.contactGrid}>
                      <label data-stage-option>
                        <span>ИМЯ</span>
                        <input required maxLength={100} value={name} onChange={(event) => setName(event.target.value)} placeholder="Как к вам обращаться?" autoComplete="name" />
                      </label>
                      <label data-stage-option>
                        <span>TELEGRAM / EMAIL</span>
                        <input required maxLength={180} value={contact} onChange={(event) => setContact(event.target.value)} placeholder="@username или email" autoComplete="email" autoCapitalize="none" spellCheck={false} />
                      </label>
                      <label className={styles.contactWide} data-stage-option>
                        <span>ЗАДАЧА</span>
                        <textarea maxLength={1600} value={description} onChange={(event) => setDescription(event.target.value)} rows={4} placeholder="Что уже есть и какой результат нужен?" />
                      </label>
                    </div>
                    <button className={styles.submit} type="submit" disabled={!ready || status === "sending"} data-stage-option>
                      {status === "sending" ? <Loader2 className={styles.spin} aria-hidden="true" /> : null}
                      <span>{status === "sending" ? "Передаём" : "Передать спецификацию"}</span>
                      {status !== "sending" ? <ArrowRight aria-hidden="true" /> : null}
                    </button>
                    {message ? <p className={styles.formMessage} role="alert">{message}</p> : null}
                  </Stage>
                ) : null}

                <div className={styles.controls}>
                  <button type="button" onClick={() => setStep((value) => Math.max(0, value - 1))} disabled={step === 0}>
                    <ArrowLeft aria-hidden="true" /><span>Назад</span>
                  </button>
                  <span>0{step + 1} / 05</span>
                  <button type="button" onClick={() => setStep((value) => Math.min(4, value + 1))} disabled={step === 4 || !canAdvance}>
                    <span>Дальше</span><ArrowRight aria-hidden="true" />
                  </button>
                </div>
              </>
            )}
          </div>

          <aside className={styles.spec} aria-label="Ваш бриф">
            <div className={styles.specHead}>
              <span>LIVE SPECIFICATION</span>
              <b>{ready ? "READY" : "ASSEMBLING"}</b>
            </div>

            <Spec label="ТИП" value={typeLabel} />
            <SpecList label="МОДУЛИ" values={selectedModules} />
            <SpecList label="ПРИОРИТЕТ" values={selectedPriorities} />
            <div className={styles.specSplit}>
              <Spec label="СРОК" value={timeline || "—"} />
              <Spec label="БЮДЖЕТ" value={budget || "—"} />
            </div>
            <Spec label="КОНТАКТ" value={contact || "—"} />

            <div className={styles.specOutput} aria-hidden="true">
              <span>INPUT</span><i /><span>ASSEMBLY</span><i /><b>PROJECT / 01</b>
            </div>
          </aside>
        </form>

        <footer className={styles.bottom}>
          <div><span>DIAGNOSE</span><i /><span>ROUTE</span><i /><span>ASSEMBLE</span></div>
          <span>PROJECT SPECIFICATION / BND STUDIO</span>
        </footer>
      </div>
    </section>
  );
}

function Stage({ number, title, text, children }: { number: string; title: string; text: string; children: React.ReactNode }) {
  return (
    <div className={styles.stageBody}>
      <div className={styles.stageHead}>
        <span data-stage-kicker>{number} / CONFIGURATION</span>
        <h3 data-stage-title>{title}</h3>
        <p data-stage-title>{text}</p>
      </div>
      {children}
    </div>
  );
}

function OptionRow({ index, label, text, selected, onClick }: { index: number; label: string; text: string; selected: boolean; onClick: () => void }) {
  return (
    <button type="button" className={`${styles.optionRow} ${selected ? styles.selected : ""}`} onClick={onClick} aria-pressed={selected} data-stage-option>
      <span>0{index + 1}</span>
      <strong>{label}</strong>
      <small>{text}</small>
      <i>{selected ? <Check aria-hidden="true" /> : null}</i>
    </button>
  );
}

function Token({ index, label, selected, onClick }: { index: number; label: string; selected: boolean; onClick: () => void }) {
  return (
    <button type="button" className={`${styles.token} ${selected ? styles.selected : ""}`} onClick={onClick} aria-pressed={selected} data-stage-option>
      <span>0{index + 1}</span><strong>{label}</strong><i>{selected ? <Check aria-hidden="true" /> : null}</i>
    </button>
  );
}

function ChoiceGroup<T extends readonly string[]>({ label, options, value, onChange }: { label: string; options: T; value: string; onChange: (value: string) => void }) {
  return (
    <div className={styles.choiceGroup} data-stage-option>
      <span>{label}</span>
      <div>
        {options.map((option, index) => (
          <button key={option} type="button" className={value === option ? styles.selected : ""} onClick={() => onChange(option)} aria-pressed={value === option}>
            <small>0{index + 1}</small><strong>{option}</strong><i>{value === option ? <Check aria-hidden="true" /> : null}</i>
          </button>
        ))}
      </div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return <div className={styles.specRow}><span>{label}</span><strong>{value}</strong></div>;
}

function SpecList({ label, values }: { label: string; values: string[] }) {
  return (
    <div className={styles.specRow}>
      <span>{label}</span>
      <div>{values.length ? values.map((value) => <em key={value}>{value}</em>) : <strong>—</strong>}</div>
    </div>
  );
}