import { tv, type VariantProps } from 'tailwind-variants';

/**
 * Shared styling for every row-shaped element inside a `Menu`'s floating
 * panel: `MenuItem`, `MenuCheckboxItem`, `MenuRadioItem`, and `MenuSub`'s
 * trigger row all pull from this one `tv()` so they stay visually identical.
 */
export type MenuVariants = VariantProps<typeof menu>;

export const menu = tv({
  slots: {
    content: `
      bg-md-sys-color-surface-container-high shadow-elevation-3
      ring-md-sys-color-outline/10 max-w-sm min-w-48 gap-1
      overflow-y-auto rounded-lg px-2 py-1
    `,
    item: `
      rounded-sm h-11 relative flex w-full cursor-pointer items-center gap-2 px-3 py-2
      md-sys-typescale-body-medium whitespace-nowrap text-md-sys-color-on-surface
      hover:bg-md-sys-color-on-surface/8 data-[highlighted]:bg-md-sys-color-on-surface/8
      focus-visible:outline-2 focus-visible:outline-offset-2
      focus-visible:outline-md-sys-color-primary
      data-[disabled]:cursor-not-allowed data-[disabled]:opacity-38
    `,
    icon: 'text-md-sys-color-on-surface-variant size-5 text-[20px] shrink-0',
    indicator: 'size-5 text-[20px] shrink-0 text-md-sys-color-on-surface-variant',
    itemContent: 'flex flex-1 flex-col gap-1 text-left min-w-0',
    helper: 'md-sys-typescale-body-medium text-md-sys-color-on-surface-variant',
    rightSlot: 'text-md-sys-color-on-surface-variant size-5 text-[20px] shrink-0',
    groupHeading: 'px-3 pt-2 pb-1 md-sys-typescale-label-medium text-md-sys-color-primary'
  },
  variants: {
    selected: {
      true: {
        item: 'bg-md-sys-color-secondary-container rounded-lg text-md-sys-color-on-secondary-container'
      }
    },
    checked: {
      true: {
        indicator: 'text-md-sys-color-primary'
      }
    }
  }
});
