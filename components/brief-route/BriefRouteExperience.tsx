import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import BriefLab from "@/components/brief-lab/BriefLab";
import styles from "./brief-route.module.css";

export default function BriefRouteExperience() {
  return (
    <main id="brief-main" className={styles.root} tabIndex={-1}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand} aria-label="BND Studio — главная">
          <strong>BND</strong>
          <span>DIGITAL SYSTEMS</span>
        </Link>

        <nav className={styles.nav} aria-label="Разделы сайта">
          <Link href="/studio">Studio</Link>
          <Link href="/systems">Systems</Link>
          <span className={styles.active}>Brief</span>
        </nav>

        <Link href="/" className={styles.action}>
          <ArrowLeft aria-hidden="true" /> На главную
        </Link>
      </header>

      <div className={styles.routeBar} aria-label="Статус проектной спецификации">
        <span>PROJECT SPECIFICATION</span>
        <i aria-hidden="true" />
        <strong>05 DECISIONS / 01 OUTPUT</strong>
      </div>

      <BriefLab />

      <footer className={styles.footer}>
        <div>
          <span>BND / PROJECT ROUTE</span>
          <i aria-hidden="true" />
          <span>INPUT → ASSEMBLE → TRANSMIT</span>
        </div>
        <nav aria-label="Следующие маршруты">
          <Link href="/studio">Studio</Link>
          <Link href="/systems">Systems</Link>
          <Link href="/">
            Home <ArrowUpRight aria-hidden="true" />
          </Link>
        </nav>
      </footer>
    </main>
  );
}
