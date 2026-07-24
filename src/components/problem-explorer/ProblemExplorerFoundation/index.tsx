'use client';

import { useMemo, useState } from 'react';
import { SectionFrame } from '@/components/layout/SectionFrame';
import { ScenarioCard } from '@/components/problem-explorer/ScenarioCard';
import { SystemModuleShell } from '@/components/problem-explorer/SystemModuleShell';
import { SystemCore } from '@/components/problem-explorer/SystemCore';
import { HudPanel } from '@/components/hud/HudPanel';
import { MicroLabel } from '@/components/hud/MicroLabel';
import {
  DEFAULT_PROBLEM_SCENARIO_ID,
  problemScenarioSources,
} from '@/data/central-panels-interactions';
import type { ProblemScenarioId } from '@/domain/central-panels/types';
import { resolveProblemScenario } from '@/lib/central-panels/problem-resolver';
import styles from './ProblemExplorerFoundation.module.scss';

export function ProblemExplorerFoundation() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<ProblemScenarioId>(DEFAULT_PROBLEM_SCENARIO_ID);
  const [announcement, setAnnouncement] = useState('');
  const viewModel = useMemo(() => resolveProblemScenario(selectedScenarioId), [selectedScenarioId]);

  function selectScenario(id: ProblemScenarioId) {
    if (id === selectedScenarioId) return;
    const nextViewModel = resolveProblemScenario(id);
    setSelectedScenarioId(id);
    setAnnouncement(nextViewModel.announcement);
  }

  return (
    <SectionFrame
      id="change"
      number="02"
      eyebrow="ДИАГНОСТИКА ПРОЦЕССА"
      title="ЧТО МОЖНО ИЗМЕНИТЬ"
      className={styles.section}
      headingClassName={styles.heading}
      fixtureState="interactive"
      fixtureVersion="stage-8"
    >
      <div className={styles.grid} data-problem-explorer-state={selectedScenarioId}>
        <div className={styles.left}>
          <p className={styles.intro}>
            Выберите задачу — система покажет, как проблема преобразуется в архитектуру решения.
          </p>
          <ol className={styles.scenarios} aria-label="Сценарии задач">
            {problemScenarioSources.map((scenario) => (
              <ScenarioCard
                key={scenario.id}
                id={scenario.id}
                number={scenario.number}
                title={scenario.title}
                description={scenario.description}
                selected={scenario.id === selectedScenarioId}
                onSelect={selectScenario}
              />
            ))}
          </ol>
        </div>

        <div
          className={styles.system}
          aria-label="Архитектура выбранного сценария"
          data-route-profile={viewModel.routeProfile}
        >
          <div className={styles.systemLabel} aria-hidden="true">
            ARCHITECTURE / {viewModel.statusCode}
          </div>
          <svg
            className={styles.routes}
            data-profile={viewModel.routeProfile}
            viewBox="0 0 700 350"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <g className={styles.guides}>
              <ellipse cx="350" cy="198" rx="182" ry="76" />
              <ellipse cx="350" cy="198" rx="140" ry="57" />
              <path d="M152 198h396M350 62v272M225 92l250 212M225 304 475 92" />
            </g>
            <g className={styles.secondaryRoutes}>
              <path d="M170 35h45l58 71h18" />
              <path d="M530 35h-45l-58 71h-18" />
            </g>
            <g className={styles.primaryRoutes}>
              <path d="M170 175h116" />
              <path d="M170 315h45l58-70h18" />
              <path d="M530 175H414" />
              <path d="M530 315h-45l-58-70h-18" />
            </g>
            <g className={styles.nodes}>
              {[170, 286, 414, 530].map((x) => <circle key={`mid-${x}`} cx={x} cy="175" r="2.4" />)}
              <circle cx="170" cy="35" r="2" /><circle cx="530" cy="35" r="2" />
              <circle cx="170" cy="315" r="2.4" /><circle cx="530" cy="315" r="2.4" />
            </g>
          </svg>
          {viewModel.modules.map((module) => <SystemModuleShell key={module.id} {...module} />)}
          <SystemCore
            scenarioId={viewModel.id}
            statusCode={viewModel.statusCode}
            title={viewModel.shortTitle}
          />
        </div>

        <HudPanel as="aside" variant="architecture" className={styles.process}>
          <header className={styles.processHeader}>
            <MicroLabel priority={1}>ПРИМЕР СЦЕНАРИЯ</MicroLabel>
            <span>{viewModel.statusCode}</span>
          </header>
          <h3>{viewModel.processTitle}</h3>
          <ol data-process-chain={viewModel.id}>
            {viewModel.processSteps.map((step, index) => (
              <li key={step.number}>
                <span className={styles.processIcon} aria-hidden="true">{step.icon}</span>
                <b>{step.number}</b>
                <div><strong>{step.title}</strong><small>{step.description}</small></div>
                {index < viewModel.processSteps.length - 1 && <i aria-hidden="true">→</i>}
              </li>
            ))}
          </ol>
          <p>{viewModel.processDescription}</p>
          <div className={styles.capabilities} aria-label="Активные возможности сценария">
            {viewModel.capabilityLabels.map((label) => <span key={label}>{label}</span>)}
          </div>
          <p className={styles.resultText}>{viewModel.accessibleResult}</p>
        </HudPanel>

        <div className={styles.solutionStrip} aria-label="Параметры выбранного сценария">
          {viewModel.solutionParameters.map(([label, value], index) => (
            <div key={label}>
              <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <small>{label}</small>
              <strong>{value}</strong>
            </div>
          ))}
        </div>

        <p className="sr-only" aria-live="polite" aria-atomic="true" data-problem-live-status>
          {announcement}
        </p>
      </div>
    </SectionFrame>
  );
}
