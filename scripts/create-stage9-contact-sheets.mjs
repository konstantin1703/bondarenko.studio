import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const actualDir = path.join(root, 'tests/visual/actual');
const outputDir = path.join(root, 'tests/visual/contact-sheets');
fs.mkdirSync(outputDir, { recursive: true });

const zones = [
  ['01 / HERO', 'hero'],
  ['02 / PROBLEM EXPLORER', 'problem-explorer'],
  ['03 / PRODUCT ASSEMBLER', 'product-assembler'],
  ['04 / CONFIGURATOR', 'configurator'],
  ['05 / PROJECTS', 'projects'],
  ['06 / WORKFLOW', 'workflow'],
  ['07 / TECHNOLOGIES', 'technologies'],
  ['08 / CONTACT', 'contact'],
  ['09 / FOOTER', 'footer'],
];

function escapeXml(value) {
  return value.replace(/[<>&'\"]/g, (character) => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '\"': '&quot;',
  })[character]);
}

async function createSheet({ mobile, outputName }) {
  const cellWidth = mobile ? 390 : 1180;
  const imageHeight = mobile ? 520 : 430;
  const labelHeight = mobile ? 38 : 42;
  const gap = mobile ? 10 : 14;
  const padding = mobile ? 14 : 20;
  const width = padding * 2 + cellWidth;
  const height = padding * 2 + zones.length * (imageHeight + labelHeight) + (zones.length - 1) * gap;
  const composites = [];

  for (let index = 0; index < zones.length; index += 1) {
    const [label, slug] = zones[index];
    const fileName = `stage9-zone-${mobile ? 'mobile-' : ''}${slug}.png`;
    const sourcePath = path.join(actualDir, fileName);
    if (!fs.existsSync(sourcePath)) throw new Error(`Missing Stage 9 zone screenshot: ${sourcePath}`);
    const top = padding + index * (imageHeight + labelHeight + gap);
    const image = await sharp(sourcePath)
      .resize(cellWidth, imageHeight, {
        fit: 'contain',
        position: 'top',
        background: { r: 2, g: 12, b: 17, alpha: 1 },
      })
      .png()
      .toBuffer();
    const labelSvg = Buffer.from(`
      <svg width="${cellWidth}" height="${labelHeight}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#031116"/>
        <line x1="0" x2="${cellWidth}" y1="1" y2="1" stroke="#23898d" stroke-width="1"/>
        <text x="14" y="${mobile ? 25 : 28}" fill="#72d9d5" font-family="monospace" font-size="${mobile ? 12 : 14}" letter-spacing="1">${escapeXml(label)}</text>
      </svg>
    `);
    composites.push({ input: image, left: padding, top });
    composites.push({ input: labelSvg, left: padding, top: top + imageHeight });
  }

  const outputPath = path.join(outputDir, outputName);
  await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 1, g: 8, b: 12, alpha: 1 },
    },
  }).composite(composites).png().toFile(outputPath);
  return outputPath;
}

const desktop = await createSheet({ mobile: false, outputName: 'stage9-full-page-desktop-contact-sheet.png' });
const mobile = await createSheet({ mobile: true, outputName: 'stage9-full-page-mobile-contact-sheet.png' });
console.log(JSON.stringify({ desktop, mobile }, null, 2));
