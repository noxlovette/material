import { tv, type VariantProps } from '$lib/utils/tv.js';
import { listItem } from '../../containers/list/theme.js';

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
    itemIcon: 'mr-spacing-150 h-spacing-250 w-spacing-250 shrink-0'
  }
});

/*
  Palette items are M3 list items (ListItem's anatomy, shape and type), sitting on the palette's
  container colour. Focus stays in the input, so the item the arrow keys or pointer are on
  (bits-ui's `data-selected`, an empty attribute) takes the focused item's state: the 10% state
  layer and the 12dp hover shape, the way menus show their highlighted item.
*/
export const commandItem = tv({
  extend: listItem,
  slots: {
    base: [
      'cursor-default select-none outline-none',
      'data-selected:[--li-shape:0.75rem] [&[data-selected]>.tint]:opacity-10'
    ]
  },
  // The list's own surface fill is a variant, so it's replaced here, not in the base.
  variants: { variant: { standard: { base: 'bg-transparent' } } },
  defaultVariants: { interactive: true, lines: 1 }
});

export type CommandItemVariants = VariantProps<typeof commandItem>;

/*
  The ⌘K palette. M3 has no command palette; it borrows the docked search view's width (360–720dp)
  and a modal dialog's scrim, extra-large shape and motion, and sits in the top third of the
  window so the list has room to grow downwards.
*/
export const commandDialog = tv({
  slots: {
    scrim: 'fixed inset-spacing-0 z-layer-modal bg-md-sys-color-scrim/32',
    content:
      'fixed inset-x-spacing-200 top-spacing-200 md:top-spacing-900 z-layer-modal mx-auto max-w-(--md-comp-search-view-contained-docked-container-width-maximum) outline-none',
    command: 'h-auto rounded-xl'
  }
});
