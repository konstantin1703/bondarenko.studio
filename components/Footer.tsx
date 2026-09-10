export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-shell">
        <div className="site-footer__meta">
          <span>BND / STUDIO</span>
          <span>WEB · MEDIA · AUTOMATION · AI</span>
          <a href="#hero">Наверх ↑</a>
        </div>
        <div className="site-footer__wordmark" aria-hidden="true">
          BND
        </div>
        <div className="site-footer__bottom">
          <span>Цифровые системы под реальные задачи.</span>
          <span>© {new Date().getFullYear()} BND Studio</span>
        </div>
      </div>
    </footer>
  );
}
