import { Navigation } from '@/components/layout/Navigation';
import styles from './Header.module.scss';

export function Header() {
  return (
    <header className={styles.header}>
      <a className={styles.brand} href="#home" aria-label="BND.STUDIO — на главную">
        <span>BND.</span><span>STUDIO</span><i aria-hidden="true" />
      </a>
      <Navigation />
      <a className={styles.cta} href="#contacts">НАПИСАТЬ <span aria-hidden="true">↗</span></a>
    </header>
  );
}
