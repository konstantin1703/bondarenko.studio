import styles from './HeroCorePlaceholder.module.scss';
export function HeroCorePlaceholder() {
  return <div className={styles.core} aria-label="Временный контейнер BND AI Core"><div className={styles.top}/><div className={styles.face}><div className={styles.layers}><span>BND</span><small>AI CORE</small></div></div><div className={styles.side}/><p>BND AI CORE</p><em>PLACEHOLDER MEDIA</em></div>;
}
