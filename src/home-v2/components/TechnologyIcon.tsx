import type { TechnologyIconName } from '../data/product-directions';

export function TechnologyIcon({ name }: { name: TechnologyIconName }) {
  const icons: Record<TechnologyIconName, React.ReactNode> = {
    typescript: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M7 9h7M10.5 9v8M14.5 12c.7-.7 3.5-.8 3.5.7 0 2-3.8.8-3.8 2.8 0 1.7 3.2 1.4 4 .5" />
      </>
    ),
    react: (
      <>
        <circle cx="12" cy="12" r="1.5" />
        <ellipse cx="12" cy="12" rx="9" ry="3.6" />
        <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)" />
      </>
    ),
    ai: (
      <>
        <path d="M7 8V5m5 3V3m5 5V5M7 16v3m5-3v5m5-5v3M8 7h8l2 2v6l-2 2H8l-2-2V9Z" />
        <path d="M9 13c1-3 2-3 3 0s2 3 3 0" />
      </>
    ),
    database: (
      <>
        <ellipse cx="12" cy="5.5" rx="7.5" ry="3" />
        <path d="M4.5 5.5v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6M4.5 11.5v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6" />
      </>
    ),
    docker: (
      <>
        <path d="M3 12h15.5c1.7 0 2.1-1.5 2.3-2.4 1.2.7 1.5 1.8.7 3.1-1.5 2.6-4.2 4.1-8 4.1-4 0-7.1-1.8-7.5-5.8" />
        <path d="M5 8h3v3H5zm4 0h3v3H9zm4 0h3v3h-3zM9 4h3v3H9zm4 0h3v3h-3z" />
      </>
    ),
    server: (
      <>
        <rect x="4" y="4" width="16" height="6" rx="1" />
        <rect x="4" y="14" width="16" height="6" rx="1" />
        <path d="M7 7h.01M10 7h.01M7 17h.01M10 17h.01M14 7h3M14 17h3" />
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
        <circle cx="5" cy="12" r="2.5" />
        <circle cx="19" cy="6" r="2.5" />
        <circle cx="19" cy="18" r="2.5" />
        <path d="m7.5 11 9-4M7.5 13l9 4" />
      </>
    ),
    redis: (
      <>
        <path d="m12 3 9 4-9 4-9-4 9-4Z" />
        <path d="m4 11 8 4 8-4M4 15l8 4 8-4" />
      </>
    ),
    python: (
      <>
        <path d="M12 3H8C6 3 5 4 5 6v4h7v2H5c-2 0-3 1-3 3v2c0 2 1 3 3 3h3" />
        <path d="M12 21h4c2 0 3-1 3-3v-4h-7v-2h7c2 0 3-1 3-3V7c0-2-1-3-3-3h-3" />
        <path d="M8 6h.01M16 18h.01" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {icons[name]}
    </svg>
  );
}
