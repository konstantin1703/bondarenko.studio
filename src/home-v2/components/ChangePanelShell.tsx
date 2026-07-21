import { changeScenarios } from '../data/change-scenarios';

export function ChangePanelShell() {
  return (
    <section className="preview-section" id="change-panel" aria-labelledby="change-panel-title">
      <header className="preview-section-heading">
        <span className="preview-index">02 / SCENARIOS</span>
        <h2 id="change-panel-title">Что можно изменить</h2>
        <p>Typed data подключены. Финальная технологическая панель появится на следующем этапе.</p>
      </header>
      <ol className="preview-list preview-list--scenarios">
        {changeScenarios.map((scenario) => (
          <li key={scenario.id}>
            <span>{String(scenario.order).padStart(2, '0')}</span>
            <div>
              <h3>{scenario.title}</h3>
              <p>{scenario.summary}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
