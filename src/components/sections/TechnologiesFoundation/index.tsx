import { SectionFrame } from '@/components/layout/SectionFrame';
import { HudPanel } from '@/components/hud/HudPanel';
import { currentStack, principles } from '@/data/foundation-fixtures';
import styles from './TechnologiesFoundation.module.scss';
export function TechnologiesFoundation(){return <SectionFrame id="technologies" number="07" eyebrow="CURRENT WORKING FOUNDATION" title="ТЕХНОЛОГИИ И ПРИНЦИПЫ"><div className={styles.grid}><HudPanel className={styles.panel}><h3>Текущий foundation-стек</h3><ul>{currentStack.map(x=><li key={x}>{x}</li>)}</ul><p>Состав относится к локальному Stage 4 и не является обещанием стека для любого клиентского проекта.</p></HudPanel><HudPanel className={styles.panel}><h3>Инженерные принципы</h3><ul>{principles.map(x=><li key={x}>{x}</li>)}</ul><p>Конкретные решения выбираются после анализа процесса и ограничений.</p></HudPanel></div></SectionFrame>}
