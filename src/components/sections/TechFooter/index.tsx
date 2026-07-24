import Link from 'next/link';
import { footerNavigation } from '@/data/stage9-remaining-sections';
import styles from './TechFooter.module.scss';

export function TechFooter() {
  return (
    <footer
      id="footer"
      className={styles.footer}
      data-visual-id="stage9-footer"
      data-fixture-state="preview-mode"
      data-fixture-version="stage-9"
    >
      <div className={styles.topLine} aria-hidden="true"><span /><i /><span /></div>
      <div className={styles.brandBlock}>
        <div className={styles.brand}>BND.<span>STUDIO</span><i /></div>
        <p>Инженерная студия AI-продуктов, автоматизаций и интеграционных решений.</p>
        <div className={styles.version}>
          <span>BUILD LABEL</span>
          <strong>STAGE 9 / STATIC FOUNDATION</strong>
        </div>
      </div>

      <nav className={styles.navigation} aria-label="Навигация в подвале">
        <span>SECTION MAP</span>
        <ul>
          {footerNavigation.map((item) => (
            <li key={item.href}><a href={item.href} style={{ minHeight: 44 }}>{item.label}</a></li>
          ))}
        </ul>
      </nav>

      <div className={styles.systemMap} aria-label="Состояние локального foundation">
        <span className={styles.mapLabel}>SYSTEM STATE</span>
        <div><i aria-hidden="true" /> LOCAL FOUNDATION</div>
        <div><i aria-hidden="true" /> BUILD VERIFIED</div>
        <div><i aria-hidden="true" /> PREVIEW MODE</div>
      </div>

      <div className={styles.bottomLine}>
        <small>© 2026 BND.STUDIO. Production copy and contact details require approval.</small>
        <div>
          <Link href="/privacy">Privacy draft</Link>
          <a href="#home">Наверх <span aria-hidden="true">↑</span></a>
        </div>
      </div>
    </footer>
  );
}
