import { tv, type VariantProps } from 'tailwind-variants';
import type { Breakpoint } from '../containers/pane/theme.js';

/*
 * Button, toggle button, icon button and FAB styles, from the M3 Expressive specs:
 * https://m3.material.io/components/buttons/specs
 * https://m3.material.io/components/icon-buttons/specs
 * https://m3.material.io/components/floating-action-button/specs
 * https://m3.material.io/components/extended-fab/specs
 * https://m3.material.io/components/fab-menu/specs
 *
 * Shape: size classes set --btn-round (half the height), --btn-square and --btn-pressed, and the
 * shape variant points --btn-shape at one of them. `.md-btn-shape` (styles/component.css) turns
 * that into border-radius and morphs to --btn-pressed while pressed.
 */

export type ButtonVariants = VariantProps<typeof button>;
export type ButtonIconVariants = VariantProps<typeof buttonIcon>;
export type ButtonColorVariants = VariantProps<typeof buttonColor>;
export type FABVariants = VariantProps<typeof fab>;
export type FABMenuItemVariants = VariantProps<typeof fabMenuItem>;
/** @deprecated Use `ButtonVariants`. */
export type ButtonMDVariants = ButtonVariants;

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** Container, border and content colours for one button colour style in one state. */
export const buttonColor = tv({
  base: '',
  variants: {
    variant: {
      elevated: '',
      filled: '',
      tonal: '',
      outlined: '[border-width:var(--btn-outline)] border-solid',
      text: '',
      standard: ''
    },
    /** `default` for plain buttons; `unselected`/`selected` for toggles. */
    state: {
      default: '',
      unselected: '',
      selected: ''
    }
  },
  compoundVariants: [
    {
      variant: 'elevated',
      state: ['default', 'unselected'],
      class: 'bg-md-sys-color-surface-container-low text-md-sys-color-primary'
    },
    {
      variant: 'elevated',
      state: 'selected',
      class: 'bg-md-sys-color-primary text-md-sys-color-on-primary'
    },
    {
      variant: 'filled',
      state: ['default', 'selected'],
      class: 'bg-md-sys-color-primary text-md-sys-color-on-primary'
    },
    {
      variant: 'filled',
      state: 'unselected',
      class: 'bg-md-sys-color-surface-container text-md-sys-color-on-surface-variant'
    },
    {
      variant: 'tonal',
      state: ['default', 'unselected'],
      class: 'bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container'
    },
    {
      variant: 'tonal',
      state: 'selected',
      class: 'bg-md-sys-color-secondary text-md-sys-color-on-secondary'
    },
    {
      variant: 'outlined',
      state: ['default', 'unselected'],
      class:
        'border-md-sys-color-outline-variant text-md-sys-color-on-surface-variant disabled:bg-transparent aria-disabled:bg-transparent'
    },
    {
      variant: 'outlined',
      state: 'selected',
      class:
        'bg-md-sys-color-inverse-surface text-md-sys-color-inverse-on-surface border-transparent'
    },
    {
      variant: 'text',
      class: 'text-md-sys-color-primary disabled:bg-transparent aria-disabled:bg-transparent'
    },
    {
      variant: 'standard',
      state: ['default', 'unselected'],
      class:
        'text-md-sys-color-on-surface-variant disabled:bg-transparent aria-disabled:bg-transparent'
    },
    {
      variant: 'standard',
      state: 'selected',
      class: 'text-md-sys-color-primary disabled:bg-transparent aria-disabled:bg-transparent'
    }
  ]
});

// Disabled: a 10% on-surface container (styles without a container drop it again above) and 38%
// on-surface content, no elevation.
export const buttonBase =
  'md-btn md-sys-state-focus-indicator relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none disabled:cursor-not-allowed disabled:bg-md-sys-color-on-surface/10 disabled:text-md-sys-color-on-surface/38 disabled:shadow-none aria-disabled:cursor-not-allowed aria-disabled:bg-md-sys-color-on-surface/10 aria-disabled:text-md-sys-color-on-surface/38 aria-disabled:shadow-none';

