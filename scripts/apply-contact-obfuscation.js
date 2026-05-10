const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    if (entry.isFile() && entry.name.endsWith('.html')) acc.push(full);
  }
  return acc;
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

walk(root).forEach(obfuscateHtmlFile);
console.log('Contact obfuscation applied.');
