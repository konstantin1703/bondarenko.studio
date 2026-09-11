import { ArrowDown, ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section id="hero" className="v12-hero v13-hero" data-scene="hero">
      <div className="v13-hero__frame" aria-hidden="true">
        <span className="v13-hero__corner v13-hero__corner--tl" />
        <span className="v13-hero__corner v13-hero__corner--tr" />
        <span className="v13-hero__corner v13-hero__corner--bl" />
        <span className="v13-hero__corner v13-hero__corner--br" />
      </div>

      <div className="v13-hero__ribbon" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>

      <div className="v12-shell v12-hero__inner v13-hero__inner">
        <div className="v13-hero__kicker" data-reveal>
          <span>INDEPENDENT DIGITAL STUDIO</span>
          <i />
          <span>SYSTEMS / MEDIA / AUTOMATION</span>
        </div>

        <div className="v12-hero__copy v13-hero__copy">
          <h1 aria-label="Цифровые системы, собранные в одно целое.">
            <span className="v13-hero__line"><b>Цифровые</b></span>
            <span className="v13-hero__line v13-hero__line--offset"><b>системы,</b></span>
            <span className="v13-hero__line v13-hero__line--ghost"><b>собранные</b></span>
            <span className="v13-hero__line v13-hero__line--last"><b>в одно целое.</b></span>
          </h1>

          <div className="v12-hero__support v13-hero__support" data-reveal>
            <p>
              Стратегия, интерфейс, контент, Telegram, AI и автоматизация —
              проектируем как один работающий контур под конкретную задачу.
            </p>
            <a className="v12-primary-action v13-primary-action" href="#brief">
              <span>Собрать проект</span>
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="v13-hero__material" aria-hidden="true">
          <div className="v13-hero__material-ring" />
          <div className="v13-hero__material-cross" />
          <span>LIVE SYSTEM FIELD</span>
          <small>SCROLL TO RECONFIGURE</small>
        </div>

        <div className="v12-hero__signal v13-hero__signal" aria-hidden="true">
          <span>STRATEGY</span>
          <span>PRODUCT</span>
          <span>MEDIA</span>
          <span>AUTOMATION</span>
        </div>

        <div className="v12-hero__bottom v13-hero__bottom" data-reveal>
          <p>
            <span>01</span>
            Сначала находим, где система теряет результат.
          </p>
          <a className="v12-scroll-cue v13-scroll-cue" href="#diagnostics">
            <span>Смотреть систему</span>
            <ArrowDown aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
