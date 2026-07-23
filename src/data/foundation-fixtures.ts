export const scenarios = [
  ['01', 'Автоматизировать ручную работу', 'Убрать рутину, снизить ошибки и ускорить процесс.'],
  ['02', 'Запустить Telegram-продукт', 'Бот, Mini App, формы и рабочие сценарии.'],
  ['03', 'Создать сайт или сервис', 'Интерфейс, кабинет или специализированный сервис.'],
  ['04', 'Связать сервисы через API', 'Интеграции и контролируемый обмен данными.'],
  ['05', 'Добавить AI в процесс', 'Анализ, классификация и помощь сотрудникам.'],
  ['06', 'Собрать внутренний инструмент / CRM', 'Учёт, статусы, заявки и аналитика.'],
] as const;

export const problemScenarios = scenarios.map(([number, title, description], index) => ({
  number,
  title,
  description,
  selected: index === 0,
}));

export const systemModules = [
  { id: 'ai', title: 'AI-анализ', description: 'Понимаем данные и находим решение', icon: 'AI', active: true, side: 'left', position: 'top' },
  { id: 'data', title: 'Данные', description: 'Сбор, хранение и структура', icon: 'DB', active: true, side: 'left', position: 'middle' },
  { id: 'automation', title: 'Автоматизация', description: 'Сценарии, триггеры и выполнение', icon: 'AU', active: true, side: 'left', position: 'bottom' },
  { id: 'integration', title: 'Интеграции', description: 'API, сервисы и внешние системы', icon: 'IN', active: false, side: 'right', position: 'top' },
  { id: 'interfaces', title: 'Интерфейсы', description: 'Панели, боты и кабинеты', icon: 'UI', active: false, side: 'right', position: 'middle' },
  { id: 'result', title: 'Результат', description: 'Готовый процесс и отчётность', icon: 'OK', active: true, side: 'right', position: 'bottom' },
] as const;

export const processScenario = [
  { number: '1', title: 'Форма / заявка', description: 'Пользователь отправляет данные', icon: 'FORM' },
  { number: '2', title: 'AI-анализ', description: 'Система анализирует и классифицирует', icon: 'AI' },
  { number: '3', title: 'База данных', description: 'Данные сохраняются и структурируются', icon: 'DB' },
  { number: '4', title: 'Telegram', description: 'Уведомление или действие в боте', icon: 'TG' },
  { number: '5', title: 'Результат', description: 'Готовый результат или отчёт', icon: 'OK' },
] as const;

export const solutionParameters = [
  ['Тип решения', 'Внутренний процесс'],
  ['Интеграции', 'API / Telegram / CRM'],
  ['Уровень AI', 'Анализ и маршрутизация'],
  ['Режим работы', 'Автоматический'],
  ['Результат', 'Контролируемый процесс'],
] as const;

export const productDirections = [
  ['AI-сайты и веб-продукты', 'Сайты, сервисы, кабинеты и AI-консультанты.'],
  ['Telegram-боты и Mini Apps', 'Боты, Mini Apps, каталоги, уведомления и платежи.'],
  ['Автоматизация и API', 'Интеграции, обработка данных, webhook и сценарии.'],
  ['CRM и внутренние системы', 'CRM, базы, статусы, панели и аналитика.'],
] as const;

export const productDirectionFixtures = productDirections.map(([title, description], index) => ({
  title,
  description,
  code: ['WEB', 'TG', 'API', 'CRM'][index],
  active: index === 0,
}));

export const workflowStages = ['Анализ', 'Проектирование', 'Разработка', 'Тестирование', 'Запуск и поддержка'] as const;
export const workflowDescriptions = ['Понимаем задачу и процессы', 'Проектируем логику и архитектуру', 'Собираем и интегрируем', 'Проверяем и оптимизируем', 'Запускаем и сопровождаем'] as const;
export const principles = ['Модульность', 'Безопасность', 'Надёжность', 'Интеграция', 'Аналитика'] as const;
export const stackPreview = ['TypeScript', 'React', 'Next.js', 'AI API', 'PostgreSQL', 'Docker'] as const;
export const currentStack = ['Next.js', 'React', 'TypeScript', 'SCSS Modules', 'Inline SVG', 'Playwright'] as const;
