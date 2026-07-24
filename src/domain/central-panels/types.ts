export type ProblemScenarioId =
  | 'manual-automation'
  | 'telegram-product'
  | 'web-service'
  | 'api-integration'
  | 'ai-process'
  | 'internal-crm';

export type ProductDirectionId =
  | 'ai-web'
  | 'telegram'
  | 'api-automation'
  | 'crm-internal';

export type ModuleId =
  | 'data'
  | 'ai'
  | 'integration'
  | 'interfaces'
  | 'automation'
  | 'result';

export type ModuleEmphasis = 'primary' | 'active' | 'secondary' | 'inactive';

export type ProblemRouteProfile =
  | 'automation'
  | 'telegram'
  | 'web'
  | 'api'
  | 'ai'
  | 'crm';

export type ProductRouteProfile = 'web' | 'telegram' | 'api' | 'crm';

export type CoreLayerId =
  | 'outer'
  | 'segmented'
  | 'brackets'
  | 'secondary'
  | 'glass'
  | 'inner'
  | 'panel'
  | 'nodes';

export interface ProblemExplorerState {
  selectedScenarioId: ProblemScenarioId;
}

export interface ProductAssemblerState {
  selectedDirectionId: ProductDirectionId;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: string;
}

export interface SystemModuleViewModel {
  id: ModuleId;
  title: string;
  description: string;
  icon: string;
  side: 'left' | 'right';
  position: 'top' | 'middle' | 'bottom';
  emphasis: ModuleEmphasis;
}

export interface ProblemScenarioSource {
  id: ProblemScenarioId;
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  processTitle: string;
  processDescription: string;
  processSteps: readonly ProcessStep[];
  moduleEmphasis: Readonly<Record<ModuleId, ModuleEmphasis>>;
  routeProfile: ProblemRouteProfile;
  capabilityLabels: readonly string[];
  solutionParameters: readonly (readonly [string, string])[];
  accessibleResult: string;
}

export interface ProblemScenarioViewModel extends ProblemScenarioSource {
  modules: readonly SystemModuleViewModel[];
  statusCode: string;
  announcement: string;
}

export interface ProductDirectionSource {
  id: ProductDirectionId;
  code: string;
  title: string;
  shortTitle: string;
  description: string;
  activeLayers: readonly CoreLayerId[];
  primaryLayer: CoreLayerId;
  routeProfile: ProductRouteProfile;
  capabilityLabels: readonly string[];
  stack: readonly string[];
  principles: readonly (readonly [string, string])[];
  accessibleArchitecture: string;
}

export interface ProductDirectionViewModel extends ProductDirectionSource {
  coreLabel: string;
  coreSubtitle: string;
  announcement: string;
}
