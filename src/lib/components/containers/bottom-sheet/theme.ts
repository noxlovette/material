import { tv, type VariantProps } from 'tailwind-variants';

export type BottomSheetVariants = VariantProps<typeof bottomSheet>;

/*
  M3 bottom sheet (https://m3.material.io/components/bottom-sheets/specs): `surface-container-low`
  at elevation 1, 28dp top corners. Full window width up to 640dp; past 640dp it keeps 56dp side
  margins. It stops 72dp below the top of the window (56dp past 640dp) and its content scrolls
  inside it. The drag handle is 32×4dp `on-surface-variant` at 40%, with 22dp above and below.

  `base` is what enters and exits (the dialog, or the standard sheet's wrapper); `container` is
  the surface itself, which follows the drag.
*/
export const bottomSheet = tv({
  slots: {
    base: [
      'fixed inset-x-spacing-0 top-auto bottom-spacing-0 z-40 mx-auto mt-auto mb-spacing-0 p-spacing-0',
      'w-full max-w-160 sm:w-[calc(100%-7rem)]',
      'max-h-[calc(100dvh-4.5rem)] sm:max-h-[calc(100dvh-3.5rem)]',
      'overflow-visible bg-transparent outline-none'
    ],
    container: [
      'bg-md-sys-color-surface-container-low text-md-sys-color-on-surface shadow-elevation-1',
      'flex max-h-[inherit] flex-col rounded-t-[28px] will-change-transform'
    ],
    handleArea:
      'flex h-spacing-600 shrink-0 cursor-grab touch-none justify-center active:cursor-grabbing',
    handle:
      'md-sys-state-focus-indicator flex h-spacing-600 w-spacing-600 items-center justify-center rounded-full outline-none',
    handleBar: 'bg-md-sys-color-on-surface-variant/40 h-spacing-50 w-spacing-400 rounded-full',
    body: 'min-h-spacing-0 flex-1 overflow-y-auto overscroll-contain pb-[env(safe-area-inset-bottom)]'
  },
  variants: {
    variant: {
      modal: {
        base: [
          'backdrop:bg-md-sys-color-scrim/32 backdrop:transition-[background-color]',
          'backdrop:md-sys-motion-effects starting:backdrop:bg-transparent',
          'data-[state=closed]:pointer-events-none',
          'data-[state=closed]:backdrop:bg-transparent'
        ]
      },
      standard: {}
    }
  },
  defaultVariants: { variant: 'modal' }
});
