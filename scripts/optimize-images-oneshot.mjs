import sharp from 'sharp';
import { readdir, stat, rename, unlink } from 'node:fs/promises';
import { join, extname } from 'node:path';

const DIR = 'public/images';
const JPEG_QUALITY = 82;
const PNG_TO_JPEG = true;
const MAX_WIDTH = 1600;

async function processFile(filename) {
  const path = join(DIR, filename);
  const ext = extname(filename).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return null;

  const sizeBefore = (await stat(path)).size;
  const image = sharp(path);
  const metadata = await image.metadata();
  const needsResize = metadata.width > MAX_WIDTH;
  const pipeline = needsResize
    ? image.resize({ width: MAX_WIDTH, withoutEnlargement: true })
    : image;

  const tempPath = path + '.tmp';
  let finalPath = path;

  if (ext === '.png') {
    if (PNG_TO_JPEG && !metadata.hasAlpha) {
      const jpgPath = path.replace(/\.png$/i, '.jpg');
      await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(jpgPath + '.tmp');
      await unlink(path);
      await rename(jpgPath + '.tmp', jpgPath);
      finalPath = jpgPath;
    } else {
      await pipeline.png({ compressionLevel: 9, palette: true }).toFile(tempPath);
      await unlink(path);
      await rename(tempPath, path);
    }
  } else {
    await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(tempPath);
    await unlink(path);
    await rename(tempPath, path);
  }

  const sizeAfter = (await stat(finalPath)).size;
  return {
    file: filename,
    before: sizeBefore,
    after: sizeAfter,
    saved: sizeBefore - sizeAfter,
    renamed: finalPath !== path ? finalPath : null,
  };
}

async function main() {
  const files = await readdir(DIR);
  const results = [];
  for (const f of files) {
    try {
      const r = await processFile(f);
      if (r) results.push(r);
    } catch (e) {
      console.error(`Error on ${f}:`, e.message);
    }
  }

  const totalBefore = results.reduce((s, r) => s + r.before, 0);
  const totalAfter = results.reduce((s, r) => s + r.after, 0);

  console.log('\nResults:');
  for (const r of results) {
    const pct = ((1 - r.after / r.before) * 100).toFixed(0);
    const arrow = r.renamed ? ' -> ' + r.renamed.split('/').pop() : '';
    console.log('  ' + r.file + ': ' + (r.before/1024).toFixed(0) + 'KB -> ' + (r.after/1024).toFixed(0) + 'KB (-' + pct + '%)' + arrow);
  }
  console.log('\nTotal: ' + (totalBefore/1024).toFixed(0) + 'KB -> ' + (totalAfter/1024).toFixed(0) + 'KB (saved ' + ((totalBefore-totalAfter)/1024).toFixed(0) + 'KB)');
}

main();
