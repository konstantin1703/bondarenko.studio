import type { ChangeScenario, EngineModule } from '../data/change-scenarios';

const modulePositions: Record<EngineModule, { x: number; y: number; detail: string }> = {
  INPUT: { x: 32, y: 50, detail: 'SOURCE' },
  AI: { x: 32, y: 250, detail: 'ANALYSIS' },
  DATA: { x: 366, y: 50, detail: 'STORAGE' },
  API: { x: 366, y: 250, detail: 'INTEGRATION' },
  OUTPUT: { x: 198, y: 326, detail: 'RESULT' },
};

const routes = [
  { id: 'input-ai', d: 'M112 76H145V276H112' },
  { id: 'input-api', d: 'M112 76H168V180H332V276H366' },
  { id: 'input-data', d: 'M112 76H168V96H366' },
  { id: 'ai-data', d: 'M112 276H160V180H332V96H366' },
  { id: 'ai-api', d: 'M112 276H366' },
  { id: 'api-data', d: 'M406 250V126' },
  { id: 'data-api', d: 'M406 126V250' },
  { id: 'data-output', d: 'M406 126V180H278V326' },
  { id: 'api-output', d: 'M366 276H278V326' },
];

export function EngineDiagram({ scenario }: { scenario: ChangeScenario }) {
  const activeRoutes = new Set(scenario.routes);
  const activeModules = new Set(scenario.modules);

  return (
    <div className="engine" aria-label={`Схема BND Engine: ${scenario.title}`}>
      <div className="engine__label">
        <span>СИСТЕМНАЯ СХЕМА</span>
        <b>SCN_{scenario.number}</b>
      </div>
      <svg className="engine__routes" viewBox="0 0 446 390" aria-hidden="true" focusable="false">
        <defs>
          <pattern id="engine-dots" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.7" />
          </pattern>
        </defs>
        <rect width="446" height="390" fill="url(#engine-dots)" />
        {routes.map((route) => (
          <path key={route.id} d={route.d} className={activeRoutes.has(route.id) ? 'is-active' : ''} />
        ))}
      </svg>
      <div className="engine__core" aria-hidden="true">
        <span>BND</span>
        <strong>ENGINE</strong>
        <small>PRO SYSTEM</small>
      </div>
      {(Object.entries(modulePositions) as [EngineModule, (typeof modulePositions)[EngineModule]][]).map(
        ([module, position]) => (
          <div
            className={`engine-module engine-module--${module.toLowerCase()} ${activeModules.has(module) ? 'is-active' : ''}`}
            key={module}
            style={{ left: position.x, top: position.y }}
          >
            <span>{module}</span>
            <small>{position.detail}</small>
          </div>
        )
      )}
      <span className="engine__status">ROUTES {String(scenario.routes.length).padStart(2, '0')} / ACTIVE</span>
    </div>
  );
}