/** Button measurements per size: height, padding, icon-label gap, label type, shape and outline. */
export const buttonSizes = {
  xs: {
    base: 'md-sys-typescale-label-large h-spacing-400 gap-spacing-50 px-spacing-150 [--btn-outline:1px] [--btn-pressed:0.5rem] [--btn-round:1rem] [--btn-square:0.75rem]',
    icon: 'size-spacing-250 text-[20px]'
  },
  sm: {
    base: 'md-sys-typescale-label-large h-spacing-500 gap-spacing-100 px-spacing-200 [--btn-outline:1px] [--btn-pressed:0.5rem] [--btn-round:1.25rem] [--btn-square:0.75rem]',
    icon: 'size-spacing-250 text-[20px]'
  },
  md: {
    base: 'md-sys-typescale-title-medium h-spacing-700 gap-spacing-100 px-spacing-300 [--btn-outline:1px] [--btn-pressed:0.75rem] [--btn-round:1.75rem] [--btn-square:1rem]',
    icon: 'size-spacing-300 text-[24px]'
  },
  lg: {
    base: 'md-sys-typescale-headline-small h-24 gap-spacing-150 px-spacing-600 [--btn-outline:2px] [--btn-pressed:1rem] [--btn-round:3rem] [--btn-square:1.75rem]',
    icon: 'size-spacing-400 text-[32px]'
  },
  xl: {
    base: 'md-sys-typescale-headline-large h-34 gap-spacing-200 px-spacing-800 [--btn-outline:3px] [--btn-pressed:1rem] [--btn-round:4.25rem] [--btn-square:1.75rem]',
    icon: 'size-spacing-500 text-[40px]'
  }
} as const;

/** Resting elevation and hover lift per colour style (the text and outlined styles have none). */
export const buttonElevation = {
  elevated: 'shadow-elevation-1 not-disabled:hover:shadow-elevation-2',
  filled: 'not-disabled:hover:shadow-elevation-1',
  tonal: 'not-disabled:hover:shadow-elevation-1',
  outlined: '',
  text: ''
} as const;

export const button = tv({
  slots: {
    base: ['md-btn-shape', buttonBase],
    icon: 'shrink-0'
  },
  variants: {
    variant: {
      elevated: { base: buttonElevation.elevated },
      filled: { base: buttonElevation.filled },
      tonal: { base: buttonElevation.tonal },
      outlined: {},
      text: {}
    },
    size: buttonSizes,
    shape: {
      round: { base: '[--btn-shape:var(--btn-round)]' },
      square: { base: '[--btn-shape:var(--btn-square)]' }
    },
    /** Toggle buttons only: selected swaps the resting shape (round ↔ square). */
    selected: {
      true: {},
      false: {}
    }
  },
  compoundVariants: [
    { selected: true, shape: 'round', class: { base: '[--btn-shape:var(--btn-square)]' } },
    { selected: true, shape: 'square', class: { base: '[--btn-shape:var(--btn-round)]' } }
  ],
  defaultVariants: {
    variant: 'filled',
    size: 'sm',
    shape: 'round'
  }
});

export const buttonIcon = tv({
  slots: {
    base: ['md-btn-shape', buttonBase],
    icon: 'shrink-0'
  },
  variants: {
    variant: {
      filled: {},
      tonal: {},
      outlined: {},
      standard: {}
    },
    size: {
      xs: {
        base: 'h-spacing-400 [--btn-outline:1px] [--btn-pressed:0.5rem] [--btn-round:1rem] [--btn-square:0.75rem]',
        icon: 'size-spacing-250 text-[20px]'
      },
      sm: {
        base: 'h-spacing-500 [--btn-outline:1px] [--btn-pressed:0.5rem] [--btn-round:1.25rem] [--btn-square:0.75rem]',
        icon: 'size-spacing-300 text-[24px]'
      },
      md: {
        base: 'h-spacing-700 [--btn-outline:1px] [--btn-pressed:0.75rem] [--btn-round:1.75rem] [--btn-square:1rem]',
        icon: 'size-spacing-300 text-[24px]'
      },
      lg: {
        base: 'h-24 [--btn-outline:2px] [--btn-pressed:1rem] [--btn-round:3rem] [--btn-square:1.75rem]',
        icon: 'size-spacing-400 text-[32px]'
      },
      xl: {
        base: 'h-34 [--btn-outline:3px] [--btn-pressed:1rem] [--btn-round:4.25rem] [--btn-square:1.75rem]',
        icon: 'size-spacing-500 text-[40px]'
      }
    },
    /** Container width: the icon plus the size's narrow, default or wide leading/trailing space. */
    width: {
      narrow: {},
      default: {},
      wide: {}
    },
    shape: {
      round: { base: '[--btn-shape:var(--btn-round)]' },
      square: { base: '[--btn-shape:var(--btn-square)]' }
    },
    selected: {
      true: {},
      false: {}
    }
  },
  compoundVariants: [
    { size: 'xs', width: 'narrow', class: { base: 'w-7' } },
    { size: 'xs', width: 'default', class: { base: 'w-spacing-400' } },
    { size: 'xs', width: 'wide', class: { base: 'w-spacing-500' } },
    { size: 'sm', width: 'narrow', class: { base: 'w-spacing-400' } },
    { size: 'sm', width: 'default', class: { base: 'w-spacing-500' } },
    { size: 'sm', width: 'wide', class: { base: 'w-13' } },
    { size: 'md', width: 'narrow', class: { base: 'w-spacing-600' } },
    { size: 'md', width: 'default', class: { base: 'w-spacing-700' } },
    { size: 'md', width: 'wide', class: { base: 'w-spacing-900' } },
    { size: 'lg', width: 'narrow', class: { base: 'w-spacing-800' } },
    { size: 'lg', width: 'default', class: { base: 'w-24' } },
    { size: 'lg', width: 'wide', class: { base: 'w-32' } },
    { size: 'xl', width: 'narrow', class: { base: 'w-26' } },
    { size: 'xl', width: 'default', class: { base: 'w-34' } },
    { size: 'xl', width: 'wide', class: { base: 'w-46' } },
    { selected: true, shape: 'round', class: { base: '[--btn-shape:var(--btn-square)]' } },
    { selected: true, shape: 'square', class: { base: '[--btn-shape:var(--btn-round)]' } }
  ],
  defaultVariants: {
    variant: 'filled',
    size: 'sm',
    width: 'default',
    shape: 'round'
  }
});

