import { productDirections, type ProductDirection } from '../data/product-directions';
import { ProductIcon } from './ProductIcon';

const routePaths: Record<ProductDirection['id'], string> = {
  web: 'M72 90H170L222 150',
  telegram: 'M374 90H276L224 150',
  automation: 'M72 312H170L222 252',
  crm: 'M374 312H276L224 252',
};

interface ProductEngineProps {
  activeProduct: ProductDirection;
  controlId: string;
  onSelect: (id: ProductDirection['id']) => void;
  onSelectRelative: (currentIndex: number, offset: number) => void;
}

export function ProductEngine({ activeProduct, controlId, onSelect, onSelectRelative }: ProductEngineProps) {
  return (
    <div className="product-engine" aria-label={`BND Engine: ${activeProduct.title}`}>
      <div className="product-engine__label">
        <span>PRODUCT ARCHITECTURE</span>
        <b>DIR_{activeProduct.number}</b>
      </div>
      <svg className="product-engine__routes" viewBox="0 0 446 402" aria-hidden="true" focusable="false">
        <defs>
          <pattern id="product-dots" width="15" height="15" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.7" />
          </pattern>
        </defs>
        <rect width="446" height="402" fill="url(#product-dots)" />
        <g className="product-engine__orbits">
          <circle cx="223" cy="201" r="82" />
          <circle cx="223" cy="201" r="112" />
          <circle cx="223" cy="201" r="142" />
          <path d="M223 45v45M223 312v45M67 201h46M333 201h46" />
        </g>
        {productDirections.map((product) => (
          <path
            key={product.id}
            d={routePaths[product.id]}
            className={product.id === activeProduct.id ? 'is-active' : ''}
          />
        ))}
      </svg>

      <div className="product-engine__selector" role="group" aria-label="Выберите направление продукта">
        {productDirections.map((product, index) => (
          <button
            type="button"
            id={`${controlId}-${product.id}`}
            key={product.id}
            className={`product-direction product-direction--${product.id}`}
            aria-pressed={product.id === activeProduct.id}
            onClick={() => onSelect(product.id)}
            onKeyDown={(event) => {
              if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                event.preventDefault();
                onSelectRelative(index, 1);
              }
              if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                event.preventDefault();
                onSelectRelative(index, -1);
              }
              if (event.key === 'Home' || event.key === 'End') {
                event.preventDefault();
                onSelectRelative(event.key === 'Home' ? 0 : productDirections.length - 1, 0);
              }
            }}
          >
            <span className="product-direction__icon">
              <ProductIcon name={product.icon} />
            </span>
            <span className="product-direction__copy">
              <small>{product.number} / DIRECTION</small>
              <strong>{product.title}</strong>
              <em>{product.description}</em>
            </span>
            <span className="product-direction__arrow" aria-hidden="true">
              →
            </span>
          </button>
        ))}
      </div>

      <div className="product-engine__core" aria-hidden="true">
        <span className="product-engine__ring product-engine__ring--outer" />
        <span className="product-engine__ring product-engine__ring--inner" />
        <div className="product-engine__core-copy">
          <small>BND / SYSTEM</small>
          <span>BND</span>
          <strong>ENGINE</strong>
          <em>PRODUCT CORE</em>
        </div>
        <div className="product-engine__modules">
          {activeProduct.modules.map((module) => (
            <span key={module}>{module}</span>
          ))}
        </div>
      </div>
      <div className="product-engine__status">
        <span>
          ROUTE <b>{activeProduct.number}</b>
        </span>
        <span>
          MODULES <b>{activeProduct.modules.length}</b>
        </span>
        <span>
          CORE <b>READY</b>
        </span>
      </div>
    </div>
  );
}
