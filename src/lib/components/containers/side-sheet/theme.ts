import { tv, type VariantProps } from 'tailwind-variants';

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

  The header's icon buttons are 40dp around a 24dp icon; `-m-2` lines the icons (not the
  buttons) up with the padding, as the spec measures it.
*/
export const sideSheet = tv({
  slots: {
    base: 'p-0',
    container: 'flex h-full flex-col overflow-hidden',
    header: 'flex shrink-0 items-center gap-3 ps-6 pe-6 pt-6',
    iconButton: '-m-2 shrink-0',
    headline: 'md-sys-typescale-title-large text-md-sys-color-on-surface-variant min-w-0 flex-1',
    body: 'min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6',
    actions: 'flex min-h-18 shrink-0 items-center justify-start gap-2 px-6 pt-4 pb-6'
  },
  variants: {
    variant: {
      modal: {
        base: [
          'fixed inset-y-0 start-auto end-0 m-0 h-dvh max-h-none w-full overflow-visible bg-transparent outline-none',
          'backdrop:bg-md-sys-color-scrim/32 backdrop:transition-[background-color] backdrop:md-sys-motion-effects',
          'starting:backdrop:bg-transparent data-[state=closed]:pointer-events-none data-[state=closed]:backdrop:bg-transparent'
        ],
        container:
          'bg-md-sys-color-surface-container-low text-md-sys-color-on-surface shadow-elevation-1 rounded-s-2xl'
      },
      standard: {
        // The wrapper animates its width, so the content beside it reflows; the sheet itself
        // keeps its width and stays pinned to the wrapper's end edge, so it appears to slide in.
        base: 'md-sys-motion-spatial relative h-full shrink-0 overflow-clip transition-[width]',
        container: 'bg-md-sys-color-surface text-md-sys-color-on-surface absolute inset-y-0 end-0'
      }
    },
    detached: {
      true: { container: 'rounded-2xl' },
      false: {}
    },
    divider: { true: {}, false: {} },
    back: { true: { header: 'ps-4' }, false: {} }
  },
  compoundVariants: [
    {
      variant: 'modal',
      detached: true,
      class: { base: 'inset-y-4 end-4 h-[calc(100dvh-2rem)] max-w-[calc(100%-2rem)]' }
    },
    { variant: 'modal', detached: false, class: { base: 'max-w-full' } },
    { variant: 'standard', detached: true, class: { container: 'inset-y-4 end-4' } },
    {
      variant: 'standard',
      detached: false,
      divider: true,
      class: { container: 'border-md-sys-color-outline-variant border-s' }
    }
  ],
  defaultVariants: { variant: 'modal', detached: false, divider: true, back: false }
});
