import { describe, expect, it } from 'vitest';
import {
  problemScenarioSources,
  productDirectionSources,
} from '@/data/central-panels-interactions';
import type { ProblemScenarioId, ProductDirectionId } from '@/domain/central-panels/types';
import { resolveProblemScenario } from '@/lib/central-panels/problem-resolver';
import { resolveProductDirection } from '@/lib/central-panels/product-resolver';

describe('resolveProblemScenario', () => {
  it.each(problemScenarioSources.map((scenario) => [scenario.id] as const))(
    'resolves %s deterministically',
    (id: ProblemScenarioId) => {
      const first = resolveProblemScenario(id);
      const second = resolveProblemScenario(id);

      expect(first).toEqual(second);
      expect(first.id).toBe(id);
      expect(first.title.trim()).not.toBe('');
      expect(first.processTitle.trim()).not.toBe('');
      expect(first.processSteps.length).toBeGreaterThanOrEqual(4);
      expect(first.processSteps.length).toBeLessThanOrEqual(6);
      expect(first.modules).toHaveLength(6);
      expect(first.modules.some((module) => module.emphasis === 'primary')).toBe(true);
      expect(first.capabilityLabels.length).toBeGreaterThan(0);
      expect(first.accessibleResult.trim()).not.toBe('');
    },
  );

  it('falls back safely for an unknown scenario ID', () => {
    const result = resolveProblemScenario('unknown-scenario');
    expect(result.id).toBe('manual-automation');
    expect(result.statusCode).toBe('SCN_01');
  });
});

describe('resolveProductDirection', () => {
  it.each(productDirectionSources.map((direction) => [direction.id] as const))(
    'resolves %s deterministically',
    (id: ProductDirectionId) => {
      const first = resolveProductDirection(id);
      const second = resolveProductDirection(id);

      expect(first).toEqual(second);
      expect(first.id).toBe(id);
      expect(first.title.trim()).not.toBe('');
      expect(first.activeLayers.length).toBeGreaterThan(0);
      expect(first.activeLayers).toContain(first.primaryLayer);
      expect(first.stack.length).toBeGreaterThan(0);
      expect(first.capabilityLabels.length).toBeGreaterThan(0);
      expect(first.principles.length).toBeGreaterThan(0);
      expect(first.accessibleArchitecture.trim()).not.toBe('');
    },
  );

  it('falls back safely for an unknown product direction ID', () => {
    const result = resolveProductDirection('unknown-direction');
    expect(result.id).toBe('ai-web');
    expect(result.coreLabel).toBe('WEB CORE');
  });
});
