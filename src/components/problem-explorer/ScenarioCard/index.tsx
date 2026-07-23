import { HudPanel } from '@/components/hud/HudPanel';
import styles from './ScenarioCard.module.scss';

export function ScenarioCard({
  number,
  title,
  description,
  selected = false,
}: {
  number: string;
  title: string;
  description: string;
  selected?: boolean;
}) {
  return (
    <HudPanel as="li" state={selected ? 'selected' : 'default'} className={styles.card}>
      <div className={styles.content} aria-current={selected ? 'step' : undefined}>
        <span className={styles.number}>{number}</span>
        <strong>{title}</strong>
        <small>{description}</small>
        <i aria-hidden="true">→</i>
      </div>
    </HudPanel>
  );
}
