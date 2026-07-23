import { navigationItems } from '@/data/navigation';
import styles from './Navigation.module.scss';

export function Navigation() {
  return (
    <nav aria-label="Основная навигация">
      <ul className={styles.list}>
        {navigationItems.map((item, index) => (
          <li key={item.href}>
            <a className={styles.link} href={item.href} aria-current={index === 0 ? 'page' : undefined}>{item.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
