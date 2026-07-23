import { describe, expect, it } from 'vitest';
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

describe('token generator', () => {
  it('creates semantic CSS variables from token leaves', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bnd-token-'));
    const input = path.join(dir, 'tokens.json');
    const output = path.join(dir, 'tokens.scss');
    fs.writeFileSync(input, JSON.stringify({ meta: { status: 'test' }, color: { background: { primary: { value: '#020C11', status: 'preliminary' } } }, space: { 4: { value: '16px' } }, typography: { displayXl: { desktop: '96px', lineHeight: 0.92, status: 'preliminary' } } }));
    execFileSync(process.execPath, ['scripts/generate-tokens.mjs', input, output], { cwd: process.cwd() });
    const result = fs.readFileSync(output, 'utf8');
    expect(result).toContain('--bnd-color-background-primary: #020C11;');
    expect(result).toContain('--bnd-space-4: 16px;');
    expect(result).toContain('--bnd-typography-display-xl-desktop: 96px;');
    expect(result).toContain('--bnd-typography-display-xl-line-height: 0.92;');
    expect(result).not.toContain('preliminary');
  });

  it('rejects invalid JSON', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bnd-token-invalid-'));
    const input = path.join(dir, 'tokens.json');
    const output = path.join(dir, 'tokens.scss');
    fs.writeFileSync(input, '{ broken');
    const result = spawnSync(process.execPath, ['scripts/generate-tokens.mjs', input, output], { cwd: process.cwd() });
    expect(result.status).not.toBe(0);
  });

  it('the Stage 3 source generates the required foundation token families', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bnd-token-source-'));
    const output = path.join(dir, 'tokens.scss');
    execFileSync(process.execPath, [
      'scripts/generate-tokens.mjs',
      'docs/specs/BND_STAGE_3_TOKENS.json',
      output,
    ], { cwd: process.cwd() });
    const result = fs.readFileSync(output, 'utf8');
    for (const token of [
      '--bnd-color-background-primary:',
      '--bnd-color-surface-panel-default:',
      '--bnd-space-4:',
      '--bnd-border-width-standard:',
      '--bnd-corner-cut-md:',
      '--bnd-motion-duration-standard:',
      '--bnd-typography-display-xl-desktop:',
      '--bnd-glow-selected-opacity:',
    ]) expect(result).toContain(token);
    expect((result.match(/^  --bnd-/gm) ?? []).length).toBeGreaterThan(200);
  });

});
