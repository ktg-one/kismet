import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";

const SRC = process.argv[2] || "photos-raw";
const DEST = process.argv[3] || "public/photos";

const files = (await fs.readdir(SRC)).filter((f) => f.endsWith(".jpg"));

await fs.mkdir(DEST, { recursive: true });

const results = [];
for (const file of files) {
  const srcPath = path.join(SRC, file);
  const destPath = path.join(DEST, file);
  const before = (await fs.stat(srcPath)).size;

  await sharp(srcPath)
    .resize({ width: 2400, withoutEnlargement: true })
    .jpeg({
      quality: 86,
      progressive: true,
      mozjpeg: true,
      chromaSubsampling: "4:4:4",
    })
    .toFile(destPath);

  const after = (await fs.stat(destPath)).size;
  results.push({
    file,
    beforeKB: Math.round(before / 1024),
    afterKB: Math.round(after / 1024),
    saved: `${Math.round((1 - after / before) * 100)}%`,
  });
}

console.table(results);
