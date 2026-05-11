import { tv } from 'tailwind-variants';

export const scrollArea = tv({
  slots: {
    root: 'relative overflow-hidden',
    viewport: 'size-full rounded-[inherit]',
    scrollbar: 'flex touch-none select-none transition-colors duration-150 ease-out',
    thumb:
      'relative flex-1 rounded-full bg-md-sys-color-outline-variant hover:bg-md-sys-color-secondary active:bg-md-sys-color-secondary transition-colors duration-150',
    corner: 'bg-md-sys-color-surface-container-highest'
  },
  variants: {
    orientation: {
      vertical: {
        scrollbar: 'h-full w-2 border-l border-l-transparent p-px'
      },
      horizontal: {
        scrollbar: 'h-2 w-full border-t border-t-transparent p-px'
      },
      both: {
        scrollbar: ''
      }
    }
  },
  defaultVariants: {
    orientation: 'vertical'
  }
});
