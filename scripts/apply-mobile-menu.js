const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();
const jsPath = path.join(root, 'assets/js/main.js');
const cssPath = path.join(root, 'assets/css/main.css');
const version = '20260510-4';

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    if (entry.isFile() && entry.name.endsWith('.html')) acc.push(full);
  }
  return acc;
}

function patchJs() {
  let js = fs.readFileSync(jsPath, 'utf8');

  if (!js.includes('function initMobileMenu()')) {
    const mobileMenu = `
  function initMobileMenu() {
    if (!isRu) return;

    const header = document.querySelector('header');
    const headerInner = document.querySelector('header .header-inner');
    const controls = document.querySelector('header .header-controls');

    if (!header || !headerInner || !controls || document.querySelector('.mobile-menu-toggle')) return;

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'mobile-menu-toggle';
    toggle.setAttribute('aria-label', 'Открыть меню');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'mobileNav');
    toggle.innerHTML = '<span></span><span></span><span></span>';

    controls.insertBefore(toggle, controls.firstChild);

    const mobileNav = document.createElement('nav');
    mobileNav.className = 'mobile-nav';
    mobileNav.id = 'mobileNav';
    mobileNav.setAttribute('aria-label', 'Мобильная навигация');
    mobileNav.innerHTML = `
      <a href="/services/" class="mobile-nav-link">Услуги</a>
      <a href="/portfolio/" class="mobile-nav-link">Портфолио</a>
      <a href="/audit/" class="mobile-nav-link">Аудит</a>
      <a href="/blog/" class="mobile-nav-link">Блог</a>
      <a href="/process/" class="mobile-nav-link">Процесс</a>
      <a href="/contacts/" class="mobile-nav-link">Контакты</a>
      <a href="#" class="mobile-nav-cta open-modal" aria-haspopup="dialog">Обсудить проект</a>
    `;

    header.appendChild(mobileNav);

    function setOpen(isOpen) {
      toggle.classList.toggle('open', isOpen);
      mobileNav.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
    }

    toggle.addEventListener('click', () => {
      setOpen(!mobileNav.classList.contains('open'));
    });

    mobileNav.addEventListener('click', (e) => {
      if (e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setOpen(false);
    });

    document.addEventListener('click', (e) => {
      if (!mobileNav.classList.contains('open')) return;
      if (header.contains(e.target)) return;
      setOpen(false);
    });
  }
`;

    js = js.replace('\n  function initTheme() {', `${mobileMenu}\n  function initTheme() {`);
  }

  js = js.replace('  renderRuHeader();\n  initTheme();', '  renderRuHeader();\n  initMobileMenu();\n  initTheme();');

  fs.writeFileSync(jsPath, js, 'utf8');
}

function patchCss() {
  let css = fs.readFileSync(cssPath, 'utf8');

  if (css.includes('.mobile-menu-toggle')) return;

  css += `

/* ───────── MOBILE MENU ───────── */
.mobile-menu-toggle {
  display: none;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 4px;
  color: var(--text-muted);
  transition: color var(--transition), background var(--transition);
}
.mobile-menu-toggle span {
  display: block;
  width: 16px;
  height: 2px;
  border-radius: 999px;
  background: currentColor;
  transition: transform var(--transition), opacity var(--transition);
}
.mobile-menu-toggle:hover,
.mobile-menu-toggle.open {
  color: var(--text);
  background: var(--accent-dim);
}
.mobile-menu-toggle.open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
.mobile-menu-toggle.open span:nth-child(2) { opacity: 0; }
.mobile-menu-toggle.open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }
.mobile-nav {
  display: none;
  border-top: 1px solid var(--border);
  background: rgba(10,10,15,0.96);
  backdrop-filter: blur(16px);
  padding: 0.75rem clamp(1.25rem,5vw,3rem) 1rem;
}
[data-theme="light"] .mobile-nav { background: rgba(244,246,250,0.98); }
.mobile-nav.open {
  display: grid;
  gap: 0.35rem;
}
.mobile-nav-link {
  display: flex;
  align-items: center;
  min-height: 44px;
  padding: 0.6rem 0.75rem;
  border-radius: 8px;
  font-size: 0.95rem;
  color: var(--text-muted);
  transition: color var(--transition), background var(--transition);
}
.mobile-nav-link:hover,
.mobile-nav-link:focus-visible {
  color: var(--text);
  background: var(--accent-dim);
}
.mobile-nav-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  margin-top: 0.35rem;
  padding: 0.7rem 1rem;
  border-radius: var(--radius);
  background: var(--accent);
  color: #fff;
  font-size: 0.95rem;
  font-weight: 600;
  transition: background var(--transition), transform var(--transition);
}
.mobile-nav-cta:hover,
.mobile-nav-cta:focus-visible {
  background: var(--accent-hover);
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .mobile-menu-toggle { display: inline-flex; }
  .footer-nav { display: flex; }
}
`;

  fs.writeFileSync(cssPath, css, 'utf8');
}

function bumpScriptRefs() {
  for (const file of walk(root)) {
    const before = fs.readFileSync(file, 'utf8');
    const after = before.replace(/(src=["'][^"']*assets\/js\/main\.js)(?:\?v=[^"']*)?/g, `$1?v=${version}`);
    if (after !== before) {
      fs.writeFileSync(file, after, 'utf8');
      console.log(`Updated ${path.relative(root, file)}`);
    }
  }
}

patchJs();
patchCss();
bumpScriptRefs();
console.log('Mobile menu patch applied.');
