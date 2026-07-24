import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const failures = [];
const checks = [];

function read(relativePath) {
  const full = path.join(root, relativePath);
  const exists = fs.existsSync(full);
  check(`file:${relativePath}`, exists);
  return exists ? fs.readFileSync(full, 'utf8') : '';
}

function check(name, condition, detail = '') {
  checks.push({ name, passed: Boolean(condition), detail });
  if (!condition) failures.push(`${name}${detail ? `: ${detail}` : ''}`);
}

const files = {
  page: 'src/app/page.tsx',
  data: 'src/data/stage9-remaining-sections.ts',
  projects: 'src/components/projects/ProjectsFoundation/index.tsx',
  workflow: 'src/components/sections/WorkflowFoundation/index.tsx',
  technologies: 'src/components/sections/TechnologiesFoundation/index.tsx',
  contact: 'src/components/sections/ContactFoundation/index.tsx',
  footer: 'src/components/sections/TechFooter/index.tsx',
  visual: 'src/tests/visual/foundation.visual.spec.ts',
  e2e: 'src/tests/e2e/stage9-remaining-sections.spec.ts',
  contactSheets: 'scripts/create-stage9-contact-sheets.mjs',
};

const source = Object.fromEntries(Object.entries(files).map(([key, value]) => [key, read(value)]));
const lowerSource = [source.data, source.projects, source.workflow, source.technologies, source.contact, source.footer].join('\n');

const orderedComponents = [
  'HeroFoundation',
  'CentralPanelsFoundation',
  'ConfiguratorFoundation',
  'ProjectsFoundation',
  'WorkflowFoundation',
  'TechnologiesFoundation',
  'ContactFoundation',
  'TechFooter',
];
let previousIndex = -1;
for (const component of orderedComponents) {
  const index = source.page.indexOf(`<${component}`);
  check(`page:component:${component}`, index >= 0);
  check(`page:order:${component}`, index > previousIndex, String(index));
  previousIndex = index;
}

for (const fixture of [
  ['projects', source.projects],
  ['workflow', source.workflow],
  ['technologies', source.technologies],
  ['contact', source.contact],
  ['footer', source.footer],
]) {
  check(`${fixture[0]}:stage-9-fixture`, fixture[1].includes('fixtureVersion="stage-9"') || fixture[1].includes('data-fixture-version="stage-9"'));
}

const projectCategoryTitles = [
  'AI-сервисы',
  'Telegram Mini Apps',
  'Интеграционные платформы',
  'Внутренние CRM',
  'Автоматизация процессов',
  'Аналитические системы',
];
check('projects:six-categories', projectCategoryTitles.every((title) => source.data.includes(`title: '${title}'`)));
check('projects:articles-not-buttons', source.projects.includes('<article') && !source.projects.includes('<button'));
check('projects:pending-state', /MATERIALS PENDING|Подборка будет опубликована/.test(source.projects));
check('projects:no-fake-metrics', !/300\+|50 клиентов|-65%|рост выручки|пользователей|отзыв клиента/i.test(source.projects));
check('projects:no-client-claims', !/клиентский кейс|реализовано для|заказчик:/i.test(source.projects));

check('workflow:five-steps', (source.data.match(/number: '0[1-5]'/g) ?? []).length >= 5);
for (const stage of ['Анализ', 'Проектирование', 'Разработка', 'Тестирование', 'Запуск и поддержка']) {
  check(`workflow:stage:${stage}`, source.data.includes(`title: '${stage}'`));
}
for (const artifact of ['Требования и карта процессов', 'Архитектура и прототип', 'Рабочие модули', 'Проверенный сценарий', 'Production release и поддержка']) {
  check(`workflow:artifact:${artifact}`, source.data.includes(`artifact: '${artifact}'`));
}
check('workflow:static', !/'use client'|useState|useEffect|onClick/.test(source.workflow));

const approvedTechnologies = ['TypeScript', 'React', 'Next.js', 'Python', 'AI API', 'REST / Webhooks', 'PostgreSQL', 'Docker', 'Telegram API'];
for (const technology of approvedTechnologies) check(`technology:${technology}`, source.data.includes(`'${technology}'`));
for (const principle of ['Модульность', 'Безопасность', 'Надёжность', 'Интеграции', 'Аналитика', 'Поддерживаемость']) {
  check(`principle:${principle}`, source.data.includes(`title: '${principle}'`));
}
check('technologies:separate-zones', source.technologies.includes('technologyMap') && source.technologies.includes('principles'));
check('technologies:no-unverified-certification', !/сертифицирован|ISO 27001|SOC 2|гарантирован/i.test(lowerSource));

