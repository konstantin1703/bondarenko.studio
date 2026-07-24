import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const actualDir = path.join(root, 'tests/visual/actual');
const outputDir = path.join(root, 'tests/visual/contact-sheets');
fs.mkdirSync(outputDir, { recursive: true });

const problemStates = [
  ['01 / MANUAL AUTOMATION', 'stage8-problem-01-manual-automation.png'],
  ['02 / TELEGRAM PRODUCT', 'stage8-problem-02-telegram-product.png'],
  ['03 / WEB SERVICE', 'stage8-problem-03-web-service.png'],
  ['04 / API INTEGRATION', 'stage8-problem-04-api-integration.png'],
  ['05 / AI PROCESS', 'stage8-problem-05-ai-process.png'],
  ['06 / INTERNAL CRM', 'stage8-problem-06-internal-crm.png'],
];

const productStates = [
  ['01 / AI WEB', 'stage8-product-01-ai-web.png'],
  ['02 / TELEGRAM', 'stage8-product-02-telegram.png'],
  ['03 / API AUTOMATION', 'stage8-product-03-api-automation.png'],
  ['04 / CRM INTERNAL', 'stage8-product-04-crm-internal.png'],
];

function escapeXml(value) {
  return value.replace(/[<>&'\"]/g, (character) => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;',
  })[character]);
}

async function createContactSheet(entries, columns, outputName) {
  const cellWidth = 720;
  const imageHeight = 250;
  const labelHeight = 34;
  const gap = 12;
  const padding = 16;
  const rows = Math.ceil(entries.length / columns);
  const width = padding * 2 + columns * cellWidth + (columns - 1) * gap;
  const height = padding * 2 + rows * (imageHeight + labelHeight) + (rows - 1) * gap;
  const composites = [];

  for (let index = 0; index < entries.length; index += 1) {
    const [label, fileName] = entries[index];
    const sourcePath = path.join(actualDir, fileName);
    if (!fs.existsSync(sourcePath)) throw new Error(`Missing Stage 8 state screenshot: ${sourcePath}`);
    const row = Math.floor(index / columns);
    const column = index % columns;
    const left = padding + column * (cellWidth + gap);
    const top = padding + row * (imageHeight + labelHeight + gap);
    const image = await sharp(sourcePath)
      .resize(cellWidth, imageHeight, { fit: 'contain', background: { r: 2, g: 12, b: 17, alpha: 1 } })
      .png()
      .toBuffer();
    const labelSvg = Buffer.from(`
      <svg width="${cellWidth}" height="${labelHeight}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#031116"/>
        <line x1="0" x2="${cellWidth}" y1="1" y2="1" stroke="#1f8589" stroke-width="1"/>
        <text x="12" y="22" fill="#72d9d5" font-family="monospace" font-size="13" letter-spacing="1">${escapeXml(label)}</text>
      </svg>
    `);
    composites.push({ input: image, left, top });
    composites.push({ input: labelSvg, left, top: top + imageHeight });
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

const problemSheet = await createContactSheet(problemStates, 2, 'stage8-problem-states.png');
const productSheet = await createContactSheet(productStates, 2, 'stage8-product-states.png');
console.log(JSON.stringify({ problemSheet, productSheet }, null, 2));
