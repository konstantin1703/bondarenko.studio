import { SectionFrame } from '@/components/layout/SectionFrame';
import { ScenarioCard } from '@/components/problem-explorer/ScenarioCard';
import { SystemModuleShell } from '@/components/problem-explorer/SystemModuleShell';
import { SystemCore } from '@/components/problem-explorer/SystemCore';
import { HudPanel } from '@/components/hud/HudPanel';
import { MicroLabel } from '@/components/hud/MicroLabel';
import {
  problemScenarios,
  processScenario,
  solutionParameters,
  systemModules,
} from '@/data/foundation-fixtures';
import styles from './ProblemExplorerFoundation.module.scss';

export function ProblemExplorerFoundation() {
  return (
    <SectionFrame
      id="change"
      number="02"
      eyebrow="ДИАГНОСТИКА ПРОЦЕССА"
      title="ЧТО МОЖНО ИЗМЕНИТЬ"
      className={styles.section}
      headingClassName={styles.heading}
      fixtureState="calibrated"
      fixtureVersion="stage-6"
    >
      <div className={styles.grid}>
        <div className={styles.left}>
          <p className={styles.intro}>
            Выберите задачу — система покажет, как мы решаем её и какой результат вы получите.
          </p>
          <ol className={styles.scenarios} aria-label="Сценарии задач">
            {problemScenarios.map((scenario) => (
              <ScenarioCard key={scenario.number} {...scenario} />
            ))}
          </ol>
        </div>

        <div className={styles.system} aria-label="Архитектура выбранного сценария">
          <div className={styles.systemLabel} aria-hidden="true">ARCHITECTURE / SCN_01</div>
          <svg className={styles.routes} viewBox="0 0 700 350" preserveAspectRatio="none" aria-hidden="true" focusable="false">
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
          {systemModules.map((module) => <SystemModuleShell key={module.id} {...module} />)}
          <SystemCore />
        </div>

        <HudPanel as="aside" variant="architecture" className={styles.process}>
          <header className={styles.processHeader}>
            <MicroLabel priority={1}>ПРИМЕР СЦЕНАРИЯ</MicroLabel>
            <span>SCN_01</span>
          </header>
          <h3>Автоматизация заявки</h3>
          <ol>
            {processScenario.map((step, index) => (
              <li key={step.number}>
                <span className={styles.processIcon} aria-hidden="true">{step.icon}</span>
                <b>{step.number}</b>
                <div><strong>{step.title}</strong><small>{step.description}</small></div>
                {index < processScenario.length - 1 && <i aria-hidden="true">→</i>}
              </li>
            ))}
          </ol>
          <p>Система принимает данные, обрабатывает их и запускает следующий этап без ручной передачи между сервисами.</p>
        </HudPanel>

        <div className={styles.solutionStrip} aria-label="Параметры статического сценария">
          {solutionParameters.map(([label, value], index) => (
            <div key={label}>
              <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <small>{label}</small>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
