"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";

const nav = [
  ["#problems", "Диагностика"],
  ["#systems", "Возможности"],
  ["#constructor", "Бриф"],
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-shell site-header__inner">
        <a className="brand" href="#hero" aria-label="BND Studio — на главную">
          <strong>BND</strong>
          <span>/ STUDIO</span>
        </a>

        <nav className="site-nav" aria-label="Основная навигация">
          {nav.map(([href, label]) => (
            <a href={href} key={href}>
              {label}
            </a>
          ))}
        </nav>

        <a className="header-action" href="#constructor">
          Начать проект
          <ArrowUpRight aria-hidden="true" />
        </a>

        <button
          className="menu-button"
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {open ? (
        <div className="mobile-menu">
          <div className="site-shell">
            {nav.map(([href, label], index) => (
              <a href={href} key={href} onClick={() => setOpen(false)}>
                <span>0{index + 1}</span>
                {label}
              </a>
            ))}
            <a
              href="#constructor"
              className="mobile-menu__action"
              onClick={() => setOpen(false)}
            >
              Начать проект <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
