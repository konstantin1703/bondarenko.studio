import type { ElementType, ReactNode } from 'react';
import styles from './SectionFrame.module.scss';

type Props = {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  as?: ElementType;
  className?: string;
  headingClassName?: string;
  visualId?: string;
  fixtureState?: string;
  fixtureVersion?: string;
};

export function SectionFrame({
  id,
  number,
  eyebrow,
  title,
  children,
  as: Tag = 'section',
  className = '',
  headingClassName = '',
  visualId,
  fixtureState = 'foundation',
  fixtureVersion = 'stage-4',
}: Props) {
  return (
    <Tag
      id={id}
      className={`${styles.section} ${className}`}
      data-visual-id={visualId}
      data-fixture-state={fixtureState}
      data-fixture-version={fixtureVersion}
    >
      <div className={styles.number} aria-hidden="true">{number}</div>
      <div className={styles.cornerA} aria-hidden="true" />
      <div className={styles.cornerB} aria-hidden="true" />
      <div className={`${styles.heading} ${headingClassName}`}>
        <p className="type-technical-md">{eyebrow}</p>
        <h2 className="type-heading-xl">{title}</h2>
      </div>
      {children}
    </Tag>
  );
}
