import { tv, type VariantProps } from 'tailwind-variants';

export type ContextMenuVariants = VariantProps<typeof contextMenu>;

export const contextMenu = tv({
  slots: {
    content: `
      z-[100] min-w-48 max-w-sm gap-spacing-50 overflow-y-auto rounded-lg
      bg-md-sys-color-surface-container-high px-spacing-100 py-spacing-50
      shadow-elevation-3 ring-md-sys-color-outline/10
    `,
    item: `
      rounded-sm relative flex w-full cursor-pointer select-none items-center gap-spacing-100
      px-spacing-150 py-spacing-100 text-left md-sys-typescale-body-large text-md-sys-color-on-surface
      outline-none transition-colors md-sys-motion-fast-effects
      hover:bg-md-sys-color-on-surface/8 data-[highlighted]:bg-md-sys-color-on-surface/8
      data-[disabled]:cursor-not-allowed data-[disabled]:opacity-38
    `,
    subTrigger: `
      rounded-sm relative flex w-full cursor-pointer select-none items-center gap-spacing-100
      px-spacing-150 py-spacing-100 text-left md-sys-typescale-body-large text-md-sys-color-on-surface
      outline-none transition-colors md-sys-motion-fast-effects
      hover:bg-md-sys-color-on-surface/8 data-[state=open]:bg-md-sys-color-on-surface/8
      data-[highlighted]:bg-md-sys-color-on-surface/8
      data-[disabled]:cursor-not-allowed data-[disabled]:opacity-38
    `,
    itemContent: 'flex flex-1 flex-col gap-spacing-25 min-w-spacing-0',
    label: 'md-sys-typescale-body-large text-md-sys-color-on-surface',
    helper: 'md-sys-typescale-body-medium text-md-sys-color-on-surface-variant',
    icon: 'size-spacing-250 text-[20px] text-md-sys-color-on-surface-variant shrink-0',
    separator: 'my-spacing-50 h-px bg-md-sys-color-outline-variant',
    rightSlot: 'ml-auto size-spacing-250 text-[20px] shrink-0 text-md-sys-color-on-surface-variant'
  },
  variants: {
    selected: {
      true: {
        item: 'rounded-lg bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container'
      }
    },
    color: {
      error: {
        item: 'text-md-sys-color-error hover:bg-md-sys-color-error/8 data-[highlighted]:bg-md-sys-color-error/8',
        icon: 'text-md-sys-color-error'
      }
    }
  }
});
