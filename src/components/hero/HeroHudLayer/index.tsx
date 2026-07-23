import { HudPanel } from '@/components/hud/HudPanel';
import { ConnectorLine } from '@/components/graphics/ConnectorLine';
import styles from './HeroHudLayer.module.scss';
const labels = [['АНАЛИЗ ДАННЫХ','STRUCTURE'],['ИНТЕГРАЦИЯ','SERVICES'],['АВТОМАТИЗАЦИЯ','PROCESS'],['РЕЗУЛЬТАТ','SYSTEM']];
export function HeroHudLayer() { return <div className={styles.layer} aria-hidden="true">{labels.map(([a,b],i)=><HudPanel key={a} className={styles.card} state={i===0?'active':'default'}><strong>{a}</strong><span>{b}</span></HudPanel>)}<ConnectorLine className={styles.routeA} active/><ConnectorLine className={styles.routeB}/></div>; }
