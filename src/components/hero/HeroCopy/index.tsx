import { MicroLabel } from '@/components/hud/MicroLabel';
import { heroCopy } from '@/data/hero';
import styles from './HeroCopy.module.scss';

function ArrowIcon() {
  return (
    <svg viewBox="0 0 22 12" aria-hidden="true" focusable="false">
      <path d="M1 6h17M14 2l4 4-4 4" />
    </svg>
  );
}

export function HeroCopy() {
  return (
    <div className={styles.copy}>
      <MicroLabel>{heroCopy.eyebrow}</MicroLabel>
      <h1 className={styles.title}>
        <span>{heroCopy.titleLead}</span>
        <mark>{heroCopy.titleAccent}</mark>
        <span className={styles.tail}>{heroCopy.titleTail}</span>
      </h1>
      <p className={styles.description}>
        {heroCopy.description.map((line) => <span key={line}>{line}</span>)}
      </p>
      <div className={styles.actions}>
        <a href={heroCopy.primaryAction.href} className={styles.primary}>
          {heroCopy.primaryAction.label}<ArrowIcon />
        </a>
        <a href={heroCopy.secondaryAction.href} className={styles.secondary}>
          {heroCopy.secondaryAction.label}<ArrowIcon />
        </a>
      </div>
    </div>
  );
}
