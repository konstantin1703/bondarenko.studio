import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer id="footer" className="v12-footer v13-footer">
      <div className="v12-shell v13-footer__inner">
        <div className="v13-footer__top" data-reveal>
          <div>
            <span>END / START</span>
            <p>Есть задача — соберите её в рабочую систему.</p>
          </div>
          <a href="#brief">
            <span>Обсудить проект</span>
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>

        <div className="v13-footer__wordmark" aria-label="BND" data-reveal>
          <span>B</span>
          <span>N</span>
          <span>D</span>
        </div>

        <div className="v13-footer__bottom">
          <div className="v12-footer__brand">
            <strong>BND</strong>
            <span>DIGITAL SYSTEMS</span>
          </div>
          <p>Системы / медиа / автоматизация</p>
          <div className="v12-footer__meta">
            <a href="#hero">Наверх</a>
            <span>© 2026 BND Studio</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
