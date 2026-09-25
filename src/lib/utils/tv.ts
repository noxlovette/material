import { extendTailwindMerge } from 'tailwind-merge';
import { createTV } from 'tailwind-variants';

export type { VariantProps } from 'tailwind-variants';

/** The layer names from `styles/layers.css`. Keep the two in sync. */
const LAYERS = ['bar', 'rail', 'sheet', 'fab', 'pane', 'modal', 'snackbar', 'popup'];

/**
 * What tailwind-merge doesn't know about this library's classes:
 * - `z-layer-*` sets z-index, so a consumer's `class="z-40"` replaces a component's layer.
 * - `*-spacing-<N>` (styles/spacing.css) is a spacing value, so `size-[18px]` or `p-4` replaces
 *   `size-spacing-250` or `p-spacing-200` instead of both classes shipping and CSS order deciding.
 */
const twMergeConfig = {
  extend: {
    theme: { spacing: [(value: string) => /^spacing-\d+$/.test(value)] },
    classGroups: { z: [{ 'z-layer': LAYERS }] }
  }
};

/** The library's `tv`, with {@link twMergeConfig}. */
export const tv = createTV({ twMergeConfig });

/** tailwind-merge with the same config, for class lists built outside `tv()`. */
export const twMerge = extendTailwindMerge(twMergeConfig);
