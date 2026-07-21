export type ProductDirectionId = 'web' | 'telegram' | 'automation' | 'crm';

export interface ProductDirection {
  id: ProductDirectionId;
  order: number;
  title: string;
  summary: string;
}

export const productDirections: readonly ProductDirection[] = [
  {
    id: 'web',
    order: 1,
    title: 'AI-сайты и веб-продукты',
    summary: 'Сайты, сервисы, кабинеты, AI-консультанты и работа с данными.',
  },
  {
    id: 'telegram',
    order: 2,
    title: 'Telegram-боты и Mini Apps',
    summary: 'Боты, каталоги, кабинеты, ассистенты и уведомления.',
  },
  {
    id: 'automation',
    order: 3,
    title: 'Автоматизация и API',
    summary: 'Интеграции, webhooks, обработка данных и автоматические сценарии.',
  },
  {
    id: 'crm',
    order: 4,
    title: 'CRM и внутренние системы',
    summary: 'Карточки, статусы, история действий, поиск и рабочие панели.',
  },
] as const;
