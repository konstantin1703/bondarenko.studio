"use client";

import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const nav = [
  ["#hero", "Главная"],
  ["#problems", "Задачи"],
  ["#systems", "Возможности"],
  ["#constructor", "Конструктор"],
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-shell site-header__inner">
        <a href="#hero" className="brand" aria-label="BONDARENKO.STUDIO — на главную">
          <span>BONDARENKO</span><span>.STUDIO</span>
        </a>

        <nav className="site-nav" aria-label="Основная навигация">
          {nav.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
        </nav>

        <div className="site-header__right">
          <span className="system-caption">AI / АВТОМАТИЗАЦИЯ / МЕДИА</span>
          <a className="icon-button" href="#constructor" aria-label="Начать проект"><ArrowUpRight size={17} /></a>
          <button className="menu-button" onClick={() => setOpen(v => !v)} aria-expanded={open} aria-label="Меню">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-menu">
          <div className="site-shell">
            {nav.map(([href, label]) => (
              <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
