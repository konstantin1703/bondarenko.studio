import type { ElementType, ReactNode } from 'react';
import type { CutSize, PanelState } from '@/domain/contracts/foundation';
import styles from './CutCornerPanel.module.scss';

type Props = { as?: ElementType; cut?: CutSize; state?: PanelState; className?: string; children: ReactNode };
export function CutCornerPanel({ as: Tag = 'div', cut = 'md', state = 'default', className = '', children }: Props) {
  return <Tag className={`${styles.focusShell} ${className}`} data-state={state}><div className={styles.surface} data-cut={cut}>{children}</div></Tag>;
}
