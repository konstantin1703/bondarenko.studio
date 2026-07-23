import Link from 'next/link';
import styles from './TechFooter.module.scss';
export function TechFooter(){return <footer id="footer" className={styles.footer} data-fixture-state="foundation"><div className={styles.brand}>BND.<span>STUDIO</span><i/></div><p>LOCAL FOUNDATION / EXTERNAL SERVICES DISABLED</p><nav aria-label="Дополнительная навигация"><a href="#home">Наверх</a><a href="#contacts">Контакты</a><Link href="/privacy">Privacy draft</Link></nav><small>Stage 4 prototype. Не является финальным production-сайтом.</small></footer>}
