export default function Home() {
  return (
    <main className="v10-page">
      <section className="v10-hero" aria-label="Bondarenko Studio hero">
        <div className="v10-background" aria-hidden="true" />
        <div className="v10-vignette" aria-hidden="true" />

        <input
          className="v10-reference-toggle"
          type="checkbox"
          id="v10-reference-toggle"
          aria-label="Показать эталонный мокап"
        />
        <label className="v10-reference-control" htmlFor="v10-reference-toggle">
          REF
        </label>

        <div className="v10-reference-frame">
          <img
            className="v10-reference-overlay"
            src="/hero/reference-desktop.jpeg"
            alt=""
            aria-hidden="true"
          />

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

          <div className="v10-stage" aria-label="Hero composition">
            <svg
              className="v10-route-network"
              viewBox="0 0 1536 864"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="v10BusHorizontal" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#147cff" stopOpacity=".34" />
                  <stop offset=".26" stopColor="#54d9ff" stopOpacity=".88" />
                  <stop offset=".50" stopColor="#d8f7ff" stopOpacity=".98" />
                  <stop offset=".74" stopColor="#54d9ff" stopOpacity=".88" />
                  <stop offset="1" stopColor="#147cff" stopOpacity=".34" />
                </linearGradient>
                <linearGradient id="v10BusVertical" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#157cff" stopOpacity=".28" />
                  <stop offset=".45" stopColor="#63e1ff" stopOpacity=".94" />
                  <stop offset=".62" stopColor="#d9f8ff" stopOpacity=".98" />
                  <stop offset="1" stopColor="#1684ff" stopOpacity=".34" />
                </linearGradient>
                <filter id="v10BusGlow" x="-40%" y="-80%" width="180%" height="260%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="v10NodeGlow" x="-150%" y="-150%" width="400%" height="400%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <g className="v10-route-underlay" fill="none" filter="url(#v10BusGlow)">
                <path d="M408 278 H468 C493 278 500 291 518 301 C535 311 551 312 585 312" />
                <path d="M408 288 H466 C490 288 498 301 516 311 C534 321 552 322 585 322" />
                <path d="M408 298 H464 C488 298 496 311 514 321 C532 331 550 332 585 332" />
                <path d="M408 308 H462 C486 308 494 321 512 331 C530 341 548 342 585 342" />
                <path d="M408 318 H460 C484 318 492 331 510 341 C528 351 547 352 585 352" />

                <path d="M1128 278 H1068 C1043 278 1036 291 1018 301 C1001 311 985 312 951 312" />
                <path d="M1128 288 H1070 C1046 288 1038 301 1020 311 C1002 321 984 322 951 322" />
                <path d="M1128 298 H1072 C1048 298 1040 311 1022 321 C1004 331 986 332 951 332" />
                <path d="M1128 308 H1074 C1050 308 1042 321 1024 331 C1006 341 988 342 951 342" />
                <path d="M1128 318 H1076 C1052 318 1044 331 1026 341 C1008 351 989 352 951 352" />

                <path d="M738 452 V486 C738 507 727 518 711 529 C701 536 695 546 695 564" />
                <path d="M753 452 V492 C753 512 745 521 733 532 C725 539 721 548 721 564" />
                <path d="M768 452 V564" />
                <path d="M783 452 V492 C783 512 791 521 803 532 C811 539 815 548 815 564" />
                <path d="M798 452 V486 C798 507 809 518 825 529 C835 536 841 546 841 564" />

                <path d="M742 0 V132" />
                <path d="M755 0 V132" />
                <path d="M768 0 V132" />
                <path d="M781 0 V132" />
                <path d="M794 0 V132" />
              </g>

              <g className="v10-route-lines" fill="none">
                <path d="M408 278 H468 C493 278 500 291 518 301 C535 311 551 312 585 312" />
                <path d="M408 288 H466 C490 288 498 301 516 311 C534 321 552 322 585 322" />
                <path d="M408 298 H464 C488 298 496 311 514 321 C532 331 550 332 585 332" />
                <path d="M408 308 H462 C486 308 494 321 512 331 C530 341 548 342 585 342" />
                <path d="M408 318 H460 C484 318 492 331 510 341 C528 351 547 352 585 352" />

                <path d="M1128 278 H1068 C1043 278 1036 291 1018 301 C1001 311 985 312 951 312" />
                <path d="M1128 288 H1070 C1046 288 1038 301 1020 311 C1002 321 984 322 951 322" />
                <path d="M1128 298 H1072 C1048 298 1040 311 1022 321 C1004 331 986 332 951 332" />
                <path d="M1128 308 H1074 C1050 308 1042 321 1024 331 C1006 341 988 342 951 342" />
                <path d="M1128 318 H1076 C1052 318 1044 331 1026 341 C1008 351 989 352 951 352" />

                <path d="M738 452 V486 C738 507 727 518 711 529 C701 536 695 546 695 564" />
                <path d="M753 452 V492 C753 512 745 521 733 532 C725 539 721 548 721 564" />
                <path d="M768 452 V564" />
                <path d="M783 452 V492 C783 512 791 521 803 532 C811 539 815 548 815 564" />
                <path d="M798 452 V486 C798 507 809 518 825 529 C835 536 841 546 841 564" />

                <path className="v10-route-top" d="M742 0 V132" />
                <path className="v10-route-top" d="M755 0 V132" />
                <path className="v10-route-top v10-route-primary" d="M768 0 V132" />
                <path className="v10-route-top" d="M781 0 V132" />
                <path className="v10-route-top" d="M794 0 V132" />
              </g>

              <g className="v10-route-nodes" filter="url(#v10NodeGlow)">
                <circle cx="468" cy="278" r="2.1" />
                <circle cx="510" cy="341" r="2.1" />
                <circle cx="1068" cy="278" r="2.1" />
                <circle cx="1026" cy="341" r="2.1" />
                <circle cx="768" cy="518" r="2.3" />
              </g>
            </svg>

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
