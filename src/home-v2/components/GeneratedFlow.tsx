import type { ChangeScenario } from '../data/change-scenarios';
import { ScenarioIcon } from './ScenarioIcon';

export function GeneratedFlow({ scenario }: { scenario: ChangeScenario }) {
  const flow = [
    { label: 'ВХОД', value: scenario.input, icon: scenario.icon },
    { label: 'ОБРАБОТКА', value: scenario.process, icon: 'brain' },
    { label: 'ДАННЫЕ', value: scenario.data, icon: 'dashboard' },
    { label: 'ДЕЙСТВИЕ', value: scenario.output, icon: 'telegram' },
    { label: 'РЕЗУЛЬТАТ', value: scenario.result, icon: 'workflow' },
  ] satisfies Array<{ label: string; value: string; icon: ChangeScenario['icon'] }>;

  return (
    <aside className="generated-flow" aria-labelledby="generated-flow-title" aria-live="polite">
      <header>
        <h3 id="generated-flow-title">ПРИМЕР СЦЕНАРИЯ</h3>
        <b>SCN_{scenario.number}</b>
      </header>
      <ol>
        {flow.map((step, index) => (
          <li key={step.label}>
            <span className="generated-flow__icon">
              <ScenarioIcon name={step.icon} />
            </span>
            <span className="generated-flow__number">{index + 1}</span>
            <div>
              <strong>{step.label}</strong>
              <small>{step.value}</small>
            </div>
            <span className="generated-flow__arrow" aria-hidden="true">›</span>
          </li>
        ))}
      </ol>
      <p className="generated-flow__summary">
        Система принимает данные, анализирует их, сохраняет контекст и запускает следующий этап без ручной передачи между сервисами.
      </p>
      <div className="system-log" aria-label="Системный журнал">
        {scenario.log.slice(0, 4).map((line) => (
          <span key={line}>
            <b>›</b> {line}
            <em>OK</em>
          </span>
        ))}
        <small>07.21.25&nbsp;&nbsp; 12:45:32</small>
      </div>
    </aside>
  );
}
