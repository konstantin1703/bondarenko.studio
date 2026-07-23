import type { ChangeScenario, EngineModule } from '../data/change-scenarios';
import { ScenarioIcon } from './ScenarioIcon';
import { TechCard, TechConnectorSvg } from './TechPrimitives';

type DiagramModule = {
  id: string;
  title: string;
  detail: string;
  icon: ChangeScenario['icon'];
  source: EngineModule[];
  position: 'top-left' | 'top-right' | 'middle-left' | 'middle-right' | 'bottom-left' | 'bottom-right';
};

const modules: readonly DiagramModule[] = [
  {
    id: 'ai',
    title: 'AI-АНАЛИЗ',
    detail: 'Понимаем данные и находим решения',
    icon: 'brain',
    source: ['AI'],
    position: 'top-left',
  },
  {
    id: 'integrations',
    title: 'ИНТЕГРАЦИИ',
    detail: 'API, сервисы и внешние системы',
    icon: 'link',
    source: ['API'],
    position: 'top-right',
  },
  {
    id: 'data',
    title: 'ДАННЫЕ',
    detail: 'Сбор, хранение и структура',
    icon: 'dashboard',
    source: ['DATA'],
    position: 'middle-left',
  },
  {
    id: 'interfaces',
    title: 'ИНТЕРФЕЙСЫ',
    detail: 'Панели, боты, кабинеты',
    icon: 'browser',
    source: ['INPUT', 'OUTPUT'],
    position: 'middle-right',
  },
  {
    id: 'automation',
    title: 'АВТОМАТИЗАЦИЯ',
    detail: 'Сценарии, триггеры и выполнение',
    icon: 'workflow',
    source: ['INPUT', 'API'],
    position: 'bottom-left',
  },
  {
    id: 'result',
    title: 'РЕЗУЛЬТАТ',
    detail: 'Готовый процесс и отчётность',
    icon: 'workflow',
    source: ['OUTPUT'],
    position: 'bottom-right',
  },
] as const;

const routes = [
  'M154 57h34l36 32h50',
  'M526 57h-34l-36 32h-50',
  'M154 151h74',
  'M526 151h-74',
  'M154 246h34l36-31h50',
  'M526 246h-34l-36-31h-50',
  'M219 89h28l20 20',
  'M461 89h-28l-20 20',
  'M219 215h28l20-20',
  'M461 215h-28l-20-20',
] as const;

export function EngineDiagram({ scenario }: { scenario: ChangeScenario }) {
  const activeModules = new Set(scenario.modules);

  return (
    <div className="engine" aria-label={`Схема BND Engine: ${scenario.title}`}>
      <TechConnectorSvg className="engine__routes" viewBox="0 0 680 304">
        <defs>
          <pattern id="engine-matrix" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.7" />
          </pattern>
          <filter id="engine-route-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="engine-top-face" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#123c45" />
            <stop offset="1" stopColor="#031116" />
          </linearGradient>
          <linearGradient id="engine-side-face" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#05242c" />
            <stop offset="1" stopColor="#01070a" />
          </linearGradient>
        </defs>
        <rect width="680" height="304" fill="url(#engine-matrix)" />
        <g className="engine__base-rings">
          <ellipse cx="340" cy="236" rx="146" ry="45" />
          <ellipse cx="340" cy="236" rx="119" ry="34" />
          <ellipse cx="340" cy="236" rx="87" ry="24" />
          <path d="M178 236h54m216 0h54M340 272v24M340 55V23" />
        </g>
        <g className="engine__route-lines">
          {routes.map((route) => (
            <path key={route} d={route} />
          ))}
        </g>
        <g className="engine__route-nodes">
          {[154, 526].flatMap((x) =>
            [57, 151, 246].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="2.5" />)
          )}
        </g>
      </TechConnectorSvg>

      <svg className="engine__cube" viewBox="0 0 260 260" aria-hidden="true" focusable="false">
        <g className="engine__cube-halo">
          <path d="m130 13 92 50v119l-92 55-92-55V63Z" />
          <path d="m130 27 78 43v103l-78 47-78-47V70Z" />
        </g>
        <path className="engine__cube-top" d="m130 39 72 39-72 41-72-41Z" />
        <path className="engine__cube-left" d="m58 78 72 41v91l-72-42Z" />
        <path className="engine__cube-right" d="m202 78-72 41v91l72-42Z" />
        <g className="engine__cube-circuits">
          <path d="m130 53 45 25-45 26-45-26Z" />
          <path d="m130 65 25 13-25 14-25-14Z" />
          <path d="M75 102v54l40 23m70-77v54l-40 23" />
          <path d="M77 119h25v24H77m106-24h-25v24h25" />
          <path d="M83 151h25m69 0h-25M91 111v8m78-8v8" />
          <circle cx="91" cy="151" r="2" />
          <circle cx="169" cy="151" r="2" />
        </g>
        <g className="engine__cube-copy">
          <text x="130" y="137">BND</text>
          <text x="130" y="158">ENGINE</text>
          <text className="engine__cube-subtitle" x="130" y="174">ЯДРО СИСТЕМЫ</text>
        </g>
      </svg>

      {modules.map((module) => {
        const active = module.source.some((source) => activeModules.has(source));
        return (
          <TechCard
            className={`engine-module engine-module--${module.position}`}
            active={active}
            key={module.id}
          >
            <span className="engine-module__icon">
              <ScenarioIcon name={module.icon} />
            </span>
            <span className="engine-module__copy">
              <strong>{module.title}</strong>
              <small>{module.detail}</small>
            </span>
          </TechCard>
        );
      })}
    </div>
  );
}
