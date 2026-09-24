import { tv, type VariantProps } from '$lib/utils/tv.js';

export type SearchVariants = VariantProps<typeof search>;

/**
 * M3 Expressive contained search bar (https://m3.material.io/components/search/specs):
 * 56dp, circular, surface-container-high, flat. 48dp leading/trailing targets at a 4dp inset,
 * 4dp between the leading element and the label, 0 between trailing actions; 16dp at an edge
 * with no action. Hover 8% / pressed 10% on-surface; focus 3dp secondary outline, 2dp offset.
 */
export const search = tv({
  slots: {
    base: 'state-layer relative flex h-spacing-700 w-full max-w-[720px] grow cursor-text items-center rounded-full bg-md-sys-color-surface-container-high ps-spacing-50 pe-spacing-50 before:rounded-full hover:before:bg-md-sys-color-on-surface/8 active:before:bg-md-sys-color-on-surface/10 has-[input:focus-visible]:outline-3 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-md-sys-color-secondary',
    leading: 'text-md-sys-color-on-surface relative flex shrink-0 items-center',
    leadingIcon: 'text-md-sys-color-on-surface grid size-spacing-600 shrink-0 place-items-center',
    input:
      'md-sys-typescale-body-large text-md-sys-color-on-surface placeholder:text-md-sys-color-on-surface-variant relative ms-spacing-50 me-spacing-50 w-full min-w-spacing-0 bg-transparent outline-none [&::-webkit-search-cancel-button]:hidden',
    trailing: 'text-md-sys-color-on-surface-variant relative flex shrink-0 items-center'
  },
  variants: {
    hasLeading: { true: '', false: { input: 'ms-spacing-150' } },
    hasTrailing: { true: '', false: { input: 'me-spacing-150' } }
  }
});
