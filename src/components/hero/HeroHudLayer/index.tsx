import { HudPanel } from '@/components/hud/HudPanel';
import { heroModules } from '@/data/hero';
import styles from './HeroHudLayer.module.scss';

const routePaths = [
  'M176 82H235l31 28h91',
  'M176 251h70l25 19h80',
  'M198 432h62l30-25h65',
  'M716 83h-72l-30 28h-70',
  'M724 254h-75l-30 25h-72',
  'M712 432h-65l-31-25h-70',
];
const routeNodes = [[176,82],[176,251],[198,432],[716,83],[724,254],[712,432]] as const;
const primaryRouteIndexes = new Set([0,3,4]);

export function HeroHudLayer() {
  return (
    <div className={styles.layer} data-hero-hud="true" aria-hidden="true">
      <svg className={styles.routes} viewBox="0 0 820 520" preserveAspectRatio="none" focusable="false">
        {routePaths.map((path, index) => <path key={path} d={path} className={primaryRouteIndexes.has(index) ? styles.activeRoute : styles.secondaryRoute} />)}
        {routeNodes.map(([cx,cy], index) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={primaryRouteIndexes.has(index) ? 3.4 : 2.3} className={primaryRouteIndexes.has(index) ? styles.activeNode : undefined} />)}
      </svg>
      {heroModules.map((module) => (
        <HudPanel
          key={module.id}
          className={`${styles.card} ${styles[module.side]} ${styles[module.position]} ${styles[module.priority]}`}
          state={module.priority === 'primary' ? 'active' : 'default'}
        >
          <strong>{module.title}</strong>
          <b>{module.subtitle}</b>
          <span>{module.detail}</span>
        </HudPanel>
      ))}
    </div>
  );
}
