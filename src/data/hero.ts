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
  { id: 'analysis', title: 'АНАЛИЗ', subtitle: 'ДАННЫХ', detail: 'СТРУКТУРА', side: 'left', position: 'top', priority: 'primary' },
  { id: 'ai', title: 'AI', subtitle: 'МОДЕЛИ', detail: 'ОБРАБОТКА', side: 'left', position: 'middle', priority: 'secondary' },
  { id: 'interfaces', title: 'ИНТЕРФЕЙСЫ', subtitle: 'ПАНЕЛИ И UI', detail: 'УПРАВЛЕНИЕ', side: 'left', position: 'bottom', priority: 'secondary' },
  { id: 'integration', title: 'ИНТЕГРАЦИЯ', subtitle: 'СЕРВИСОВ', detail: 'СВЯЗИ', side: 'right', position: 'top', priority: 'primary' },
  { id: 'automation', title: 'АВТОМАТИЗАЦИЯ', subtitle: 'ПРОЦЕССОВ', detail: 'СЦЕНАРИИ', side: 'right', position: 'middle', priority: 'primary' },
  { id: 'result', title: 'РЕЗУЛЬТАТ', subtitle: 'И АНАЛИТИКА', detail: 'КОНТРОЛЬ', side: 'right', position: 'bottom', priority: 'secondary' },
] as const;

export const heroFeatures = [
  { code: 'AI', title: 'AI-МОДУЛИ', detail: 'анализ и обработка' },
  { code: 'API', title: 'ИНТЕГРАЦИИ', detail: 'связь сервисов' },
  { code: 'FLOW', title: 'АВТОМАТИЗАЦИЯ', detail: 'управление процессами' },
  { code: 'DATA', title: 'АНАЛИТИКА', detail: 'данные для решений' },
] as const;

export const heroTechnologies = ['Python', 'AI / ML', 'PostgreSQL', 'Docker', 'FastAPI', 'Telegram API', 'Cloud'] as const;
export const heroStatuses = ['SYSTEM READY', 'CORE PROXY ACTIVE', 'BLENDER ASSET PENDING'] as const;
