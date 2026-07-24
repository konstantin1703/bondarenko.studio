'use client';

import { useMemo, useState } from 'react';
import { SectionFrame } from '@/components/layout/SectionFrame';
import { ProductDirectionCard } from '@/components/product-assembler/ProductDirectionCard';
import { OctagonalCore } from '@/components/product-assembler/OctagonalCore';
import { HudPanel } from '@/components/hud/HudPanel';
import { MicroLabel } from '@/components/hud/MicroLabel';
import {
  DEFAULT_PRODUCT_DIRECTION_ID,
  productDirectionSources,
} from '@/data/central-panels-interactions';
import { workflowDescriptions, workflowStages } from '@/data/foundation-fixtures';
import type { ProductDirectionId } from '@/domain/central-panels/types';
import { resolveProductDirection } from '@/lib/central-panels/product-resolver';
import styles from './ProductAssemblerFoundation.module.scss';

export function ProductAssemblerFoundation() {
  const [selectedDirectionId, setSelectedDirectionId] = useState<ProductDirectionId>(DEFAULT_PRODUCT_DIRECTION_ID);
  const [announcement, setAnnouncement] = useState('');
  const viewModel = useMemo(() => resolveProductDirection(selectedDirectionId), [selectedDirectionId]);

  function selectDirection(id: ProductDirectionId) {
    if (id === selectedDirectionId) return;
    const nextViewModel = resolveProductDirection(id);
    setSelectedDirectionId(id);
    setAnnouncement(nextViewModel.announcement);
  }

  return (
    <SectionFrame
      id="products"
      number="03"
      eyebrow="ПРОДУКТОВАЯ АРХИТЕКТУРА"
      title="СОБИРАЕМ ПРОДУКТЫ ПОД КОНКРЕТНЫЕ ПРОЦЕССЫ"
      className={styles.section}
      headingClassName={styles.heading}
      fixtureState="interactive"
      fixtureVersion="stage-8"
    >
      <div className={styles.grid} data-product-assembler-state={selectedDirectionId}>
        <div className={styles.left}>
          <p>Выберите направление — центральное ядро, маршруты и предварительная архитектура обновятся без перестройки layout.</p>
          <div className={styles.directionIndex} aria-label="Индекс направлений продуктов">
            {productDirectionSources.map((item) => (
              <span key={item.id} data-active={item.id === selectedDirectionId || undefined}>
                <b>{item.code}</b><small>{item.title}</small>
              </span>
            ))}
          </div>
        </div>

        <div
          className={styles.assembly}
          aria-label="Сборка продуктовой архитектуры"
          data-route-profile={viewModel.routeProfile}
        >
          <svg
            className={styles.routes}
            data-profile={viewModel.routeProfile}
            viewBox="0 0 690 340"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
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
          <div className={styles.cards} aria-label="Направления продуктовой архитектуры">
            {productDirectionSources.map((direction) => (
              <ProductDirectionCard
                key={direction.id}
                id={direction.id}
                title={direction.title}
                description={direction.description}
                code={direction.code}
                selected={direction.id === selectedDirectionId}
                onSelect={selectDirection}
              />
            ))}
          </div>
          <OctagonalCore
            size={235}
            state="selected"
            decorative={false}
            label={viewModel.coreLabel}
            subtitle={viewModel.coreSubtitle}
            activeLayers={viewModel.activeLayers}
            primaryLayer={viewModel.primaryLayer}
            routeProfile={viewModel.routeProfile}
          />
        </div>

        <div className={styles.right}>
          <HudPanel className={styles.stack}>
            <MicroLabel priority={1}>ПРЕДВАРИТЕЛЬНЫЙ СТЕК</MicroLabel>
            <div className={styles.capabilities} aria-label="Возможности выбранного направления">
              {viewModel.capabilityLabels.map((label) => <span key={label}>{label}</span>)}
            </div>
            <ul data-product-stack={viewModel.id}>
              {viewModel.stack.map((technology) => (
                <li key={technology}><span aria-hidden="true">{technology.slice(0, 2).toUpperCase()}</span><b>{technology}</b></li>
              ))}
            </ul>
            <small>{viewModel.accessibleArchitecture}</small>
          </HudPanel>
          <HudPanel className={styles.principles}>
            <MicroLabel priority={1}>ПРИНЦИПЫ РАБОТЫ</MicroLabel>
            <ul data-product-principles={viewModel.id}>
              {viewModel.principles.map(([principle, description], index) => (
                <li key={principle}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <div><b>{principle}</b><small>{description}</small></div>
                </li>
              ))}
            </ul>
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

        <p className="sr-only" aria-live="polite" aria-atomic="true" data-product-live-status>
          {announcement}
        </p>
      </div>
    </SectionFrame>
  );
}
