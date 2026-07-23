import { HeroBackground } from '@/components/hero/HeroBackground';
import { HeroBottomStrip } from '@/components/hero/HeroBottomStrip';
import { HeroCopy } from '@/components/hero/HeroCopy';
import { HeroCorePlaceholder } from '@/components/hero/HeroCorePlaceholder';
import { HeroFeatureStrip } from '@/components/hero/HeroFeatureStrip';
import { HeroHudLayer } from '@/components/hero/HeroHudLayer';
import styles from './HeroFoundation.module.scss';

export function HeroFoundation() {
  return (
    <section id="home" className={styles.hero} data-visual-id="hero" data-fixture-state="calibrated" data-fixture-version="stage-5-1">
      <HeroBackground />
      <div className={styles.index} aria-hidden="true"><b>01</b><span>02</span><span>03</span><span>04</span></div>
      <div className={styles.content}>
        <HeroCopy />
        <div className={styles.media} data-hero-media-contract="static-placeholder">
          <HeroCorePlaceholder />
          <HeroHudLayer />
        </div>
      </div>
      <HeroFeatureStrip />
      <HeroBottomStrip />
    </section>
  );
}
