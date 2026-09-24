import { tv, type VariantProps } from 'tailwind-variants';

export type CommandVariants = VariantProps<typeof command>;

export const command = tv({
  slots: {
    base: 'flex h-full w-full flex-col overflow-hidden rounded-2xl bg-md-sys-color-surface-container-high text-md-sys-color-on-surface shadow-elevation-3 ring-1 ring-md-sys-color-outline/20',
    inputWrapper: 'flex items-center border-b border-md-sys-color-outline-variant px-spacing-200',
    inputIcon:
      'mr-spacing-150 h-spacing-250 w-spacing-250 shrink-0 text-md-sys-color-on-surface-variant',
    input:
      'flex h-spacing-600 w-full rounded-md bg-transparent py-spacing-150 md-sys-typescale-body-large outline-none placeholder:text-md-sys-color-on-surface-variant disabled:cursor-not-allowed disabled:opacity-50',
    list: 'max-h-[300px] overflow-y-auto overflow-x-hidden p-spacing-100 scrollbar-thin scrollbar-thumb-md-sys-color-outline-variant scrollbar-track-transparent',
    empty:
      'py-spacing-300 text-center md-sys-typescale-body-medium text-md-sys-color-on-surface-variant',
    group:
      'overflow-hidden p-spacing-50 text-md-sys-color-on-surface-variant [&_[data-command-group-heading]]:px-spacing-150 [&_[data-command-group-heading]]:py-spacing-100 [&_[data-command-group-heading]]:md-sys-typescale-label-medium [&_[data-command-group-heading]]:text-md-sys-color-on-surface-variant',
    separator: '-mx-spacing-50 h-px bg-md-sys-color-outline-variant',
    item: 'relative flex cursor-default select-none items-center rounded-lg px-spacing-150 py-spacing-150 md-sys-typescale-body-medium outline-none data-[selected=true]:bg-md-sys-color-secondary-container data-[selected=true]:text-md-sys-color-on-secondary-container data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50 transition-colors md-sys-motion-fast-effects',
    itemIcon: 'mr-spacing-150 h-spacing-250 w-spacing-250 shrink-0'
  }
});
