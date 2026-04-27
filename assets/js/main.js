// Theme toggle
  (function(){
    const toggle = document.querySelector('[data-theme-toggle]');
    const html = document.documentElement;
    let theme = html.getAttribute('data-theme') || 'dark';

    function setTheme(t) {
      theme = t;
      html.setAttribute('data-theme', t);
      if (toggle) {
        toggle.innerHTML = t === 'dark'
          ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
          : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
        toggle.setAttribute('aria-label', t === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему');
      }
    }

    if (toggle) {
      toggle.addEventListener('click', () => setTheme(theme === 'dark' ? 'light' : 'dark'));
    }
    setTheme(theme);
  })();

  // FAQ accordion
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');
      // close all
      document.querySelectorAll('.faq-item.open').forEach(el => {
        el.classList.remove('open');
        el.querySelector('.faq-answer').style.maxHeight = '0';
      });
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // Modal + Form
  (function(){
    const ENDPOINT = "https://leads-inbox.byxapckuu.workers.dev/api/lead";
    const overlay = document.getElementById('modalOverlay');
    const closeBtn = document.getElementById('modalClose');
    const form = document.getElementById('contactForm');
    const msg = document.getElementById('formMessage');
    let trigger = null;

    function openModal(t) {
      trigger = t || null;
      overlay.classList.add('visible');
      document.body.classList.add('modal-open');
      msg.className = 'form-message'; msg.textContent = '';
      document.getElementById('clientTs').value = Date.now();
      setTimeout(() => document.getElementById('mName').focus(), 50);
    }
    function closeModal() {
      overlay.classList.remove('visible');
      document.body.classList.remove('modal-open');
      if (trigger) trigger.focus();
      trigger = null;
    }

    document.addEventListener('click', e => {
      const t = e.target.closest('.open-modal');
      if (t) { e.preventDefault(); openModal(t); }
    });
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('visible')) closeModal(); });

    form.addEventListener('submit', async e => {
      e.preventDefault();
      msg.className = 'form-message'; msg.textContent = '';
      const name = document.getElementById('mName').value.trim();
      const email = document.getElementById('mEmail').value.trim();
      const phone = document.getElementById('mPhone').value.trim();
      const message = document.getElementById('mMsg').value.trim();
      const company = document.getElementById('company').value.trim();
      const client_ts = Number(document.getElementById('clientTs').value);
      if (name.length < 2) { msg.className='form-message error'; msg.textContent='Укажите имя (минимум 2 символа)'; document.getElementById('mName').focus(); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { msg.className='form-message error'; msg.textContent='Укажите корректный email'; document.getElementById('mEmail').focus(); return; }
      if (message.length < 10) { msg.className='form-message error'; msg.textContent='Опишите задачу подробнее (минимум 10 символов)'; document.getElementById('mMsg').focus(); return; }
      if (company) return;
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true; btn.textContent = 'Отправляем…';
      try {
        const res = await fetch(ENDPOINT, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({name, email, phone, message, page: location.href, company, client_ts}) });
        let data = null; try { data = await res.json(); } catch(_) {}
        if (res.ok && data && data.ok) {
          msg.className='form-message success'; msg.textContent='Заявка отправлена! Свяжусь с вами в ближайшее время.';
          form.reset(); setTimeout(closeModal, 2200);
        } else {
          msg.className='form-message error'; msg.textContent=(data&&data.error)||'Ошибка отправки. Попробуйте ещё раз.';
        }
      } catch(_) {
        msg.className='form-message error'; msg.textContent='Ошибка соединения. Попробуйте ещё раз или напишите в Telegram.';
      } finally {
        btn.disabled = false; btn.textContent = 'Отправить заявку';
      }
    });
  })();
