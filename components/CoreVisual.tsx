"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMemo, type CSSProperties } from "react";

export type CoreModule = "strategy" | "content" | "interfaces" | "automation" | "ai" | "launch" | "crm" | "telegram" | "analytics";

type CoreVisualProps = {
  mode?: "hero" | "engine" | "system" | "configurator";
  activeModules?: CoreModule[];
  compact?: boolean;
};

const moduleLabels: Record<CoreModule, string> = {
  strategy: "Стратегия",
  content: "Контент",
  interfaces: "Интерфейсы",
  automation: "Автоматизация",
  ai: "AI",
  launch: "Запуск",
  crm: "CRM",
  telegram: "Telegram",
  analytics: "Аналитика",
};

const modeText = {
  hero: ["ЯДРО", "СИСТЕМА АКТИВНА"],
  engine: ["ДВИЖОК", "ОБРАБОТКА ЗАДАЧ"],
  system: ["СИСТЕМА", "МОДУЛИ СОЕДИНЕНЫ"],
  configurator: ["КОНФИГУРАЦИЯ", "СБОРКА ПРОЕКТА"],
} as const;

export default function CoreVisual({ mode = "hero", activeModules = [], compact = false }: CoreVisualProps) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 90, damping: 18 });
  const y = useSpring(my, { stiffness: 90, damping: 18 });

  const visibleModules = useMemo(() => {
    if (activeModules.length) return activeModules;
    if (mode === "hero") return ["content", "automation", "strategy", "ai"] as CoreModule[];
    if (mode === "engine") return ["strategy", "content", "interfaces", "automation", "ai", "launch"] as CoreModule[];
    if (mode === "system") return ["interfaces", "content", "automation", "strategy"] as CoreModule[];
    return ["ai", "crm", "telegram", "automation"] as CoreModule[];
  }, [activeModules, mode]);

  return (
    <motion.div
      className={`core-visual core-visual--${mode} ${compact ? "core-visual--compact" : ""}`}
      onMouseMove={(event) => {
        const r = event.currentTarget.getBoundingClientRect();
        mx.set(((event.clientX - r.left) / r.width - 0.5) * 8);
        my.set(((event.clientY - r.top) / r.height - 0.5) * 8);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      style={{ x, y }}
    >
      <div className="core-visual__halo" />
      <div className="core-visual__ring core-visual__ring--one" />
      <div className="core-visual__ring core-visual__ring--two" />
      <div className="core-visual__scan" />

      <motion.div
        className="core-visual__image-wrap"
        animate={{ y: [0, -5, 0], scale: [1, 1.006, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/bnd-core-static.webp"
          alt="Фирменное технологическое ядро BONDARENKO.STUDIO"
          width={960}
          height={995}
          priority={mode === "hero"}
          className="core-visual__image"
        />
        <div className="core-visual__plate">
          <strong>BND</strong>
          <span>{modeText[mode][0]}</span>
          <small>{modeText[mode][1]}</small>
        </div>
      </motion.div>

      <div className="core-visual__signals" aria-hidden="true">
        {[0,1,2,3,4].map((i) => <span key={i} style={{ "--delay": `${i * 0.85}s` } as CSSProperties} />)}
      </div>

      {compact && activeModules.length > 0 && (
        <div className="core-visual__compact-modules" aria-label="Выбранные модули">
          {activeModules.slice(0, 6).map((module, index) => (
            <span key={module} className={`compact-module compact-module--${index + 1}`}>{moduleLabels[module]}</span>
          ))}
        </div>
      )}

      {!compact && (
        <div className="core-visual__labels">
          {visibleModules.slice(0, 6).map((module, index) => (
            <div key={module} className={`core-label core-label--${index + 1} is-active`}>
              <span className="core-label__dot" />
              <span>{moduleLabels[module]}</span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
