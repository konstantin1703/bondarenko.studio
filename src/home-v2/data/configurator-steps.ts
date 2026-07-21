export type ConfiguratorStepId = 'task' | 'product' | 'process' | 'modules' | 'contact';

export interface ConfiguratorStep {
  id: ConfiguratorStepId;
  order: number;
  title: string;
  hint: string;
}

export const configuratorSteps: readonly ConfiguratorStep[] = [
  {
    id: 'task',
    order: 1,
    title: 'Что требуется изменить?',
    hint: 'Определяем основную задачу.',
  },
  {
    id: 'product',
    order: 2,
    title: 'Какой формат подходит?',
    hint: 'Выбираем предварительное направление продукта.',
  },
  {
    id: 'process',
    order: 3,
    title: 'Как сейчас устроена работа?',
    hint: 'Фиксируем текущее состояние процесса.',
  },
  {
    id: 'modules',
    order: 4,
    title: 'Что должна делать система?',
    hint: 'Определяем AI-функции, данные и интеграции.',
  },
  {
    id: 'contact',
    order: 5,
    title: 'Куда отправить предварительный бриф?',
    hint: 'Контактный шаг будет подключён после согласования API-контракта.',
  },
] as const;
