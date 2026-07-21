export type ChangeScenarioId = 'manual' | 'telegram' | 'web' | 'api' | 'ai' | 'internal';

export interface ChangeScenario {
  id: ChangeScenarioId;
  order: number;
  title: string;
  summary: string;
}

export const changeScenarios: readonly ChangeScenario[] = [
  {
    id: 'manual',
    order: 1,
    title: 'Автоматизировать ручную работу',
    summary: 'Убрать рутину, ошибки и ручную передачу между этапами.',
  },
  {
    id: 'telegram',
    order: 2,
    title: 'Запустить Telegram-продукт',
    summary: 'Собрать бота, Mini App, кабинет или AI-ассистента.',
  },
  {
    id: 'web',
    order: 3,
    title: 'Создать сайт или веб-сервис',
    summary: 'Объединить интерфейс, данные и AI-функции в одном продукте.',
  },
  {
    id: 'api',
    order: 4,
    title: 'Связать сервисы через API',
    summary: 'Настроить контролируемый обмен данными без ручного копирования.',
  },
  {
    id: 'ai',
    order: 5,
    title: 'Добавить ИИ в существующий процесс',
    summary: 'Встроить анализ, поиск или принятие решений в рабочую систему.',
  },
  {
    id: 'internal',
    order: 6,
    title: 'Собрать внутренний инструмент',
    summary: 'Создать CRM, рабочую панель, базу или операционную систему.',
  },
] as const;
