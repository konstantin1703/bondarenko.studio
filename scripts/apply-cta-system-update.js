const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();
const files = [
  'index.html',
  'audit/index.html',
  'brief/index.html',
  'blog/index.html',
  'contacts/index.html',
  'portfolio/index.html',
  'process/index.html',
  'about/index.html',
  'services/index.html',
  'services/landing-page.html',
  'services/site-audit.html',
  'blog/copywriting-mistakes.html',
  'blog/how-to-write-landing-copy.html',
  'blog/content-strategy-tips.html',
  'portfolio/case-1-studio.html',
  'portfolio/case-2-landing-text.html'
];

function updateFile(file, updater) {
  const filePath = path.join(root, file);
  if (!fs.existsSync(filePath)) return;

  const before = fs.readFileSync(filePath, 'utf8');
  const after = updater(before, file);

  if (after !== before) {
    fs.writeFileSync(filePath, after, 'utf8');
    console.log(`Updated ${file}`);
  }
}

function genericCtaCleanup(html, file) {
  let out = html;

  out = out.replaceAll(
    '<a href="/brief/" class="btn-header"><span>Бриф</span></a>',
    '<a href="#" class="btn-header open-modal"><span>Обсудить проект</span></a>'
  );
  out = out.replaceAll(
    '<a href="/brief/" class="btn-header"><span>Заполнить бриф</span></a>',
    '<a href="#" class="btn-header open-modal"><span>Обсудить проект</span></a>'
  );
  out = out.replaceAll(
    '<a href="/#contacts" class="btn-header"><span>Обсудить проект</span></a>',
    '<a href="#" class="btn-header open-modal"><span>Обсудить проект</span></a>'
  );

  out = out.replaceAll('<script src="/assets/js/main.js"></script>', '<script src="/assets/js/main.js?v=20260510-2"></script>');
  out = out.replaceAll('<script src="assets/js/main.js"></script>', '<script src="assets/js/main.js?v=20260510-2"></script>');

  if (file !== 'index.html') {
    out = out.replace(
      /<a href="https:\/\/t\.me\/whity14" target="_blank" rel="noopener noreferrer" class="btn-primary">(?:Telegram|Написать в Telegram|Открыть Telegram)<\/a>/g,
      '<a href="#" class="btn-primary open-modal">Обсудить проект</a>'
    );
    out = out.replace(
      /<a href="https:\/\/t\.me\/whity14" target="_blank" rel="noopener noreferrer" class="btn-secondary">(?:Telegram|Написать в Telegram|Открыть Telegram)<\/a>/g,
      '<a href="/brief/" class="btn-secondary">Открыть бриф</a>'
    );
    out = out.replaceAll('Напишите в Telegram в свободной форме', 'оставьте заявку через сайт');
    out = out.replaceAll('или напишите в Telegram', 'или оставьте заявку через сайт');
  }

  out = out.replaceAll('>Заявка с сайта</a>', '>Обсудить проект</a>');
  out = out.replaceAll('>Получить аудит</a>', '>Обсудить проект</a>');
  out = out.replaceAll('>Открыть бриф</a><a href="/services/" class="btn-secondary">Смотреть услуги</a>', '>Обсудить проект</a><a href="/services/" class="btn-secondary">Смотреть услуги</a>');

  return out;
}

function updateHomepage(html) {
  let out = html;

  out = out.replace(
    '<a href="https://t.me/whity14" target="_blank" rel="noopener noreferrer" class="btn-primary">\n        Обсудить проект',
    '<a href="#" class="btn-primary open-modal" aria-haspopup="dialog">\n        Обсудить проект'
  );

  out = out.replace(
    '<p>Напишите, что нужно сделать: сайт, лендинг, текст, упаковка или аудит. Предложу понятный следующий шаг без лишней бюрократии.</p>',
    '<p>Расскажите, что нужно сделать: сайт, лендинг, текст, упаковка или аудит. Я предложу понятный следующий шаг без лишней бюрократии.</p>'
  );

  const oldBlock = `<div class="cta-actions">
        <a href="https://t.me/whity14" target="_blank" rel="noopener noreferrer" class="btn-primary">
          Telegram
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
        <a href="mailto:byxapckuu@gmail.com" class="btn-secondary">byxapckuu@gmail.com</a>
      </div>`;

  const newBlock = `<div class="cta-actions">
        <a href="#" class="btn-primary open-modal" aria-haspopup="dialog">
          Обсудить проект
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
        <a href="/services/" class="btn-secondary">Смотреть услуги</a>
      </div>`;

  out = out.replace(oldBlock, newBlock);

  return out;
}

