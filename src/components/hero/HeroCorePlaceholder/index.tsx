import styles from './HeroCorePlaceholder.module.scss';

export function HeroCorePlaceholder() {
  return (
    <div className={styles.core} role="img" aria-label="BND AI Core — нейтральный силуэт будущего Blender-объекта">
      <svg className={styles.proxy} viewBox="0 0 720 580" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="proxy-top" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#213640" />
            <stop offset="1" stopColor="#0a181e" />
          </linearGradient>
          <linearGradient id="proxy-front" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#172b34" />
            <stop offset=".62" stopColor="#0b1d24" />
            <stop offset="1" stopColor="#061218" />
          </linearGradient>
          <linearGradient id="proxy-side" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#10252d" />
            <stop offset="1" stopColor="#030d12" />
          </linearGradient>
          <radialGradient id="proxy-core" cx="50%" cy="50%" r="64%">
            <stop offset="0" stopColor="#1a777c" stopOpacity=".38" />
            <stop offset=".56" stopColor="#072229" stopOpacity=".72" />
            <stop offset="1" stopColor="#020a0e" />
          </radialGradient>
          <filter id="proxy-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <g className={styles.platform}>
          <ellipse cx="368" cy="520" rx="316" ry="46" />
          <ellipse cx="368" cy="520" rx="252" ry="30" />
          <path d="M70 520h596M113 497h507M174 477h390" />
        </g>

        <g className={styles.silhouette}>
          <path className={styles.topFace} d="M112 133 242 58h314l82 72-92 82H222Z" fill="url(#proxy-top)" />
          <path className={styles.frontFace} d="M112 133 222 212h324v286l-76 43H177l-65-79Z" fill="url(#proxy-front)" />
          <path className={styles.sideFace} d="M546 212 638 130v319l-92 92Z" fill="url(#proxy-side)" />

          <path className={styles.innerEdge} d="M142 150 233 218h287v257l-62 37H197l-55-64Z" />
          <path className={styles.innerEdgeMuted} d="M171 172 247 230h247v222l-48 30H214l-43-50Z" />
          <path className={styles.topGuide} d="M151 129 255 77h281l61 52-65 56H239Z" />
          <path className={styles.sideGuide} d="M566 221 616 177v250l-50 51Z" />

          <g className={styles.coreFrame} filter="url(#proxy-glow)">
            <path d="M254 278h177l37 35v103l-37 36H254l-38-36V313Z" fill="url(#proxy-core)" />
            <path d="M274 297h138l31 29v77l-31 30H274l-31-30v-77Z" />
            <path d="M294 316h99l25 23v51l-25 24h-99l-25-24v-51Z" />
          </g>

          <g className={styles.proxyMarks}>
            <path d="M150 259h35m-35 19h21m-16 132h38m-33 20h23M467 255h43m-43 19h25M464 411h46m-46 19h28" />
            <circle cx="175" cy="235" r="3" /><circle cx="496" cy="235" r="3" /><circle cx="490" cy="458" r="3" /><circle cx="205" cy="458" r="3" />
          </g>
        </g>
      </svg>
      <div className={styles.label} aria-hidden="true"><strong>BND</strong><span>AI CORE</span></div>
      <div className={styles.prototype} aria-hidden="true">SILHOUETTE PROXY / BLENDER ASSET PENDING</div>
    </div>
  );
}
