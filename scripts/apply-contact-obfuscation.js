const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();
const jsPath = path.join(root, 'assets/js/main.js');

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    if (entry.isFile() && entry.name.endsWith('.html')) acc.push(full);
  }
  return acc;
}

function insertContactHydrator() {
  let js = fs.readFileSync(jsPath, 'utf8');

  if (!js.includes('function hydrateObfuscatedContacts()')) {
    const hydrator = `
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
`;

    js = js.replace('\n  function normalizeCtas() {', `${hydrator}\n  function normalizeCtas() {`);
  }

  js = js.replace('  injectModal();\n  normalizeCtas();', '  injectModal();\n  hydrateObfuscatedContacts();\n  normalizeCtas();');

  fs.writeFileSync(jsPath, js, 'utf8');
}

function svgFrom(content) {
  const match = content.match(/<svg[\s\S]*?<\/svg>/);
  return match ? `${match[0]}\n        ` : '';
}

function obfuscateHtmlFile(filePath) {
  const before = fs.readFileSync(filePath, 'utf8');
  let html = before;

  html = html.replace(/<a([^>]*?)href="mailto:byxapckuu@gmail\.com"([^>]*?)>([\s\S]*?)<\/a>/g, (full, beforeHref, afterHref, inner) => {
    const attrs = `${beforeHref}${afterHref}`;
    const svg = svgFrom(inner);
    return `<a${attrs}href="#" data-contact="email" data-user="byxapckuu" data-domain-a="gmail" data-domain-b="com" aria-label="Email">
        ${svg}<span class="contact-value">Email</span>
      </a>`;
  });

  html = html.replace(/<a([^>]*?)href="tel:\+79912810796"([^>]*?)>([\s\S]*?)<\/a>/g, (full, beforeHref, afterHref, inner) => {
    const attrs = `${beforeHref}${afterHref}`;
    const svg = svgFrom(inner);
    return `<a${attrs}href="#" data-contact="phone" data-country="+7" data-code="991" data-part1="281" data-part2="07" data-part3="96" aria-label="Телефон">
        ${svg}<span class="contact-value">Телефон</span>
      </a>`;
  });

  html = html.replace(
    /<span class="footer-phone">\+7 \(991\) 281-07-96<\/span>/g,
    '<a href="#" class="footer-phone" data-contact="phone" data-country="+7" data-code="991" data-part1="281" data-part2="07" data-part3="96" aria-label="Телефон"><span class="contact-value">Телефон</span></a>'
  );

  if (html !== before) {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`Updated ${path.relative(root, filePath)}`);
  }
}

insertContactHydrator();
walk(root).forEach(obfuscateHtmlFile);
console.log('Contact obfuscation applied.');
