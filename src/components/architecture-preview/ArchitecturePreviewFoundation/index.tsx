import { ArchitectureNode } from '@/components/architecture-preview/ArchitectureNode';
import { HudPanel } from '@/components/hud/HudPanel';
import { MicroLabel } from '@/components/hud/MicroLabel';
import {
  architectureNodes,
  architectureSummary,
  architectureTags,
  preliminaryStack,
} from '@/data/configurator-fixtures';
import styles from './ArchitecturePreviewFoundation.module.scss';

export function ArchitecturePreviewFoundation() {
  return (
    <HudPanel variant="architecture" className={styles.preview}>
      <section aria-labelledby="architecture-preview-title" data-configurator-zone="preview">
        <header className={styles.header}>
          <MicroLabel priority={1}>ПРЕДВАРИТЕЛЬНАЯ АРХИТЕКТУРА</MicroLabel>
          <span><i aria-hidden="true" />LOCAL PREVIEW</span>
        </header>

        <div className={styles.configTitle}>
          <span aria-hidden="true">◇</span>
          <h3 id="architecture-preview-title"><strong>BND SOLUTION</strong> CONFIG</h3>
        </div>

        <figure className={styles.graph} aria-label="Предварительная архитектура: источник данных, AI-обработка, база данных, API или CRM и уведомления">
          <figcaption className="sr-only">Статическая схема предварительной архитектуры</figcaption>
          <svg viewBox="0 0 420 252" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path className={styles.routePrimary} d="M130 58h20M270 58h20" />
            <path className={styles.routePrimary} d="M355 112v25H285v25" />
            <path className={styles.routeSecondary} d="M210 112v38H130v12" />
            <path className={styles.routeSecondary} d="M130 208h28M262 208h28" />
            <circle className={styles.nodePrimary} cx="150" cy="58" r="3" />
            <circle className={styles.nodePrimary} cx="290" cy="58" r="3" />
            <circle className={styles.nodeSecondary} cx="210" cy="150" r="2.5" />
            <circle className={styles.nodeSecondary} cx="285" cy="137" r="2.5" />
          </svg>
          {architectureNodes.map((node) => <ArchitectureNode key={node.id} {...node} />)}
        </figure>

        <dl className={styles.summary} aria-label="Сводка предварительной конфигурации">
          {architectureSummary.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd data-status={label === 'Статус'}>{value}</dd>
            </div>
          ))}
        </dl>

        <div className={styles.tags} aria-label="Системные направления">
          {architectureTags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>

        <footer className={styles.stack}>
          <MicroLabel>ПРЕДВАРИТЕЛЬНЫЙ СТЕК</MicroLabel>
          <p>Уточняется после анализа процесса и ограничений проекта.</p>
          <div>
            {preliminaryStack.map((technology) => (
              <span key={technology}><i aria-hidden="true">{technology.slice(0, 2).toUpperCase()}</i>{technology}</span>
            ))}
          </div>
        </footer>
      </section>
    </HudPanel>
  );
}
