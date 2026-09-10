"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";

const navigation = [
  ["#diagnostics", "Диагностика"],
  ["#capabilities", "Возможности"],
  ["#brief", "Бриф"],
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="v12-header">
      <div className="v12-shell v12-header__inner">
        <a className="v12-brand" href="#hero" aria-label="BND Studio — наверх">
          <strong>BND</strong>
          <span>STUDIO</span>
        </a>

        <nav className="v12-nav" aria-label="Основная навигация">
          {navigation.map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <a className="v12-header__cta" href="#brief">
          Обсудить проект
          <ArrowUpRight aria-hidden="true" />
        </a>

        <button
          className="v12-menu-button"
          type="button"
          aria-expanded={open}
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {open ? (
        <div className="v12-mobile-menu">
          <div className="v12-shell">
            {navigation.map(([href, label], index) => (
              <a key={href} href={href} onClick={() => setOpen(false)}>
                <span>0{index + 1}</span>
                {label}
              </a>
            ))}
            <a className="v12-mobile-menu__cta" href="#brief" onClick={() => setOpen(false)}>
              Обсудить проект <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
