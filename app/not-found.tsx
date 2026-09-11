import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.root}>
      <div className={styles.frame} aria-hidden="true" />

      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="BND Studio — главная">
          <strong>BND</strong>
          <span>DIGITAL SYSTEMS</span>
        </Link>
        <span className={styles.meta}>404 / ROUTE NOT FOUND</span>
      </header>

      <section className={styles.body} aria-labelledby="not-found-title">
        <div className={styles.code}>SYSTEM / NO ROUTE</div>
        <h1 id="not-found-title">Такого маршрута нет.</h1>
        <p>
          Эта точка не входит в собранную систему. Вернитесь на главную или сразу
          перейдите к спецификации проекта.
        </p>
        <nav className={styles.actions} aria-label="Действия на странице 404">
          <Link className={styles.primary} href="/">
            <span>Вернуться в систему</span>
            <span aria-hidden="true">↗</span>
          </Link>
          <Link className={styles.secondary} href="/#brief">
            Собрать проект
          </Link>
        </nav>
      </section>

      <div className={styles.bottom} aria-hidden="true">
        <span>INPUT / UNKNOWN</span>
        <i />
        <span>RETURN / SYSTEM</span>
      </div>
    </main>
  );
}
