import { OptionsDescriptor, Style } from '@dicebear/core';

/**
 * `@dicebear/core` does not publicly export its `Descriptor`/`FieldDescriptor` types (only
 * the `OptionsDescriptor` class itself), so they're recovered structurally from its `toJSON()`
 * return type instead of being duplicated by hand.
 */
export type DicebearDescriptor = ReturnType<InstanceType<typeof OptionsDescriptor>['toJSON']>;
export type DicebearFieldDescriptor = DicebearDescriptor[string];

/**
 * Every style shipped by `@dicebear/styles` (v10). Kept as the single source of
 * truth for the `DicebearStyle` type in `types.ts` — extend this list first when
 * DiceBear adds a new style, everything else derives from it.
 */
export const DICEBEAR_STYLES = [
  'adventurer',
  'adventurer-neutral',
  'avataaars',
  'avataaars-neutral',
  'big-ears',
  'big-ears-neutral',
  'big-smile',
  'blobs',
  'bottts',
  'bottts-neutral',
  'cameo',
  'clay',
  'constellation',
  'critters',
  'croodles',
  'croodles-neutral',
  'cutouts',
  'disco',
  'dylan',
  'fun-emoji',
  'gaze',
  'glass',
  'glyphs',
  'icons',
  'identicon',
  'initial-face',
  'initials',
  'landscape',
  'line-face',
  'loops',
  'lorelei',
  'lorelei-neutral',
  'marbles',
  'micah',
  'miniavs',
  'moods',
  'notionists',
  'notionists-neutral',
  'open-peeps',
  'patchwork',
  'personas',
  'pixel-art',
  'pixel-art-neutral',
  'pixelbot',
  'planets',
  'rings',
  'shadows',
  'shape-grid',
  'shapes',
  'slice',
  'sprouts',
  'squircles',
  'stack',
  'stripes',
  'thumbs',
  'toon-head',
  'triangles',
  'voxel-art',
  'voxel-bot',
  'waves',
  'weave'
] as const;

export type DicebearStyleName = (typeof DICEBEAR_STYLES)[number];

/**
 * One dynamic `import()` per style, written out literally (not a template
 * expression) so every bundler — Vite, Rollup, webpack, esbuild — can
 * statically analyze and code-split each style into its own lazily-loaded
 * chunk. A generated/templated import here would defeat that analysis.
 */
