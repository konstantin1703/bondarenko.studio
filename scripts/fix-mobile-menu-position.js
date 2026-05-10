const fs = require('node:fs');
const path = require('node:path');

const filePath = path.join(process.cwd(), 'assets/js/main.js');
let js = fs.readFileSync(filePath, 'utf8');

js = js.replace(
  "const header = document.querySelector('header');\n    const controls = document.querySelector('header .header-controls');\n\n    if (!header || !controls || document.querySelector('.mobile-menu-toggle')) return;",
  "const header = document.querySelector('header');\n    const headerInner = document.querySelector('header .header-inner');\n    const logo = document.querySelector('header .logo');\n    const controls = document.querySelector('header .header-controls');\n\n    if (!header || !headerInner || !logo || !controls || document.querySelector('.mobile-menu-toggle')) return;"
);

js = js.replace(
  "    controls.insertBefore(toggle, controls.firstChild);",
  "    headerInner.insertBefore(toggle, logo);"
);

js = js.replace(
  "      @media (max-width: 768px) {\n        .mobile-menu-toggle { display: inline-flex; }\n        .footer-nav { display: flex; }\n      }",
  "      @media (max-width: 768px) {\n        header .header-inner {\n          gap: 0.5rem;\n          justify-content: flex-start;\n        }\n        header .logo {\n          flex: 1 1 auto;\n          min-width: 0;\n          font-size: clamp(1.08rem, 4.7vw, 1.35rem);\n          white-space: nowrap;\n        }\n        header .header-controls {\n          margin-left: auto;\n          flex: 0 0 auto;\n        }\n        header .btn-header { display: none; }\n        .mobile-menu-toggle {\n          display: inline-flex;\n          flex: 0 0 36px;\n          order: -1;\n        }\n        .footer-nav { display: flex; }\n      }"
);

fs.writeFileSync(filePath, js, 'utf8');
console.log('Mobile menu position fixed.');
