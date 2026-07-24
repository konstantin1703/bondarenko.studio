import type { ProductDirectionId } from '@/domain/central-panels/types';
import styles from './ProductDirectionCard.module.scss';

type Props = {
  id: ProductDirectionId;
  title: string;
  description: string;
  code: string;
  selected: boolean;
  onSelect: (id: ProductDirectionId) => void;
};

export function ProductDirectionCard({
  id,
  title,
  description,
  code,
  selected,
  onSelect,
}: Props) {
  return (
    <article className={styles.card} data-state={selected ? 'selected' : 'default'}>
      <button
        type="button"
        className={styles.control}
        data-product-direction={id}
        aria-pressed={selected}
        onClick={() => onSelect(id)}
      >
        <span aria-hidden="true">{code}</span>
        <div><strong>{title}</strong><small>{description}</small></div>
      </button>
    </article>
  );
}
