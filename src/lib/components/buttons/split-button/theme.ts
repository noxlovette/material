import { tv, type VariantProps } from 'tailwind-variants';
import type { ButtonMDVariants } from '../theme.js';

export type SplitButtonVariants = VariantProps<typeof splitButton>;

// Inner (touching) corner radius per size — matches the ConnectedButtonGroup
// scale (see buttons/connected/theme.ts's `--cbg-inner`), since a split button
// is conceptually a 2-item connected group with a menu instead of a selection.
export const SPLIT_BUTTON_INNER_RADIUS: Record<NonNullable<ButtonMDVariants['size']>, string> = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '0.5rem',
  lg: '1rem',
  xl: '1.25rem'
};

export const splitButton = tv({
  slots: {
    root: 'inline-flex items-center gap-0.5',
    icon: 'transition-transform duration-200'
  },
  variants: {
    open: {
      true: { icon: 'rotate-180' },
      false: {}
    }
  },
  defaultVariants: {
    open: false
  }
});
