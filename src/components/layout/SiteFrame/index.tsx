import type { ReactNode } from 'react';
import { Header } from '@/components/layout/Header';
import styles from './SiteFrame.module.scss';

export function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <div className={styles.shell} data-fixture-state="foundation">
      <a className="skip-link" href="#main-content">Перейти к основному содержанию</a>
      <Header />
      <main id="main-content" className={styles.main}>{children}</main>
    </div>
  );
}
