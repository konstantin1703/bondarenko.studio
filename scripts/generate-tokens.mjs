import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const inputPath = path.resolve(process.argv[2] ?? path.join(root, 'docs/specs/BND_STAGE_3_TOKENS.json'));
const outputPath = path.resolve(process.argv[3] ?? path.join(root, 'src/styles/foundations/_tokens.generated.scss'));

export function toKebab(value) {
  return String(value)
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

const NON_CSS_METADATA_KEYS = new Set([
  'meta',
  'status',
  'source',
  'contrastOnBgPrimary',
  'renderNote',
  'measurementStatus',
  'generatedAt',
  'version',
  'usage',
]);

export function collectLeaves(node, prefix = []) {
  if (node === null || node === undefined) return [];

  if (typeof node !== 'object') {
    return [{ path: prefix, value: node }];
  }

  if (Array.isArray(node)) return [];

  if (Object.prototype.hasOwnProperty.call(node, 'value')) {
    return [{ path: prefix, value: node.value }];
  }

  return Object.entries(node).flatMap(([key, value]) => {
    if (NON_CSS_METADATA_KEYS.has(key)) return [];
    return collectLeaves(value, [...prefix, key]);
  });
}

export function generateScss(tokens) {
  if (!tokens || typeof tokens !== 'object' || !tokens.meta) {
    throw new Error('Token JSON must contain a meta object.');
  }
  const leaves = collectLeaves(tokens);
  if (!leaves.length) throw new Error('Token JSON contains no value leaves.');
  const declarations = leaves
    .map(({ path: segments, value }) => `  --bnd-${segments.map(toKebab).join('-')}: ${String(value)};`)
    .sort();
  return `/* Generated from BND_STAGE_3_TOKENS.json. Do not edit manually. */\n:root {\n${declarations.join('\n')}\n}\n`;
}

let tokens;
try {
  tokens = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
} catch (error) {
  console.error(`[tokens] Unable to parse ${inputPath}:`, error instanceof Error ? error.message : error);
  process.exit(1);
}

try {
  const scss = generateScss(tokens);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, scss, 'utf8');
  console.log(`[tokens] Generated ${outputPath} (${collectLeaves(tokens).length} variables).`);
} catch (error) {
  console.error('[tokens] Generation failed:', error instanceof Error ? error.message : error);
  process.exit(1);
}
