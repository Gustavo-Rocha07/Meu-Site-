import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(root, 'assets', 'img', 'logo.png');
const APP = path.join(root, 'app');

// icon.png (browsers) and apple-icon.png (iOS, 180x180)
await sharp(SRC)
  .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
  .png()
  .toFile(path.join(APP, 'icon.png'));

await sharp(SRC)
  .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
  .png()
  .toFile(path.join(APP, 'apple-icon.png'));

// favicon.ico — wrap a 32x32 PNG in a minimal ICO container
const png32 = await sharp(SRC)
  .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
  .png()
  .toBuffer();

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(1, 4); // image count

const entry = Buffer.alloc(16);
entry.writeUInt8(32, 0);              // width (0 = 256)
entry.writeUInt8(32, 1);              // height
entry.writeUInt8(0, 2);               // color palette
entry.writeUInt8(0, 3);               // reserved
entry.writeUInt16LE(1, 4);            // color planes
entry.writeUInt16LE(32, 6);           // bits per pixel
entry.writeUInt32LE(png32.length, 8); // image size
entry.writeUInt32LE(22, 12);          // offset (6 + 16)

const ico = Buffer.concat([header, entry, png32]);
await writeFile(path.join(APP, 'favicon.ico'), ico);

console.log('Generated app/icon.png (512x512), app/apple-icon.png (180x180), app/favicon.ico (32x32)');
