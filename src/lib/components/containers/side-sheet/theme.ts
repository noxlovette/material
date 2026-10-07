import { tv, type VariantProps } from '#lib/utils/tv.js';

export type SideSheetVariants = VariantProps<typeof sideSheet>;

/*
  M3 side sheet (https://m3.material.io/components/side-sheets/specs). Full height, 256dp wide by
  default and never wider than 400dp. 24dp start/end padding (16dp before a back button), 12dp
  between the header's elements, `title-large` headline in `on-surface-variant`. Bottom actions
  sit 16dp below a divider and 24dp above the bottom edge.

  - Standard: `surface`, elevation 0, square, an `outline-variant` divider along its inner edge.
    It sits in the layout and the content beside it reflows as it opens.
  - Modal: `surface-container-low`, elevation 1, 16dp corners on its inner side, above a scrim.
  - Detached (either): 16dp from the window edges, 16dp corners all round.

  The header's icon buttons are 40dp around a 24dp icon; `-m-spacing-100` lines the icons (not the
  buttons) up with the padding, as the spec measures it.
*/
export const sideSheet = tv({
  slots: {
    base: 'p-spacing-0',
    container: 'flex h-full flex-col overflow-hidden',
    header:
      'flex shrink-0 items-center gap-spacing-150 ps-spacing-300 pe-spacing-300 pt-spacing-300',
    iconButton: '-m-spacing-100 shrink-0',
    headline:
      'md-sys-typescale-title-large text-md-sys-color-on-surface-variant min-w-spacing-0 flex-1',
    body: 'min-h-spacing-0 flex-1 overflow-y-auto overscroll-contain px-spacing-300 py-spacing-300',
    actions:
      'flex min-h-spacing-900 shrink-0 items-center justify-start gap-spacing-100 px-spacing-300 pt-spacing-200 pb-spacing-300'
  },
  variants: {
    variant: {
      modal: {
        base: [
          'fixed inset-y-spacing-0 m-spacing-0 h-dvh max-h-none w-full overflow-visible bg-transparent outline-none',
          'backdrop:bg-md-sys-color-scrim/32 backdrop:transition-[background-color] backdrop:md-sys-motion-effects',
          'starting:backdrop:bg-transparent data-[state=closed]:pointer-events-none data-[state=closed]:backdrop:bg-transparent'
        ],
        container:
          'bg-md-sys-color-surface-container-low text-md-sys-color-on-surface shadow-elevation-1'
      },
      standard: {
        // The wrapper animates its width, so the content beside it reflows; the sheet itself
        // keeps its width and stays pinned to the wrapper's outer edge, so it appears to slide in.
        base: 'md-sys-motion-spatial relative h-full shrink-0 overflow-clip transition-[width]',
        container: 'bg-md-sys-color-surface text-md-sys-color-on-surface absolute inset-y-spacing-0'
      }
    },
    // Which window edge the sheet sits on. Physical, like the slide animation, so it doesn't
    // flip with text direction.
    side: { right: {}, left: {} },
    detached: {
      true: { container: 'rounded-2xl' },
      false: {}
    },
    divider: { true: {}, false: {} },
    back: { true: { header: 'ps-spacing-200' }, false: {} }
  },
  compoundVariants: [
    {
      variant: 'modal',
      side: 'right',
      class: { base: 'left-auto right-spacing-0', container: 'rounded-l-2xl' }
    },
    {
      variant: 'modal',
      side: 'left',
      class: { base: 'left-spacing-0 right-auto', container: 'rounded-r-2xl' }
    },
    {
      variant: 'modal',
      detached: true,
      class: { base: 'inset-y-spacing-200 h-[calc(100dvh-2rem)] max-w-[calc(100%-2rem)]' }
    },
    { variant: 'modal', detached: true, side: 'right', class: { base: 'right-spacing-200' } },
    { variant: 'modal', detached: true, side: 'left', class: { base: 'left-spacing-200' } },
    { variant: 'modal', detached: false, class: { base: 'max-w-full' } },
    { variant: 'standard', side: 'right', class: { container: 'right-spacing-0' } },
    { variant: 'standard', side: 'left', class: { container: 'left-spacing-0' } },
    { variant: 'standard', detached: true, class: { container: 'inset-y-spacing-200' } },
    {
      variant: 'standard',
      detached: true,
      side: 'right',
      class: { container: 'right-spacing-200' }
    },
    { variant: 'standard', detached: true, side: 'left', class: { container: 'left-spacing-200' } },
    {
      variant: 'standard',
      detached: false,
      divider: true,
      side: 'right',
      class: { container: 'border-md-sys-color-outline-variant border-l' }
    },
    {
      variant: 'standard',
      detached: false,
      divider: true,
      side: 'left',
      class: { container: 'border-md-sys-color-outline-variant border-r' }
    }
  ],
  defaultVariants: { variant: 'modal', side: 'right', detached: false, divider: true, back: false }
});
