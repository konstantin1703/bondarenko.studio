import { productDirections, type ProductDirection } from '../data/product-directions';
import { ProductIcon } from './ProductIcon';
import { TechConnectorSvg } from './TechPrimitives';

const routePaths: Record<ProductDirection['id'], string> = {
  web: 'M190 58h50l40 61',
  telegram: 'M460 58h-50l-40 61',
  automation: 'M190 282h50l40-61',
  crm: 'M460 282h-50l-40-61',
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
      <TechConnectorSvg className="product-engine__routes" viewBox="0 0 650 340">
        <defs>
          <pattern id="product-matrix" width="15" height="15" patternUnits="userSpaceOnUse">
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
        <rect width="650" height="340" fill="url(#product-matrix)" />
        <g className="product-engine__orbits">
          <circle cx="325" cy="170" r="76" />
          <circle cx="325" cy="170" r="104" />
          <circle cx="325" cy="170" r="132" />
          <path d="M325 20v46m0 208v46M175 170h46m208 0h46" />
          <path d="M229 74h32l18 18m142-18h-32l-18 18M229 266h32l18-18m142 18h-32l-18-18" />
        </g>
        {productDirections.map((product) => (
          <path
            key={product.id}
            d={routePaths[product.id]}
            className={`product-engine__route ${product.id === activeProduct.id ? 'is-active' : ''}`}
          />
        ))}
        <g className="product-engine__route-nodes">
          <circle cx="190" cy="58" r="3" />
          <circle cx="460" cy="58" r="3" />
          <circle cx="190" cy="282" r="3" />
          <circle cx="460" cy="282" r="3" />
        </g>
      </TechConnectorSvg>

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
              <strong>{product.title}</strong>
              <em>{product.description}</em>
            </span>
            <span className="product-direction__arrow" aria-hidden="true">›</span>
          </button>
        ))}
      </div>

      <div className="product-engine__core" aria-hidden="true">
        <span className="product-engine__depth product-engine__depth--back" />
        <span className="product-engine__depth product-engine__depth--front" />
        <span className="product-engine__ring product-engine__ring--outer" />
        <span className="product-engine__ring product-engine__ring--middle" />
        <span className="product-engine__ring product-engine__ring--inner" />
        <svg className="product-engine__core-circuits" viewBox="0 0 180 180">
          <path d="M16 58h25l15 15h20M164 58h-25l-15 15h-20M16 122h25l15-15h20M164 122h-25l-15-15h-20" />
          <path d="M58 16v25l15 15v20M122 16v25l-15 15v20M58 164v-25l15-15v-20M122 164v-25l-15-15v-20" />
          <circle cx="16" cy="58" r="2" />
          <circle cx="164" cy="58" r="2" />
          <circle cx="16" cy="122" r="2" />
          <circle cx="164" cy="122" r="2" />
        </svg>
        <span className="product-engine__scan" />
        <div className="product-engine__core-copy">
          <span>BND</span>
          <strong>ENGINE</strong>
          <em>ЯДРО СИСТЕМЫ</em>
        </div>
      </div>
    </div>
  );
}
