import { ArrowDown, ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section id="hero" className="v12-hero" data-scene="hero">
      <div className="v12-shell v12-hero__inner">
        <div className="v12-hero__copy">
          <h1 data-reveal>
            Цифровые системы,
            <br />
            <span>собранные</span>
            <br />
            в одно целое.
          </h1>

          <div className="v12-hero__support" data-reveal>
            <p>
              Стратегия, интерфейс, контент, Telegram, AI и автоматизация —
              проектируем как один работающий контур под конкретную задачу.
            </p>
            <a className="v12-primary-action" href="#brief">
              Собрать проект
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="v12-hero__signal" aria-hidden="true">
          <span>STRATEGY</span>
          <span>PRODUCT</span>
          <span>MEDIA</span>
          <span>AUTOMATION</span>
        </div>

        <div className="v12-hero__bottom" data-reveal>
          <p>
            <span>01</span>
            Сначала находим, где система теряет результат.
          </p>
          <a className="v12-scroll-cue" href="#diagnostics">
            Смотреть систему
            <ArrowDown aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
