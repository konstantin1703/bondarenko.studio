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
          <linearGradient id="core-face" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#12333b" />
            <stop offset="0.52" stopColor="#07171e" />
            <stop offset="1" stopColor="#02090d" />
          </linearGradient>
          <filter id="route-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect width="446" height="390" fill="url(#engine-dots)" />
        <g className="engine__depth-rings">
          <ellipse cx="223" cy="213" rx="119" ry="52" />
          <ellipse cx="223" cy="213" rx="146" ry="68" />
          <ellipse cx="223" cy="213" rx="174" ry="86" />
          <path d="M69 213h38M339 213h38M223 112v28M223 286v30" />
        </g>
        <g className="engine__circuit-lines">
          <path d="M122 145h44l18 18M324 145h-44l-18 18M122 282h44l18-18M324 282h-44l-18-18" />
          <path d="M151 119h16v-13h25M295 119h-16v-13h-25M151 307h16v13h25M295 307h-16v13h-25" />
          <circle cx="122" cy="145" r="2" />
          <circle cx="324" cy="145" r="2" />
          <circle cx="122" cy="282" r="2" />
          <circle cx="324" cy="282" r="2" />
        </g>
        {routes.map((route) => (
          <path key={route.id} d={route.d} className={activeRoutes.has(route.id) ? 'is-active' : ''} />
        ))}
      </svg>
      <div className="engine__core" aria-hidden="true">
        <span className="engine__core-frame engine__core-frame--outer" />
        <span className="engine__core-frame engine__core-frame--middle" />
        <span className="engine__core-frame engine__core-frame--inner" />
        <span className="engine__core-scan" />
        <div className="engine__core-copy">
          <small>BND / SYSTEM</small>
          <span>BND</span>
          <strong>ENGINE</strong>
          <em>CORE ONLINE</em>
        </div>
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
      <div className="engine__telemetry" aria-hidden="true">
        <span>
          <b>SYS</b> READY
        </span>
        <span>
          <b>LINK</b> {String(scenario.routes.length).padStart(2, '0')}
        </span>
        <span>
          <b>CORE</b> ONLINE
        </span>
      </div>
      <span className="engine__status">ROUTES {String(scenario.routes.length).padStart(2, '0')} / ACTIVE</span>
    </div>
  );
}
