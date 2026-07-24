import styles from './SelectableOptionCard.module.scss';

type Props = {
  id: string;
  number: string;
  title: string;
  description: string;
  selected?: boolean;
  icon?: string;
};

function OptionIcon({ type }: { type: string }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

  if (type === 'AUTO') return <svg viewBox="0 0 40 40" aria-hidden="true"><path {...common} d="M8 29h7l4-9 5 4 8-12M9 12h8M25 30h7"/><circle {...common} cx="19" cy="20" r="3"/><circle {...common} cx="32" cy="12" r="3"/></svg>;
  if (type === 'TG') return <svg viewBox="0 0 40 40" aria-hidden="true"><path {...common} d="m7 19 25-10-7 23-7-8-6 5 2-8Z"/><path {...common} d="m14 21 11-6"/></svg>;
  if (type === 'WEB') return <svg viewBox="0 0 40 40" aria-hidden="true"><rect {...common} x="7" y="9" width="26" height="22" rx="1"/><path {...common} d="M7 15h26M11 12h2m3 0h2"/></svg>;
  if (type === 'API') return <svg viewBox="0 0 40 40" aria-hidden="true"><circle {...common} cx="10" cy="20" r="4"/><circle {...common} cx="30" cy="11" r="4"/><circle {...common} cx="30" cy="29" r="4"/><path {...common} d="m14 19 12-6m-12 9 12 5"/></svg>;
  if (type === 'AI') return <svg viewBox="0 0 40 40" aria-hidden="true"><path {...common} d="M14 8c-4 0-7 3-7 7 0 2 1 4 3 5-2 1-3 3-3 6 0 4 3 7 7 7 2 0 4-1 6-3 2 2 4 3 6 3 4 0 7-3 7-7 0-3-1-5-3-6 2-1 3-3 3-5 0-4-3-7-7-7-2 0-4 1-6 3-2-2-4-3-6-3Z"/><path {...common} d="M20 11v18m-6-13 6 4m6-4-6 4m-6 5 6-4m6 4-6-4"/></svg>;
  return <svg viewBox="0 0 40 40" aria-hidden="true"><path {...common} d="m20 6 12 7v14l-12 7-12-7V13Z"/><path {...common} d="m8 13 12 7 12-7M20 20v14"/></svg>;
}

export function SelectableOptionCard({ number, title, description, selected = false, icon = 'CRM' }: Props) {
  return (
    <article
      className={styles.card}
      data-selected={selected}
      data-configurator-option={number}
      aria-label={`${number}. ${title}${selected ? '. Выбранный статический сценарий.' : '. Доступен на интерактивном этапе.'}`}
    >
      <span className={styles.number}>{number}</span>
      <span className={styles.state}>{selected ? 'SELECTED' : 'OPTION'}</span>
      <span className={styles.check} aria-hidden="true">✓</span>
      <span className={styles.icon}><OptionIcon type={icon} /></span>
      <strong>{title}</strong>
      <small>{description}</small>
    </article>
  );
}
