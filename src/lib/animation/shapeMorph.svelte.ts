import { animate, mix, type AnimationPlaybackControls } from 'motion';
import { untrack } from 'svelte';
import type { Attachment } from 'svelte/attachments';
import * as large from './shapesAnimatable.js';
import * as small from './shapesAnimatableSmall.js';
import { springTokens, springTransition, type SpringToken } from './spring.js';

/**
 * The 35 shapes of the M3 Expressive shape library, in the order of the spec sheet.
 * https://m3.material.io/styles/shape
 */
export const shapeNames = [
  'circle',
  'square',
  'slanted',
  'arch',
  'semicircle',
  'oval',
  'pill',
  'triangle',
  'arrow',
  'fan',
  'diamond',
  'clamshell',
  'pentagon',
  'gem',
  'verySunny',
  'sunny',
  'fourSidedCookie',
  'sixSidedCookie',
  'sevenSidedCookie',
  'nineSidedCookie',
  'twelveSidedCookie',
  'fourLeafClover',
  'eightLeafClover',
  'burst',
  'softBurst',
  'boom',
  'softBoom',
  'flower',
  'puffy',
  'puffyDiamond',
  'ghostish',
  'pixelCircle',
  'pixelTriangle',
  'bun',
  'heart'
] as const;

export type ShapeName = (typeof shapeNames)[number];

const byName = (paths: Record<string, string>, prefix: string) =>
  Object.fromEntries(
    shapeNames.map((name) => [name, paths[prefix + name[0].toUpperCase() + name.slice(1)]])
  ) as Record<ShapeName, string>;

/**
 * Every shape as a 720-point path in a 380 × 380 viewBox (`<svg viewBox="0 0 380 380">`). All
 * share one command structure, start point and winding, so any two morph cleanly. Use these for
 * large, hero-sized shapes; for anything icon-sized prefer {@link animatableShapesSmall}.
 *
 * Importing the map pulls in all 35 paths (~315 KB unminified). To ship only a few, import the
 * individual `pathAnimatable*` constants instead.
 */
export const animatableShapes = byName(large, 'pathAnimatable');

/**
 * Every shape as a 120-point path in a 48 × 48 viewBox (38 × 38 shape, centred). Same guarantees
 * as {@link animatableShapes} at an eighth of the size: the set for icons, avatars, indicators and
 * FABs. Never mix paths from the two sets in one morph — their point counts differ.
 */
export const animatableShapesSmall = byName(small, 'pathAnimatableSmall');

const prefersReducedMotion = () =>
  typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Morphs an SVG `<path>` from its current `d` to `to` on an M3 spring (default `fastSpatial`,
 * the token for shape morphs). Both paths must come from the same animatable set. Motion drives
 * the progress; the spring's overshoot carries through into the shape. Under
 * `prefers-reduced-motion` the shape swaps instantly (M3: turn off shape morphing).
 *
 * Starting a new morph mid-flight picks up from the in-between shape on screen, so stop the
 * previous controls first — {@link shapeMorph} does this for you.
 *
 * ```ts
 * morphShape(path, animatableShapesSmall.heart);
 * ```
 */
export const morphShape = (
  path: SVGPathElement,
  to: string,
  spring: SpringToken = springTokens.fastSpatial
): AnimationPlaybackControls | undefined => {
  const from = path.getAttribute('d');
  if (!from || from === to || prefersReducedMotion()) {
    path.setAttribute('d', to);
    return;
  }
  const shape = mix(from, to);
  return animate(0, 1, {
    ...springTransition(spring),
    onUpdate: (progress) => path.setAttribute('d', shape(progress))
  });
};

/**
 * Attachment that keeps a `<path>` on `shape()` and morphs whenever it changes. The first shape
 * renders without animating.
 *
 * ```svelte
 * <svg viewBox="0 0 48 48">
 *   <path
 *     fill="currentColor"
 *     {@attach shapeMorph(() => animatableShapesSmall[selected ? 'sunny' : 'circle'])}
 *   />
 * </svg>
 * ```
 */
export const shapeMorph =
  (shape: () => string, spring?: SpringToken): Attachment<SVGPathElement> =>
  (path) => {
    let controls: AnimationPlaybackControls | undefined;

    $effect(() => {
      const to = shape();
      untrack(() => {
        controls?.stop();
        controls = morphShape(path, to, spring);
      });
    });

    return () => controls?.stop();
  };
