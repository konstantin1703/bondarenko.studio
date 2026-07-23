import type { ReactNode } from 'react';
import styles from './MicroLabel.module.scss';
export function MicroLabel({ children, priority = 2, decorative = false }: { children: ReactNode; priority?: 1|2|3; decorative?: boolean }) {
  return <span className={styles.label} data-priority={priority} aria-hidden={decorative || undefined}>{children}</span>;
}
