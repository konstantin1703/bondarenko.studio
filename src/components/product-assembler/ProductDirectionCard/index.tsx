import { HudPanel } from '@/components/hud/HudPanel';
import styles from './ProductDirectionCard.module.scss';
export function ProductDirectionCard({title,description,active=false}:{title:string;description:string;active?:boolean}){return <HudPanel variant="interactive" state={active?'selected':'default'} className={styles.card}><button type="button" aria-pressed={active}><span aria-hidden="true">▧</span><strong>{title}</strong><small>{description}</small></button></HudPanel>}
