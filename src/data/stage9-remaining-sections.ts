export const solutionCategories = [
  {
    code: 'AI',
    title: 'AI-сервисы',
    description: 'Интерфейсы и модули для анализа, классификации, поиска и помощи сотрудникам.',
    tags: ['AI API', 'DATA', 'WEB'],
  },
  {
    code: 'TG',
    title: 'Telegram Mini Apps',
    description: 'Боты и Mini Apps для заявок, каталогов, уведомлений и рабочих сценариев.',
    tags: ['TELEGRAM API', 'REACT', 'POSTGRESQL'],
  },
  {
    code: 'API',
    title: 'Интеграционные платформы',
    description: 'Связь сервисов, контролируемый обмен данными и единая логика процессов.',
    tags: ['REST', 'WEBHOOKS', 'PYTHON'],
  },
  {
    code: 'CRM',
    title: 'Внутренние CRM',
    description: 'Учёт заявок, статусы, панели сотрудников и прикладная аналитика.',
    tags: ['NEXT.JS', 'POSTGRESQL', 'DOCKER'],
  },
  {
    code: 'FLOW',
    title: 'Автоматизация процессов',
    description: 'Триггеры, маршрутизация, уведомления и выполнение повторяющихся операций.',
    tags: ['PYTHON', 'API', 'AUTOMATION'],
  },
  {
    code: 'DATA',
    title: 'Аналитические системы',
    description: 'Сбор, нормализация и представление данных для управленческих решений.',
    tags: ['POSTGRESQL', 'AI API', 'DASHBOARD'],
  },
] as const;

export const workflowSteps = [
  {
    number: '01',
    title: 'Анализ',
    description: 'Разбираем задачу, участников процесса, ограничения и ожидаемый результат.',
    artifact: 'Требования и карта процессов',
    status: 'INPUT MAPPED',
    primary: true,
  },
  {
    number: '02',
    title: 'Проектирование',
    description: 'Определяем модули, связи, интерфейсы и последовательность реализации.',
    artifact: 'Архитектура и прототип',
    status: 'SYSTEM DESIGNED',
    primary: false,
  },
  {
    number: '03',
    title: 'Разработка',
    description: 'Собираем рабочие модули, подключаем данные и необходимые сервисы.',
    artifact: 'Рабочие модули',
    status: 'MODULES BUILT',
    primary: false,
  },
  {
    number: '04',
    title: 'Тестирование',
    description: 'Проверяем сценарии, граничные состояния, доступность и качество результата.',
    artifact: 'Проверенный сценарий',
    status: 'FLOW VERIFIED',
    primary: false,
  },
  {
    number: '05',
    title: 'Запуск и поддержка',
    description: 'Готовим production release, документацию и дальнейшее сопровождение.',
    artifact: 'Production release и поддержка',
    status: 'RELEASE PREPARED',
    primary: false,
  },
] as const;

export const technologyGroups = [
  {
    id: 'interface',
    label: 'INTERFACE LAYER',
    title: 'Интерфейсы',
    description: 'Веб-интерфейсы и клиентские приложения.',
    technologies: ['TypeScript', 'React', 'Next.js'],
  },
  {
    id: 'logic',
    label: 'LOGIC & AI',
    title: 'Логика и AI',
    description: 'Серверная логика, AI-функции и интеграционные сценарии.',
    technologies: ['Python', 'AI API', 'REST / Webhooks'],
  },
  {
    id: 'data',
    label: 'DATA & DELIVERY',
    title: 'Данные и поставка',
    description: 'Хранение данных и воспроизводимая среда запуска.',
    technologies: ['PostgreSQL', 'Docker', 'Telegram API'],
  },
] as const;

export const engineeringPrinciples = [
  {
    code: '01',
    title: 'Модульность',
    description: 'Система делится на независимые блоки, которые можно развивать без полной пересборки продукта.',
  },
  {
    code: '02',
    title: 'Безопасность',
    description: 'Доступы, секреты и пользовательские данные разделяются между клиентской и серверной частью.',
  },
  {
    code: '03',
    title: 'Надёжность',
    description: 'Критические сценарии получают проверяемые состояния, обработку ошибок и понятный fallback.',
  },
  {
    code: '04',
    title: 'Интеграции',
    description: 'Подключения проектируются как контролируемые контракты, а не как случайный набор запросов.',
  },
  {
    code: '05',
    title: 'Аналитика',
    description: 'Собираются только данные, необходимые для контроля процесса и принятия решений.',
  },
  {
    code: '06',
    title: 'Поддерживаемость',
    description: 'Структура, документация и тесты позволяют продолжать развитие продукта после запуска.',
  },
] as const;

export const contactChannels = [
  { code: 'TG', label: 'Telegram', value: 'Production contact pending' },
  { code: 'EM', label: 'Email', value: 'Production contact pending' },
] as const;

export const footerNavigation = [
  { label: 'Главная', href: '#home' },
  { label: 'Что изменить', href: '#change' },
  { label: 'Продукты', href: '#products' },
  { label: 'Конфигуратор', href: '#configurator' },
  { label: 'Проекты', href: '#projects' },
  { label: 'Контакты', href: '#contacts' },
] as const;
