import { SectionFrame } from '@/components/layout/SectionFrame';
import { workflowSteps } from '@/data/stage9-remaining-sections';
import styles from './WorkflowFoundation.module.scss';

export function WorkflowFoundation() {
  return (
    <SectionFrame
      id="workflow"
      number="06"
      eyebrow="ПРОЦЕСС РАЗРАБОТКИ"
      title="КАК МЫ РАБОТАЕМ"
      className={styles.section}
      headingClassName={styles.heading}
      visualId="stage9-workflow"
      fixtureState="static-timeline"
      fixtureVersion="stage-9"
    >
      <div className={styles.timelineWrap}>
        <div className={styles.route} aria-hidden="true"><span /><span /><span /><span /><span /></div>
        <ol className={styles.timeline}>
          {workflowSteps.map((step) => (
            <li key={step.number} data-primary={step.primary}>
              <div className={styles.stepTop}>
                <span className={styles.number}>{step.number}</span>
                <span className={styles.status}>{step.status}</span>
              </div>
              <span className={styles.node} aria-hidden="true"><i /></span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <div className={styles.artifact}>
                <span>Результат этапа</span>
                <strong>{step.artifact}</strong>
              </div>
            </li>
          ))}
        </ol>
        <div className={styles.systemNote}>
          <span>WORKFLOW MODE</span>
          <strong>Последовательность уточняется под задачу — фиксированные сроки не заявлены</strong>
        </div>
      </div>
    </SectionFrame>
  );
}
