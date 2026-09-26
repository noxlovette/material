import { tv, type VariantProps } from '$lib/utils/tv.js';

export type DateFieldVariants = VariantProps<typeof dateField>;
export type DateRangeFieldVariants = VariantProps<typeof dateRangeField>;

export const dateRangeField = tv({
  slots: {
    base: `
			group w-full h-spacing-700 relative flex items-center
		`,
    inputWrapper: `
			relative flex-1 px-spacing-200 h-full flex items-center
		`,
    input: `
			bg-transparent outline-none flex items-center
			md-sys-typescale-body-large text-md-sys-color-on-surface
			disabled:text-md-sys-color-on-surface/38 w-full
		`,
    leadingIcon: `
      text-md-sys-color-on-surface-variant size-spacing-300
      group-focus-within:text-md-sys-color-primary
      group-data-[invalid]:text-md-sys-color-error ml-spacing-150 text-[24px]
    `,
    trailingIcon: `
      mr-spacing-50 shrink-0 text-md-sys-color-on-surface-variant
      group-data-[invalid]:text-md-sys-color-error
    `,
    separator: `
			text-md-sys-color-on-surface-variant select-none shrink-0
		`,
    label: `
			absolute left-spacing-200 top-spacing-75
			md-sys-typescale-body-small
			text-md-sys-color-on-surface-variant
			pointer-events-none
			transition-[top,font-size,line-height,color,transform] md-sys-motion-fast-spatial
			group-focus-within:text-md-sys-color-primary
			z-20
		`,
    requiredAsterisk: `
			ml-spacing-25
			text-md-sys-color-error
			group-focus-within:text-md-sys-color-primary
			transition-colors md-sys-motion-effects
		`,
    supportingText: `
			px-spacing-200 pt-spacing-50 flex justify-between
			md-sys-typescale-body-small
			text-md-sys-color-on-surface-variant
		`
  },
  variants: {
    variant: {
      filled: {
        base: `
          bg-md-sys-color-surface-container-highest rounded-t-xs
          after:absolute after:bottom-spacing-0 after:left-spacing-0 after:right-spacing-0
          state-layer before:rounded-xs hover:before:bg-md-sys-color-on-surface/8
          after:h-px after:bg-md-sys-color-on-surface-variant
          after:transition-[height,background-color] after:md-sys-motion-fast-spatial
          hover:after:bg-md-sys-color-on-surface
          focus-within:after:bg-md-sys-color-primary focus-within:after:h-[2px]
          disabled:bg-md-sys-color-on-surface/4
          disabled:after:bg-md-sys-color-on-surface/12
        `
      },
      outlined: {
        base: `
          rounded-xs border border-md-sys-color-outline
          transition-colors md-sys-motion-fast-effects
          hover:border-md-sys-color-on-surface
          focus-within:border-2 focus-within:border-md-sys-color-primary
        `
      }
    },

    error: {
      true: {
        base: 'after:bg-md-sys-color-error focus-within:after:bg-md-sys-color-error',
        label: 'text-md-sys-color-error',
        requiredAsterisk: 'text-md-sys-color-error',
        supportingText: 'text-md-sys-color-error',
        leadingIcon: 'text-md-sys-color-error',
        trailingIcon: 'text-md-sys-color-error'
      }
    },
    disabled: {
      true: {
        base: 'pointer-events-none opacity-60'
      }
    }
  },

  compoundVariants: [
    {
      variant: 'outlined',
      error: true,
      class: {
        base: 'border-md-sys-color-error hover:border-md-sys-color-error focus-within:border-md-sys-color-error'
      }
    },
    {
      variant: 'outlined',
      disabled: true,
      class: {
        base: 'border-md-sys-color-on-surface/12 hover:border-md-sys-color-on-surface/12'
      }
    }
  ],

  defaultVariants: {
    variant: 'outlined'
  }
});

