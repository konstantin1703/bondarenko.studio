import type { ModuleEmphasis, ModuleId } from '@/domain/central-panels/types';
import styles from './SystemModuleShell.module.scss';

type Props = {
  title: string;
  description: string;
  icon: string;
  emphasis: ModuleEmphasis;
  side: 'left' | 'right';
  position: 'top' | 'middle' | 'bottom';
  id: ModuleId;
};

export function SystemModuleShell({
  title,
  description,
  icon,
  emphasis,
  side,
  position,
  id,
}: Props) {
  return (
    <div
      className={`${styles.module} ${styles[side]} ${styles[position]}`}
      data-system-module={id}
      data-state={emphasis}
      aria-label={`${title}: ${description}. Приоритет: ${emphasis}.`}
    >
      <span className={styles.icon} aria-hidden="true">{icon}</span>
      <strong>{title}</strong>
      <small>{description}</small>
    </div>
  );
}
