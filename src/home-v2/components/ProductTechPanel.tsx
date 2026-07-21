import { engineeringPrinciples, type ProductDirection } from '../data/product-directions';

export function ProductTechPanel({ product }: { product: ProductDirection }) {
  return (
    <aside className="product-tech" aria-live="polite">
      <section className="product-tech__stack" aria-labelledby="product-stack-title">
        <header>
          <div>
            <span>RECOMMENDED / {product.number}</span>
            <h3 id="product-stack-title">Рекомендуемый стек</h3>
          </div>
          <b>{String(product.stack.length).padStart(2, '0')} MODULES</b>
        </header>
        <ul>
          {product.stack.map((technology, index) => (
            <li key={technology}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{technology}</strong>
              <small>SELECTED</small>
            </li>
          ))}
        </ul>
        <p>Стек формируется под выбранное направление и уточняется после анализа задачи.</p>
      </section>
      <section className="product-tech__principles" aria-labelledby="product-principles-title">
        <header>
          <span>BND / ENGINEERING</span>
          <h3 id="product-principles-title">Принципы работы</h3>
        </header>
        <ul>
          {product.principles.map((id, index) => {
            const principle = engineeringPrinciples[id];
            return (
              <li key={id}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <strong>{principle.title}</strong>
                  <small>{principle.description}</small>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </aside>
  );
}
