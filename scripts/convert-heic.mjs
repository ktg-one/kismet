/**
 * Convert HEIC -> optimised JPEG.
 * Uses heic-convert (pure JS) to decode HEIC, then sharp to resize/optimise.
 * Sharp on Windows lacks libheif by default, so we decode in JS first.
 *
 * Usage: node scripts/convert-heic.mjs <src.heic> <dest.jpg> [width]
 */
import heicConvert from "heic-convert";
import sharp from "sharp";
import { promises as fs } from "node:fs";

const [, , src, dest, widthArg] = process.argv;
if (!src || !dest) {
  console.error("Usage: node scripts/convert-heic.mjs <src.heic> <dest.jpg> [width]");
  process.exit(1);
}

const width = widthArg ? parseInt(widthArg, 10) : 2400;

const buf = await fs.readFile(src);
console.log(`Source: ${src} (${(buf.length / 1024 / 1024).toFixed(2)} MB)`);

// Decode HEIC -> raw JPEG buffer (heic-convert outputs JPEG quality 1.0)
const decodedJpeg = await heicConvert({ buffer: buf, format: "JPEG", quality: 1 });
console.log(`Decoded: ${(decodedJpeg.length / 1024 / 1024).toFixed(2)} MB raw JPEG`);

// Run through sharp for resize + mozjpeg compression
await sharp(Buffer.from(decodedJpeg))
  .rotate()
  .resize({ width, withoutEnlargement: true })
  .jpeg({ quality: 86, progressive: true, mozjpeg: true, chromaSubsampling: "4:4:4" })
  .toFile(dest);

const out = await fs.stat(dest);
console.log(`Wrote: ${dest} (${Math.round(out.size / 1024)} KB)`);
