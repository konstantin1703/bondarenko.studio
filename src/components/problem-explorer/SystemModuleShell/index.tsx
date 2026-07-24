import styles from './SystemModuleShell.module.scss';

export function SystemModuleShell({
  title,
  description,
  icon,
  active = false,
  side,
  position,
  id,
}: {
  title: string;
  description: string;
  icon: string;
  active?: boolean;
  side: 'left' | 'right';
  position: 'top' | 'middle' | 'bottom';
  id: string;
}) {
  return (
    <div
      className={`${styles.module} ${styles[side]} ${styles[position]}`}
      data-system-module={id}
      data-state={active ? 'active' : 'default'}
    >
      <span className={styles.icon} aria-hidden="true">{icon}</span>
      <strong>{title}</strong>
      <small>{description}</small>
    </div>
  );
}
