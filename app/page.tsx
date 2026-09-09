export default function Home() {
  return (
    <main className="v10-page">
      <section className="v10-hero" aria-label="Bondarenko Studio hero">
        <div className="v10-background" aria-hidden="true" />
        <div className="v10-vignette" aria-hidden="true" />

        <div className="v10-reference-frame">
          <div className="v10-debug-grid" aria-hidden="true" />

          <header className="v10-header">
            <div className="v10-brand">
              <strong>BND</strong>
              <span>BONDARENKO.STUDIO</span>
              <i>/</i>
              <em>ИДЕИ<br />В СИСТЕМЫ</em>
            </div>

            <nav className="v10-nav" aria-label="Основная навигация">
              <a href="#projects">ПРОЕКТЫ</a>
              <a href="#approach">ПОДХОД</a>
              <a href="#contacts">КОНТАКТЫ</a>
              <a className="v10-contact" href="#contacts">СВЯЗАТЬСЯ <span>↗</span></a>
            </nav>
          </header>

          <div className="v10-stage" aria-label="Hero composition tracing stage">
            <img
              className="v10-layer v10-layer--systems"
              src="/hero/systems.png"
              alt="01 — Цифровые системы"
            />
            <img
              className="v10-layer v10-layer--media"
              src="/hero/media.png"
              alt="02 — Медиа-проекты"
            />
            <img
              className="v10-layer v10-layer--core"
              src="/hero/bnd-core.png"
              alt="BND Core"
            />
            <img
              className="v10-layer v10-layer--automation"
              src="/hero/automation.png"
              alt="03 — Автоматизация"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
