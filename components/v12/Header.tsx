"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const navigation = [
  ["#diagnostics", "Диагностика", "diagnostics"],
  ["#capabilities", "Возможности", "capabilities"],
  ["#brief", "Бриф", "brief"],
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = (event: Event) => {
      const detail = (event as CustomEvent<{ scene?: string }>).detail;
      if (detail?.scene) setActive(detail.scene);
    };

    window.addEventListener("bnd:scene", update);
    return () => window.removeEventListener("bnd:scene", update);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
      mobileMenuRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
    });

    const closeAndRestoreFocus = () => {
      setOpen(false);
      requestAnimationFrame(() => menuButtonRef.current?.focus());
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeAndRestoreFocus();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = Array.from(
        mobileMenuRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex="0"]') ?? [],
      ).filter((element) => !element.hasAttribute("disabled"));

      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const onResize = () => {
      if (window.innerWidth > 760) setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className={`v12-header ${open ? "is-open" : ""}`}>
      <div className="v12-shell v12-header__inner">
        <a className="v12-brand" href="#hero" aria-label="BND Studio — наверх" onClick={() => setOpen(false)}>
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
          ref={menuButtonRef}
          className="v12-menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="v12-mobile-navigation"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <div
        ref={mobileMenuRef}
        id="v12-mobile-navigation"
        className={`v12-mobile-menu ${open ? "is-open" : ""}`}
        aria-hidden={!open}
      >
        <div className="v12-shell v12-mobile-menu__inner">
          <nav aria-label="Мобильная навигация">
            {navigation.map(([href, label], index) => (
              <a key={href} href={href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
                <span>0{index + 1}</span>
                <strong>{label}</strong>
              </a>
            ))}
          </nav>
          <a
            className="v12-mobile-menu__cta"
            href="#brief"
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
          >
            Собрать проект <ArrowUpRight aria-hidden="true" />
          </a>
          <p>BND Studio / Digital systems for real projects</p>
        </div>
      </div>
    </header>
  );
}
