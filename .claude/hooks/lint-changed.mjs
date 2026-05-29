#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { existsSync, statSync } from "node:fs";
import path from "node:path";

let raw = "";
process.stdin.setEncoding("utf8");
for await (const chunk of process.stdin) raw += chunk;

let payload;
try {
  payload = JSON.parse(raw);
} catch {
  process.exit(0);
}

const lintableExtensions = new Set([".js", ".jsx", ".mjs", ".cjs", ".ts", ".tsx"]);
const filePath = payload?.tool_input?.file_path;

if (!filePath || !lintableExtensions.has(path.extname(filePath))) {
  process.exit(0);
}

const absolutePath = path.resolve(filePath);

if (!existsSync(absolutePath) || !statSync(absolutePath).isFile()) {
  process.exit(0);
}

const result = spawnSync("npx", ["--no-install", "eslint", "--no-warn-ignored", absolutePath], {
  stdio: "inherit",
  shell: process.platform === "win32",
});

process.exit(result.status ?? 1);
