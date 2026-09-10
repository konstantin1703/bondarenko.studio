"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import CoreVisual from "./CoreVisual";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="site-shell hero__inner">
        <motion.div
          className="hero__copy"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.08, delayChildren: 0.05 }}
        >
          <motion.div className="section-index" variants={reveal}>
            <span>01</span>
            <i />
            <span>Digital systems studio</span>
          </motion.div>

          <motion.h1 variants={reveal}>
            Цифровые системы,
            <br />
            которые работают
            <br />
            <em>как одно целое.</em>
          </motion.h1>

          <motion.div className="hero__lower" variants={reveal}>
            <p>
              Сайты, медиа, Telegram, AI и автоматизация — не набор отдельных
              услуг, а одна архитектура под конкретную задачу.
            </p>
            <a className="text-action" href="#constructor">
              Собрать проект
              <ArrowUpRight aria-hidden="true" />
            </a>
          </motion.div>
        </motion.div>

        <div className="hero__visual">
          <CoreVisual />
        </div>

        <div className="hero__rail" aria-label="Основные направления">
          <span>WEB SYSTEMS</span>
          <span>MEDIA</span>
          <span>AUTOMATION</span>
          <span>AI / INTEGRATIONS</span>
        </div>

        <a className="scroll-cue" href="#problems" aria-label="Прокрутить ниже">
          <ArrowDown aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
