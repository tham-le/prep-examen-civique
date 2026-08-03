import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const iconsDir = path.join(__dirname, '..', 'public', 'icons');
const source = path.join(iconsDir, 'icon.svg');

const targets = [
  { file: 'icon-192.png', size: 192 },
  { file: 'icon-512.png', size: 512 },
  { file: 'apple-touch-icon.png', size: 180 },
];

for (const { file, size } of targets) {
  await sharp(source, { density: 384 })
    .resize(size, size)
    .png()
    .toFile(path.join(iconsDir, file));
  console.log(`Generated ${file} (${size}x${size})`);
}

const ogImageSource = path.join(iconsDir, 'og-image.svg');
await sharp(ogImageSource)
  .resize(1200, 630)
  .png()
  .toFile(path.join(iconsDir, 'og-image.png'));
console.log('Generated og-image.png (1200x630)');