check('contact:static-form', source.contact.includes('data-static-contact-form="true"'));
check('contact:fieldset-disabled', source.contact.includes('<fieldset disabled>'));
check('contact:consent-unchecked', source.contact.includes('defaultChecked={false}'));
check('contact:submit-disabled', /type="submit" disabled/.test(source.contact));
check('contact:privacy-link', source.contact.includes('href="/privacy"'));
check('contact:no-action', !/<form[^>]+action=/.test(source.contact));
check('contact:no-success-state', !/успешно отправ|заявка принята|success/i.test(source.contact));
check('contact:no-network', !/fetch\s*\(|axios|XMLHttpRequest|WebSocket/.test(source.contact));
check('contact:no-server-action', !/["']use server["']/.test(source.contact));
check('contact:no-persistence', !/localStorage|sessionStorage|URLSearchParams/.test(source.contact));

for (const status of ['LOCAL FOUNDATION', 'BUILD VERIFIED', 'PREVIEW MODE']) check(`footer:status:${status}`, source.footer.includes(status));
check('footer:navigation', source.footer.includes('aria-label="Навигация в подвале"'));
check('footer:privacy', source.footer.includes('href="/privacy"'));
check('footer:no-production-status', !/ALL SYSTEMS OPERATIONAL|99\.9%|uptime/i.test(source.footer));

for (const screenshot of [
  'stage9-projects-1536x700.png',
  'stage9-workflow-1536x700.png',
  'stage9-technologies-1536x700.png',
  'stage9-contact-footer-1536x900.png',
  'stage9-lower-page-1536x3000.png',
  'stage9-lower-page-tablet-768x3000.png',
  'stage9-lower-page-mobile-390x3600.png',
  'stage9-full-page-1440.png',
  'stage9-full-page-390.png',
  'stage9-hero-regression-1630x965.png',
  'stage9-central-panels-regression-1536x1024.png',
  'stage9-configurator-regression-1672x941.png',
]) check(`visual:${screenshot}`, source.visual.includes(screenshot));
check('visual:full-page', source.visual.includes('fullPage: true'));
check('visual:contact-sheets', source.contactSheets.includes('stage9-full-page-desktop-contact-sheet.png') && source.contactSheets.includes('stage9-full-page-mobile-contact-sheet.png'));

check('e2e:nine-sections', source.e2e.includes("['home', 'change', 'products', 'configurator', 'projects', 'workflow', 'technologies', 'contacts', 'footer']"));
check('e2e:overflow-widths', source.e2e.includes('[390, 768, 1024, 1440, 1536]'));
check('e2e:privacy-route', source.e2e.includes("page.goto('/privacy')"));
check('e2e:regression-contracts', source.e2e.includes('stage-5-1') && source.e2e.includes('stage-8') && source.e2e.includes('stage-7'));

check('lower:no-client-state', !/'use client'|useState|useReducer|createContext/.test(lowerSource));
check('lower:no-network', !/fetch\s*\(|axios|XMLHttpRequest|WebSocket/.test(lowerSource));
check('lower:no-persistence', !/localStorage|sessionStorage|URLSearchParams/.test(lowerSource));
check('lower:no-server-actions', !/["']use server["']/.test(lowerSource));
check('lower:no-tracking', !/gtag|GoogleAnalytics|segment|mixpanel|amplitude|posthog/i.test(lowerSource));
check('lower:no-secrets', !/(sk-[A-Za-z0-9_-]{20,}|\b\d{8,12}:[A-Za-z0-9_-]{30,}|SUPABASE_(?:SERVICE_ROLE|ANON)_KEY|WEBHOOK_SECRET|SMTP_PASSWORD)/.test(lowerSource));
check('lower:no-gsap-webgl', !/gsap|three|@react-three|WebGL|canvas/i.test(lowerSource));

const report = { passed: failures.length === 0, checks: checks.length, failures };
console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exit(1);
