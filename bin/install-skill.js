#!/usr/bin/env node
import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const source = join(__dirname, '..', 'claude-skill', 'material-design');
const destDir = join(process.cwd(), '.claude', 'skills');
const dest = join(destDir, 'material-design');
const force = process.argv.includes('--force');

if (!existsSync(source)) {
  console.error(
    'Could not find the bundled material-design skill. Reinstall @noxlovette/material and try again.'
  );
  process.exit(1);
}

if (existsSync(dest) && !force) {
  console.error(
    `.claude/skills/material-design already exists. Re-run with --force to overwrite it.`
  );
  process.exit(1);
}

mkdirSync(destDir, { recursive: true });
cpSync(source, dest, { recursive: true, force: true });

console.log(`Installed the material-design Claude Code skill to .claude/skills/material-design`);
