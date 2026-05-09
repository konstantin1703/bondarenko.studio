// Theme toggle
(function () {
  const toggle = document.querySelector('[data-theme-toggle]');
  const html = document.documentElement;
  const savedTheme = localStorage.getItem('theme');
  let theme = savedTheme || html.getAttribute('data-theme') || 'dark';

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
})();

// FAQ accordion
(function () {
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
})();

// Russian UI polish for RU pages
(function () {
  const lang = document.documentElement.getAttribute('lang') || 'ru';
  if (!lang.startsWith('ru')) return;

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
    if (serviceLabels.has(text)) {
      el.textContent = serviceLabels.get(text);
    }
  });
})();

// Modal + Form
(function () {
  const ENDPOINT = 'https://leads-inbox.byxapckuu.workers.dev/api/lead';
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

  if (!overlay || !closeBtn || !form || !msg || !clientTs || !nameInput || !emailInput || !phoneInput || !messageInput || !companyInput) {
    return;
  }

  let trigger = null;

  function normalizeError(text, status) {
    const raw = String(text || '').trim();
    const lower = raw.toLowerCase();

    if (status === 429 || lower.includes('too many requests')) {
      return 'Слишком много попыток. Подождите 20–30 секунд и отправьте заявку ещё раз.';
    }

    if (status === 403 || lower.includes('origin not allowed')) {
      return 'Запрос заблокирован защитой сайта. Обновите страницу и попробуйте ещё раз.';
    }

    if (status === 413 || lower.includes('payload too large')) {
      return 'Сообщение слишком длинное. Сократите текст и попробуйте ещё раз.';
    }

    if (lower.includes('content-type')) {
      return 'Не удалось отправить заявку. Обновите страницу и попробуйте ещё раз.';
    }

    if (lower.includes('invalid json')) {
      return 'Ошибка отправки данных. Обновите страницу и попробуйте ещё раз.';
    }

    if (lower.includes('name is too short')) {
      return 'Укажите имя минимум из 2 символов.';
    }

    if (lower.includes('invalid email')) {
      return 'Укажите корректный email.';
    }

    if (lower.includes('message is too short')) {
      return 'Опишите задачу подробнее — минимум 10 символов.';
    }

    if (lower.includes('request failed') || lower.includes('send failed') || lower.includes('telegram send failed')) {
      return 'Не удалось отправить заявку. Попробуйте позже или напишите напрямую в Telegram.';
    }

    return raw || 'Ошибка отправки. Попробуйте ещё раз.';
  }

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

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          page: location.href,
          company,
          client_ts,
        }),
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
})();
