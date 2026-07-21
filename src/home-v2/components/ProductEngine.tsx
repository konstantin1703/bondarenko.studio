import { productDirections, type ProductDirection } from '../data/product-directions';
import { ProductIcon } from './ProductIcon';

const routePaths: Record<ProductDirection['id'], string> = {
  web: 'M214 152H228L240 174L257 194',
  telegram: 'M316 152H302L290 174L273 194',
  automation: 'M214 458H228L240 436L257 416',
  crm: 'M316 458H302L290 436L273 416',
};

const routeNodes: Record<ProductDirection['id'], { x: number; y: number }> = {
  web: { x: 214, y: 152 },
  telegram: { x: 316, y: 152 },
  automation: { x: 214, y: 458 },
  crm: { x: 316, y: 458 },
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
      <svg className="product-engine__routes" viewBox="0 0 530 610" aria-hidden="true" focusable="false">
        <defs>
          <pattern id="product-dots" width="15" height="15" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.7" />
          </pattern>
          <filter id="product-route-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect width="530" height="610" fill="url(#product-dots)" />
        <g className="product-engine__orbits">
          <circle cx="265" cy="305" r="116" />
          <circle cx="265" cy="305" r="146" />
          <circle cx="265" cy="305" r="178" />
          <path d="M265 110v80M265 420v80M70 305h80M380 305h80" />
          <path d="m126 194 38 22 20-12m220-10-38 22-20-12M126 416l38-22 20 12m220 10-38-22-20 12" />
          <path d="M160 305h25m160 0h25M265 200v22m0 166v22" />
        </g>
        {productDirections.map((product) => (
          <path
            key={product.id}
            d={routePaths[product.id]}
            className={`product-engine__route ${product.id === activeProduct.id ? 'is-active' : ''}`}
          />
        ))}
        <g className="product-engine__route-nodes">
          {productDirections.map((product) => (
            <circle
              key={product.id}
              cx={routeNodes[product.id].x}
              cy={routeNodes[product.id].y}
              r="3"
              className={product.id === activeProduct.id ? 'is-active' : ''}
            />
          ))}
        </g>
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
        <span className="product-engine__depth product-engine__depth--back" />
        <span className="product-engine__depth product-engine__depth--front" />
        <span className="product-engine__ring product-engine__ring--outer" />
        <span className="product-engine__ring product-engine__ring--middle" />
        <span className="product-engine__ring product-engine__ring--inner" />
        <span className="product-engine__ring product-engine__ring--micro" />
        <svg className="product-engine__core-circuits" viewBox="0 0 220 220">
          <path d="M18 72h27l13 13h20M202 72h-27l-13 13h-20M18 148h27l13-13h20M202 148h-27l-13-13h-20" />
          <path d="M72 18v25l13 13v20M148 18v25l-13 13v20M72 202v-25l13-13v-20M148 202v-25l-13-13v-20" />
          <circle cx="18" cy="72" r="2" />
          <circle cx="202" cy="72" r="2" />
          <circle cx="18" cy="148" r="2" />
          <circle cx="202" cy="148" r="2" />
        </svg>
        <span className="product-engine__scan" />
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
        <span className="product-engine__port product-engine__port--top" />
        <span className="product-engine__port product-engine__port--right" />
        <span className="product-engine__port product-engine__port--bottom" />
        <span className="product-engine__port product-engine__port--left" />
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
