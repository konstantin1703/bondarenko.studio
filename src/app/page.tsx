import { SiteFrame } from '@/components/layout/SiteFrame';
import { HeroFoundation } from '@/components/hero/HeroFoundation';
import { ProblemExplorerFoundation } from '@/components/problem-explorer/ProblemExplorerFoundation';
import { ProductAssemblerFoundation } from '@/components/product-assembler/ProductAssemblerFoundation';
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
      <div data-visual-id="central-panels" data-fixture-state="foundation" data-fixture-version="stage-4">
        <ProblemExplorerFoundation />
        <ProductAssemblerFoundation />
      </div>
      <ConfiguratorFoundation />
      <ProjectsFoundation />
      <WorkflowFoundation />
      <TechnologiesFoundation />
      <ContactFoundation />
      <TechFooter />
    </SiteFrame>
  );
}
