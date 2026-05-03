import { tv, type VariantProps } from 'tailwind-variants';

export type PillVariants = VariantProps<typeof pill>;

export const pill = tv({
	base: 'relative inline-flex items-center justify-center px-4 py-2 md-sys-typescale-label-large select-none',
	variants: {
		variant: {
			primary: 'md-component-button-filled-primary',
			secondary: 'md-component-button-filled-secondary',
			tertiary: 'md-component-button-filled-tertiary',
			error: 'md-component-button-filled-error',
			container: 'bg-md-sys-color-surface-container text-md-sys-color-on-surface'
		}
	},
	defaultVariants: {
		variant: 'primary'
	}
});
