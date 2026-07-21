import type { ProductIconName } from '../data/product-directions';

export function ProductIcon({ name }: { name: ProductIconName }) {
  const paths: Record<ProductIconName, React.ReactNode> = {
    browser: (
      <>
        <rect x="2.5" y="4" width="19" height="16" rx="2" />
        <path d="M3 9h18M7 6.5h.01M10 6.5h.01M7 14h4M14 13v4M12 15h4" />
      </>
    ),
    telegram: (
      <>
        <path d="m3 11 17-7-4 16-5-5-4 3 1-5 8-6-10 5Z" />
        <path d="m11 15 5-8" />
      </>
    ),
    api: (
      <>
        <rect x="3" y="5" width="7" height="14" rx="1" />
        <rect x="14" y="5" width="7" height="14" rx="1" />
        <path d="M10 9h4M10 15h4M12 7v10" />
      </>
    ),
    crm: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8" cy="9" r="2" />
        <path d="M5 16c.5-2 1.5-3 3-3s2.5 1 3 3M14 8h4M14 12h4M14 16h3" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {paths[name]}
    </svg>
  );
}
