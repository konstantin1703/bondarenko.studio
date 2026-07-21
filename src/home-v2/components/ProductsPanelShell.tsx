import { useId, useState } from 'react';
import { productDirections, productWorkflow, type ProductDirection } from '../data/product-directions';
import { ProductEngine } from './ProductEngine';
import { ProductTechPanel } from './ProductTechPanel';
import { SystemIcon } from './SystemIcon';

const capabilityItems = [
  { code: '04', label: 'направления' },
  { code: 'CORE', label: 'единая архитектура' },
  { code: 'FULL', label: 'от задачи до запуска' },
  { code: 'MOD', label: 'модульная сборка' },
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
      <div className="products-panel__layout">
        <header className="products-panel__intro">
          <span className="products-panel__eyebrow">BND / PRODUCT SYSTEM</span>
          <h2 id="products-panel-title">
            Собираем продукты
            <br />
            под конкретные процессы
          </h2>
          <p>Проектируем цифровое решение вокруг задачи, данных и рабочих сценариев — от структуры до запуска.</p>
          <div className="products-panel__active" aria-live="polite">
            <span>АКТИВНОЕ НАПРАВЛЕНИЕ / {activeProduct.number}</span>
            <strong>{activeProduct.title}</strong>
            <p>{activeProduct.output}</p>
          </div>
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
            <span>WORKFLOW</span>
            <strong>КАК МЫ РАБОТАЕМ</strong>
          </li>
          {productWorkflow.map((step, index) => (
            <li className="product-workflow__step" key={step.number}>
              <div className="product-workflow__icon">
                <SystemIcon name={step.icon} />
                <span>{step.number}</span>
              </div>
              <div className="product-workflow__copy">
                <strong>{step.title}</strong>
                <small>{step.description}</small>
              </div>
              {index < productWorkflow.length - 1 && (
                <span className="product-workflow__connector" aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
