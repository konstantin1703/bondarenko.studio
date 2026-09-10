import { ArrowDown, ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section id="hero" className="v12-hero" data-scene="hero">
      <div className="v12-shell v12-hero__inner">
        <div className="v12-hero__copy">
          <h1 data-reveal>
            Цифровые системы,
            <br />
            которые работают
            <br />
            <span>как одно целое.</span>
          </h1>

          <div className="v12-hero__support" data-reveal>
            <p>
              Сайты, медиа, Telegram, AI и автоматизация — не отдельные услуги,
              а одна архитектура под конкретную задачу.
            </p>
            <a className="v12-primary-action" href="#brief">
              Собрать проект
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="v12-hero__meta" data-reveal>
          <span>WEB</span>
          <span>MEDIA</span>
          <span>AUTOMATION</span>
          <span>AI / INTEGRATIONS</span>
        </div>

        <a className="v12-scroll-cue" href="#diagnostics" aria-label="Перейти ниже">
          <span>SCROLL</span>
          <ArrowDown aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
