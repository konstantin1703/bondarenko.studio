import type { ChangeScenario } from '../data/change-scenarios';

export function GeneratedFlow({ scenario }: { scenario: ChangeScenario }) {
  const flow = [
    ['INPUT', scenario.input],
    ['PROCESS', scenario.process],
    ['DATA', scenario.data],
    ['OUTPUT', scenario.output],
  ];

  return (
    <aside className="generated-flow" aria-labelledby="generated-flow-title" aria-live="polite">
      <header>
        <div>
          <span>СОБРАННЫЙ СЦЕНАРИЙ</span>
          <h3 id="generated-flow-title">{scenario.title}</h3>
        </div>
        <b>SCN_{scenario.number}</b>
      </header>
      <ol>
        {flow.map(([label, value], index) => (
          <li key={label}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <small>{label}</small>
              <strong>{value}</strong>
            </div>
          </li>
        ))}
      </ol>
      <div className="generated-flow__result">
        <span>РЕЗУЛЬТАТ</span>
        <p>{scenario.result}</p>
      </div>
      <div className="system-log" aria-label="Системный журнал">
        {scenario.log.map((line) => (
          <span key={line}>
            <b>›</b> {line}
            <em>OK</em>
          </span>
        ))}
      </div>
    </aside>
  );
}
