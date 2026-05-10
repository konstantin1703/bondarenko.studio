// Bondarenko.studio shared UI logic
(function () {
  const lang = document.documentElement.getAttribute('lang') || 'ru';
  const isRu = lang.startsWith('ru');
  const ENDPOINT = 'https://leads-inbox.byxapckuu.workers.dev/api/lead';

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

  function hydrateObfuscatedContacts() {
    document.querySelectorAll('[data-contact="email"]').forEach((link) => {
      const user = link.dataset.user || '';
      const domainA = link.dataset.domainA || '';
      const domainB = link.dataset.domainB || '';
      if (!user || !domainA || !domainB) return;

      const email = `${user}@${domainA}.${domainB}`;
      const value = link.querySelector('.contact-value');

      link.setAttribute('href', `mailto:${email}`);
      link.setAttribute('aria-label', link.getAttribute('aria-label') || `Написать на ${email}`);
      if (value) value.textContent = email;
    });

    document.querySelectorAll('[data-contact="phone"]').forEach((link) => {
      const country = link.dataset.country || '';
      const code = link.dataset.code || '';
      const part1 = link.dataset.part1 || '';
      const part2 = link.dataset.part2 || '';
      const part3 = link.dataset.part3 || '';
      if (!country || !code || !part1 || !part2 || !part3) return;

      const tel = `${country}${code}${part1}${part2}${part3}`;
      const label = `${country} (${code}) ${part1}-${part2}-${part3}`;
      const value = link.querySelector('.contact-value');

      link.setAttribute('href', `tel:${tel}`);
      link.setAttribute('aria-label', link.getAttribute('aria-label') || `Позвонить ${label}`);
      if (value) value.textContent = label;
    });
  }

  function renderRuHeader() {
    if (!isRu) return;

    const headerInner = document.querySelector('header .header-inner');
    if (!headerInner) return;

    headerInner.innerHTML = `
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

  function initTheme() {
    const toggle = document.querySelector('[data-theme-toggle]');
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

    if (toggle) {
      toggle.addEventListener('click', () => setTheme(theme === 'dark' ? 'light' : 'dark'));
    }

    setTheme(theme);
  }

  function polishRuLabels() {
    if (!isRu) return;

    const serviceLabels = new Map([
      ['Audit', 'Аудит'],
      ['Landing', 'Лендинг'],
      ['Website', 'Сайт'],
      ['Copy', 'Тексты'],
      ['Packaging', 'Упаковка'],
      ['Support', 'Поддержка'],
    ]);

    document.querySelectorAll('.service-price').forEach((el) => {
      const text = el.textContent.trim();
      if (serviceLabels.has(text)) el.textContent = serviceLabels.get(text);
    });
  }

  function injectModal() {
    if (document.getElementById('modalOverlay')) return;

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
          <div class="modal-field">
            <label for="mName">Имя<span class="req">*</span></label>
            <input class="modal-input" type="text" id="mName" name="name" required placeholder="Например: Иван">
          </div>
          <div class="modal-field">
            <label for="mEmail">Email<span class="req">*</span></label>
            <input class="modal-input" type="email" id="mEmail" name="email" required placeholder="mail@example.com">
          </div>
          <div class="modal-field">
            <label for="mPhone">Телефон</label>
            <input class="modal-input" type="tel" id="mPhone" name="phone" placeholder="+7 (999) 123-45-67">
          </div>
          <div class="modal-field">
            <label for="mMsg">Задача<span class="req">*</span></label>
            <textarea class="modal-textarea" id="mMsg" name="message" required placeholder="Коротко опишите что нужно сделать"></textarea>
          </div>
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

  function normalizeCtas() {
    if (!isRu) return;

    const directContactLinks = document.querySelectorAll('a[href^="https://t.me"], a[href^="mailto:"], a[href^="tel:"]');

    directContactLinks.forEach((link) => {
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

        const tag = link.querySelector('.page-card-tag');
        const title = link.querySelector('.page-card-title');
        const desc = link.querySelector('.page-card-desc');
        const cardLink = link.querySelector('.page-card-link');

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

    document.querySelectorAll('.cta-section:not(footer .cta-section) .cta-box').forEach((box) => {
      const heading = box.querySelector('h2');
      const actions = box.querySelector('.cta-actions');

      if (heading && heading.textContent.includes('Есть проект')) {
        const text = box.querySelector('p');
        if (text) {
          text.textContent = 'Расскажите, что нужно сделать: сайт, лендинг, текст, упаковка или аудит. Я предложу понятный следующий шаг без лишней бюрократии.';
        }

        if (actions) {
          actions.innerHTML = `
            <a href="#" class="btn-primary open-modal" aria-haspopup="dialog">Обсудить проект</a>
            <a href="/services/" class="btn-secondary">Смотреть услуги</a>
          `;
        }
      }
    });
  }

  function initFaq() {
    const questions = document.querySelectorAll('.faq-question');
    if (!questions.length) return;

    questions.forEach((btn) => {
      btn.setAttribute('aria-expanded', 'false');

      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        if (!item) return;

        const answer = item.querySelector('.faq-answer');
        if (!answer) return;

        const isOpen = item.classList.contains('open');

        document.querySelectorAll('.faq-item.open').forEach((el) => {
          el.classList.remove('open');
          const openAnswer = el.querySelector('.faq-answer');
          const openButton = el.querySelector('.faq-question');
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
    if (lower.includes('content-type')) return 'Не удалось отправить заявку. Обновите страницу и попробуйте ещё раз.';
    if (lower.includes('invalid json')) return 'Ошибка отправки данных. Обновите страницу и попробуйте ещё раз.';
    if (lower.includes('name is too short')) return 'Укажите имя минимум из 2 символов.';
    if (lower.includes('invalid email')) return 'Укажите корректный email.';
    if (lower.includes('message is too short')) return 'Опишите задачу подробнее — минимум 10 символов.';
    if (lower.includes('request failed') || lower.includes('send failed') || lower.includes('telegram send failed')) return 'Не удалось отправить заявку. Попробуйте позже или напишите напрямую в Telegram.';

    return raw || 'Ошибка отправки. Попробуйте ещё раз.';
  }

  function initModalForm() {
    const overlay = document.getElementById('modalOverlay');
    const closeBtn = document.getElementById('modalClose');
    const form = document.getElementById('contactForm');
    const msg = document.getElementById('formMessage');
    const clientTs = document.getElementById('clientTs');
    const nameInput = document.getElementById('mName');
    const emailInput = document.getElementById('mEmail');
    const phoneInput = document.getElementById('mPhone');
    const messageInput = document.getElementById('mMsg');
    const companyInput = document.getElementById('company');

    if (!overlay || !closeBtn || !form || !msg || !clientTs || !nameInput || !emailInput || !phoneInput || !messageInput || !companyInput) return;

    let trigger = null;

    function showMessage(type, text) {
      msg.className = `form-message ${type}`;
      msg.textContent = text;
    }

    function clearMessage() {
      msg.className = 'form-message';
      msg.textContent = '';
    }

    function openModal(t) {
      trigger = t || null;
      overlay.classList.add('visible');
      document.body.classList.add('modal-open');
      clearMessage();
      clientTs.value = Date.now();
      setTimeout(() => nameInput.focus(), 50);
    }

    function closeModal() {
      overlay.classList.remove('visible');
      document.body.classList.remove('modal-open');
      if (trigger) trigger.focus();
      trigger = null;
    }

    document.addEventListener('click', (e) => {
      const target = e.target.closest('.open-modal');
      if (!target) return;

      e.preventDefault();
      openModal(target);
    });

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('visible')) closeModal();
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearMessage();

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const phone = phoneInput.value.trim();
      const message = messageInput.value.trim();
      const company = companyInput.value.trim();
      const client_ts = Number(clientTs.value);

      if (name.length < 2) {
        showMessage('error', 'Укажите имя (минимум 2 символа)');
        nameInput.focus();
        return;
      }

      if (!/^\S+@\S+\.\S+$/.test(email)) {
        showMessage('error', 'Укажите корректный email');
        emailInput.focus();
        return;
      }

      if (message.length < 10) {
        showMessage('error', 'Опишите задачу подробнее (минимум 10 символов)');
        messageInput.focus();
        return;
      }

      if (company) return;

      const btn = form.querySelector('button[type="submit"]');
      if (!btn) return;

      const initialText = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Отправляем…';

      try {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, phone, message, page: location.href, company, client_ts }),
        });

        let data = null;
        try {
          data = await res.json();
        } catch (_) {
          data = null;
        }

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
        btn.disabled = false;
        btn.textContent = initialText || 'Отправить заявку';
      }
    });
  }

  renderRuHeader();
  initTheme();
  polishRuLabels();
  injectModal();
  hydrateObfuscatedContacts();
  normalizeCtas();
  initFaq();
  initModalForm();
})();
