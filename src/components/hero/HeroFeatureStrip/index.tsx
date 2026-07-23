import { heroFeatures } from '@/data/hero';
import styles from './HeroFeatureStrip.module.scss';

function FeatureGlyph({ index }: { index: number }) {
  const paths = [
    'M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3Zm0 5-4 2.2v4.6L12 17l4-2.2v-4.6L12 8Z',
    'M4 19V9h3v10H4Zm6 0V4h3v15h-3Zm6 0v-7h3v7h-3Z',
    'M12 3a4 4 0 0 1 4 4v2h2a3 3 0 0 1 0 6h-2v2a4 4 0 0 1-8 0v-2H6a3 3 0 0 1 0-6h2V7a4 4 0 0 1 4-4Z',
    'M12 3a9 9 0 1 0 9 9h-9V3Zm2 0v7h7A9 9 0 0 0 14 3Z',
  ];
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={paths[index]} /></svg>;
}

export function HeroFeatureStrip() {
  return (
    <div className={styles.strip} aria-label="Ключевые возможности BND.STUDIO">
      {heroFeatures.map((feature, index) => (
        <div className={styles.item} key={feature.code}>
          <FeatureGlyph index={index} />
          <div><strong>{feature.code}</strong><span>{feature.title}</span><small>{feature.detail}</small></div>
        </div>
      ))}
    </div>
  );
}
