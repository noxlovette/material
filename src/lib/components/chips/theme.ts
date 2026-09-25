import { tv, type VariantProps } from '$lib/utils/tv.js';

export type ChipVariants = VariantProps<typeof chip>;

/*
  Values from the M3 chip tokens (md.comp.{assist,filter,input,suggestion}-chip.*):
  https://m3.material.io/components/chips/specs

  - 32dp tall, 8dp corners, label-large. Padding is 16dp on each side, 8dp on a side that holds an
    icon, and 4dp before an avatar; 8dp between elements. Icons are 18dp, avatars a 24dp circle.
  - The 1dp outline is a border, so it sits inside the 32dp and stays visible (and darkens) while
    the separate focus indicator is showing.
  - Disabled: flat chips lose their fill-less outline to on-surface/12; elevated and selected
    containers turn on-surface/12 with no shadow; label and icons are on-surface/38.

  Chip doesn't use md-component-button-base: its disabled fill would paint flat chips, which M3
  leaves unfilled.

  An input chip is a container holding two sibling buttons, the primary `action` and the remove
  button, since one can't nest inside the other. The container keeps the look (and shows the focus
  indicator while the action has focus); the action carries the padding, and its state layer covers the whole chip.
*/
export const chip = tv({
  slots: {
    base: 'state-layer md-sys-state-focus-indicator relative inline-flex h-spacing-400 max-w-max shrink-0 items-center justify-center gap-spacing-100 rounded-sm border border-transparent px-spacing-200 md-sys-typescale-label-large select-none before:rounded-sm transition-[background-color,border-color,box-shadow] md-sys-motion-effects',
    // 18dp is the chip spec's own icon size, between the 16 and 20 Icon presets.
    icon: 'size-[18px] shrink-0 text-[18px]',
    avatar: 'size-spacing-300 shrink-0 overflow-hidden rounded-full',
    // Static, so its Layer (state layer and hit area) spans the whole chip; the remove button is
    // positioned and later in the DOM, so it stays on top.
    action:
      'static flex h-full min-w-spacing-0 cursor-pointer items-center gap-spacing-100 self-stretch rounded-sm px-spacing-200 outline-none disabled:cursor-not-allowed',
    label: '',
    // 18dp glyph with a 48dp touch target around it (::after).
    trailing:
      "relative inline-flex size-[18px] shrink-0 cursor-pointer items-center justify-center rounded-full after:absolute after:top-1/2 after:left-1/2 after:size-spacing-600 after:-translate-1/2 after:content-['']",
    checkIcon: 'size-[18px] shrink-0'
  },
  variants: {
    variant: {
      assist: { base: 'text-md-sys-color-on-surface', icon: 'text-md-sys-color-primary' },
      filter: { base: 'text-md-sys-color-on-surface-variant' },
      input: { base: 'text-md-sys-color-on-surface-variant' },
      suggestion: {
        base: 'text-md-sys-color-on-surface-variant',
        icon: 'text-md-sys-color-primary'
      }
    },
    elevated: {
      true: { base: 'shadow-elevation-1 hover:shadow-elevation-2' },
      false: ''
    },
    selected: {
      true: {
        base: 'bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container'
      },
      false: ''
    },
    leading: {
      none: '',
      icon: { base: 'pl-spacing-100', action: 'pl-spacing-100' },
      avatar: { base: 'pl-spacing-50', action: 'pl-spacing-50' }
    },
    /** A trailing icon: the filter chip's `trailingIconProps`, or the input chip's remove button. */
    trailing: {
      true: { base: 'pr-spacing-100', action: 'pr-spacing-100' },
      false: ''
    },
    disabled: {
      true: {
        base: 'text-md-sys-color-on-surface/38 shadow-none hover:shadow-none',
        icon: 'text-md-sys-color-on-surface/38',
        avatar: 'opacity-38',
        trailing: 'text-md-sys-color-on-surface/38',
        checkIcon: 'text-md-sys-color-on-surface/38'
      },
      false: ''
    }
  },
  compoundVariants: [
    // Flat, unselected: no fill, outline-variant border that darkens on focus.
    {
      elevated: false,
      selected: false,
      class: {
        base: 'border-md-sys-color-outline-variant focus-visible:border-md-sys-color-on-surface-variant'
      }
    },
    {
      variant: 'assist',
      elevated: false,
      class: { base: 'focus-visible:border-md-sys-color-on-surface' }
    },
    { elevated: true, selected: false, class: { base: 'bg-md-sys-color-surface-container-low' } },
    // A flat selected filter chip lifts on hover.
    {
      variant: 'filter',
      elevated: false,
      selected: true,
      class: { base: 'hover:shadow-elevation-1' }
    },
    // Unselected filter icons are primary; selected ones inherit on-secondary-container.
    { variant: 'filter', selected: false, class: { icon: 'text-md-sys-color-primary' } },
    // Input chips are the reverse: on-surface-variant, primary once selected.
    { variant: 'input', selected: true, class: { icon: 'text-md-sys-color-primary' } },
    // The input chip's container has no padding of its own before the action, and needs the
    // focus indicator (and darker border) while the action is focused.
    {
      variant: 'input',
      class: {
        base: 'pl-spacing-0 has-[[data-chip-action]:focus-visible]:outline-3 has-[[data-chip-action]:focus-visible]:outline-offset-2 has-[[data-chip-action]:focus-visible]:outline-md-sys-color-secondary has-[[data-chip-action]:focus-visible]:outline-solid'
      }
    },
    { variant: 'input', trailing: false, class: { base: 'pr-spacing-0' } },
    {
      variant: 'input',
      elevated: false,
      selected: false,
      class: {
        base: 'has-[[data-chip-action]:focus-visible]:border-md-sys-color-on-surface-variant'
      }
    },
    {
      disabled: true,
      elevated: false,
      selected: false,
      class: { base: 'border-md-sys-color-on-surface/12' }
    },
    {
      disabled: true,
      elevated: true,
      class: { base: 'bg-md-sys-color-on-surface/12' }
    },
    {
      disabled: true,
      selected: true,
      class: { base: 'bg-md-sys-color-on-surface/12 text-md-sys-color-on-surface/38' }
    }
  ],
  defaultVariants: {
    variant: 'assist',
    elevated: false,
    selected: false,
    leading: 'none',
    trailing: false,
    disabled: false
  }
});
