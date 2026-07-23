import { HudPanel } from '@/components/hud/HudPanel';
import { heroModules } from '@/data/hero';
import styles from './HeroHudLayer.module.scss';

const routePaths = [
  'M164 83H224l28 26h92',
  'M175 246h62l26 22h69',
  'M198 409h56l26-22h58',
  'M728 91h-72l-27 26h-73',
  'M742 260h-80l-24 22h-73',
  'M720 427h-61l-31-24h-70',
];
const routeNodes = [[164,83],[175,246],[198,409],[728,91],[742,260],[720,427]] as const;

export function HeroHudLayer() {
  return (
    <div className={styles.layer} data-hero-hud="true" aria-hidden="true">
      <svg className={styles.routes} viewBox="0 0 820 520" preserveAspectRatio="none" focusable="false">
        {routePaths.map((path, index) => <path key={path} d={path} className={index === 0 || index === 5 ? styles.activeRoute : undefined} />)}
        {routeNodes.map(([cx,cy], index) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={index === 0 || index === 5 ? 3.2 : 2.2} />)}
      </svg>
      {heroModules.map((module, index) => (
        <HudPanel key={module.id} className={`${styles.card} ${styles[module.side]} ${styles[module.position]}`} state={index === 0 || index === 5 ? 'active' : 'default'}>
          <strong>{module.title}</strong>
          <b>{module.subtitle}</b>
          <span>{module.detail}</span>
        </HudPanel>
      ))}
    </div>
  );
}
