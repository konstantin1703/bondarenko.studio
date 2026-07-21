import type { ProductPrincipleId, WorkflowIconName } from '../data/product-directions';

type SystemIconName = ProductPrincipleId | WorkflowIconName;

export function SystemIcon({ name }: { name: SystemIconName }) {
  const icons: Record<SystemIconName, React.ReactNode> = {
    modularity: <path d="M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 0h6v6h-6zM10 7h4M7 10v4m10-4v4m-7 3h4" />,
    security: <path d="M12 3 5 6v5c0 4.7 2.8 8.2 7 10 4.2-1.8 7-5.3 7-10V6l-7-3Zm-3 9 2 2 4-5" />,
    reliability: <path d="M4 12a8 8 0 1 0 16 0 8 8 0 1 0-16 0Zm4 0 2.5 2.5L16 9M12 4V2m0 20v-2M4 12H2m20 0h-2" />,
    integration: <path d="M8 8h8v8H8zM3 6h3v3H3zm15 9h3v3h-3zM6 7h2m8 9h2M5 9v8h11m3-2V7H8" />,
    analytics: <path d="M4 20V9m5 11V4m5 16v-7m5 7V7M2 20h20" />,
    analysis: <path d="M10 4a6 6 0 1 0 0 12 6 6 0 1 0 0-12Zm4.5 10.5L21 21M7 10h6m-3-3v6" />,
    architecture: <path d="M4 4h6v6H4zm10 0h6v6h-6zM9 14h6v6H9zM10 7h4M7 10v3.5h5m5-3.5v3.5h-5" />,
    development: <path d="m8 6-5 6 5 6m8-12 5 6-5 6m-2-15-4 18" />,
    testing: <path d="M12 3 5 6v5c0 4.7 2.8 8.2 7 10 4.2-1.8 7-5.3 7-10V6l-7-3Zm-3 9 2 2 4-5" />,
    launch: <path d="M14 4c3-1 5-1 7-1 0 2 0 4-1 7l-6 6-6-6 6-6ZM8 10l-4 2-2 4 6-1m6 1-1 6 4-2 2-4M12 8h.01" />,
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {icons[name]}
    </svg>
  );
}
