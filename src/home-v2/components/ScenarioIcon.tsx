import type { ChangeScenario } from '../data/change-scenarios';

export function ScenarioIcon({ name }: { name: ChangeScenario['icon'] }) {
  const paths: Record<ChangeScenario['icon'], React.ReactNode> = {
    workflow: (
      <>
        <rect x="3" y="4" width="6" height="6" rx="1" />
        <rect x="15" y="14" width="6" height="6" rx="1" />
        <path d="M9 7h4a4 4 0 0 1 4 4v3M15 17h-4a4 4 0 0 1-4-4v-3" />
      </>
    ),
    telegram: (
      <>
        <path d="m3 11 17-7-4 16-5-5-4 3 1-5 8-6-10 5Z" />
        <path d="m11 15 5-8" />
      </>
    ),
    browser: (
      <>
        <rect x="2.5" y="4" width="19" height="16" rx="2" />
        <path d="M3 9h18M7 6.5h.01M10 6.5h.01M8 16h8" />
      </>
    ),
    link: (
      <>
        <path d="m9 15-2 2a3.5 3.5 0 0 1-5-5l4-4a3.5 3.5 0 0 1 5 0M15 9l2-2a3.5 3.5 0 0 1 5 5l-4 4a3.5 3.5 0 0 1-5 0M8 12h8" />
      </>
    ),
    brain: (
      <>
        <path d="M9 4a3 3 0 0 0-5 2.2A3.5 3.5 0 0 0 4 13v1a3 3 0 0 0 5 2.2V4ZM15 4a3 3 0 0 1 5 2.2A3.5 3.5 0 0 1 20 13v1a3 3 0 0 1-5 2.2V4ZM9 9H7M15 9h2M9 14H7M15 14h2" />
      </>
    ),
    dashboard: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 9v12M6 6h.01M12 13h5M12 17h3" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {paths[name]}
    </svg>
  );
}
