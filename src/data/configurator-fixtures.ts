import { scenarios } from './foundation-fixtures';

export const configuratorProgressSteps = [
  { number: '01', title: 'Бриф', description: 'Понимаем задачу и цели', state: 'active' },
  { number: '02', title: 'Архитектура', description: 'Формируем структуру решения', state: 'upcoming' },
  { number: '03', title: 'Интеграции', description: 'Подключаем нужные сервисы', state: 'upcoming' },
  { number: '04', title: 'AI', description: 'Подбираем модели и сценарии', state: 'upcoming' },
  { number: '05', title: 'Запуск', description: 'Сроки, бюджет и контакты', state: 'upcoming' },
] as const;

export const configuratorScenarios = scenarios.map(([number, title, description], index) => ({
  number,
  id: `scenario-${number}`,
  title,
  description,
  selected: index === 0,
  icon: ['AUTO', 'TG', 'WEB', 'API', 'AI', 'CRM'][index],
}));

export const configuratorParameters = [
  { label: 'Тип продукта', value: 'Mini App', kind: 'value' },
  { label: 'Интеграции', value: 'Telegram', kind: 'tag' },
  { label: 'Интеграции', value: 'CRM', kind: 'tag' },
  { label: 'Интеграции', value: 'AI-анализ', kind: 'tag' },
  { label: 'Интеграции', value: 'API', kind: 'tag' },
  { label: 'Интеграции', value: 'Webhook', kind: 'tag' },
  { label: 'Срок', value: '4–6 недель', kind: 'value' },
  { label: 'Бюджет', value: 'Определяется после брифа', kind: 'value' },
] as const;

export const architectureNodes = [
  { id: 'source', title: 'Форма / Telegram', subtitle: 'Источник данных', icon: 'FORM', active: true, position: 'source' },
  { id: 'ai', title: 'AI-обработка', subtitle: 'Анализ и маршрутизация', icon: 'AI', active: true, position: 'ai' },
  { id: 'data', title: 'База данных', subtitle: 'PostgreSQL', icon: 'DB', active: true, position: 'data' },
  { id: 'integration', title: 'API / CRM', subtitle: 'Интеграция и обмен', icon: 'API', active: false, position: 'integration' },
  { id: 'output', title: 'Уведомления', subtitle: 'Статусы и отчёты', icon: 'OUT', active: false, position: 'output' },
] as const;

export const architectureSummary = [
  ['Задача', 'Автоматизация'],
  ['Продукт', 'Требует выбора'],
  ['Интеграции', 'Предварительно'],
  ['AI-модуль', 'Не выбран'],
  ['Статус', 'LOCAL PREVIEW'],
] as const;

export const architectureTags = ['AI', 'DATA', 'API', 'AUTOMATION', 'CRM'] as const;
export const preliminaryStack = ['Next.js', 'Python', 'PostgreSQL', 'Telegram API'] as const;
