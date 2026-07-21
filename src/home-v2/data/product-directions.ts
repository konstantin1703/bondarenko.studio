export type ProductDirectionId = 'web' | 'telegram' | 'automation' | 'crm';
export type ProductIconName = 'browser' | 'telegram' | 'api' | 'crm';
export type ProductPrincipleId = 'modularity' | 'security' | 'reliability' | 'integration' | 'analytics';
export type TechnologyIconName =
  | 'typescript'
  | 'react'
  | 'ai'
  | 'database'
  | 'docker'
  | 'server'
  | 'telegram'
  | 'api'
  | 'redis'
  | 'python';
export type WorkflowIconName = 'analysis' | 'architecture' | 'development' | 'testing' | 'launch';

export interface TechnologyItem {
  name: string;
  icon: TechnologyIconName;
}

export interface ProductDirection {
  id: ProductDirectionId;
  number: string;
  title: string;
  description: string;
  icon: ProductIconName;
  modules: string[];
  routes: string[];
  stack: TechnologyItem[];
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
    stack: [
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'React / Next.js', icon: 'react' },
      { name: 'AI API', icon: 'ai' },
      { name: 'PostgreSQL', icon: 'database' },
      { name: 'Docker', icon: 'docker' },
      { name: 'Nginx', icon: 'server' },
    ],
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
    stack: [
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'Telegram Bot API', icon: 'telegram' },
      { name: 'React', icon: 'react' },
      { name: 'FastAPI', icon: 'api' },
      { name: 'PostgreSQL', icon: 'database' },
      { name: 'Redis', icon: 'redis' },
    ],
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
    stack: [
      { name: 'Python', icon: 'python' },
      { name: 'FastAPI', icon: 'api' },
      { name: 'REST / Webhooks', icon: 'server' },
      { name: 'PostgreSQL', icon: 'database' },
      { name: 'Redis', icon: 'redis' },
      { name: 'Docker', icon: 'docker' },
    ],
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
    stack: [
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'React', icon: 'react' },
      { name: 'Python', icon: 'python' },
      { name: 'FastAPI', icon: 'api' },
      { name: 'PostgreSQL', icon: 'database' },
      { name: 'Docker', icon: 'docker' },
    ],
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
  { number: '01', icon: 'analysis', title: 'Анализ', description: 'Задача и процессы' },
  { number: '02', icon: 'architecture', title: 'Проектирование', description: 'Логика и архитектура' },
  { number: '03', icon: 'development', title: 'Разработка', description: 'Сборка и интеграция' },
  { number: '04', icon: 'testing', title: 'Тестирование', description: 'Проверка и улучшение' },
  { number: '05', icon: 'launch', title: 'Запуск и поддержка', description: 'Запуск и развитие' },
] as const;
