import styles from './HeroCorePlaceholder.module.scss';

export function HeroCorePlaceholder() {
  return (
    <div className={styles.core} role="img" aria-label="BND AI Core — временный технический прототип медиа-контейнера">
      <svg className={styles.blueprint} viewBox="0 0 640 560" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="core-top" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#173640" stopOpacity=".94" />
            <stop offset="1" stopColor="#06171d" stopOpacity=".95" />
          </linearGradient>
          <linearGradient id="core-front" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#173741" stopOpacity=".98" />
            <stop offset=".68" stopColor="#0a2028" stopOpacity=".99" />
            <stop offset="1" stopColor="#020e13" />
          </linearGradient>
          <linearGradient id="core-side" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#0b252d" />
            <stop offset="1" stopColor="#031116" />
          </linearGradient>
          <filter id="core-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <ellipse cx="337" cy="517" rx="300" ry="45" className={styles.platformOuter} />
        <ellipse cx="337" cy="517" rx="238" ry="30" className={styles.platformInner} />
        <path d="M88 500h500M125 479h424M176 459h322" className={styles.platformTicks} />

        <g className={styles.cubeShell}>
          <path d="M126 112 244 47h276l75 64-78 69H232Z" fill="url(#core-top)" className={styles.faceStroke} />
          <path d="M126 112h391v339l-76 62H164l-38-56Z" fill="url(#core-front)" className={styles.faceStroke} />
          <path d="M517 180l78-69v331l-78 69Z" fill="url(#core-side)" className={styles.faceStroke} />

          <path d="M150 131h343v301l-59 52H183l-33-47Z" className={styles.insetFrame} />
          <path d="M177 155h289v250l-49 44H206l-29-39Z" className={styles.insetFrameMuted} />
          <path d="M203 181h237v198l-40 37H230l-27-34Z" className={styles.insetFrame} />

          <path d="M158 111 255 65h247l54 44-57 46H202Z" className={styles.topInset} />
          <path d="M220 89h244M198 107h294M278 68l-12 60M435 65l15 62" className={styles.techLines} />
          <path d="M536 199l38-34v246l-38 31ZM549 219l14-12v176l-14 14Z" className={styles.sideInset} />

          <g className={styles.panelDetails}>
            <path d="M142 211h40m-40 16h24m-18 148h35m-30 18h48M462 214h38m-38 17h25M456 373h45m-45 18h28" />
            <path d="M184 446h81m179 0h47M242 478h148" />
            <circle cx="166" cy="192" r="3" /><circle cx="480" cy="192" r="3" /><circle cx="478" cy="421" r="3" /><circle cx="189" cy="421" r="3" />
          </g>

          <g className={styles.coreFrame} filter="url(#core-glow)">
            <path d="M254 232h142l31 30v93l-32 31H255l-31-31v-92Z" />
            <path d="M270 248h111l27 25v70l-27 27H270l-27-27v-69Z" />
            <path d="M286 263h81l22 20v50l-22 21h-81l-22-21v-49Z" />
          </g>
        </g>
      </svg>
      <div className={styles.label} aria-hidden="true"><strong>BND</strong><span>AI CORE</span></div>
      <div className={styles.prototype} aria-hidden="true">MEDIA CONTRACT / STATIC PROTOTYPE</div>
    </div>
  );
}
