import { SectionFrame } from '@/components/layout/SectionFrame';
import { ProductDirectionCard } from '@/components/product-assembler/ProductDirectionCard';
import { OctagonalCore } from '@/components/product-assembler/OctagonalCore';
import { HudPanel } from '@/components/hud/HudPanel';
import { MicroLabel } from '@/components/hud/MicroLabel';
import {
  principles,
  productDirectionFixtures,
  stackPreview,
  workflowDescriptions,
  workflowStages,
} from '@/data/foundation-fixtures';
import styles from './ProductAssemblerFoundation.module.scss';

export function ProductAssemblerFoundation() {
  return (
    <SectionFrame
      id="products"
      number="03"
      eyebrow="ПРОДУКТОВАЯ АРХИТЕКТУРА"
      title="СОБИРАЕМ ПРОДУКТЫ ПОД КОНКРЕТНЫЕ ПРОЦЕССЫ"
      className={styles.section}
      headingClassName={styles.heading}
      fixtureState="calibrated"
      fixtureVersion="stage-6"
    >
      <div className={styles.grid}>
        <div className={styles.left}>
          <p>Проектируем, разрабатываем и запускаем цифровые решения, которые решают рабочие задачи и масштабируют бизнес.</p>
          <div className={styles.directionIndex} aria-label="Направления продуктов">
            {productDirectionFixtures.map((item) => <span key={item.code} data-active={item.active || undefined}><b>{item.code}</b><small>{item.title}</small></span>)}
          </div>
        </div>

        <div className={styles.assembly} aria-label="Сборка продуктовой архитектуры">
          <svg className={styles.routes} viewBox="0 0 690 340" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <g className={styles.guides}>
              <circle cx="345" cy="170" r="138" />
              <circle cx="345" cy="170" r="102" />
              <path d="M345 10v320M185 170h320M232 56l226 228M232 284 458 56" />
            </g>
            <g className={styles.routeSecondary}>
              <path d="M220 54h42l42 49" />
              <path d="M470 54h-42l-42 49" />
            </g>
            <g className={styles.routePrimary}>
              <path d="M220 286h42l42-49" />
              <path d="M470 286h-42l-42-49" />
            </g>
            <g className={styles.nodes}>
              <circle cx="220" cy="54" r="2" /><circle cx="470" cy="54" r="2" />
              <circle cx="220" cy="286" r="2.5" /><circle cx="470" cy="286" r="2.5" />
              <circle cx="304" cy="103" r="2" /><circle cx="386" cy="103" r="2" />
              <circle cx="304" cy="237" r="2.5" /><circle cx="386" cy="237" r="2.5" />
            </g>
          </svg>
          <div className={styles.cards}>
            {productDirectionFixtures.map((direction) => (
              <ProductDirectionCard key={direction.title} {...direction} />
            ))}
          </div>
          <OctagonalCore size={235} state="active" decorative={false} />
        </div>

        <div className={styles.right}>
          <HudPanel className={styles.stack}>
            <MicroLabel priority={1}>ПРЕДВАРИТЕЛЬНЫЙ СТЕК</MicroLabel>
            <ul>{stackPreview.map((technology) => <li key={technology}><span aria-hidden="true">{technology.slice(0, 2).toUpperCase()}</span><b>{technology}</b></li>)}</ul>
            <small>Финальная архитектура уточняется после анализа процесса.</small>
          </HudPanel>
          <HudPanel className={styles.principles}>
            <MicroLabel priority={1}>ПРИНЦИПЫ РАБОТЫ</MicroLabel>
            <ul>{principles.map((principle, index) => <li key={principle}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><div><b>{principle}</b><small>{['Гибкая архитектура', 'Контроль данных', 'Стабильная работа', 'Связь сервисов', 'Данные для решений'][index]}</small></div></li>)}</ul>
          </HudPanel>
        </div>

        <div className={styles.workflow} aria-label="Этапы разработки">
          <strong>КАК МЫ РАБОТАЕМ <i aria-hidden="true" /></strong>
          {workflowStages.map((stage, index) => (
            <div key={stage}>
              <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <div><b>{stage}</b><small>{workflowDescriptions[index]}</small></div>
              {index < workflowStages.length - 1 && <i aria-hidden="true">→</i>}
            </div>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
