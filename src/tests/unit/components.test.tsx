import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { SectionFrame } from '@/components/layout/SectionFrame';
import { CutCornerPanel } from '@/components/hud/CutCornerPanel';
import { Header } from '@/components/layout/Header';
import { OctagonalCore } from '@/components/product-assembler/OctagonalCore';

describe('foundation components', () => {
  it('SectionFrame renders the requested ID and system number', () => {
    const html = renderToStaticMarkup(
      <SectionFrame id="test-section" number="02" eyebrow="TEST" title="TITLE">
        <p>Content</p>
      </SectionFrame>,
    );
    expect(html).toContain('id="test-section"');
    expect(html).toContain('>02<');
  });

  it('CutCornerPanel preserves semantic element', () => {
    const html = renderToStaticMarkup(
      <CutCornerPanel as="article">
        <p>Panel</p>
      </CutCornerPanel>,
    );
    expect(html.startsWith('<article')).toBe(true);
  });

  it('Header contains real section anchors', () => {
    const html = renderToStaticMarkup(<Header />);
    for (const anchor of ['#home', '#change', '#products', '#configurator', '#projects', '#contacts']) {
      expect(html).toContain(`href="${anchor}"`);
    }
  });

  it('OctagonalCore contains expected layer groups and no raster image', () => {
    const html = renderToStaticMarkup(<OctagonalCore decorative={false} />);
    for (const id of [
      'core-outer-silhouette',
      'core-segmented-contour',
      'core-corner-brackets',
      'core-secondary-frame',
      'core-glass-shell',
      'core-inner-segments',
      'core-central-panel',
      'core-internal-nodes',
      'core-labels',
      'core-route-anchors',
    ]) {
      expect(html).toContain(`id="${id}"`);
    }
    expect(html).not.toContain('<image');
  });
});
