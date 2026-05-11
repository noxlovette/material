import type { RadioGroupRootProps } from 'bits-ui';
import type { RadioGroupVariants } from './theme.js';

export interface RadioGroupItem {
  /** The value submitted to the form and used for `bind:value` matching. */
  value: string;
  /** Label displayed beside the indicator. */
  label: string;
  /** Optional secondary text below the label. */
  supportingText?: string;
  /** Disables this individual item. */
  disabled?: boolean;
}

export type RadioGroupProps = RadioGroupVariants &
  Omit<RadioGroupRootProps, 'children' | 'orientation'> & {
    /** The list of options to render. */
    items: RadioGroupItem[];
    /** Currently selected value. @bindable */
    value?: string;
    /** Layout direction. Defaults to 'vertical'. */
    orientation?: 'vertical' | 'horizontal';
    /** Marks all items as error state. */
    error?: boolean;
    /** Additional CSS classes for the root element. */
    class?: string;
  };
