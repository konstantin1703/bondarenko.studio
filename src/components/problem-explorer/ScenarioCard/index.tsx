import { HudPanel } from '@/components/hud/HudPanel';
import styles from './ScenarioCard.module.scss';
export function ScenarioCard({number,title,description,selected=false}:{number:string;title:string;description:string;selected?:boolean}){return <HudPanel as="li" variant="interactive" state={selected?'selected':'default'} className={styles.card}><button type="button" aria-pressed={selected}><span>{number}</span><strong>{title}</strong><small>{description}</small><i aria-hidden="true">→</i></button></HudPanel>}
