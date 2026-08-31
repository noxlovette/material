import { tv, type VariantProps } from 'tailwind-variants';

export type DateFieldVariants = VariantProps<typeof dateField>;
export type DateRangeFieldVariants = VariantProps<typeof dateRangeField>;

export const dateRangeField = tv({
  slots: {
    base: `
			group w-full h-14 relative flex items-center
		`,
    inputWrapper: `
			relative flex-1 px-4 h-full flex items-center
		`,
    input: `
			bg-transparent outline-none flex items-center
			md-sys-typescale-body-large text-md-sys-color-on-surface
			disabled:text-md-sys-color-on-surface/38 w-full
		`,
    leadingIcon: `
      text-md-sys-color-on-surface-variant size-6
      group-focus-within:text-md-sys-color-primary
      group-data-[invalid]:text-md-sys-color-error ml-3 text-[24px]
    `,
    trailingIcon: `
      text-md-sys-color-on-surface-variant size-6
      group-focus-within:text-md-sys-color-primary
      group-data-[invalid]:text-md-sys-color-error mr-3 text-[24px]
    `,
    separator: `
			text-md-sys-color-on-surface-variant select-none shrink-0
		`,
    label: `
			absolute left-4 top-1.5
			md-sys-typescale-body-small
			text-md-sys-color-on-surface-variant
			pointer-events-none
			transition-[top,font-size,line-height,color,transform] duration-200 ease-in-out
			group-focus-within:text-md-sys-color-primary
			z-20
		`,
    requiredAsterisk: `
			ml-0.5
			text-md-sys-color-error
			group-focus-within:text-md-sys-color-primary
			transition-colors duration-200
		`,
    supportingText: `
			px-4 pt-1 flex justify-between
			md-sys-typescale-body-small
			text-md-sys-color-on-surface-variant
		`
  },
  variants: {
    variant: {
      filled: {
        base: `
          bg-md-sys-color-surface-container-highest rounded-t-xs
          after:absolute after:bottom-0 after:left-0 after:right-0
          state-layer before:rounded-xs hover:before:bg-md-sys-color-on-surface/8
          after:h-px after:bg-md-sys-color-on-surface-variant
          after:transition-[height,background-color] after:duration-200
          hover:after:bg-md-sys-color-on-surface
          focus-within:after:bg-md-sys-color-primary focus-within:after:h-[2px]
          disabled:bg-md-sys-color-on-surface/4
          disabled:after:bg-md-sys-color-on-surface/12
        `
      },
      outlined: {
        base: `
          rounded-xs border border-md-sys-color-outline
          transition-colors duration-150
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
				group w-full h-14 relative flex items-center justify-between
			`,
    inputWrapper: `
			relative flex-1 px-4 h-full flex items-center
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
      text-md-sys-color-on-surface-variant size-6
      group-focus-within:text-md-sys-color-primary
      group-data-[invalid]:text-md-sys-color-error ml-3 text-[24px]
    `,
    trailingIcon: `
      text-md-sys-color-on-surface-variant size-6
      group-focus-within:text-md-sys-color-primary
      group-data-[invalid]:text-md-sys-color-error mr-3 text-[24px]
    `,
    label: `
			absolute left-4 top-1.5
			md-sys-typescale-body-small
			text-md-sys-color-on-surface-variant
			pointer-events-none
			transition-[top,font-size,line-height,color,transform] duration-200 ease-in-out
			group-focus-within:text-md-sys-color-primary
			z-20
		`,
    requiredAsterisk: `
			ml-0.5
			text-md-sys-color-error
			group-focus-within:text-md-sys-color-primary
			transition-colors duration-200
		`,
    supportingText: `
			px-4 pt-1 flex justify-between
			md-sys-typescale-body-small
			text-md-sys-color-on-surface-variant
		`,
    fieldset: `
      absolute -top-[5px] left-0 right-0 bottom-0 m-0 px-2
      pointer-events-none rounded-xs border border-md-sys-color-outline
      transition-colors duration-150

      group-hover:border-md-sys-color-on-surface
      group-focus-within:border-2 group-focus-within:border-md-sys-color-primary
    `,
    legend: `
      invisible float-none block h-auto max-w-full overflow-hidden
      whitespace-nowrap md-sys-typescale-body-small
    `,
    legendLabel: `
      px-1
    `
  },
  variants: {
    variant: {
      filled: {
        base: `
          bg-md-sys-color-surface-container-highest rounded-t-xs
          after:absolute after:bottom-0 after:left-0 after:right-0
          state-layer before:rounded-xs hover:before:bg-md-sys-color-on-surface/8
          after:h-px after:bg-md-sys-color-on-surface-variant
          after:transition-[height,background-color] after:duration-200
          hover:after:bg-md-sys-color-on-surface
          focus-within:after:bg-md-sys-color-primary focus-within:after:h-[2px]
          disabled:bg-md-sys-color-on-surface/4
          disabled:after:bg-md-sys-color-on-surface/12
        `,
        segments: 'pt-4'
      },
      outlined: {
        label: `
          top-0 -translate-y-1/2
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
