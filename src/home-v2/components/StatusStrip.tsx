import type { ChangeScenario } from '../data/change-scenarios';
import { ScenarioIcon } from './ScenarioIcon';
import { TechStatusStrip } from './TechPrimitives';

export function StatusStrip({ scenario }: { scenario: ChangeScenario }) {
  const items = [
    { icon: <ScenarioIcon name="workflow" />, label: 'ТИП РЕШЕНИЯ', value: scenario.title },
    {
      icon: <ScenarioIcon name="link" />,
      label: 'ИНТЕГРАЦИИ',
      value: scenario.modules.includes('API') ? 'API / Telegram / CRM' : 'Внутренний контур',
    },
    {
      icon: <ScenarioIcon name="brain" />,
      label: 'УРОВЕНЬ AI',
      value: scenario.modules.includes('AI') ? 'Анализ и принятие решений' : 'По задаче',
    },
    { icon: <ScenarioIcon name="dashboard" />, label: 'РЕЖИМ РАБОТЫ', value: 'Автоматический' },
    { icon: <ScenarioIcon name="workflow" />, label: 'РЕЗУЛЬТАТ', value: scenario.status },
  ] as const;

  return (
    <TechStatusStrip items={items} className="status-strip" />
  );
}
