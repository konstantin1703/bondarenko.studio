import type { ReactNode } from 'react';
import styles from './NestedFrame.module.scss';
export function NestedFrame({ children, cornerMarks = true, className = '' }: { children: ReactNode; cornerMarks?: boolean; className?: string }) {
  return <div className={`${styles.outer} ${className}`}><div className={styles.inner}>{children}</div>{cornerMarks && <><i className={styles.a}/><i className={styles.b}/></>}</div>;
}
