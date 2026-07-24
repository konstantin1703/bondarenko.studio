import { HudPanel } from '@/components/hud/HudPanel';
import { SectionFrame } from '@/components/layout/SectionFrame';
import { solutionCategories } from '@/data/stage9-remaining-sections';
import styles from './ProjectsFoundation.module.scss';

export function ProjectsFoundation() {
  return (
    <SectionFrame
      id="projects"
      number="05"
      eyebrow="НАПРАВЛЕНИЯ И ФОРМАТЫ РЕШЕНИЙ"
      title="ПРОЕКТЫ И РЕШЕНИЯ"
      className={styles.section}
      headingClassName={styles.heading}
      visualId="stage9-projects"
      fixtureState="pending-materials"
      fixtureVersion="stage-9"
    >
      <div className={styles.layout}>
        <HudPanel className={styles.statusPanel} state="active">
          <div className={styles.statusHeader}>
            <span className={styles.statusCode}>PROJECT ARCHIVE / 05</span>
            <span className={styles.pending}><i aria-hidden="true" /> MATERIALS PENDING</span>
          </div>
          <div className={styles.statusBody}>
            <span className={styles.mark} aria-hidden="true">◇</span>
            <div>
              <h3>Подборка будет опубликована после согласования материалов</h3>
              <p>
                Здесь появятся реальные задачи, архитектура, технологии и результат. До подтверждения
                материалов раздел показывает только направления и типовые форматы решений.
              </p>
            </div>
          </div>
          <div className={styles.statusMap} aria-hidden="true">
            <span>INPUT</span><i /><span>ARCHITECTURE</span><i /><span>PRODUCT</span><i /><span>RESULT</span>
          </div>
          <div className={styles.statusFooter}>
            <div>
              <span>Состояние раздела</span>
              <strong>ЧЕСТНЫЙ STATIC FOUNDATION</strong>
            </div>
            <a href="#contacts">ОБСУДИТЬ ЗАДАЧУ <span aria-hidden="true">→</span></a>
          </div>
        </HudPanel>

        <div className={styles.categories} aria-label="Направления и типовые архитектуры">
          {solutionCategories.map((category, index) => (
            <article key={category.code} className={styles.category}>
              <div className={styles.categoryTop}>
                <span className={styles.categoryNumber}>{String(index + 1).padStart(2, '0')}</span>
                <span className={styles.categoryCode}>{category.code}</span>
              </div>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              <ul aria-label={`Возможные элементы для направления ${category.title}`}>
                {category.tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
