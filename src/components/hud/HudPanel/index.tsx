import type { ElementType, ReactNode } from 'react';
import type { PanelState, PanelVariant } from '@/domain/contracts/foundation';
import styles from './HudPanel.module.scss';

type Props = { as?: ElementType; variant?: PanelVariant; state?: PanelState; className?: string; children: ReactNode };
export function HudPanel({ as: Tag = 'div', variant = 'default', state = 'default', className = '', children }: Props) {
  return <Tag className={`${styles.panel} ${className}`} data-variant={variant} data-state={state}>{children}</Tag>;
}
