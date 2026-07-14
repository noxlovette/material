import { tv, type VariantProps } from 'tailwind-variants';

export type SplitPaneVariants = VariantProps<typeof splitPane>;
export type SinglePaneVariants = VariantProps<typeof singlePane>;
export type SupportingPaneVariants = VariantProps<typeof supportingPane>;

export const splitPane = tv({
  slots: {
    left: 'top-0 bottom-0 z-20 overflow-y-scroll overflow-x-visible bg-md-sys-color-surface-container scrollbar-none hidden md:block',
    right: 'flex flex-col box-border ml-0 md:ml-[var(--splitpane-left-width)]',
    handle:
      'handle group hidden md:block top-0 bottom-0 z-30 w-3 -ml-1 cursor-col-resize touch-none bg-transparent hover:bg-md-sys-color-outline/20 translate-x-1.5',
    handleGrip:
      'absolute left-1/2 top-1/2 flex h-12 w-1 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-full bg-md-sys-color-secondary group-hover:w-0.5',
    handlePip: 'h-0.5 w-0.5 rounded-full bg-md-sys-color-on-primary/80',
    base: ''
  },
  variants: {
    anchor: {
      viewport: {
        left: 'md:fixed',
        handle: 'fixed'
      },
      parent: {
        base: 'relative',
        left: 'md:absolute',
        handle: 'absolute'
      }
    },
    full: {
      true: {
        left: 'md:bottom-[30px]',
        right: 'md:min-h-[calc(100dvh-30px)]'
      },
      false: ''
    },
    rounded: {
      true: {
        left: 'md:rounded-t-lg md:rounded-b-lg',
        right: 'md:rounded-b-lg'
      },
      false: {
        left: '',
        right: ''
      }
    }
  },
  defaultVariants: {
    anchor: 'viewport',
    rounded: true
  }
});

export const singlePane = tv({
  slots: {
    base: 'flex flex-col box-border overflow-clip items-center',
    content: 'flex flex-1 flex-col w-full max-w-7xl mx-auto'
  },
  variants: {
    background: {
      true: 'bg-md-sys-color-surface',
      false: ''
    },
    centered: {
      narrow: {
        content: 'max-w-2xl'
      },
      medium: {
        content: 'max-w-5xl'
      },
      none: ''
    },
    full: {
      true: 'min-h-dvh',
      false: ''
    },
    rounded: {
      true: {
        base: 'md:rounded-t-lg'
      },
      false: {
        base: ''
      }
    },
    padding: {
      none: { content: 'p-0' },
      sm: { content: 'p-3 md:p-4' },
      md: { content: 'p-4 md:p-6 lg:p-8' },
      lg: { content: 'p-6 md:p-8 lg:p-12' }
    },
    gap: {
      none: { content: 'gap-0' },
      sm: { content: 'gap-2' },
      md: { content: 'gap-3' },
      lg: { content: 'gap-4' },
      xl: { content: 'gap-6' }
    }
  },
  defaultVariants: {
    rounded: true
  }
});

export const supportingPane = tv({
  slots: {
    base: 'flex w-full flex-col lg:flex-row',
    main: 'bg-md-sys-color-surface box-border grow order-2 lg:order-1',
    supporting:
      'text-md-sys-color-on-surface-container box-border order-1 lg:order-2 min-w-0 lg:w-80'
  },
  variants: {
    anchor: {
      // supporting scrolls independently; main scrolls the page
      viewport: {
        supporting:
          'lg:fixed lg:top-[var(--supporting-pane-top,0px)] lg:bottom-0 lg:w-[var(--supporting-pane-width,320px)] lg:overflow-y-auto scrollbar-none'
      },
      // supporting sticks as user scrolls the page (classic sticky)
      parent: {
        supporting: 'lg:sticky lg:top-4 overflow-y-scroll'
      }
    },
    position: {
      right: {
        base: 'lg:flex-row',
        supporting: ''
      },
      left: {
        base: 'lg:flex-row-reverse',
        supporting: ''
      }
    },
    centered: {
      true: {
        base: 'max-w-5xl mx-auto'
      },
      false: {
        base: 'justify-between'
      }
    },
    gap: {
      none: { main: 'gap-0' },
      sm: { main: 'gap-4' },
      md: { main: 'gap-6' },
      lg: { main: 'gap-8' }
    },
    full: {
      true: { base: 'min-h-dvh' },
      false: ''
    },
    rounded: {
      true: {
        main: 'rounded-t-lg'
      },
      false: {
        main: ''
      }
    }
  },
  compoundVariants: [
    {
      anchor: 'viewport',
      position: 'right',
      class: {
        supporting: 'lg:right-0',
        main: 'lg:mr-[var(--supporting-pane-width,320px)]'
      }
    },
    {
      anchor: 'viewport',
      position: 'left',
      class: {
        supporting: 'lg:left-0',
        main: 'lg:ml-[var(--supporting-pane-width,320px)]'
      }
    }
  ],
  defaultVariants: {
    anchor: 'parent',
    position: 'right',
    centered: true,
    rounded: true,
    gap: 'md'
  }
});
