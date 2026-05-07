import { tv, type VariantProps } from 'tailwind-variants';

export type SelectVariants = VariantProps<typeof select>;

export const select = tv({
	slots: {
		root: 'relative w-full',
		trigger: `
      group w-full h-14 px-4 bg-md-sys-color-surface-container-highest
      rounded-t-xs state-layer before:rounded-xs hover:before:bg-md-sys-color-on-surface/8 relative flex items-center
      after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-md-sys-color-on-surface-variant
      after:transition-[height,background-color] after:duration-200
      hover:after:bg-md-sys-color-on-surface
      data-[state=open]:after:bg-md-sys-color-primary
      data-[state=open]:after:h-[2px]
      disabled:bg-md-sys-color-on-surface/4
      disabled:after:bg-md-sys-color-on-surface/12
      cursor-pointer justify-between
    `,
		value: `
      peer w-full bg-transparent outline-none
      md-sys-typescale-body-large text-md-sys-color-on-surface
      disabled:text-md-sys-color-on-surface/38
      truncate text-left
    `,
		leadingIcon: `
      text-md-sys-color-on-surface-variant size-6
      group-data-[state=open]:text-md-sys-color-primary
      group-data-[invalid]:text-md-sys-color-error ml-3 text-[24px]
    `,
		dropdownIcon: `
      mr-3 text-md-sys-color-on-surface-variant size-6
      group-data-[state=open]:text-md-sys-color-primary
      group-data-[invalid]:text-md-sys-color-error z-20 text-[24px]
      transition-transform duration-200
      group-data-[state=open]:rotate-180
    `,
		content: `
      z-50 min-w-[var(--bits-select-trigger-width)] max-h-96 overflow-y-auto
      rounded-sm bg-md-sys-color-surface-container-high
      shadow-elevation-3 py-2 outline-none
    `,
		item: `
      relative flex w-full cursor-pointer select-none
      px-4 py-3 outline-none
      md-sys-typescale-body-large text-md-sys-color-on-surface
      hover:bg-md-sys-color-on-surface/8
      focus:bg-md-sys-color-on-surface/8
      data-[selected]:bg-md-sys-color-secondary-container
      data-[selected]:text-md-sys-color-on-secondary-container
      data-[disabled]:pointer-events-none data-[disabled]:opacity-50
      transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl
    `,
		groupLabel: `
      px-4 py-2 md-sys-typescale-label-medium
      text-md-sys-color-primary
    `,
		separator: `
      -mx-1 my-1 h-px bg-md-sys-color-outline-variant
    `,
		supportingText: `
      px-4 pt-1 flex justify-between
      md-sys-typescale-body-small
      text-md-sys-color-on-surface-variant
      group-data-[invalid]:text-md-sys-color-error
    `
	},
	variants: {
		error: {
			true: {
				trigger: 'after:bg-md-sys-color-error data-[state=open]:after:bg-md-sys-color-error',
				label: 'text-md-sys-color-error',
				supportingText: 'text-md-sys-color-error',
				leadingIcon: 'text-md-sys-color-error',
				trailingIcon: 'text-md-sys-color-error'
			}
		},
		disabled: {
			true: {
				root: 'pointer-events-none opacity-60'
			}
		}
	}
});
