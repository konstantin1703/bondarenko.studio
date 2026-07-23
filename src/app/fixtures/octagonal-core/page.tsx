import { OctagonalCore } from '@/components/product-assembler/OctagonalCore';
import styles from './fixture.module.scss';

export default function OctagonalCoreFixturePage() {
  return (
    <main className={styles.page}>
      <section data-core-fixture="idle"><OctagonalCore size={280} state="idle" decorative={false} /></section>
      <section data-core-fixture="active"><OctagonalCore size={280} state="active" decorative={false} /></section>
    </main>
  );
}
