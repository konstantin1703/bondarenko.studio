import { HudPanel } from '@/components/hud/HudPanel';
import { SectionFrame } from '@/components/layout/SectionFrame';
import { engineeringPrinciples, technologyGroups } from '@/data/stage9-remaining-sections';
import styles from './TechnologiesFoundation.module.scss';

export function TechnologiesFoundation() {
  return (
    <SectionFrame
      id="technologies"
      number="07"
      eyebrow="ВОЗМОЖНЫЙ СТЕК / ПОДБИРАЕТСЯ ПОД ЗАДАЧУ"
      title="ТЕХНОЛОГИИ И ПРИНЦИПЫ"
      className={styles.section}
      headingClassName={styles.heading}
      visualId="stage9-technologies"
      fixtureState="grouped-stack"
      fixtureVersion="stage-9"
    >
      <div className={styles.layout}>
        <HudPanel className={styles.technologyMap}>
          <header>
            <div>
              <span>TECHNOLOGY MAP</span>
              <h3>Системные слои</h3>
            </div>
            <p>Набор не является универсальным: финальный стек определяется архитектурой конкретного процесса.</p>
          </header>
          <div className={styles.groups}>
            {technologyGroups.map((group, index) => (
              <section key={group.id} className={styles.group} aria-labelledby={`technology-${group.id}`}>
                <div className={styles.groupNumber}>{String(index + 1).padStart(2, '0')}</div>
                <div className={styles.groupBody}>
                  <span>{group.label}</span>
                  <h4 id={`technology-${group.id}`}>{group.title}</h4>
                  <p>{group.description}</p>
                  <ul>
                    {group.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                  </ul>
                </div>
              </section>
            ))}
          </div>
          <div className={styles.stackRoute} aria-hidden="true">
            <span>INTERFACE</span><i /><span>LOGIC</span><i /><span>DATA</span><i /><span>DELIVERY</span>
          </div>
        </HudPanel>

        <div className={styles.principles} aria-labelledby="principles-title">
          <header className={styles.principlesHeader}>
            <span>ENGINEERING RULESET</span>
            <h3 id="principles-title">Принципы</h3>
          </header>
          <ol>
            {engineeringPrinciples.map((principle, index) => (
              <li key={principle.code} data-primary={index === 0}>
                <span className={styles.principleCode}>{principle.code}</span>
                <div>
                  <h4>{principle.title}</h4>
                  <p>{principle.description}</p>
                </div>
                <i aria-hidden="true">{index === 0 ? '●' : '○'}</i>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </SectionFrame>
  );
}
