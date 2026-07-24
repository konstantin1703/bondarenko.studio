import { HudPanel } from '@/components/hud/HudPanel';
import styles from './ProductDirectionCard.module.scss';

export function ProductDirectionCard({
  title,
  description,
  code,
  active = false,
}: {
  title: string;
  description: string;
  code: string;
  active?: boolean;
}) {
  return (
    <HudPanel as="article" state={active ? 'selected' : 'default'} className={styles.card}>
      <span aria-hidden="true">{code}</span>
      <div><strong>{title}</strong><small>{description}</small></div>
    </HudPanel>
  );
}
