import { SectionFrame } from '@/components/layout/SectionFrame';
import { workflowStages } from '@/data/foundation-fixtures';
import styles from './WorkflowFoundation.module.scss';
export function WorkflowFoundation(){return <SectionFrame id="workflow" number="06" eyebrow="ПРОЦЕСС РАЗРАБОТКИ" title="КАК МЫ РАБОТАЕМ"><ol className={styles.list}>{workflowStages.map((x,i)=><li key={x}><span>{String(i+1).padStart(2,'0')}</span><strong>{x}</strong><p>{['Понимаем задачу и ограничения.','Формируем логику и архитектуру.','Собираем интерфейс и систему.','Проверяем сценарии и качество.','Запускаем и сопровождаем.'][i]}</p></li>)}</ol></SectionFrame>}
