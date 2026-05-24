#!/usr/bin/env node
// PostToolUse hook: lint the file Claude just edited.
// Reads Claude Code hook payload from stdin, runs ESLint if the path is .ts/.tsx.
import { spawnSync } from "node:child_process";

let raw = "";
process.stdin.setEncoding("utf8");
for await (const chunk of process.stdin) raw += chunk;

let payload;
try {
  payload = JSON.parse(raw);
} catch {
  process.exit(0);
}

const file = payload?.tool_input?.file_path;
if (!file || !/\.(ts|tsx)$/.test(file)) process.exit(0);

const res = spawnSync(
  "npx",
  ["--no-install", "eslint", "--no-warn-ignored", file],
  { stdio: "inherit", shell: true }
);

process.exit(res.status ?? 0);