function updateContacts(html) {
  let out = html;

  out = out.replace(
    '<a href="https://t.me/whity14" target="_blank" rel="noopener noreferrer" class="page-card">\n            <div class="page-card-meta"><span class="page-card-tag">Telegram</span></div>\n            <div class="page-card-title">Написать напрямую</div>\n            <p class="page-card-desc">Быстрый вариант для первичного обсуждения задачи, ссылок, материалов и вопросов.</p>\n            <span class="page-card-link">Открыть →</span>\n          </a>',
    '<a href="/services/" class="page-card">\n            <div class="page-card-meta"><span class="page-card-tag">Услуги</span></div>\n            <div class="page-card-title">Посмотреть форматы работы</div>\n            <p class="page-card-desc">Подходит, если сначала нужно понять, что лучше: аудит, лендинг, сайт, текст или упаковка.</p>\n            <span class="page-card-link">Смотреть →</span>\n          </a>'
  );

  out = out.replace(
    '<p>Выберите удобный вариант: оставить заявку через сайт, написать напрямую, открыть бриф или сначала заказать разбор текущего сайта.</p>',
    '<p>Выберите удобный вариант: обсудить проект через форму, открыть бриф или сначала заказать разбор текущего сайта.</p>'
  );

  out = out.replace(
    '<a href="#contactForm" class="btn-primary open-modal" aria-haspopup="dialog">Обсудить проект</a>\n            <a href="https://t.me/whity14" target="_blank" rel="noopener noreferrer" class="btn-secondary">Telegram</a>\n            <a href="/brief/" class="btn-secondary">Бриф</a>',
    '<a href="#" class="btn-primary open-modal" aria-haspopup="dialog">Обсудить проект</a>\n            <a href="/brief/" class="btn-secondary">Открыть бриф</a>\n            <a href="/audit/" class="btn-secondary">Заказать аудит</a>'
  );

  return out;
}

function updateServiceDetail(html, file) {
  let out = html;

  if (file === 'services/landing-page.html') {
    out = out.replace(
      '<section class="cta-section">\n      <div class="wrap"><div class="cta-box"><h2>Нужен лендинг?</h2><p>Опишите задачу в брифе или напишите в Telegram. Подскажу, какой формат подойдёт: быстрый, оптимальный или расширенный.</p><div class="cta-actions"><a href="/brief/" class="btn-primary">Обсудить проект</a><a href="/brief/" class="btn-secondary">Открыть бриф</a></div></div></div>\n    </section>',
      '<section class="cta-section">\n      <div class="wrap"><div class="cta-box"><h2>Нужен лендинг?</h2><p>Опишите задачу в двух-трёх предложениях — предложу формат: быстрый, оптимальный или расширенный.</p><div class="cta-actions"><a href="#" class="btn-primary open-modal">Обсудить проект</a><a href="/services/" class="btn-secondary">Смотреть услуги</a></div></div></div>\n    </section>'
    );
  }

  if (file === 'services/site-audit.html') {
    out = out.replace(
      '<section class="cta-section">\n      <div class="wrap"><div class="cta-box"><h2>Нужен аудит?</h2><p>Пришлите ссылку на сайт или опишите задачу. Покажу, что стоит исправить первым.</p><div class="cta-actions"><a href="#" class="btn-primary open-modal">Обсудить проект</a><a href="/audit/" class="btn-secondary">Страница аудита</a></div></div></div>\n    </section>',
      '<section class="cta-section">\n      <div class="wrap"><div class="cta-box"><h2>Нужен аудит?</h2><p>Пришлите ссылку на сайт или опишите задачу — покажу, что стоит исправить первым.</p><div class="cta-actions"><a href="#" class="btn-primary open-modal">Обсудить проект</a><a href="/audit/" class="btn-secondary">Что входит в аудит</a></div></div></div>\n    </section>'
    );
  }

  return out;
}

function updateProcess(html) {
  return html.replace(
    '<p>Заполните короткий бриф или оставьте заявку через сайт. Я помогу уточнить задачу и предложу формат работы.</p>\n          <div class="cta-actions">\n            <a href="/brief/" class="btn-primary">Открыть бриф</a>\n            <a href="/brief/" class="btn-secondary">Открыть бриф</a>\n          </div>',
    '<p>Опишите задачу в двух-трёх предложениях — помогу уточнить вводные и предложу формат работы.</p>\n          <div class="cta-actions">\n            <a href="#" class="btn-primary open-modal">Обсудить проект</a>\n            <a href="/brief/" class="btn-secondary">Открыть бриф</a>\n          </div>'
  );
}

function updateAbout(html) {
  return html.replace(
    '<a href="/brief/" class="btn-primary">Открыть бриф</a>\n            <a href="/services/" class="btn-secondary">Смотреть услуги</a>',
    '<a href="#" class="btn-primary open-modal">Обсудить проект</a>\n            <a href="/services/" class="btn-secondary">Смотреть услуги</a>'
  );
}

for (const file of files) {
  updateFile(file, (html) => {
    let out = genericCtaCleanup(html, file);
    if (file === 'index.html') out = updateHomepage(out);
    if (file === 'contacts/index.html') out = updateContacts(out);
    if (file === 'services/landing-page.html' || file === 'services/site-audit.html') out = updateServiceDetail(out, file);
    if (file === 'process/index.html') out = updateProcess(out);
    if (file === 'about/index.html') out = updateAbout(out);
    return out;
  });
}

console.log('CTA system update applied.');
