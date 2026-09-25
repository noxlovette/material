import type { ShapeName } from '$lib/animation/shapeMorph.svelte.js';
import type { Avatar as AvatarPrimitive } from 'bits-ui';
import type { VariantProps } from 'tailwind-variants';
import type { DicebearStyleName } from './dicebearStyles.js';
import type { avatar } from './theme.js';

export type AvatarVariants = VariantProps<typeof avatar>;

/**
 * Dicebear (https://www.dicebear.com) avatar styles available for the generated fallback
 * avatar. Derived from `DICEBEAR_STYLES` in `dicebearStyles.ts` — extend the list there.
 */
export type DicebearStyle = DicebearStyleName;

export type AvatarProps = AvatarPrimitive.RootProps & {
  /** The URL of the avatar image. If null or undefined, a generated avatar will be used. */
  src?: string | null;
  /** The alt text for the avatar image. */
  alt?: string;
  /** The seed for the generated avatar if no src is provided. */
  seed?: string;
  /** The Dicebear style used for the generated fallback avatar. @default 'gaze' */
  dicebearStyle?: DicebearStyle;
  /**
   * Hex background colors (no `#`) for the generated fallback avatar. Defaults to the
   * current app's own M3 container-tier tokens (`getMaterialAvatarPalette()`), read live
   * from CSS custom properties — every app's tokens differ since they derive from that
   * app's own chosen source color, so the fallback isn't a fixed palette.
   */
  backgroundColor?: string[];
  /**
   * DiceBear variant tags for the generated fallback avatar, e.g. `['animation']` to opt a
   * supporting style (`gaze`, `shapes`, `blobs`, …) into its animated variants, or
   * `['!animation']` to force the static one. A no-op for styles without that tag.
   * @see https://www.dicebear.com/guides/filter-variants-with-tags
   * @default ['animation']
   */
  tags?: string[];
  /**
   * The M3 Expressive shape the avatar is cut to (`shapeNames` lists all 35). Changing it morphs
   * the outline on the `fastSpatial` spring; under reduced motion it swaps instantly.
   * @see https://m3.material.io/styles/shape
   * @default 'circle'
   */
  shape?: ShapeName;
  /**
   * Turns the shape at a constant speed, one turn every 14s. Only the outline turns; the
   * picture stays upright. Decorative, so reduced motion keeps it still. A circle looks the
   * same at every angle, so pair this with another `shape`.
   * @default 'none'
   */
  spin?: 'none' | 'clockwise' | 'counterclockwise';
  /** The loading status of the avatar image. */
  loadingStatus?: 'loading' | 'loaded' | 'error';
  /** Callback for when the avatar is clicked. If provided, the avatar is wrapped in a button. */
  onclick?: (e: MouseEvent) => void;
  /** Additional CSS classes for the avatar element. */
  class?: string;
} & AvatarVariants;