export type FABColor =
  | 'primary-container'
  | 'secondary-container'
  | 'tertiary-container'
  | 'primary'
  | 'secondary'
  | 'tertiary';

/** The FAB menu's colour set follows the FAB's colour family. */
export const fabMenuSet = (color: FABColor) =>
  color.startsWith('secondary')
    ? 'secondary'
    : color.startsWith('tertiary')
      ? 'tertiary'
      : 'primary';

/*
 * FAB and extended FAB. Collapsed, the padding centres the icon in the square FAB
 * ((size - icon) / 2); extended, it is the extended FAB's leading/trailing space and the label
 * opens beside the icon.
 */
export const fab = tv({
  slots: {
    base: 'md-btn md-sys-state-focus-indicator relative inline-flex shrink-0 cursor-pointer items-center justify-start whitespace-nowrap select-none shadow-elevation-3 not-disabled:hover:shadow-elevation-4 disabled:cursor-not-allowed disabled:bg-md-sys-color-on-surface/10 disabled:text-md-sys-color-on-surface/38 disabled:shadow-none',
    icon: 'shrink-0',
    labelTrack: 'grid',
    labelClip: 'min-w-spacing-0 overflow-hidden',
    label: 'block'
  },
  variants: {
    color: {
      'primary-container': {
        base: 'bg-md-sys-color-primary-container text-md-sys-color-on-primary-container'
      },
      'secondary-container': {
        base: 'bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container'
      },
      'tertiary-container': {
        base: 'bg-md-sys-color-tertiary-container text-md-sys-color-on-tertiary-container'
      },
      primary: { base: 'bg-md-sys-color-primary text-md-sys-color-on-primary' },
      secondary: { base: 'bg-md-sys-color-secondary text-md-sys-color-on-secondary' },
      tertiary: { base: 'bg-md-sys-color-tertiary text-md-sys-color-on-tertiary' }
    },
    size: {
      /** Baseline small FAB. No longer recommended by M3; kept for dense layouts. */
      small: {
        base: 'h-spacing-500 rounded-xl px-spacing-100',
        icon: 'size-spacing-300 text-[24px]'
      },
      regular: {
        base: 'md-sys-typescale-title-medium h-spacing-700 rounded-2xl px-spacing-200',
        icon: 'size-spacing-300 text-[24px]',
        label: 'ps-spacing-100'
      },
      medium: {
        base: 'md-sys-typescale-title-large h-20 rounded-[1.25rem] px-[1.625rem]',
        icon: 'size-7 text-[28px]',
        label: 'ps-spacing-150'
      },
      large: {
        base: 'md-sys-typescale-headline-small h-24 rounded-[1.75rem] px-[1.875rem]',
        icon: 'size-spacing-450 text-[36px]',
        label: 'ps-spacing-200'
      }
    },
    /**
     * The FAB menu's open state: the FAB becomes the round close button, label shut. Its size and
     * corners spring to 56dp round in FAB.svelte.
     */
    menuOpen: {
      true: {
        base: 'justify-center px-spacing-0',
        icon: 'size-spacing-250 text-[20px]',
        labelTrack: 'grid-cols-[0fr]!'
      },
      false: {}
    },
    menuSet: {
      primary: {},
      secondary: {},
      tertiary: {}
    }
  },
  compoundVariants: [
    {
      menuOpen: true,
      menuSet: 'primary',
      class: { base: 'bg-md-sys-color-primary text-md-sys-color-on-primary' }
    },
    {
      menuOpen: true,
      menuSet: 'secondary',
      class: { base: 'bg-md-sys-color-secondary text-md-sys-color-on-secondary' }
    },
    {
      menuOpen: true,
      menuSet: 'tertiary',
      class: { base: 'bg-md-sys-color-tertiary text-md-sys-color-on-tertiary' }
    }
  ],
  defaultVariants: {
    color: 'primary-container',
    size: 'regular',
    menuOpen: false,
    menuSet: 'primary'
  }
});

