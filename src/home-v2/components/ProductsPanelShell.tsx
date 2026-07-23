import { useId, useState } from 'react';
import { productDirections, productWorkflow, type ProductDirection } from '../data/product-directions';
import { ProductEngine } from './ProductEngine';
import { ProductTechPanel } from './ProductTechPanel';
import { SystemIcon } from './SystemIcon';
import { TechGrid, TechWorkflowStep } from './TechPrimitives';

const capabilityItems = [
  { code: '04', label: 'направления' },
  { code: 'ЕДИНАЯ', label: 'архитектура' },
  { code: 'ОТ ЗАДАЧИ', label: 'до запуска' },
  { code: 'МОДУЛЬНАЯ', label: 'сборка' },
] as const;

export function ProductsPanelShell() {
  const [activeId, setActiveId] = useState<ProductDirection['id']>(productDirections[0].id);
  const controlId = useId();
  const activeProduct = productDirections.find((product) => product.id === activeId) ?? productDirections[0];

  const selectRelativeProduct = (currentIndex: number, offset: number) => {
    const nextIndex = (currentIndex + offset + productDirections.length) % productDirections.length;
    setActiveId(productDirections[nextIndex].id);
    document.getElementById(`${controlId}-${productDirections[nextIndex].id}`)?.focus();
  };

  return (
    <section className="products-panel" id="products-panel" aria-labelledby="products-panel-title">
      <div className="products-panel__frame" aria-hidden="true" />
      <TechGrid />
      <div className="products-panel__layout">
        <header className="products-panel__intro">
          <h2 id="products-panel-title">
            Собираем продукты
            <br />
            под конкретные процессы
          </h2>
          <p>Проектируем, разрабатываем и запускаем цифровые решения, которые решают ваши задачи и масштабируют бизнес.</p>
          <ul className="products-capabilities" aria-label="Характеристики подхода">
            {capabilityItems.map((item) => (
              <li key={item.code}>
                <b>{item.code}</b>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </header>

        <ProductEngine
          activeProduct={activeProduct}
          controlId={controlId}
          onSelect={setActiveId}
          onSelectRelative={selectRelativeProduct}
        />
        <ProductTechPanel product={activeProduct} />

        <ol className="product-workflow" aria-label="Как мы работаем">
          <li className="product-workflow__label">
            <strong>КАК МЫ РАБОТАЕМ</strong>
            <span aria-hidden="true" />
          </li>
          {productWorkflow.map((step, index) => (
            <TechWorkflowStep
              key={step.number}
              icon={<SystemIcon name={step.icon} />}
              title={step.title}
              description={step.description}
              isLast={index === productWorkflow.length - 1}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
