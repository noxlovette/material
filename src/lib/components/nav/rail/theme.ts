import { tv, type VariantProps } from 'tailwind-variants';

export type RailVariants = VariantProps<typeof rail>;
export type RailItemVariants = VariantProps<typeof railElement>;

export const rail = tv({
	slots: {
		base: 'py-12 hidden bg-md-sys-color-surface-container z-20 flex-col md:flex gap-6 transition-[width,padding,background-color] duration-[var(--md-sys-motion-duration-spatial)] ease-[var(--md-sys-motion-timing-function-emphasized)] overflow-x-hidden',
		items: 'flex flex-col gap-3 pt-6 scrollbar-none w-full',
		ghost:
			'hidden md:block shrink-0 transition-[width] duration-[var(--md-sys-motion-duration-spatial)] ease-[var(--md-sys-motion-timing-function-emphasized)]',
		scrim:
			'xl:hidden inset-0 -z-10 transition-opacity duration-[var(--md-sys-motion-duration-spatial)] ease-[var(--md-sys-motion-timing-function-emphasized)]'
	},
	variants: {
		anchor: {
			viewport: {
				base: 'fixed top-[var(--rail-top,0px)] bottom-0 left-0',
				scrim: 'fixed'
			},
			parent: {
				base: 'absolute top-[var(--rail-top,0px)] bottom-0 left-0',
				scrim: 'absolute'
			}
		},
		expanded: {
			true: {
				base: 'pl-9 w-60 items-start bg-md-sys-color-surface-container-highest xl:bg-md-sys-color-surface-container rounded-r-lg',
				ghost: 'w-24 xl:w-60',
				scrim: 'z-20 bg-black/40'
			},
			false: {
				base: 'w-24 items-center',
				items: 'items-center',
				ghost: 'w-24'
			}
		},
		rounded: {
			true: {
				base: 'rounded-xl'
			},
			false: {}
		}
	},
	defaultVariants: {
		anchor: 'viewport'
	}
});

export const railElement = tv({
	slots: {
		base: 'group relative z-30 flex w-full transition-all duration-[var(--md-sys-motion-duration-spatial)] ease-[var(--md-sys-motion-timing-function-emphasized)]',
		content:
			'flex items-center min-w-0 rounded-full gap-0.5 py-1.5 transition-all duration-[var(--md-sys-motion-duration-spatial)] ease-[var(--md-sys-motion-timing-function-emphasized)]',
		iconContainer:
			'relative rounded-full items-center justify-center inline-flex transition-all duration-[var(--md-sys-motion-duration-spatial)] ease-[var(--md-sys-motion-timing-function-emphasized)]',
		icon: 'text-[24px] transition-all duration-[var(--md-sys-motion-duration-spatial)] ease-[var(--md-sys-motion-timing-function-emphasized)]',
		label:
			'transition-all duration-[var(--md-sys-motion-duration-spatial)] ease-[var(--md-sys-motion-timing-function-emphasized)] whitespace-nowrap'
	},
	variants: {
		active: {
			true: {
				content: 'text-md-sys-color-on-secondary-container',
				label: 'font-bold',
				iconContainer:
					'group-hover:text-md-sys-color-secondary  bg-md-sys-color-secondary-container'
			},
			false: {
				content: 'text-md-sys-color-on-surface-variant',
				iconContainer: ''
			}
		},
		expanded: {
			true: {
				base: 'justify-start',
				content: 'p-4 gap-3',
				iconContainer: '',
				label: 'md-sys-typescale-label-large'
			},
			false: {
				base: 'text-center justify-center',
				content: 'flex-col',
				iconContainer: 'py-1.5 px-4',
				label: 'md-sys-typescale-label-medium'
			}
		},
		disabled: {
			true: {
				base: 'cursor-not-allowed opacity-38'
			}
		}
	},
	compoundVariants: [
		{
			expanded: true,
			active: true,
			class: {
				iconContainer: 'bg-transparent',
				content: 'bg-md-sys-color-secondary-container'
			}
		},
		{
			expanded: true,
			active: false,
			class: {
				content: 'group-hover:bg-md-sys-color-surface-variant'
			}
		},
		{
			expanded: false,
			active: false,
			class: {
				iconContainer: 'group-hover:bg-md-sys-color-surface-variant'
			}
		}
	]
});