// 5px padding leaves room for the items' focus ring inside the scroll box; the negative end
// margin puts the items back on the close button's trailing edge, and 3px offset + 5px padding
// is the spec's 8dp above it.
/*
 * `expanded` is responsive (FAB on compact windows, extended FAB with room to spare), so it
 * resolves to per-tier classes rather than a tv variant: the label track opens, and the large
 * FAB's padding moves from centring its icon (30dp) to the extended FAB's 28dp. These classes
 * decide the layout (and the first paint); FAB.svelte springs the change between them.
 */
export const fabExpandedClasses: Record<
  Breakpoint,
  Record<'true' | 'false', { track: string; large: string }>
> = {
  small: {
    true: { track: 'grid-cols-[1fr]', large: 'px-7' },
    false: { track: 'grid-cols-[0fr]', large: 'px-[1.875rem]' }
  },
  medium: {
    true: { track: 'md:grid-cols-[1fr]', large: 'md:px-7' },
    false: { track: 'md:grid-cols-[0fr]', large: 'md:px-[1.875rem]' }
  },
  large: {
    true: { track: 'lg:grid-cols-[1fr]', large: 'lg:px-7' },
    false: { track: 'lg:grid-cols-[0fr]', large: 'lg:px-[1.875rem]' }
  },
  extraLarge: {
    true: { track: 'xl:grid-cols-[1fr]', large: 'xl:px-7' },
    false: { track: 'xl:grid-cols-[0fr]', large: 'xl:px-[1.875rem]' }
  }
};

/**
 * The surface a FAB opens into with a container transform, anchored at the FAB's corner. It is
 * `surface`, the colour lists and most content paint, so padding doesn't show as bands. The
 * shadow is a filter on the wrapper, because the surface's shape is a clip-path while it morphs.
 */
export const fabSurface = tv({
  slots: {
    anchor: 'relative inline-grid',
    wrapper: 'drop-shadow-elevation-3 absolute end-spacing-0 bottom-spacing-0 z-50',
    surface:
      'bg-md-sys-color-surface text-md-sys-color-on-surface max-h-[min(36rem,calc(100dvh-2rem))] w-max max-w-[calc(100vw-2rem)] min-w-60 overflow-y-auto rounded-3xl py-spacing-100 outline-none'
  }
});

export const fabMenu = tv({
  slots: {
    base: 'z-[100] -me-[5px] flex flex-col items-end gap-spacing-50 overflow-y-auto p-[5px]'
  }
});

/** FAB menu items share the medium button's measurements, fully round, without elevation. */
export const fabMenuItem = tv({
  slots: {
    base: 'md-btn md-sys-state-focus-indicator md-sys-typescale-title-medium relative inline-flex h-spacing-700 shrink-0 cursor-pointer items-center gap-spacing-100 rounded-full px-spacing-300 whitespace-nowrap select-none data-disabled:cursor-not-allowed data-disabled:bg-md-sys-color-on-surface/10 data-disabled:text-md-sys-color-on-surface/38',
    icon: 'size-spacing-300 shrink-0 text-[24px]'
  },
  variants: {
    set: {
      primary: {
        base: 'bg-md-sys-color-primary-container text-md-sys-color-on-primary-container'
      },
      secondary: {
        base: 'bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container'
      },
      tertiary: {
        base: 'bg-md-sys-color-tertiary-container text-md-sys-color-on-tertiary-container'
      }
    }
  },
  defaultVariants: {
    set: 'primary'
  }
});
