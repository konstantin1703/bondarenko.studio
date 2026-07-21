import { productDirections } from '../data/product-directions';

export function ProductsPanelShell() {
  return (
    <section className="preview-section" id="products-panel" aria-labelledby="products-panel-title">
      <header className="preview-section-heading">
        <span className="preview-index">03 / PRODUCTS</span>
        <h2 id="products-panel-title">Собираем продукты под конкретные процессы</h2>
        <p>Структурный список направлений без переноса визуала и CSS из PR №49.</p>
      </header>
      <div className="preview-grid">
        {productDirections.map((product) => (
          <article key={product.id}>
            <span>{String(product.order).padStart(2, '0')}</span>
            <h3>{product.title}</h3>
            <p>{product.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
