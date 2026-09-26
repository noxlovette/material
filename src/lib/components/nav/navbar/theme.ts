import { tv } from '$lib/utils/tv.js';

export const navbar = tv({
  slots: {
    base: 'md-vt-persist shadow-elevation-2 bg-md-sys-color-surface-container z-layer-bar flex h-20 fixed bottom-spacing-0 w-full left-spacing-0 justify-around py-spacing-150 md:hidden',
    items: 'flex justify-around w-full',
    fab: 'bottom-24 right-spacing-200 absolute',
    ghost: 'h-20 w-full shrink-0 md:hidden pointer-events-none'
  }
});

export const navitem = tv({
  slots: {
    base: 'group relative flex flex-1 flex-col items-center justify-center min-w-spacing-0 max-w-[168px] h-full transition-colors md-sys-motion-fast-effects',
    content: 'flex flex-col items-center justify-center gap-spacing-50 w-full',
    iconContainer:
      'relative flex items-center justify-center h-spacing-400 w-spacing-800 rounded-full transition-colors md-sys-motion-effects',
    icon: 'text-[24px] size-spacing-300',
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
