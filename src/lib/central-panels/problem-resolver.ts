import {
  DEFAULT_PROBLEM_SCENARIO_ID,
  problemScenarioSources,
} from '@/data/central-panels-interactions';
import type {
  ModuleId,
  ProblemScenarioId,
  ProblemScenarioViewModel,
  SystemModuleViewModel,
} from '@/domain/central-panels/types';

const moduleDefinitions = [
  { id: 'ai', title: 'AI', description: 'Анализ и принятие решений', icon: 'AI', side: 'left', position: 'top' },
  { id: 'data', title: 'Data', description: 'Сбор, хранение и структура', icon: 'DB', side: 'left', position: 'middle' },
  { id: 'automation', title: 'Automation', description: 'Сценарии, триггеры и действия', icon: 'AU', side: 'left', position: 'bottom' },
  { id: 'integration', title: 'Integrations', description: 'API и внешние системы', icon: 'IN', side: 'right', position: 'top' },
  { id: 'interfaces', title: 'Interfaces', description: 'Сайты, боты и кабинеты', icon: 'UI', side: 'right', position: 'middle' },
  { id: 'result', title: 'Result', description: 'Статус и контролируемый итог', icon: 'OK', side: 'right', position: 'bottom' },
] as const satisfies readonly Omit<SystemModuleViewModel, 'emphasis'>[];

const problemScenarioIds = new Set<ProblemScenarioId>(problemScenarioSources.map((scenario) => scenario.id));

export function isProblemScenarioId(value: string): value is ProblemScenarioId {
  return problemScenarioIds.has(value as ProblemScenarioId);
}

export function resolveProblemScenario(requestedId: string): ProblemScenarioViewModel {
  const safeId: ProblemScenarioId = isProblemScenarioId(requestedId)
    ? requestedId
    : DEFAULT_PROBLEM_SCENARIO_ID;
  const source = problemScenarioSources.find((scenario) => scenario.id === safeId)
    ?? problemScenarioSources[0];

  const modules = moduleDefinitions.map((module) => ({
    ...module,
    id: module.id as ModuleId,
    emphasis: source.moduleEmphasis[module.id],
  }));

  return {
    ...source,
    modules,
    statusCode: `SCN_${source.number}`,
    announcement: `Выбран сценарий: ${source.shortTitle}. Архитектурная схема обновлена.`,
  };
}
