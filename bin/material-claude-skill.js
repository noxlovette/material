#!/usr/bin/env node
// Installs the `material-design` Claude skill shipped with @noxlovette/material into the current
// project's .claude/skills/. Usage: npx @noxlovette/material material-claude-skill [--force]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const source = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'claude-skill',
  'material-design'
);
const dest = path.resolve(process.cwd(), '.claude', 'skills', 'material-design');
const force = process.argv.includes('--force');

if (!fs.existsSync(source)) {
  console.error(`Skill not found at ${source}; this package build doesn't include it.`);
  process.exit(1);
}
if (fs.existsSync(dest) && !force) {
  console.error(
    `${path.relative(process.cwd(), dest)} already exists. Re-run with --force to overwrite it.`
  );
  process.exit(1);
}

fs.rmSync(dest, { recursive: true, force: true });
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.cpSync(source, dest, { recursive: true });
console.log(`Installed the material-design skill into ${path.relative(process.cwd(), dest)}`);