export const dateField = tv({
  slots: {
    base: `
				group w-full h-spacing-700 relative flex items-center justify-between
			`,
    inputWrapper: `
			relative flex-1 px-spacing-200 h-full flex items-center
		`,
    input: `
				w-full bg-transparent outline-none
				md-sys-typescale-body-large text-md-sys-color-on-surface
				disabled:text-md-sys-color-on-surface/38 flex items-center
			`,
    segments: `
			flex w-full flex-col tabular-nums
		`,
    leadingIcon: `
      text-md-sys-color-on-surface-variant size-spacing-300
      group-focus-within:text-md-sys-color-primary
      group-data-[invalid]:text-md-sys-color-error ml-spacing-150 text-[24px]
    `,
    trailingIcon: `
      mr-spacing-50 shrink-0 text-md-sys-color-on-surface-variant
      group-data-[invalid]:text-md-sys-color-error
    `,
    label: `
			absolute left-spacing-200 top-spacing-75
			md-sys-typescale-body-small
			text-md-sys-color-on-surface-variant
			pointer-events-none
			transition-[top,font-size,line-height,color,transform] md-sys-motion-fast-spatial
			group-focus-within:text-md-sys-color-primary
			z-20
		`,
    requiredAsterisk: `
			ml-spacing-25
			text-md-sys-color-error
			group-focus-within:text-md-sys-color-primary
			transition-colors md-sys-motion-effects
		`,
    supportingText: `
			px-spacing-200 pt-spacing-50 flex justify-between
			md-sys-typescale-body-small
			text-md-sys-color-on-surface-variant
		`,
    fieldset: `
      absolute -top-[5px] left-spacing-0 right-spacing-0 bottom-spacing-0 m-spacing-0 px-spacing-100
      pointer-events-none rounded-xs border border-md-sys-color-outline
      transition-colors md-sys-motion-fast-effects

      group-hover:border-md-sys-color-on-surface
      group-focus-within:border-2 group-focus-within:border-md-sys-color-primary
    `,
    legend: `
      invisible float-none block h-auto max-w-full overflow-hidden
      whitespace-nowrap md-sys-typescale-body-small
    `,
    legendLabel: `
      px-spacing-50
    `
  },
  variants: {
    variant: {
      filled: {
        base: `
          bg-md-sys-color-surface-container-highest rounded-t-xs
          after:absolute after:bottom-spacing-0 after:left-spacing-0 after:right-spacing-0
          state-layer before:rounded-xs hover:before:bg-md-sys-color-on-surface/8
          after:h-px after:bg-md-sys-color-on-surface-variant
          after:transition-[height,background-color] after:md-sys-motion-fast-spatial
          hover:after:bg-md-sys-color-on-surface
          focus-within:after:bg-md-sys-color-primary focus-within:after:h-[2px]
          disabled:bg-md-sys-color-on-surface/4
          disabled:after:bg-md-sys-color-on-surface/12
        `,
        segments: 'pt-spacing-200'
      },
      outlined: {
        label: `
          top-spacing-0 -translate-y-1/2
        `
      }
    },

    error: {
      true: {
        base: 'after:bg-md-sys-color-error focus-within:after:bg-md-sys-color-error',
        label: 'text-md-sys-color-error',
        requiredAsterisk: 'text-md-sys-color-error',
        supportingText: 'text-md-sys-color-error',
        leadingIcon: 'text-md-sys-color-error',
        trailingIcon: 'text-md-sys-color-error',
        fieldset: `
          border-md-sys-color-error
          group-hover:border-md-sys-color-error
          group-focus-within:border-md-sys-color-error
        `
      }
    },
    disabled: {
      true: {
        base: 'pointer-events-none opacity-60',
        fieldset: 'border-md-sys-color-on-surface/12 group-hover:border-md-sys-color-on-surface/12'
      }
    }
  },

  defaultVariants: {
    variant: 'outlined'
  }
});

/** Segments of the typed date (`DatePicker.Segment` / `DateRangePicker.Segment`). */
export const dateSegment = tv({
  base: `
    rounded-xs px-spacing-25 py-spacing-25 select-none cursor-default outline-none
    transition-colors md-sys-motion-fast-effects
  `,
  variants: {
    part: {
      literal: 'text-md-sys-color-on-surface-variant px-spacing-0',
      value: `
        text-md-sys-color-on-surface
        aria-[valuetext=Empty]:text-md-sys-color-on-surface-variant
        hover:bg-md-sys-color-on-surface/8
        focus:bg-md-sys-color-primary-container focus:text-md-sys-color-on-primary-container
      `
    }
  },
  defaultVariants: {
    part: 'value'
  }
});

/**
 * Docked date picker surface, shared by DateField and DateRangeField.
 * @see https://m3.material.io/components/date-pickers/specs#docked-date-picker
 * 360dp wide = 12dp padding + 7 × 48dp targets; each day is a 40dp circle inside its target.
 */
export const dateCalendar = tv({
  slots: {
    surface: `
      w-90 rounded-lg px-spacing-150 pb-spacing-150
      bg-md-sys-color-surface-container-high shadow-elevation-3
      text-md-sys-color-on-surface
    `,
    header: `
      flex h-spacing-700 items-center justify-between pl-spacing-200 pr-spacing-50
    `,
    heading: `
      md-sys-typescale-label-large text-md-sys-color-on-surface-variant
    `,
    nav: `
      flex items-center text-md-sys-color-on-surface-variant
    `,
    grid: `
      w-full border-collapse select-none
    `,
    row: `
      flex w-full
    `,
    weekday: `
      flex size-spacing-600 items-center justify-center
      md-sys-typescale-body-large text-md-sys-color-on-surface
    `,
    /* The range band runs behind every day in the range. On the endpoints it covers only the inner
       half, so it meets the selected circle instead of sticking out past it. A one-day range has
       no band. */
    cell: `
      relative flex size-spacing-600 items-center justify-center p-spacing-0
      before:absolute before:inset-x-spacing-0 before:h-spacing-500 before:bg-md-sys-color-secondary-container
      before:opacity-0 before:transition-opacity before:md-sys-motion-fast-effects
      data-range-middle:before:opacity-100
      data-highlighted:before:opacity-100
      data-range-start:before:opacity-100 data-range-end:before:opacity-100
      data-range-start:before:left-1/2 data-range-end:before:right-1/2
      data-range-start:data-range-end:before:opacity-0
      data-outside-month:before:opacity-0
    `,
    day: `
      relative flex size-spacing-500 items-center justify-center rounded-full
      md-sys-typescale-body-large text-md-sys-color-on-surface
      cursor-pointer outline-none
      transition-colors md-sys-motion-fast-effects

      focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-md-sys-color-secondary

      data-today:border data-today:border-md-sys-color-primary data-today:text-md-sys-color-primary

      data-range-middle:text-md-sys-color-on-secondary-container
      data-highlighted:text-md-sys-color-on-secondary-container

      data-selected:not-data-range-middle:border-transparent
      data-selected:not-data-range-middle:bg-md-sys-color-primary
      data-selected:not-data-range-middle:text-md-sys-color-on-primary

      data-disabled:cursor-not-allowed data-disabled:text-md-sys-color-on-surface/38
      data-unavailable:cursor-not-allowed data-unavailable:text-md-sys-color-on-surface/38
      data-unavailable:line-through

      data-outside-month:invisible
    `
  }
});
