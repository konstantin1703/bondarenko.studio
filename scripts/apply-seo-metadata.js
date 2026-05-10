const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();

const pages = [
  {
    file: 'index.html',
    url: 'https://bndstudio.art/',
    title: 'Bondarenko.studio — digital-студия сайтов, текстов и упаковки проектов',
    ogTitle: 'Bondarenko.studio — сайты, тексты и упаковка проектов',
    description: 'Bondarenko.studio — компактная digital-студия: лендинги, сайты, тексты, визуальная упаковка и аудит проектов. От смысла и структуры до запуска.',
    type: 'WebSite',
  },
  {
    file: 'services/index.html',
    url: 'https://bndstudio.art/services/',
    title: 'Услуги — сайты, лендинги, тексты и упаковка | Bondarenko.studio',
    ogTitle: 'Услуги Bondarenko.studio — сайты, лендинги, тексты и упаковка',
    description: 'Форматы работы Bondarenko.studio: аудит сайта, лендинг под ключ, сайт-визитка, тексты, digital-упаковка и поддержка проекта.',
    type: 'Service',
  },
  {
    file: 'portfolio/index.html',
    url: 'https://bndstudio.art/portfolio/',
    title: 'Портфолио — кейсы сайтов, текстов и digital-упаковки | Bondarenko.studio',
    ogTitle: 'Портфолио Bondarenko.studio — сайты, тексты и digital-кейсы',
    description: 'Кейсы Bondarenko.studio: сайты-визитки, лендинги, тексты, медиа-проекты, Telegram-сценарии и digital-упаковка.',
    type: 'CollectionPage',
  },
  {
    file: 'audit/index.html',
    url: 'https://bndstudio.art/audit/',
    title: 'Аудит сайта — разбор первого экрана, оффера, UX и доверия | Bondarenko.studio',
    ogTitle: 'Аудит сайта — покажем, что мешает получать заявки',
    description: 'Аудит сайта или лендинга: первый экран, оффер, структура, доверие, CTA, форма, SEO-база, тексты и слабые места перед запуском рекламы.',
    type: 'Service',
  },
  {
    file: 'blog/index.html',
    url: 'https://bndstudio.art/blog/',
    title: 'Блог — сайты, лендинги, тексты, AI и упаковка проектов | Bondarenko.studio',
    ogTitle: 'Блог Bondarenko.studio — сайты, лендинги, тексты и AI',
    description: 'Практичные статьи Bondarenko.studio о сайтах, лендингах, первом экране, текстах, рекламе, AI и digital-упаковке проектов.',
    type: 'Blog',
  },
  {
    file: 'contacts/index.html',
    url: 'https://bndstudio.art/contacts/',
    title: 'Контакты — обсудить сайт, лендинг, аудит или digital-упаковку | Bondarenko.studio',
    ogTitle: 'Контакты Bondarenko.studio — обсудить проект',
    description: 'Контакты Bondarenko.studio: оставьте заявку на сайт, лендинг, аудит, тексты или digital-упаковку проекта.',
    type: 'ContactPage',
  },
  {
    file: 'brief/index.html',
    url: 'https://bndstudio.art/brief/',
    title: 'Бриф — описать задачу для сайта, лендинга или упаковки | Bondarenko.studio',
    ogTitle: 'Бриф Bondarenko.studio — описать задачу проекта',
    description: 'Короткий бриф Bondarenko.studio для сайта, лендинга, текста, аудита или digital-упаковки. Помогает быстро понять задачу и следующий шаг.',
    type: 'WebPage',
  },
  {
    file: 'process/index.html',
    url: 'https://bndstudio.art/process/',
    title: 'Процесс работы — от задачи до запуска | Bondarenko.studio',
    ogTitle: 'Процесс Bondarenko.studio — как собирается проект',
    description: 'Процесс работы Bondarenko.studio: бриф, структура, тексты, визуальная подача, вёрстка, проверка, запуск и поддержка.',
    type: 'WebPage',
  },
];

function escapeHtml(value) {
  return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function jsonLd(page) {
  const baseOrg = {
    '@context': 'https://schema.org',
    '@type': page.type,
    name: page.ogTitle,
    description: page.description,
    url: page.url,
    inLanguage: 'ru-RU',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Bondarenko.studio',
      url: 'https://bndstudio.art/',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Bondarenko.studio',
      url: 'https://bndstudio.art/',
    },
  };

  if (page.file === 'index.html') {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Bondarenko.studio',
        url: 'https://bndstudio.art/',
        sameAs: ['https://t.me/whity14'],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Bondarenko.studio',
        url: 'https://bndstudio.art/',
        inLanguage: 'ru-RU',
      },
    ];
  }

  if (page.type === 'Service') {
    return {
      ...baseOrg,
      provider: {
        '@type': 'Organization',
        name: 'Bondarenko.studio',
        url: 'https://bndstudio.art/',
      },
      areaServed: 'RU',
    };
  }

  return baseOrg;
}

function buildMeta(page) {
  const json = JSON.stringify(jsonLd(page), null, 2).replace(/</g, '\\u003c');
  return `  <title>${escapeHtml(page.title)}</title>
  <meta name="description" content="${escapeHtml(page.description)}" />
  <link rel="canonical" href="${page.url}" />
  <meta property="og:locale" content="ru_RU" />
  <meta property="og:type" content="${page.type === 'WebSite' ? 'website' : 'article'}" />
  <meta property="og:site_name" content="Bondarenko.studio" />
  <meta property="og:title" content="${escapeHtml(page.ogTitle)}" />
  <meta property="og:description" content="${escapeHtml(page.description)}" />
  <meta property="og:url" content="${page.url}" />
  <meta property="og:image" content="https://bndstudio.art/assets/img/og-bondarenko-studio.svg" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(page.ogTitle)}" />
  <meta name="twitter:description" content="${escapeHtml(page.description)}" />
  <meta name="twitter:image" content="https://bndstudio.art/assets/img/og-bondarenko-studio.svg" />
  <script type="application/ld+json">
${json}
  </script>`;
}

function patchPage(page) {
  const fullPath = path.join(root, page.file);
  if (!fs.existsSync(fullPath)) {
    console.warn(`Skip missing ${page.file}`);
    return;
  }

  let html = fs.readFileSync(fullPath, 'utf8');
  const before = html;
  const meta = buildMeta(page);

  html = html.replace(/\n\s*<title>[\s\S]*?<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">/, `\n${meta}\n  <link rel="preconnect" href="https://fonts.googleapis.com">`);

  if (html === before) {
    html = html.replace(/\n\s*<title>[\s\S]*?<link rel="stylesheet" href="([^\"]*assets\/css\/main\.css|assets\/css\/main\.css)">/, `\n${meta}\n  <link rel="stylesheet" href="$1">`);
  }

  if (html === before) {
    console.warn(`No metadata block replaced in ${page.file}`);
    return;
  }

  fs.writeFileSync(fullPath, html, 'utf8');
  console.log(`Patched ${page.file}`);
}

for (const page of pages) patchPage(page);
console.log('SEO metadata patch complete.');
