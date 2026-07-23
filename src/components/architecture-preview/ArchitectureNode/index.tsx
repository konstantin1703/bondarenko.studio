import { HudPanel } from '@/components/hud/HudPanel';
import styles from './ArchitectureNode.module.scss';
export function ArchitectureNode({title,subtitle,active=false,icon='◇'}:{title:string;subtitle:string;active?:boolean;icon?:string}){return <HudPanel className={styles.node} state={active?'active':'default'}><span>{icon}</span><strong>{title}</strong><small>{subtitle}</small></HudPanel>}
