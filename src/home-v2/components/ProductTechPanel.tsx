import { engineeringPrinciples, type ProductDirection } from '../data/product-directions';
import { SystemIcon } from './SystemIcon';
import { TechnologyIcon } from './TechnologyIcon';
import { TechIconTile, TechPrincipleRow } from './TechPrimitives';

export function ProductTechPanel({ product }: { product: ProductDirection }) {
  return (
    <aside className="product-tech" aria-live="polite">
      <section className="product-tech__stack" aria-labelledby="product-stack-title">
        <header>
          <h3 id="product-stack-title">ТЕХНОЛОГИЧЕСКИЙ СТЕК</h3>
        </header>
        <ul>
          {product.stack.map((technology) => (
            <TechIconTile
              key={technology.name}
              icon={<TechnologyIcon name={technology.icon} />}
              title={technology.name}
            />
          ))}
        </ul>
      </section>
      <section className="product-tech__principles" aria-labelledby="product-principles-title">
        <header>
          <h3 id="product-principles-title">ПРИНЦИПЫ РАБОТЫ</h3>
        </header>
        <ul>
          {product.principles.map((id) => {
            const principle = engineeringPrinciples[id];
            return (
              <TechPrincipleRow
                key={id}
                icon={<SystemIcon name={id} />}
                title={principle.title}
                description={principle.description}
              />
            );
          })}
        </ul>
      </section>
    </aside>
  );
}
