export const sectionIds = ['home','change','products','configurator','projects','workflow','technologies','contacts','footer'] as const;
export type SectionId = (typeof sectionIds)[number];
