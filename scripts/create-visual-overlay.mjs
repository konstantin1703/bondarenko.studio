import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const [referenceArg, actualArg, outputStemArg] = process.argv.slice(2);
if (!referenceArg || !actualArg) {
  console.error('Usage: node scripts/create-visual-overlay.mjs <reference.png> <actual.png> [output-stem]');
  process.exit(1);
}

const root = process.cwd();
const referencePath = path.resolve(referenceArg);
const actualPath = path.resolve(actualArg);
const stem = outputStemArg ?? path.basename(actualPath, path.extname(actualPath));
const overlayPath = path.join(root, 'tests/visual/overlays', `${stem}-overlay.png`);
const diffPath = path.join(root, 'tests/visual/diffs', `${stem}-diff.png`);
const resizedPath = path.join(root, 'tests/visual/overlays', `${stem}-actual-resized-for-comparison.png`);

for (const candidate of [referencePath, actualPath]) {
  if (!fs.existsSync(candidate)) throw new Error(`Missing image: ${candidate}`);
}
fs.mkdirSync(path.dirname(overlayPath), { recursive: true });
fs.mkdirSync(path.dirname(diffPath), { recursive: true });

const referenceMeta = await sharp(referencePath).metadata();
const actualMeta = await sharp(actualPath).metadata();
if (!referenceMeta.width || !referenceMeta.height || !actualMeta.width || !actualMeta.height) {
  throw new Error('Unable to read image dimensions.');
}

let comparableActual = actualPath;
if (referenceMeta.width !== actualMeta.width || referenceMeta.height !== actualMeta.height) {
  await sharp(actualPath)
    .resize(referenceMeta.width, referenceMeta.height, { fit: 'fill' })
    .png()
    .toFile(resizedPath);
  comparableActual = resizedPath;
  console.warn(`[overlay] Dimensions differed. Created explicit comparison copy: ${resizedPath}`);
}

const actualHalfAlpha = await sharp(comparableActual)
  .removeAlpha()
  .toColourspace('srgb')
  .ensureAlpha(0.5)
  .png()
  .toBuffer();

const actualOpaque = await sharp(comparableActual)
  .removeAlpha()
  .toColourspace('srgb')
  .png()
  .toBuffer();

await sharp(referencePath)
  .removeAlpha()
  .toColourspace('srgb')
  .composite([{ input: actualHalfAlpha, blend: 'over' }])
  .png()
  .toFile(overlayPath);

await sharp(referencePath)
  .removeAlpha()
  .toColourspace('srgb')
  .composite([{ input: actualOpaque, blend: 'difference' }])
  .normalise()
  .png()
  .toFile(diffPath);

console.log(JSON.stringify({
  referencePath,
  actualPath,
  comparableActual,
  overlayPath,
  diffPath,
  referenceSize: `${referenceMeta.width}x${referenceMeta.height}`,
  actualSize: `${actualMeta.width}x${actualMeta.height}`,
}, null, 2));
