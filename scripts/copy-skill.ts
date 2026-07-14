#!/usr/bin/env bun
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const SOURCE = path.join(ROOT, '.claude', 'skills', 'material-design');
const DEST = path.join(ROOT, 'claude-skill', 'material-design');

async function main(): Promise<void> {
  await fs.rm(path.join(ROOT, 'claude-skill'), { recursive: true, force: true });
  await fs.mkdir(path.dirname(DEST), { recursive: true });
  await fs.cp(SOURCE, DEST, { recursive: true });
  console.log(`Copied ${path.relative(ROOT, SOURCE)} -> ${path.relative(ROOT, DEST)}`);
}

main().catch((err) => {
  console.error('Failed to copy the material-design skill for publishing:', err);
  process.exitCode = 1;
});
