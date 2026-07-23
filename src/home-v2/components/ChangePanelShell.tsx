import { useId, useState } from 'react';
import { changeScenarios, type ChangeScenario } from '../data/change-scenarios';
import { EngineDiagram } from './EngineDiagram';
import { GeneratedFlow } from './GeneratedFlow';
import { ScenarioIcon } from './ScenarioIcon';
import { StatusStrip } from './StatusStrip';
import { TechGrid } from './TechPrimitives';

export function ChangePanelShell() {
  const [activeId, setActiveId] = useState<ChangeScenario['id']>(changeScenarios[0].id);
  const panelId = useId();
  const activeScenario = changeScenarios.find((scenario) => scenario.id === activeId) ?? changeScenarios[0];

  const selectRelativeScenario = (currentIndex: number, offset: number) => {
    const nextIndex = (currentIndex + offset + changeScenarios.length) % changeScenarios.length;
    setActiveId(changeScenarios[nextIndex].id);
    document.getElementById(`${panelId}-${changeScenarios[nextIndex].id}`)?.focus();
  };

  return (
    <section className="change-panel" id="change-panel" aria-labelledby="change-panel-title">
      <div className="change-panel__frame" aria-hidden="true" />
      <TechGrid />
      <div className="change-panel__grid">
        <header className="change-panel__intro">
          <h2 id="change-panel-title">
            Что можно
            <br />
            изменить
          </h2>
          <p>Выберите задачу — система покажет, как мы собираем решение и какой результат формируется.</p>
        </header>

        <div className="scenario-selector" role="group" aria-label="Выберите сценарий">
          {changeScenarios.map((scenario, index) => {
            const isActive = scenario.id === activeScenario.id;
            return (
              <button
                className="scenario-button"
                id={`${panelId}-${scenario.id}`}
                key={scenario.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveId(scenario.id)}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
                    event.preventDefault();
                    selectRelativeScenario(index, 1);
                  }
                  if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
                    event.preventDefault();
                    selectRelativeScenario(index, -1);
                  }
                  if (event.key === 'Home' || event.key === 'End') {
                    event.preventDefault();
                    selectRelativeScenario(event.key === 'Home' ? 0 : changeScenarios.length - 1, 0);
                  }
                }}
              >
                <span className="scenario-button__number">{scenario.number}</span>
                <span className="scenario-button__icon">
                  <ScenarioIcon name={scenario.icon} />
                </span>
                <span className="scenario-button__copy">
                  <strong>{scenario.title}</strong>
                  <small>{scenario.description}</small>
                </span>
                <span className="scenario-button__arrow" aria-hidden="true">
                  →
                </span>
              </button>
            );
          })}
        </div>

        <EngineDiagram scenario={activeScenario} />
        <GeneratedFlow scenario={activeScenario} />
        <StatusStrip scenario={activeScenario} />
      </div>
    </section>
  );
}
