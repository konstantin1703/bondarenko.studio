import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import BriefLab from "@/components/brief-lab/BriefLab";
import BriefHandoff from "./BriefHandoff";
import styles from "./brief-route.module.css";

export default function BriefRouteExperience() {
  return (
    <main id="brief-main" className={styles.root} tabIndex={-1}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand} aria-label="BND Studio — главная">
          <strong>BND</strong>
          <span>ЦИФРОВЫЕ СИСТЕМЫ</span>
        </Link>

        <nav className={styles.nav} aria-label="Разделы сайта">
          <Link href="/studio">Студия</Link>
          <Link href="/systems">Системы</Link>
          <span className={styles.active}>Бриф</span>
        </nav>

        <Link href="/" className={styles.action}>
          <ArrowLeft aria-hidden="true" /> На главную
        </Link>
      </header>

      <div className={styles.routeBar} aria-label="Статус проектной спецификации">
        <span>СПЕЦИФИКАЦИЯ ПРОЕКТА</span>
        <i aria-hidden="true" />
        <strong>04 РЕШЕНИЯ / 01 РЕЗУЛЬТАТ</strong>
      </div>

      <BriefLab />
      <BriefHandoff />

      <footer className={styles.footer}>
        <div>
          <span>BND / МАРШРУТ ПРОЕКТА</span>
          <i aria-hidden="true" />
          <span>ВХОД → СБОРКА → ПЕРЕДАЧА</span>
        </div>
        <nav aria-label="Следующие маршруты">
          <Link href="/studio">Студия</Link>
          <Link href="/systems">Системы</Link>
          <Link href="/">
            Главная <ArrowUpRight aria-hidden="true" />
          </Link>
        </nav>
      </footer>
    </main>
  );
}
