// Bondarenko.studio shared UI logic
(function () {
  const lang = document.documentElement.getAttribute('lang') || 'ru';
  const isRu = lang.startsWith('ru');
  const endpoint = 'https://leads-inbox.byxapckuu.workers.dev/api/lead';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  function isInside(el, selector) {
    return Boolean(el.closest(selector));
  }

  function setCtaText(link, text) {
    const svg = link.querySelector('svg');
    link.textContent = text;
    if (svg) {
      link.append(' ');
      link.append(svg);
    }
  }

  function renderRuHeader() {
    if (!isRu) return;

    const headerInner = $('header .header-inner');
    if (!headerInner) return;

    headerInner.innerHTML = `
      <button type="button" class="mobile-menu-toggle" aria-label="Открыть меню" aria-expanded="false" aria-controls="mobileNav">
        <span></span><span></span><span></span>
      </button>
      <a href="/" class="logo">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <rect width="28" height="28" rx="7" fill="currentColor" fill-opacity="0.08"/>
          <text x="14" y="19.5" text-anchor="middle" font-family="Georgia,serif" font-size="14" font-weight="600" fill="currentColor">B</text>
        </svg>
        Bondarenko<span class="logo-dot">.</span>studio
      </a>
      <nav>
        <a href="/services/" class="nav-link">Услуги</a>
        <a href="/portfolio/" class="nav-link">Портфолио</a>
        <a href="/audit/" class="nav-link">Аудит</a>
        <a href="/blog/" class="nav-link">Блог</a>
        <a href="/process/" class="nav-link">Процесс</a>
        <a href="/contacts/" class="nav-link">Контакты</a>
      </nav>
      <div class="header-controls">
        <a href="/en/" class="nav-link" hreflang="en" aria-label="English version">EN</a>
        <button class="theme-toggle" data-theme-toggle aria-label="Переключить тему"></button>
        <a href="#" class="btn-header open-modal" aria-haspopup="dialog"><span>Обсудить проект</span></a>
      </div>
    `;
  }

  function injectMobileMenuStyles() {
    if (!isRu || $('#mobileMenuStyles')) return;

    const style = document.createElement('style');
    style.id = 'mobileMenuStyles';
    style.textContent = `
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
        header .header-inner {
          gap: 0.5rem;
          justify-content: flex-start;
        }
        header .logo {
          flex: 1 1 auto;
          min-width: 0;
          font-size: clamp(1.08rem, 4.7vw, 1.35rem);
          white-space: nowrap;
        }
        header .header-controls {
          margin-left: auto;
          flex: 0 0 auto;
          gap: 0.35rem;
        }
        header .btn-header { display: none; }
        .mobile-menu-toggle {
          display: inline-flex;
          flex: 0 0 36px;
          order: -1;
        }
        .footer-nav { display: flex; }
      }
      @media (max-width: 380px) {
        header .logo { font-size: 1rem; }
        header .logo svg { width: 26px; height: 26px; }
        header .header-controls .nav-link { padding-inline: 0.45rem; }
      }
    `;

    document.head.appendChild(style);
  }

  function initMobileMenu() {
    if (!isRu) return;

    const header = $('header');
    const toggle = $('.mobile-menu-toggle');
    if (!header || !toggle || $('#mobileNav')) return;

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

    mobileNav.addEventListener('click', (event) => {
      if (event.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setOpen(false);
    });

    document.addEventListener('click', (event) => {
      if (!mobileNav.classList.contains('open')) return;
      if (header.contains(event.target)) return;
      setOpen(false);
    });
  }

  function initTheme() {
    const toggle = $('[data-theme-toggle]');
    const html = document.documentElement;
    let theme = localStorage.getItem('theme') || html.getAttribute('data-theme') || 'dark';

    function setTheme(nextTheme) {
      theme = nextTheme;
      html.setAttribute('data-theme', nextTheme);
      localStorage.setItem('theme', nextTheme);

      if (!toggle) return;

      toggle.innerHTML = nextTheme === 'dark'
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
      toggle.setAttribute('aria-label', nextTheme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему');
    }

    if (toggle) toggle.addEventListener('click', () => setTheme(theme === 'dark' ? 'light' : 'dark'));
    setTheme(theme);
  }

  function polishRuLabels() {
    if (!isRu) return;

    const labels = new Map([
      ['Audit', 'Аудит'],
      ['Landing', 'Лендинг'],
      ['Website', 'Сайт'],
      ['Copy', 'Тексты'],
      ['Packaging', 'Упаковка'],
      ['Support', 'Поддержка'],
    ]);

    $$('.service-price').forEach((el) => {
      const text = el.textContent.trim();
      if (labels.has(text)) el.textContent = labels.get(text);
    });
  }

  function injectModal() {
    if ($('#modalOverlay')) return;

    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.id = 'modalOverlay';
    modalOverlay.innerHTML = `
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <button class="modal-close" id="modalClose" aria-label="Закрыть">&times;</button>
        <h2 id="modalTitle">Обсудим ваш проект</h2>
        <p class="modal-sub">Опишите задачу — отвечу в ближайшее время.</p>
        <div id="formMessage" class="form-message" aria-live="polite"></div>
        <form id="contactForm" class="modal-form" novalidate>
          <div class="hp-field" aria-hidden="true"><input type="text" name="company" id="company" tabindex="-1" autocomplete="off"></div>
          <input type="hidden" id="clientTs" name="client_ts" value="">
          <div class="modal-field"><label for="mName">Имя<span class="req">*</span></label><input class="modal-input" type="text" id="mName" name="name" required placeholder="Например: Иван"></div>
          <div class="modal-field"><label for="mEmail">Email<span class="req">*</span></label><input class="modal-input" type="email" id="mEmail" name="email" required placeholder="mail@example.com"></div>
          <div class="modal-field"><label for="mPhone">Телефон</label><input class="modal-input" type="tel" id="mPhone" name="phone" placeholder="+7 (999) 123-45-67"></div>
          <div class="modal-field"><label for="mMsg">Задача<span class="req">*</span></label><textarea class="modal-textarea" id="mMsg" name="message" required placeholder="Коротко опишите что нужно сделать"></textarea></div>
          <button type="submit" class="modal-submit">Отправить заявку</button>
        </form>
        <div class="modal-divider"></div>
        <div class="modal-tg">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
          Или напрямую: <a href="https://t.me/whity14" target="_blank" rel="noopener noreferrer">@whity14</a>
        </div>
      </div>
    `;

    document.body.appendChild(modalOverlay);
  }

  function injectRuFooter() {
    if (!isRu || $('footer')) return;

    const footer = document.createElement('footer');
    footer.innerHTML = `
      <div class="wrap footer-inner">
        <div class="footer-contacts">
          <a href="https://t.me/whity14" target="_blank" rel="noopener noreferrer" class="footer-pill"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.88 13.47l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.83.94l-.002.003z"/></svg>@whity14</a>
          <a href="#" class="footer-pill" data-contact="email" data-user="byxapckuu" data-domain-a="gmail" data-domain-b="com" aria-label="Email"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg><span class="contact-value">Email</span></a>
          <a href="#" class="footer-phone" data-contact="phone" data-country="+7" data-code="991" data-part1="281" data-part2="07" data-part3="96" aria-label="Телефон"><span class="contact-value">Телефон</span></a>
        </div>
        <div class="footer-right">
          <nav class="footer-nav" aria-label="Нижняя навигация"><a href="/services/">Услуги</a><a href="/portfolio/">Портфолио</a><a href="/audit/">Аудит</a><a href="/blog/">Блог</a><a href="/contacts/">Контакты</a></nav>
          <span class="footer-copy">© 2026 Bondarenko.studio</span>
        </div>
      </div>
    `;

    document.body.insertBefore(footer, $('.modal-overlay') || null);
  }

  function hydrateObfuscatedContactsAfterRender() {
    hydrateObfuscatedContacts();
  }

  function normalizeCtas() {
    if (!isRu) return;

    $$('a[href^="https://t.me"], a[href^="mailto:"], a[href^="tel:"]').forEach((link) => {
      if (isInside(link, 'footer') || isInside(link, '.modal') || isInside(link, '.modal-overlay')) return;

      const href = link.getAttribute('href') || '';
      const isPrimary = link.classList.contains('btn-primary') || link.classList.contains('btn-header');
      const isSecondary = link.classList.contains('btn-secondary');
      const isCard = link.classList.contains('page-card');

      link.removeAttribute('target');
      link.removeAttribute('rel');

      if (isCard) {
        link.setAttribute('href', '#');
        link.classList.add('open-modal');
        link.setAttribute('aria-haspopup', 'dialog');
        const tag = $('.page-card-tag', link);
        const title = $('.page-card-title', link);
        const desc = $('.page-card-desc', link);
        const cardLink = $('.page-card-link', link);
        if (tag) tag.textContent = 'Заявка';
        if (title) title.textContent = 'Обсудить проект';
        if (desc) desc.textContent = 'Откроется короткая форма заявки. Telegram останется внутри модального окна как быстрый альтернативный контакт.';
        if (cardLink) cardLink.textContent = 'Открыть форму →';
        return;
      }

      if (isPrimary || href.includes('t.me')) {
        link.setAttribute('href', '#');
        link.classList.add('open-modal');
        link.setAttribute('aria-haspopup', 'dialog');
        setCtaText(link, 'Обсудить проект');
        return;
      }

      if (isSecondary) {
        link.setAttribute('href', '/services/');
        setCtaText(link, 'Смотреть услуги');
      }
    });

    $$('.cta-section:not(footer .cta-section) .cta-box').forEach((box) => {
      const heading = $('h2', box);
      const actions = $('.cta-actions', box);
      if (!heading || !heading.textContent.includes('Есть проект')) return;
      const text = $('p', box);
      if (text) text.textContent = 'Расскажите, что нужно сделать: сайт, лендинг, текст, упаковка или аудит. Я предложу понятный следующий шаг без лишней бюрократии.';
      if (actions) {
        actions.innerHTML = '<a href="#" class="btn-primary open-modal" aria-haspopup="dialog">Обсудить проект</a><a href="/services/" class="btn-secondary">Смотреть услуги</a>';
      }
    });
  }

  function initFaq() {
    $$('.faq-question').forEach((btn) => {
      btn.setAttribute('aria-expanded', 'false');
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const answer = item && $('.faq-answer', item);
        if (!item || !answer) return;
        const isOpen = item.classList.contains('open');
        $$('.faq-item.open').forEach((el) => {
          el.classList.remove('open');
          const openAnswer = $('.faq-answer', el);
          const openButton = $('.faq-question', el);
          if (openAnswer) openAnswer.style.maxHeight = '0';
          if (openButton) openButton.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
          answer.style.maxHeight = `${answer.scrollHeight}px`;
        }
      });
    });
  }

  function normalizeError(text, status) {
    const raw = String(text || '').trim();
    const lower = raw.toLowerCase();
    if (status === 429 || lower.includes('too many requests')) return 'Слишком много попыток. Подождите 20–30 секунд и отправьте заявку ещё раз.';
    if (status === 403 || lower.includes('origin not allowed')) return 'Запрос заблокирован защитой сайта. Обновите страницу и попробуйте ещё раз.';
    if (status === 413 || lower.includes('payload too large')) return 'Сообщение слишком длинное. Сократите текст и попробуйте ещё раз.';
    if (lower.includes('name is too short')) return 'Укажите имя минимум из 2 символов.';
    if (lower.includes('invalid email')) return 'Укажите корректный email.';
    if (lower.includes('message is too short')) return 'Опишите задачу подробнее — минимум 10 символов.';
    return raw || 'Ошибка отправки. Попробуйте ещё раз.';
  }

  function initModalForm() {
    const overlay = $('#modalOverlay');
    const closeBtn = $('#modalClose');
    const form = $('#contactForm');
    const msg = $('#formMessage');
    const clientTs = $('#clientTs');
    const nameInput = $('#mName');
    const emailInput = $('#mEmail');
    const phoneInput = $('#mPhone');
    const messageInput = $('#mMsg');
    const companyInput = $('#company');
    if (!overlay || !closeBtn || !form || !msg || !clientTs || !nameInput || !emailInput || !phoneInput || !messageInput || !companyInput) return;

    let trigger = null;
    const showMessage = (type, text) => {
      msg.className = `form-message ${type}`;
      msg.textContent = text;
    };
    const clearMessage = () => {
      msg.className = 'form-message';
      msg.textContent = '';
    };
    const openModal = (t) => {
      trigger = t || null;
      overlay.classList.add('visible');
      document.body.classList.add('modal-open');
      clearMessage();
      clientTs.value = Date.now();
      setTimeout(() => nameInput.focus(), 50);
    };
    const closeModal = () => {
      overlay.classList.remove('visible');
      document.body.classList.remove('modal-open');
      if (trigger) trigger.focus();
      trigger = null;
    };

    document.addEventListener('click', (event) => {
      const target = event.target.closest('.open-modal');
      if (!target) return;
      event.preventDefault();
      openModal(target);
    });

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) closeModal();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && overlay.classList.contains('visible')) closeModal();
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      clearMessage();

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const phone = phoneInput.value.trim();
      const message = messageInput.value.trim();
      const company = companyInput.value.trim();
      const client_ts = Number(clientTs.value);

      if (name.length < 2) return showMessage('error', 'Укажите имя (минимум 2 символа)');
      if (!/^\S+@\S+\.\S+$/.test(email)) return showMessage('error', 'Укажите корректный email');
      if (message.length < 10) return showMessage('error', 'Опишите задачу подробнее (минимум 10 символов)');
      if (company) return;

      const btn = form.querySelector('button[type="submit"]');
      const initialText = btn ? btn.textContent : 'Отправить заявку';
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Отправляем…';
      }

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, phone, message, page: location.href, company, client_ts }),
        });
        let data = null;
        try { data = await res.json(); } catch (_) { data = null; }
        if (res.ok && data && (data.ok || data.success)) {
          showMessage('success', 'Заявка отправлена! Свяжусь с вами в ближайшее время.');
          form.reset();
          setTimeout(closeModal, 2200);
        } else {
          showMessage('error', normalizeError(data && data.error, res.status));
        }
      } catch (_) {
        showMessage('error', 'Ошибка соединения. Попробуйте ещё раз или напишите в Telegram.');
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.textContent = initialText;
        }
      }
    });
  }

  renderRuHeader();
  injectMobileMenuStyles();
  initMobileMenu();
  initTheme();
  polishRuLabels();
  injectModal();
  injectRuFooter();
  hydrateObfuscatedContactsAfterRender();
  normalizeCtas();
  initFaq();
  initModalForm();
})();
