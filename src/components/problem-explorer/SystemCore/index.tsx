import styles from './SystemCore.module.scss';

export function SystemCore() {
  return (
    <div className={styles.core} role="img" aria-label="BND ENGINE — центральный модуль архитектуры решения">
      <svg viewBox="0 0 260 260" aria-hidden="true" focusable="false">
        <g className={styles.platform}>
          <ellipse cx="130" cy="220" rx="112" ry="27" />
          <ellipse cx="130" cy="220" rx="86" ry="18" />
          <path d="M18 220h224M46 204h168M72 191h116" />
        </g>
        <g className={styles.shell}>
          <path className={styles.top} d="M54 70 96 43h101l32 28-38 31H91Z" />
          <path className={styles.front} d="M54 70 91 102h100v92l-27 21H83l-29-29Z" />
          <path className={styles.side} d="M191 102 229 71v111l-38 33Z" />
          <path className={styles.edge} d="M70 83 99 108h77v72l-21 16H94l-24-21Z" />
          <path className={styles.edgeMuted} d="M88 98 106 114h56v53l-14 11h-44l-16-14Z" />
          <path className={styles.topGuide} d="M75 68 105 51h84l23 20-25 20H98Z" />
          <path className={styles.sideGuide} d="M199 109 220 91v83l-21 18Z" />
          <path className={styles.panelLine} d="M104 132h52M104 145h38M104 158h47M78 119h11v11H78zM164 119h12v12h-12zM164 143h12v12h-12z" />
        </g>
      </svg>
      <div className={styles.label} aria-hidden="true">
        <strong>BND</strong>
        <span>ENGINE</span>
        <small>ЯДРО СИСТЕМЫ</small>
      </div>
    </div>
  );
}
