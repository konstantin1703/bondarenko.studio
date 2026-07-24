import { HudPanel } from '@/components/hud/HudPanel';
import type { ProblemScenarioId } from '@/domain/central-panels/types';
import styles from './ScenarioCard.module.scss';

type Props = {
  id: ProblemScenarioId;
  number: string;
  title: string;
  description: string;
  selected: boolean;
  onSelect: (id: ProblemScenarioId) => void;
};

export function ScenarioCard({
  id,
  number,
  title,
  description,
  selected,
  onSelect,
}: Props) {
  return (
    <HudPanel as="li" state={selected ? 'selected' : 'default'} className={styles.card}>
      <button
        type="button"
        className={styles.control}
        data-problem-scenario={id}
        aria-pressed={selected}
        onClick={() => onSelect(id)}
      >
        <span className={styles.number}>{number}</span>
        <strong>{title}</strong>
        <small>{description}</small>
        <i aria-hidden="true">→</i>
      </button>
    </HudPanel>
  );
}
