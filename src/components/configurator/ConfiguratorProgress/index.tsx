import { configuratorProgressSteps } from '@/data/configurator-fixtures';
import styles from './ConfiguratorProgress.module.scss';

export function ConfiguratorProgress() {
  return (
    <nav className={styles.progress} aria-label="Этапы конфигуратора">
      <div className={styles.summary}>
        <span>Шаг</span>
        <strong>01</strong>
        <span>из 05</span>
      </div>
      <div className={styles.rail} aria-hidden="true">
        {configuratorProgressSteps.map((step) => (
          <span key={step.number} data-active={step.state === 'active'}>{step.number}</span>
        ))}
      </div>
      <ol>
        {configuratorProgressSteps.map((step) => (
          <li key={step.number} data-state={step.state} aria-current={step.state === 'active' ? 'step' : undefined}>
            <span className={styles.icon} aria-hidden="true">{step.number}</span>
            <div>
              <strong>{step.title}</strong>
              <small>{step.description}</small>
            </div>
            <i aria-hidden="true">{step.state === 'active' ? '●' : '○'}</i>
          </li>
        ))}
      </ol>
    </nav>
  );
}
