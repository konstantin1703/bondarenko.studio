"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type CoreVisualProps = {
  variant?: "hero" | "compact";
  active?: boolean;
};

export default function CoreVisual({
  variant = "hero",
  active = false,
}: CoreVisualProps) {
  return (
    <motion.figure
      className={`core-object core-object--${variant} ${
        active ? "is-active" : ""
      }`}
      initial={{ opacity: 0, scale: 0.94, rotate: -1.2 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="core-object__media"
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/bnd-core-static.webp"
          width={960}
          height={995}
          alt="BND Core — центральный визуальный объект студии"
          priority={variant === "hero"}
          sizes={
            variant === "hero"
              ? "(max-width: 900px) 84vw, 44vw"
              : "(max-width: 900px) 70vw, 30vw"
          }
          className="core-object__image"
        />
        <span className="core-corner core-corner--tl" />
        <span className="core-corner core-corner--tr" />
        <span className="core-corner core-corner--bl" />
        <span className="core-corner core-corner--br" />
      </motion.div>
      <figcaption>
        <span>BND / CORE</span>
        <span>01 — SYSTEM OBJECT</span>
      </figcaption>
    </motion.figure>
  );
}
