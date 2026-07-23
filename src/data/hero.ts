export const heroCopy = {
  eyebrow: 'AI · AUTOMATION · INTEGRATION',
  titleLead: 'СОЗДАЁМ',
  titleAccent: 'AI-ПРОДУКТЫ',
  titleTail: 'И АВТОМАТИЗАЦИИ',
  description: [
    'Digital-продукты, где ИИ становится частью системы.',
    'Автоматизируем процессы, интегрируем сервисы',
    'и создаём решения, которые масштабируют бизнес.',
  ],
  primaryAction: { label: 'СОБРАТЬ РЕШЕНИЕ', href: '#configurator' },
  secondaryAction: { label: 'СМОТРЕТЬ ПРОЕКТЫ', href: '#projects' },
} as const;

export const heroModules = [
  { id: 'analysis', title: 'АНАЛИЗ', subtitle: 'ДАННЫХ', detail: 'STRUCTURE', side: 'left', position: 'top' },
  { id: 'ai', title: 'AI', subtitle: 'МОДЕЛИ', detail: 'INTELLIGENCE', side: 'left', position: 'middle' },
  { id: 'interfaces', title: 'ИНТЕРФЕЙСЫ', subtitle: 'ПАНЕЛИ И UI', detail: 'INTERACTION', side: 'left', position: 'bottom' },
  { id: 'integration', title: 'ИНТЕГРАЦИЯ', subtitle: 'СЕРВИСОВ', detail: 'CONNECTIONS', side: 'right', position: 'top' },
  { id: 'automation', title: 'АВТОМАТИЗАЦИЯ', subtitle: 'ПРОЦЕССОВ', detail: 'WORKFLOW', side: 'right', position: 'middle' },
  { id: 'result', title: 'РЕЗУЛЬТАТ', subtitle: 'И АНАЛИТИКА', detail: 'OUTPUT', side: 'right', position: 'bottom' },
] as const;

export const heroFeatures = [
  { code: 'AI', title: 'AI-МОДУЛИ', detail: 'анализ и обработка' },
  { code: 'API', title: 'ИНТЕГРАЦИИ', detail: 'связь сервисов' },
  { code: 'FLOW', title: 'АВТОМАТИЗАЦИЯ', detail: 'управление процессами' },
  { code: 'DATA', title: 'АНАЛИТИКА', detail: 'данные для решений' },
] as const;

export const heroTechnologies = ['Python', 'AI / ML', 'PostgreSQL', 'Docker', 'FastAPI', 'Telegram API', 'Cloud'] as const;
export const heroStatuses = ['SYSTEM READY', 'CORE MEDIA CONTRACT ACTIVE', 'EXTERNAL SERVICES DISABLED'] as const;
