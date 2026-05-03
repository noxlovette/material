import { tv, type VariantProps } from 'tailwind-variants';

export type TabVariants = VariantProps<typeof tab>;
export type TabHolderVariants = VariantProps<typeof tabHolder>;

export const tabHolder = tv({
	slots: {
		base: 'relative flex w-full bg-md-sys-color-surface',
		bar: 'absolute bottom-0 h-[3px] bg-md-sys-color-primary transition-transform duration-200 ease-out'
	}
});

export const tab = tv({
	slots: {
		base: [
			'relative flex w-full cursor-pointer flex-col items-center justify-center',
			'data-[state=active]:text-md-sys-color-primary',
			'data-[state=inactive]:text-md-sys-color-on-surface-variant'
		].join(' '),
		label: 'md-sys-typescale-title-small',
		icon: 'size-6 text-[24px]'
	},
	variants: {
		variant: {
			primary: {
				base: 'h-16 gap-1 py-3'
			},
			secondary: {
				base: 'h-12 py-3',
				icon: 'hidden'
			}
		}
	},
	defaultVariants: {
		variant: 'primary'
	}
});
