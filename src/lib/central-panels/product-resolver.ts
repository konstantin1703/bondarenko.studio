import {
  DEFAULT_PRODUCT_DIRECTION_ID,
  productDirectionSources,
} from '@/data/central-panels-interactions';
import type {
  ProductDirectionId,
  ProductDirectionViewModel,
} from '@/domain/central-panels/types';

const productDirectionIds = new Set<ProductDirectionId>(productDirectionSources.map((direction) => direction.id));

export function isProductDirectionId(value: string): value is ProductDirectionId {
  return productDirectionIds.has(value as ProductDirectionId);
}

export function resolveProductDirection(requestedId: string): ProductDirectionViewModel {
  const safeId: ProductDirectionId = isProductDirectionId(requestedId)
    ? requestedId
    : DEFAULT_PRODUCT_DIRECTION_ID;
  const source = productDirectionSources.find((direction) => direction.id === safeId)
    ?? productDirectionSources[0];

  return {
    ...source,
    coreLabel: `${source.code} CORE`,
    coreSubtitle: 'ПРЕДВАРИТЕЛЬНАЯ АРХИТЕКТУРА',
    announcement: `Выбрано направление: ${source.shortTitle}. Архитектура продукта обновлена.`,
  };
}
