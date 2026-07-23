import styles from './HeroBackground.module.scss';

export function HeroBackground() {
  return (
    <div className={styles.background} aria-hidden="true">
      <svg viewBox="0 0 1600 900" preserveAspectRatio="none" focusable="false">
        <g className={styles.routes}>
          <path d="M105 138H336l136 55h168" />
          <path d="M312 83l170 75 176 12" />
          <path d="M978 94l118 46 267-14" />
          <path d="M920 164l196 22 302-114" />
          <path d="M1210 248l178-102" />
          <path d="M950 584l222 41 274-8" />
        </g>
        <g className={styles.nodes}>
          <circle cx="470" cy="193" r="2" /><circle cx="1110" cy="186" r="2" /><circle cx="1388" cy="146" r="2" />
          <circle cx="312" cy="83" r="1.7" /><circle cx="978" cy="94" r="1.7" /><circle cx="1172" cy="625" r="1.7" />
        </g>
      </svg>
    </div>
  );
}
