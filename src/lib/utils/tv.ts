import { createTV } from 'tailwind-variants';

export type { VariantProps } from 'tailwind-variants';

/** The layer names from `styles/layers.css`. Keep the two in sync. */
const LAYERS = ['bar', 'rail', 'sheet', 'fab', 'pane', 'modal', 'snackbar', 'popup'];

/**
 * The library's `tv`. It teaches tailwind-merge that `z-layer-*` sets z-index, so a consumer's
 * `class="z-40"` replaces a component's layer instead of fighting it in CSS order.
 */
export const tv = createTV({
  twMergeConfig: {
    extend: { classGroups: { z: [{ 'z-layer': LAYERS }] } }
  }
});
