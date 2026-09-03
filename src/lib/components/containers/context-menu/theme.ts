import { tv, type VariantProps } from 'tailwind-variants';

export type ContextMenuVariants = VariantProps<typeof contextMenu>;

export const contextMenu = tv({
  slots: {
    content: `
      z-[100] min-w-48 max-w-sm gap-1 overflow-y-auto rounded-lg
      bg-md-sys-color-surface-container-high px-2 py-1
      shadow-elevation-3 ring-md-sys-color-outline/10
    `,
    item: `
      rounded-sm relative flex w-full cursor-pointer select-none items-center gap-2
      px-3 py-2 text-left md-sys-typescale-body-large text-md-sys-color-on-surface
      outline-none transition-colors duration-150
      hover:bg-md-sys-color-on-surface/8 data-[highlighted]:bg-md-sys-color-on-surface/8
      data-[disabled]:cursor-not-allowed data-[disabled]:opacity-38
    `,
    subTrigger: `
      rounded-sm relative flex w-full cursor-pointer select-none items-center gap-2
      px-3 py-2 text-left md-sys-typescale-body-large text-md-sys-color-on-surface
      outline-none transition-colors duration-150
      hover:bg-md-sys-color-on-surface/8 data-[state=open]:bg-md-sys-color-on-surface/8
      data-[highlighted]:bg-md-sys-color-on-surface/8
      data-[disabled]:cursor-not-allowed data-[disabled]:opacity-38
    `,
    itemContent: 'flex flex-1 flex-col gap-0.5 min-w-0',
    label: 'md-sys-typescale-body-large text-md-sys-color-on-surface',
    helper: 'md-sys-typescale-body-medium text-md-sys-color-on-surface-variant',
    icon: 'size-5 text-[20px] text-md-sys-color-on-surface-variant shrink-0',
    separator: 'my-1 h-px bg-md-sys-color-outline-variant',
    rightSlot: 'ml-auto size-5 text-[20px] shrink-0 text-md-sys-color-on-surface-variant'
  },
  variants: {
    selected: {
      true: {
        item: 'rounded-lg bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container'
      }
    }
  }
});
