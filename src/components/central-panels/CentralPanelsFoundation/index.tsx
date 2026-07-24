import { ProblemExplorerFoundation } from '@/components/problem-explorer/ProblemExplorerFoundation';
import { ProductAssemblerFoundation } from '@/components/product-assembler/ProductAssemblerFoundation';
import styles from './CentralPanelsFoundation.module.scss';

export function CentralPanelsFoundation() {
  return (
    <div
      className={styles.panels}
      data-visual-id="central-panels"
      data-fixture-state="interactive"
      data-fixture-version="stage-8"
    >
      <ProblemExplorerFoundation />
      <ProductAssemblerFoundation />
    </div>
  );
}
