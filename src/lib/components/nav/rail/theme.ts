import { tv, type VariantProps } from '$lib/utils/tv.js';

export type RailVariants = VariantProps<typeof rail>;
export type RailItemVariants = VariantProps<typeof railElement>;

export const rail = tv({
  slots: {
    base: 'py-spacing-600 hidden bg-md-sys-color-surface-container z-layer-rail flex-col md:flex gap-spacing-300 transition-[width,padding,background-color] md-sys-motion-spatial',
    items: 'flex flex-col gap-spacing-150 pt-spacing-300 scrollbar-none w-full overflow-x-hidden',
    ghost: 'hidden md:block shrink-0 transition-[width] md-sys-motion-spatial',
    scrim: 'hidden md:block lg:hidden inset-spacing-0'
  },
  variants: {
    anchor: {
      viewport: {
        base: 'fixed top-[var(--rail-top,0px)] bottom-spacing-0 left-spacing-0',
        scrim: 'fixed'
      },
      parent: {
        base: 'absolute top-[var(--rail-top,0px)] bottom-spacing-0 left-spacing-0',
        scrim: 'absolute'
      }
    },
    expanded: {
      true: {
        base: 'pl-spacing-450 w-60 items-start bg-md-sys-color-surface-container-highest lg:bg-md-sys-color-surface-container rounded-r-lg',
        ghost: 'w-24 lg:w-60'
      },
      false: {
        base: 'w-24 items-center',
        items: 'items-center',
        ghost: 'w-24'
      }
    },
    rounded: {
      true: {
        base: 'rounded-xl'
      },
      false: {}
    }
  },
  defaultVariants: {
    anchor: 'viewport'
  }
});

export const railElement = tv({
  slots: {
    base: 'group relative z-30 flex w-full transition-all md-sys-motion-spatial',
    content:
      'flex items-center min-w-spacing-0 rounded-full gap-spacing-25 py-spacing-75 transition-all md-sys-motion-spatial',
    iconContainer:
      'relative rounded-full items-center justify-center inline-flex transition-all md-sys-motion-spatial',
    icon: 'text-[24px] transition-all md-sys-motion-spatial',
    label: 'transition-all md-sys-motion-spatial whitespace-nowrap'
  },
  variants: {
    active: {
      true: {
        content: 'text-md-sys-color-on-secondary-container',
        label: 'font-bold',
        iconContainer:
          'group-hover:text-md-sys-color-secondary  bg-md-sys-color-secondary-container'
      },
      false: {
        content: 'text-md-sys-color-on-surface-variant',
        iconContainer: ''
      }
    },
    expanded: {
      true: {
        base: 'justify-start',
        content: 'p-spacing-200 gap-spacing-150',
        iconContainer: '',
        label: 'md-sys-typescale-label-large'
      },
      false: {
        base: 'text-center justify-center',
        content: 'flex-col',
        iconContainer: 'py-spacing-75 px-spacing-200',
        label: 'md-sys-typescale-label-medium'
      }
    },
    disabled: {
      true: {
        base: 'cursor-not-allowed opacity-38'
      }
    },
    mobile: {
      true: {
        base: 'flex-1 flex-col items-center justify-center h-full min-w-spacing-0 max-w-[168px]',
        content: 'py-spacing-0 gap-spacing-50 items-center justify-center w-full',
        iconContainer: 'h-spacing-400 w-spacing-800 py-spacing-0 px-spacing-0',
        icon: 'size-spacing-300',
        label: 'truncate w-full text-center'
      },
      false: {}
    }
  },
  compoundVariants: [
    {
      expanded: true,
      active: true,
      class: {
        iconContainer: 'bg-transparent',
        content: 'bg-md-sys-color-secondary-container'
      }
    },
    {
      expanded: true,
      active: false,
      class: {
        content: 'group-hover:bg-md-sys-color-surface-variant'
      }
    },
    {
      expanded: false,
      active: false,
      class: {
        iconContainer: 'group-hover:bg-md-sys-color-surface-variant'
      }
    }
  ]
});
