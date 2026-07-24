import { SiteFrame } from '@/components/layout/SiteFrame';
import { HeroFoundation } from '@/components/hero/HeroFoundation';
import { CentralPanelsFoundation } from '@/components/central-panels/CentralPanelsFoundation';
import { ConfiguratorFoundation } from '@/components/configurator/ConfiguratorFoundation';
import { ProjectsFoundation } from '@/components/projects/ProjectsFoundation';
import { WorkflowFoundation } from '@/components/sections/WorkflowFoundation';
import { TechnologiesFoundation } from '@/components/sections/TechnologiesFoundation';
import { ContactFoundation } from '@/components/sections/ContactFoundation';
import { TechFooter } from '@/components/sections/TechFooter';

export default function HomePage() {
  return (
    <SiteFrame>
      <HeroFoundation />
      <CentralPanelsFoundation />
      <ConfiguratorFoundation />
      <ProjectsFoundation />
      <WorkflowFoundation />
      <TechnologiesFoundation />
      <ContactFoundation />
      <TechFooter />
    </SiteFrame>
  );
}
