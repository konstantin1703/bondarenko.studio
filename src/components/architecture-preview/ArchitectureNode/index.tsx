import { HudPanel } from '@/components/hud/HudPanel';
import styles from './ArchitectureNode.module.scss';

type Props = {
  id?: string;
  title: string;
  subtitle: string;
  active?: boolean;
  icon?: string;
  position?: 'source' | 'ai' | 'data' | 'integration' | 'output';
};

export function ArchitectureNode({ id, title, subtitle, active = false, icon = 'NODE', position }: Props) {
  return (
    <div
      className={`${styles.wrapper} ${position ? styles[position] : ''}`}
      data-architecture-node={id ?? position ?? title}
    >
      <HudPanel className={styles.node} state={active ? 'active' : 'default'}>
        <span className={styles.icon} aria-hidden="true">{icon}</span>
        <strong>{title}</strong>
        <small>{subtitle}</small>
      </HudPanel>
    </div>
  );
}
