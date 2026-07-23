export type SectionNumber = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09';
export type CoreState = 'idle' | 'active' | 'selected' | 'disabled';
export type PanelState = 'default' | 'active' | 'selected' | 'disabled' | 'error' | 'success';
export type PanelVariant = 'default' | 'elevated' | 'interactive' | 'console' | 'architecture';
export type CutSize = 'xs' | 'sm' | 'md' | 'lg';
export type NavigationItem = { label: string; href: `#${string}` };
