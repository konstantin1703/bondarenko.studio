export type ProductDirectionId = 'web' | 'telegram' | 'automation' | 'crm';
export type ProductIconName = 'browser' | 'telegram' | 'api' | 'crm';
export type ProductPrincipleId = 'modularity' | 'security' | 'reliability' | 'integration' | 'analytics';

export interface ProductDirection {
  id: ProductDirectionId;
  number: string;
  title: string;
  description: string;
  icon: ProductIconName;
  modules: string[];
  routes: string[];
  stack: string[];
  principles: ProductPrincipleId[];
  output: string;
}

const stablePrinciples: ProductPrincipleId[] = ['modularity', 'security', 'reliability', 'integration', 'analytics'];

export const productDirections: readonly ProductDirection[] = [
  {
    id: 'web',
    number: '01',
    title: 'AI-сайты и веб-продукты',
    description: 'Сайты, сервисы, кабинеты и AI-функции в едином интерфейсе.',
    icon: 'browser',
    modules: ['UI', 'AI', 'API', 'DATA'],
    routes: ['ui-core', 'ai-core', 'api-core', 'data-core'],
    stack: ['TypeScript', 'React / Next.js', 'AI API', 'PostgreSQL', 'Docker', 'Nginx'],
    principles: stablePrinciples,
    output: 'Веб-продукт с интерфейсом, данными и управляемыми AI-функциями.',
  },
  {
    id: 'telegram',
    number: '02',
    title: 'Telegram-боты и Mini Apps',
    description: 'Боты, Mini Apps, каталоги, кабинеты и автоматические уведомления.',
    icon: 'telegram',
    modules: ['BOT', 'MINI APP', 'API', 'DATA'],
    routes: ['bot-core', 'ui-core', 'api-core', 'data-core'],
    stack: ['TypeScript', 'Telegram Bot API', 'React', 'FastAPI', 'PostgreSQL', 'Redis'],
    principles: stablePrinciples,
    output: 'Telegram-продукт с диалогом, интерфейсом и связанными действиями.',
  },
  {
    id: 'automation',
    number: '03',
    title: 'Автоматизация и API',
    description: 'Интеграции, webhooks, обработка данных и автоматические сценарии.',
    icon: 'api',
    modules: ['TRIGGER', 'API', 'QUEUE', 'DATA'],
    routes: ['trigger-core', 'api-core', 'queue-core', 'data-core'],
    stack: ['Python', 'FastAPI', 'REST / Webhooks', 'PostgreSQL', 'Redis', 'Docker'],
    principles: stablePrinciples,
    output: 'Контролируемый процесс обмена и обработки данных между системами.',
  },
  {
    id: 'crm',
    number: '04',
    title: 'CRM и внутренние системы',
    description: 'Рабочие панели, статусы, роли, история действий и аналитика.',
    icon: 'crm',
    modules: ['CRM', 'ROLES', 'DATA', 'REPORTS'],
    routes: ['ui-core', 'roles-core', 'data-core', 'reports-core'],
    stack: ['TypeScript', 'React', 'Python', 'FastAPI', 'PostgreSQL', 'Docker'],
    principles: stablePrinciples,
    output: 'Внутренняя система для ежедневной работы, данных и контроля процессов.',
  },
] as const;

export const engineeringPrinciples: Readonly<Record<ProductPrincipleId, { title: string; description: string }>> = {
  modularity: { title: 'Модульность', description: 'Компоненты можно развивать независимо.' },
  security: { title: 'Безопасность', description: 'Доступ и данные проектируются осознанно.' },
  reliability: { title: 'Надёжность', description: 'Ошибки и критические состояния контролируются.' },
  integration: { title: 'Интеграция', description: 'Сервисы связываются через явные контракты.' },
  analytics: { title: 'Аналитика', description: 'Система сохраняет понятный операционный контекст.' },
};

export const productWorkflow = [
  { number: '01', title: 'Анализ', description: 'Задача и процессы' },
  { number: '02', title: 'Проектирование', description: 'Логика и архитектура' },
  { number: '03', title: 'Разработка', description: 'Сборка и интеграция' },
  { number: '04', title: 'Тестирование', description: 'Проверка и улучшение' },
  { number: '05', title: 'Запуск и поддержка', description: 'Запуск и развитие' },
] as const;
