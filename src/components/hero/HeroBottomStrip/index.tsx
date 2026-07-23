import { MicroLabel } from '@/components/hud/MicroLabel';
import { StatusConsole } from '@/components/hud/StatusConsole';
import { heroStatuses, heroTechnologies } from '@/data/hero';
import styles from './HeroBottomStrip.module.scss';

export function HeroBottomStrip() {
  return (
    <div className={styles.bottom}>
      <div className={styles.technologies}>
        <MicroLabel priority={2}>ТЕХНОЛОГИИ, КОТОРЫЕ ИСПОЛЬЗУЕМ</MicroLabel>
        <ul>
          {heroTechnologies.map((technology) => <li key={technology}><i aria-hidden="true" />{technology}</li>)}
        </ul>
      </div>
      <StatusConsole items={heroStatuses} />
    </div>
  );
}
