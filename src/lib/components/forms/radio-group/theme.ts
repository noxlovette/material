import { tv, type VariantProps } from 'tailwind-variants';

export const radioGroup = tv({
	slots: {
		root: 'flex',
		item: 'inline-flex min-h-10 cursor-pointer select-none items-center gap-3 text-md-sys-color-on-surface',
		indicator: 'relative inline-flex  size-[20px] shrink-0',
		control:
			'relative layer-container absolute -inset-[10px] rounded-full text-md-sys-color-on-surface-variant state-layer before:rounded-full',
		outerRing:
			'absolute inset-0 rounded-full border-2 border-md-sys-color-outline transition-colors',
		innerDot:
			'absolute inset-0 m-auto size-2.5 scale-0 rounded-full bg-md-sys-color-on-primary-container transition-transform duration-[350ms] [transition-timing-function:var(--md-sys-motion-timing-function-fast-spatial)]',
		label: 'md-sys-typescale-body-large text-md-sys-color-on-surface',
		supporting: 'md-sys-typescale-body-medium text-md-sys-color-on-surface-variant'
	},
	variants: {
		orientation: {
			vertical: { root: 'flex-col gap-1' },
			horizontal: { root: 'flex-row flex-wrap gap-6' }
		},
		checked: {
			true: {
				control: 'text-md-sys-color-primary',
				innerDot: 'scale-100',
				outerRing: 'border-md-sys-color-primary'
			},
			false: {}
		},
		disabled: {
			true: {
				item: 'cursor-default',
				control: 'pointer-events-none text-md-sys-color-on-surface/38 before:hidden',
				outerRing: 'border-md-sys-color-on-surface/38',
				innerDot: 'bg-md-sys-color-on-surface/38',
				label: 'text-md-sys-color-on-surface/38',
				supporting: 'text-md-sys-color-on-surface/38'
			}
		},
		error: {
			true: {
				control: 'text-md-sys-color-error',
				label: 'text-md-sys-color-error',
				supporting: 'text-md-sys-color-error'
			}
		}
	},
	defaultVariants: {
		orientation: 'vertical',
		checked: false
	}
});

export type RadioGroupVariants = VariantProps<typeof radioGroup>;
