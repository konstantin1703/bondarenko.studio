import type { ChangeScenario } from '../data/change-scenarios';

export function StatusStrip({ scenario }: { scenario: ChangeScenario }) {
  return (
    <dl className="status-strip">
      <div>
        <dt>ВЫБРАННЫЙ СЦЕНАРИЙ</dt>
        <dd>
          {scenario.number} / {scenario.title}
        </dd>
      </div>
      <div>
        <dt>АКТИВНЫЕ МОДУЛИ</dt>
        <dd>{scenario.modules.join(' · ')}</dd>
      </div>
      <div>
        <dt>АРХИТЕКТУРА</dt>
        <dd>{scenario.status}</dd>
      </div>
      <div>
        <dt>РЕЖИМ</dt>
        <dd>
          <span className="status-strip__pulse" /> Интерактивная схема
        </dd>
      </div>
    </dl>
  );
}
