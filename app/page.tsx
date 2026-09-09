export default function Home() {
  return (
    <main className="v9-page" id="hero">
      <section className="v9-hero">
        <div className="v9-bg" aria-hidden="true" />
        <div className="v9-vignette" aria-hidden="true" />

        <header className="v9-header">
          <a className="v9-brand" href="#hero" aria-label="Bondarenko Studio">
            <strong>BND</strong>
            <span>BONDARENKO.STUDIO</span>
            <i>/</i>
            <em>ИДЕИ<br />В СИСТЕМЫ</em>
          </a>

          <nav className="v9-nav" aria-label="Основная навигация">
            <a href="#problems">ПРОБЛЕМЫ</a>
            <a href="#capabilities">ВОЗМОЖНОСТИ</a>
            <a href="#brief">КОНСТРУКТОР</a>
            <a className="v9-contact" href="#brief">СОБРАТЬ БРИФ <span>↗</span></a>
          </nav>
        </header>

        <div className="v9-stage">
          <svg className="v9-routes v9-routes--desktop" viewBox="0 0 1600 860" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <filter id="v9Glow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <linearGradient id="v9Route" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#0c70ff" stopOpacity=".18" />
                <stop offset=".45" stopColor="#49cfff" stopOpacity=".95" />
                <stop offset=".6" stopColor="#b7f3ff" stopOpacity=".88" />
                <stop offset="1" stopColor="#0c70ff" stopOpacity=".18" />
              </linearGradient>
            </defs>

            <g className="route-bus" stroke="url(#v9Route)" fill="none" filter="url(#v9Glow)">
              <path d="M660 382 H585 Q565 382 550 366 L510 326 H438" />
              <path d="M660 392 H590 Q570 392 555 376 L515 336 H438" />
              <path d="M660 402 H595 Q575 402 560 386 L520 346 H438" />
              <path d="M940 382 H1015 Q1035 382 1050 366 L1090 326 H1162" />
              <path d="M940 392 H1010 Q1030 392 1045 376 L1085 336 H1162" />
              <path d="M940 402 H1005 Q1025 402 1040 386 L1080 346 H1162" />
              <path d="M790 535 V588 Q790 607 774 623 L746 651 V706" />
              <path d="M800 535 V593 Q800 612 784 628 L756 656 V706" />
              <path d="M810 535 V588 Q810 607 826 623 L854 651 V706" />
            </g>
          </svg>

          <svg className="v9-routes v9-routes--mobile" viewBox="0 0 390 760" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <filter id="v9GlowMobile" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="2.2" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <g stroke="#55d8ff" strokeOpacity=".7" strokeWidth="1.25" fill="none" filter="url(#v9GlowMobile)">
              <path d="M163 302 L118 248 L81 248" />
              <path d="M168 309 L121 258 L81 258" />
              <path d="M227 302 L272 248 L309 248" />
              <path d="M222 309 L269 258 L309 258" />
              <path d="M191 397 V480 L151 520" />
              <path d="M199 397 V486 L239 520" />
            </g>
          </svg>

          <a className="v9-panel v9-panel--systems" href="#capabilities" aria-label="Цифровые системы">
            <img src="/hero/systems.png" alt="01 — Цифровые системы" />
          </a>

          <a className="v9-panel v9-panel--media" href="#capabilities" aria-label="Медиа-проекты">
            <img src="/hero/media.png" alt="02 — Медиа-проекты" />
          </a>

          <div className="v9-core" aria-label="BND Core">
            <img src="/hero/bnd-core.png" alt="BND Core" />
          </div>

          <a className="v9-panel v9-panel--automation" href="#capabilities" aria-label="Автоматизация">
            <img src="/hero/automation.png" alt="03 — Автоматизация" />
          </a>
        </div>

        <div className="v9-bottom-mark">
          <span>CORE / SYSTEM ARCHITECTURE</span>
          <span>IDEAS INTO SYSTEMS</span>
        </div>
      </section>

      <section className="v9-placeholder" id="problems">
        <span>V9 / HERO ASSET COMPOSITION</span>
        <h2>Следующие секции появятся после утверждения композиции Hero.</h2>
      </section>
      <div id="capabilities" />
      <div id="brief" />
    </main>
  );
}
