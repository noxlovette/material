import { tv } from 'tailwind-variants';

export const navbar = tv({
  slots: {
    base: 'shadow-elevation-2 bg-md-sys-color-surface-container relative z-20 flex h-20 fixed bottom-0 w-full left-0 justify-around py-3 md:hidden',
    items: 'flex justify-around w-full',
    fab: 'bottom-24 right-4 absolute'
  }
});

export const navitem = tv({
  slots: {
    base: 'group relative flex flex-1 flex-col items-center justify-center min-w-0 max-w-[168px] h-full transition-colors',
    content: 'flex flex-col items-center justify-center gap-1 w-full',
    iconContainer:
      'relative flex items-center justify-center h-8 w-16 rounded-full transition-colors duration-200 ease-in-out',
    icon: 'text-[24px]',
    label: 'md-sys-typescale-label-medium truncate w-full text-center'
  },
  variants: {
    active: {
      true: {
        content: 'text-md-sys-color-on-secondary-container',
        label: 'font-bold text-md-sys-color-on-surface',
        iconContainer: 'bg-md-sys-color-secondary-container'
      },
      false: {
        content: 'text-md-sys-color-on-surface-variant',
        label: 'text-md-sys-color-on-surface-variant',
        iconContainer: 'group-hover:bg-md-sys-color-surface-variant/10'
      }
    }
  }
});
