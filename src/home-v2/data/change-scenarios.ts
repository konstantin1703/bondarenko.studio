export type ChangeScenarioId = 'manual' | 'telegram' | 'web' | 'api' | 'ai' | 'internal';

export type EngineModule = 'INPUT' | 'AI' | 'DATA' | 'API' | 'OUTPUT';

export interface ChangeScenario {
  id: ChangeScenarioId;
  number: string;
  title: string;
  description: string;
  icon: 'workflow' | 'telegram' | 'browser' | 'link' | 'brain' | 'dashboard';
  input: string;
  process: string;
  data: string;
  output: string;
  result: string;
  modules: EngineModule[];
  routes: string[];
  status: string;
  log: string[];
}

export const changeScenarios: readonly ChangeScenario[] = [
  {
    id: 'manual',
    number: '01',
    title: 'Автоматизировать ручную работу',
    description: 'Убираем рутину, снижаем ошибки и связываем этапы.',
    icon: 'workflow',
    input: 'Форма / заявка',
    process: 'Анализ и маршрутизация',
    data: 'PostgreSQL / CRM',
    output: 'Уведомления / отчёт',
    result: 'Повторяемый процесс без ручной передачи данных между этапами.',
    modules: ['INPUT', 'AI', 'DATA', 'OUTPUT'],
    routes: ['input-ai', 'ai-data', 'data-output'],
    status: 'Сценарий собран',
    log: [
      'Входной канал подключён',
      'Правила обработки загружены',
      'Маршрут данных готов',
      'Сценарий доступен для проверки',
    ],
  },
  {
    id: 'telegram',
    number: '02',
    title: 'Запустить Telegram-бота / Mini App',
    description: 'Собираем диалог, интерфейс, данные и действия.',
    icon: 'telegram',
    input: 'Telegram / Mini App',
    process: 'Диалог и бизнес-логика',
    data: 'Профили / каталог',
    output: 'Ответ / действие',
    result: 'Единый Telegram-продукт с понятным сценарием и контролируемыми данными.',
    modules: ['INPUT', 'API', 'DATA', 'OUTPUT'],
    routes: ['input-api', 'api-data', 'data-output'],
    status: 'Telegram-контур собран',
    log: ['Telegram-вход выбран', 'Команды сопоставлены', 'Хранилище подключено', 'Выходной канал готов'],
  },
  {
    id: 'web',
    number: '03',
    title: 'Создать сайт или веб-сервис',
    description: 'Объединяем интерфейс, данные и функции продукта.',
    icon: 'browser',
    input: 'Веб-интерфейс',
    process: 'Сценарии продукта',
    data: 'Пользователи / контент',
    output: 'Личный кабинет',
    result: 'Цельный веб-продукт, в котором интерфейс работает вместе с данными.',
    modules: ['INPUT', 'API', 'DATA', 'OUTPUT'],
    routes: ['input-api', 'api-data', 'data-output'],
    status: 'Веб-контур собран',
    log: ['Интерфейс определён', 'API-контур подготовлен', 'Модель данных связана', 'Клиентский результат готов'],
  },
  {
    id: 'api',
    number: '04',
    title: 'Связать сервисы через API',
    description: 'Настраиваем контролируемый обмен без копирования.',
    icon: 'link',
    input: 'Внешний сервис',
    process: 'Проверка и преобразование',
    data: 'Общий формат данных',
    output: 'Целевая система',
    result: 'Предсказуемый обмен данными между сервисами с проверяемыми правилами.',
    modules: ['INPUT', 'API', 'DATA', 'OUTPUT'],
    routes: ['input-api', 'api-data', 'data-output'],
    status: 'Интеграционный маршрут готов',
    log: ['Источник определён', 'Контракт данных проверен', 'Поля сопоставлены', 'Целевой сервис подключён'],
  },
  {
    id: 'ai',
    number: '05',
    title: 'Добавить AI в существующий процесс',
    description: 'Встраиваем анализ, поиск или помощь в решениях.',
    icon: 'brain',
    input: 'Документы / запрос',
    process: 'AI-анализ',
    data: 'База знаний',
    output: 'Рекомендация / ответ',
    result: 'AI-функция становится управляемой частью существующего рабочего процесса.',
    modules: ['INPUT', 'AI', 'DATA', 'API', 'OUTPUT'],
    routes: ['input-ai', 'ai-data', 'ai-api', 'api-output'],
    status: 'AI-модуль настроен',
    log: [
      'Источник контекста выбран',
      'AI-модуль активирован',
      'Ограничения ответа заданы',
      'Результат направлен в процесс',
    ],
  },
  {
    id: 'internal',
    number: '06',
    title: 'Собрать внутренний инструмент / CRM',
    description: 'Создаём рабочее пространство для команды и данных.',
    icon: 'dashboard',
    input: 'Команда / операции',
    process: 'Рабочие сценарии',
    data: 'CRM / внутренняя база',
    output: 'Панель управления',
    result: 'Единый внутренний интерфейс для ежедневной работы и контроля процессов.',
    modules: ['INPUT', 'DATA', 'API', 'OUTPUT'],
    routes: ['input-data', 'data-api', 'api-output'],
    status: 'Внутренний контур собран',
    log: ['Роли определены', 'Рабочие сущности созданы', 'Действия подключены', 'Панель готова к проверке'],
  },
] as const;
