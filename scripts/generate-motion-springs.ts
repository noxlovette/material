#!/usr/bin/env bun
/**
 * Bakes the M3 Expressive spring tokens (src/lib/animation/spring.ts) into CSS `linear()` easings
 * and rewrites the generated block in src/lib/styles/motion.css between its @generated markers.
 *
 *   bun scripts/generate-motion-springs.ts && bunx prettier --write src/lib/styles/motion.css
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { springCss, springTokens } from '../src/lib/animation/spring.ts';

const CSS_FILE = path.join(process.cwd(), 'src', 'lib', 'styles', 'motion.css');
const START = '/* @generated:springs:start */';
const END = '/* @generated:springs:end */';

// [token, CSS var suffix]. Spatial keeps the original `--md-sys-motion-*-spatial` names; effects
// springs get an `-effects-spring` suffix so they don't collide with the non-spring effects tokens.
const VARS = [
  ['fastSpatial', 'fast-spatial'],
  ['spatial', 'spatial'],
  ['slowSpatial', 'slow-spatial'],
  ['fastEffects', 'fast-effects-spring'],
  ['effects', 'effects-spring'],
  ['slowEffects', 'slow-effects-spring']
] as const;

const block = VARS.map(([token, suffix]) => {
  const { duration, easing } = springCss(springTokens[token]);
  return [
    `  --md-sys-motion-timing-function-${suffix}: ${easing};`,
    `  --md-sys-motion-duration-${suffix}: ${duration};`,
    `  --md-sys-motion-easing-${suffix}: var(--md-sys-motion-timing-function-${suffix})`,
    `    var(--md-sys-motion-duration-${suffix});`
  ].join('\n');
}).join('\n\n');

async function main(): Promise<void> {
  const css = await fs.readFile(CSS_FILE, 'utf8');
  const start = css.indexOf(START);
  const end = css.indexOf(END);
  if (start === -1 || end === -1 || end < start) {
    throw new Error(
      `Missing ${START} / ${END} markers in ${path.relative(process.cwd(), CSS_FILE)}`
    );
  }
  const next = `${css.slice(0, start + START.length)}\n${block}\n  ${css.slice(end)}`;
  await fs.writeFile(CSS_FILE, next);
  console.log(`Updated spring tokens in ${path.relative(process.cwd(), CSS_FILE)}`);
}

main().catch((err) => {
  console.error('Failed to generate motion spring tokens:', err);
  process.exitCode = 1;
});
