import styles from './HeroBackground.module.scss';

export function HeroBackground() {
  return (
    <div className={styles.background} aria-hidden="true">
      <svg viewBox="0 0 1600 900" preserveAspectRatio="none" focusable="false">
        <g className={styles.guides}>
          <ellipse cx="1120" cy="514" rx="360" ry="160" />
          <ellipse cx="1120" cy="514" rx="286" ry="126" />
          <path d="M720 514h800M1120 292v440M842 344l554 338M824 672l585-347" />
        </g>
        <g className={styles.routes}>
          <path d="M105 138H336l136 55h168" />
          <path d="M312 83l170 75 176 12" />
          <path d="M972 92l124 48 273-15" />
          <path d="M914 166l205 23 300-118" />
          <path d="M1208 250l183-105" />
          <path d="M944 586l231 42 278-10" />
          <path d="M735 246l210 34 199-81" />
          <path d="M660 615l242-44 241 51" />
        </g>
        <g className={styles.nodes}>
          <circle cx="470" cy="193" r="2" /><circle cx="1110" cy="186" r="2" /><circle cx="1388" cy="146" r="2" />
          <circle cx="312" cy="83" r="1.7" /><circle cx="978" cy="94" r="1.7" /><circle cx="1172" cy="625" r="1.7" />
          <circle cx="735" cy="246" r="1.7" /><circle cx="902" cy="571" r="1.7" />
        </g>
      </svg>
    </div>
  );
}
