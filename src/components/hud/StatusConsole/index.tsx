import { HudPanel } from '@/components/hud/HudPanel';
import styles from './StatusConsole.module.scss';
const defaultItems = ['SYSTEM INTERFACE READY','LOCAL FOUNDATION ACTIVE','EXTERNAL SERVICES DISABLED'];
export function StatusConsole({ items = defaultItems }: { items?: readonly string[] }) {
  return <HudPanel variant="console" className={styles.console}><ul>{items.map((item)=><li key={item}><span aria-hidden="true">›</span>{item}</li>)}</ul></HudPanel>;
}