// Not annotated with an explicit `StyleDefinition` return type: TS widens the enum-like string
// literals inside each imported JSON module (e.g. element `type`) to `string`, which doesn't
// structurally satisfy `StyleDefinition`'s literal unions. `Style` is happy to accept the
// as-imported shape directly (it validates the real JSON against DiceBear's schema at runtime).
const styleLoaders: Record<DicebearStyleName, () => Promise<{ default: unknown }>> = {
  adventurer: () => import('@dicebear/styles/adventurer.json'),
  'adventurer-neutral': () => import('@dicebear/styles/adventurer-neutral.json'),
  avataaars: () => import('@dicebear/styles/avataaars.json'),
  'avataaars-neutral': () => import('@dicebear/styles/avataaars-neutral.json'),
  'big-ears': () => import('@dicebear/styles/big-ears.json'),
  'big-ears-neutral': () => import('@dicebear/styles/big-ears-neutral.json'),
  'big-smile': () => import('@dicebear/styles/big-smile.json'),
  blobs: () => import('@dicebear/styles/blobs.json'),
  bottts: () => import('@dicebear/styles/bottts.json'),
  'bottts-neutral': () => import('@dicebear/styles/bottts-neutral.json'),
  cameo: () => import('@dicebear/styles/cameo.json'),
  clay: () => import('@dicebear/styles/clay.json'),
  constellation: () => import('@dicebear/styles/constellation.json'),
  critters: () => import('@dicebear/styles/critters.json'),
  croodles: () => import('@dicebear/styles/croodles.json'),
  'croodles-neutral': () => import('@dicebear/styles/croodles-neutral.json'),
  cutouts: () => import('@dicebear/styles/cutouts.json'),
  disco: () => import('@dicebear/styles/disco.json'),
  dylan: () => import('@dicebear/styles/dylan.json'),
  'fun-emoji': () => import('@dicebear/styles/fun-emoji.json'),
  gaze: () => import('@dicebear/styles/gaze.json'),
  glass: () => import('@dicebear/styles/glass.json'),
  glyphs: () => import('@dicebear/styles/glyphs.json'),
  icons: () => import('@dicebear/styles/icons.json'),
  identicon: () => import('@dicebear/styles/identicon.json'),
  'initial-face': () => import('@dicebear/styles/initial-face.json'),
  initials: () => import('@dicebear/styles/initials.json'),
  landscape: () => import('@dicebear/styles/landscape.json'),
  'line-face': () => import('@dicebear/styles/line-face.json'),
  loops: () => import('@dicebear/styles/loops.json'),
  lorelei: () => import('@dicebear/styles/lorelei.json'),
  'lorelei-neutral': () => import('@dicebear/styles/lorelei-neutral.json'),
  marbles: () => import('@dicebear/styles/marbles.json'),
  micah: () => import('@dicebear/styles/micah.json'),
  miniavs: () => import('@dicebear/styles/miniavs.json'),
  moods: () => import('@dicebear/styles/moods.json'),
  notionists: () => import('@dicebear/styles/notionists.json'),
  'notionists-neutral': () => import('@dicebear/styles/notionists-neutral.json'),
  'open-peeps': () => import('@dicebear/styles/open-peeps.json'),
  patchwork: () => import('@dicebear/styles/patchwork.json'),
  personas: () => import('@dicebear/styles/personas.json'),
  'pixel-art': () => import('@dicebear/styles/pixel-art.json'),
  'pixel-art-neutral': () => import('@dicebear/styles/pixel-art-neutral.json'),
  pixelbot: () => import('@dicebear/styles/pixelbot.json'),
  planets: () => import('@dicebear/styles/planets.json'),
  rings: () => import('@dicebear/styles/rings.json'),
  shadows: () => import('@dicebear/styles/shadows.json'),
  'shape-grid': () => import('@dicebear/styles/shape-grid.json'),
  shapes: () => import('@dicebear/styles/shapes.json'),
  slice: () => import('@dicebear/styles/slice.json'),
  sprouts: () => import('@dicebear/styles/sprouts.json'),
  squircles: () => import('@dicebear/styles/squircles.json'),
  stack: () => import('@dicebear/styles/stack.json'),
  stripes: () => import('@dicebear/styles/stripes.json'),
  thumbs: () => import('@dicebear/styles/thumbs.json'),
  'toon-head': () => import('@dicebear/styles/toon-head.json'),
  triangles: () => import('@dicebear/styles/triangles.json'),
  'voxel-art': () => import('@dicebear/styles/voxel-art.json'),
  'voxel-bot': () => import('@dicebear/styles/voxel-bot.json'),
  waves: () => import('@dicebear/styles/waves.json'),
  weave: () => import('@dicebear/styles/weave.json')
};

const styleCache = new Map<DicebearStyleName, Promise<Style>>();

/** Lazily imports and validates a style definition, caching the resulting `Style` instance. */
export function loadDicebearStyle(name: DicebearStyleName): Promise<Style> {
  let cached = styleCache.get(name);
  if (!cached) {
    cached = styleLoaders[name]().then((mod) => new Style(mod.default));
    styleCache.set(name, cached);
  }
  return cached;
}

const descriptorCache = new Map<DicebearStyleName, Promise<DicebearDescriptor>>();

/** Lazily builds the `OptionsDescriptor` JSON for a style, describing every option it accepts. */
export function loadDicebearOptionsDescriptor(
  name: DicebearStyleName
): Promise<DicebearDescriptor> {
  let cached = descriptorCache.get(name);
  if (!cached) {
    cached = loadDicebearStyle(name).then((style) => new OptionsDescriptor(style).toJSON());
    descriptorCache.set(name, cached);
  }
  return cached;
}

/** Turns a style name like `big-ears-neutral` into `Big Ears Neutral`. */
export function formatDicebearStyleLabel(name: string): string {
  return name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}
