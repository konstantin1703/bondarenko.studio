import { HudPanel } from '@/components/hud/HudPanel';
import styles from './SystemModuleShell.module.scss';
export function SystemModuleShell({label,active=false}:{label:string;active?:boolean}){return <HudPanel className={styles.module} state={active?'active':'default'}><span aria-hidden="true">◇</span><strong>{label}</strong><small>{active?'FIXTURE ACTIVE':'MODULE SHELL'}</small></HudPanel>}
