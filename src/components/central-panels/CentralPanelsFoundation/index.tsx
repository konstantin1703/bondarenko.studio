import { ProblemExplorerFoundation } from '@/components/problem-explorer/ProblemExplorerFoundation';
import { ProductAssemblerFoundation } from '@/components/product-assembler/ProductAssemblerFoundation';
import styles from './CentralPanelsFoundation.module.scss';

export function CentralPanelsFoundation() {
  return (
    <div
      className={styles.panels}
      data-visual-id="central-panels"
      data-fixture-state="calibrated"
      data-fixture-version="stage-6"
    >
      <ProblemExplorerFoundation />
      <ProductAssemblerFoundation />
    </div>
  );
}
