import { ArrowDown, ArrowUpRight } from "lucide-react";
import CoreVisual from "./CoreVisual";

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="site-shell hero__inner">
        <div className="hero__copy">
          <div className="section-index">
            <span>01</span>
            <i />
            <span>Digital systems studio</span>
          </div>

          <h1>
            Цифровые системы,
            <br />
            которые работают
            <br />
            <em>как одно целое.</em>
          </h1>

          <div className="hero__lower">
            <p>
              Сайты, медиа, Telegram, AI и автоматизация — не набор отдельных
              услуг, а одна архитектура под конкретную задачу.
            </p>
            <a className="text-action" href="#constructor">
              Собрать проект
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>

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
