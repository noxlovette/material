import { tv, type VariantProps } from 'tailwind-variants';

export type PopoverVariants = VariantProps<typeof popover>;

export const popover = tv({
  slots: {
    base: 'relative z-[100] min-w-48 max-w-sm rounded-2xl bg-md-sys-color-surface-container-high p-spacing-200 shadow-elevation-3 ring-1 ring-md-sys-color-outline/20',
    close: 'absolute top-spacing-150 right-spacing-150',
    header: 'mb-spacing-100 flex items-center justify-between gap-spacing-200',
    title: 'md-sys-typescale-title-small text-md-sys-color-on-surface',
    body: 'md-sys-typescale-body-medium text-md-sys-color-on-surface-variant'
  }
});
