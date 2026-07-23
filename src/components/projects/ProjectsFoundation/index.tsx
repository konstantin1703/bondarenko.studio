import { SectionFrame } from '@/components/layout/SectionFrame';
import { HudPanel } from '@/components/hud/HudPanel';
import styles from './ProjectsFoundation.module.scss';
export function ProjectsFoundation(){return <SectionFrame id="projects" number="05" eyebrow="СИСТЕМНЫЕ КЕЙСЫ" title="ПРОЕКТЫ"><HudPanel className={styles.empty}><span aria-hidden="true">◇</span><div><h3>Материалы кейсов ожидают подтверждения</h3><p>Проекты будут добавлены после проверки задачи, архитектуры, технологий и результата. На Stage 4 фиктивные кейсы не создаются.</p></div></HudPanel></SectionFrame>}
