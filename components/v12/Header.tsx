"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navigation = [
  ["#diagnostics", "Диагностика", "diagnostics"],
  ["#capabilities", "Возможности", "capabilities"],
  ["#brief", "Бриф", "brief"],
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const update = (event: Event) => {
      const detail = (event as CustomEvent<{ scene?: string }>).detail;
      if (detail?.scene) setActive(detail.scene);
    };

    window.addEventListener("bnd:scene", update);
    return () => window.removeEventListener("bnd:scene", update);
  }, []);

  return (
    <header className={`v12-header ${open ? "is-open" : ""}`}>
      <div className="v12-shell v12-header__inner">
        <a className="v12-brand" href="#hero" aria-label="BND Studio — наверх">
          <strong>BND</strong>
          <span>DIGITAL SYSTEMS</span>
        </a>

        <nav className="v12-nav" aria-label="Основная навигация">
          {navigation.map(([href, label, scene], index) => (
            <a key={href} href={href} className={active === scene ? "is-active" : ""}>
              <span>0{index + 1}</span>
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

      <div className={`v12-mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="v12-shell v12-mobile-menu__inner">
          <nav aria-label="Мобильная навигация">
            {navigation.map(([href, label], index) => (
              <a key={href} href={href} onClick={() => setOpen(false)}>
                <span>0{index + 1}</span>
                <strong>{label}</strong>
              </a>
            ))}
          </nav>
          <a className="v12-mobile-menu__cta" href="#brief" onClick={() => setOpen(false)}>
            Собрать проект <ArrowUpRight aria-hidden="true" />
          </a>
          <p>BND Studio / Digital systems for real projects</p>
        </div>
      </div>
    </header>
  );
}
