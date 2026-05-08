import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";

const SRC = "photos-raw";
const DEST = "public/photos";

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
    beforeMB: (before / 1024 / 1024).toFixed(2),
    afterKB: Math.round(after / 1024),
    saved: `${Math.round((1 - after / before) * 100)}%`,
  });
}

console.table(results);
