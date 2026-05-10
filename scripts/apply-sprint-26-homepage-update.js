const fs = require('node:fs');
const path = require('node:path');

const indexPath = path.join(process.cwd(), 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

const portfolioStart = '<!-- PORTFOLIO -->';
const blogStart = '<!-- BLOG -->';
const philosophyStart = '<!-- PHILOSOPHY -->';

const portfolioBlock = `<!-- PORTFOLIO -->
<section class="portfolio" id="portfolio">
  <div class="wrap">
    <div class="portfolio-header">
      <div>
        <div class="section-label">Портфолио</div>
        <h2 class="section-title">Актуальные кейсы</h2>
      </div>
      <a href="/portfolio/" class="link-more">Все работы →</a>
    </div>
    <div class="portfolio-grid">
      <a href="/portfolio/site-vizitka/" class="port-card">
        <div class="port-meta">
          <span class="port-type">Сайт</span>
          <span>Структура</span>
          <span>Адаптив</span>
        </div>
        <div class="port-title">Сайт-визитка, который не стыдно отправить клиенту</div>
        <div class="port-desc">Кейс о компактной странице под услугу: первый экран, оффер, услуги, доверие, FAQ, контакты и мобильная версия.</div>
      </a>
      <a href="/portfolio/redline-cs2/" class="port-card">
        <div class="port-meta">
          <span class="port-type">Медиа</span>
          <span>CS2</span>
          <span>Telegram</span>
        </div>
        <div class="port-title">REDLINE CS2: медиа-система вокруг хайлайтов</div>
        <div class="port-desc">YouTube, Telegram, Demo Bot, админ-группа, статусы, визуальная упаковка и процесс вокруг короткого контента.</div>
      </a>
      <a href="/portfolio/landing-psihologa/" class="port-card">
        <div class="port-meta">
          <span class="port-type">Текст</span>
          <span>Лендинг</span>
          <span>Деликатная ниша</span>
        </div>
        <div class="port-title">Лендинг онлайн-психолога без давления и манипуляций</div>
        <div class="port-desc">Структура и текст страницы для деликатной услуги: спокойный тон, доверие через ясность и аккуратные CTA.</div>
      </a>
      <a href="/portfolio/wb-ozon-card/" class="port-card">
        <div class="port-meta">
          <span class="port-type">Текст</span>
          <span>WB/Ozon</span>
          <span>SEO</span>
        </div>
        <div class="port-title">Карточка товара без маркетплейсного тумана</div>
        <div class="port-desc">Кейс о коммерческом тексте карточки: выгоды, структура, SEO-фразы без переспама и понятное описание.</div>
      </a>
    </div>
  </div>
</section>

`;

const blogBlock = `<!-- BLOG -->
<section class="blog" id="blog">
  <div class="wrap">
    <div class="blog-header">
      <div>
        <div class="section-label">Блог</div>
        <h2 class="section-title">Статьи</h2>
      </div>
      <a href="/blog/" class="link-more">Все статьи →</a>
    </div>
    <div class="blog-list">
      <a href="/blog/site-ili-landing/" class="blog-item">
        <div>
          <div class="blog-tag">Стратегия</div>
          <div class="blog-title">Нужен сайт или достаточно лендинга?</div>
          <div class="blog-desc">Когда хватит одной сильной страницы, а когда лучше делать полноценный сайт с услугами, кейсами, блогом и SEO-структурой.</div>
        </div>
        <div class="blog-date">Май 2026</div>
      </a>
      <a href="/blog/perviy-ekran-lendinga/" class="blog-item">
        <div>
          <div class="blog-tag">Лендинг</div>
          <div class="blog-title">Что должно быть на первом экране лендинга</div>
          <div class="blog-desc">Оффер, польза, CTA, доказательство, визуальный акцент и ошибки, из-за которых человек закрывает страницу.</div>
        </div>
        <div class="blog-date">Май 2026</div>
      </a>
      <a href="/blog/oshibki-v-tekstah/" class="blog-item">
        <div>
          <div class="blog-tag">Тексты</div>
          <div class="blog-title">Ошибки в текстах, которые убивают доверие</div>
          <div class="blog-desc">Общие фразы, канцелярит, обещания без опоры и другие вещи, из-за которых сайт звучит слабо.</div>
        </div>
        <div class="blog-date">Май 2026</div>
      </a>
    </div>
  </div>
</section>


`;

const socialMeta = `  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Bondarenko.studio" />
  <meta property="og:title" content="Bondarenko.studio — сайты, тексты и упаковка проектов" />
  <meta property="og:description" content="Компактная digital-студия: лендинги, сайты, тексты, визуальная упаковка и аудит проектов. От смысла и структуры до запуска." />
  <meta property="og:url" content="https://bndstudio.art/" />
  <meta property="og:image" content="https://bndstudio.art/assets/img/og-bondarenko-studio.svg" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Bondarenko.studio — сайты, тексты и упаковка проектов" />
  <meta name="twitter:description" content="Лендинги, сайты, тексты, визуальная упаковка и аудит проектов. От смысла и структуры до запуска." />
  <meta name="twitter:image" content="https://bndstudio.art/assets/img/og-bondarenko-studio.svg" />`;

const xDefault = '  <link rel="alternate" hreflang="x-default" href="https://bndstudio.art/" />';
if (!html.includes('property="og:title"')) {
  html = html.replace(xDefault, `${xDefault}\n${socialMeta}`);
}

const portfolioIndex = html.indexOf(portfolioStart);
const blogIndex = html.indexOf(blogStart);
const philosophyIndex = html.indexOf(philosophyStart);

if (portfolioIndex === -1 || blogIndex === -1 || philosophyIndex === -1) {
  throw new Error('Required homepage section markers were not found.');
}

html = html.slice(0, portfolioIndex) + portfolioBlock + blogBlock + html.slice(philosophyIndex);
html = html.replace('assets/js/main.js"></script>', 'assets/js/main.js?v=20260510-2"></script>');

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Sprint 26 homepage update applied.');
