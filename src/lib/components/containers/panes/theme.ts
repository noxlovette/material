import { tv, type VariantProps } from 'tailwind-variants';

export type SplitPaneVariants = VariantProps<typeof splitPane>;
export type SinglePaneVariants = VariantProps<typeof singlePane>;
export type SupportingPaneVariants = VariantProps<typeof supportingPane>;

export const splitPane = tv({
	slots: {
		left: 'top-0 bottom-0 overflow-y-scroll overflow-x-visible bg-md-sys-color-surface-container scrollbar-none hidden md:block',
		right: 'flex flex-col box-border ml-0 md:ml-[var(--splitpane-left-width)]',
		handle:
			'handle group hidden md:block top-0 bottom-0 z-40 w-3 -ml-1 cursor-col-resize touch-none bg-transparent hover:bg-md-sys-color-outline/20 translate-x-1.5',
		handleGrip:
			'absolute left-1/2 top-1/2 flex h-12 w-1 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-full bg-md-sys-color-secondary group-hover:w-0.5',
		handlePip: 'h-0.5 w-0.5 rounded-full bg-md-sys-color-on-primary/80',
		base: ''
	},
	variants: {
		anchor: {
			viewport: {
				left: 'md:fixed',
				handle: 'fixed'
			},
			parent: {
				base: 'relative',
				left: 'md:absolute',
				handle: 'absolute'
			}
		},
		full: {
			true: {
				right: 'md:min-h-[calc(100dvh-30px)]'
			},
			false: ''
		},
		rounded: {
			true: {
				left: 'md:rounded-t-lg'
			},
			false: {
				left: ''
			}
		}
	},
	defaultVariants: {
		anchor: 'viewport',
		rounded: true
	}
});

export const singlePane = tv({
	slots: {
		base: 'flex flex-col box-border overflow-clip items-center',
		content: 'flex flex-1 flex-col gap-3 w-full md:pb-12 max-w-7xl mx-auto',
		headline: 'md-sys-typescale-title-medium mb-4'
	},
	variants: {
		background: {
			true: 'bg-md-sys-color-surface',
			false: ''
		},
		centered: {
			narrow: {
				content: 'max-w-2xl'
			},
			medium: {
				content: 'max-w-5xl'
			},
			none: ''
		},
		full: {
			true: 'min-h-dvh',
			false: ''
		},
		rounded: {
			true: {
				base: 'md:rounded-t-lg'
			},
			false: {
				base: ''
			}
		}
	},
	defaultVariants: {
		rounded: true
	}
});

export const supportingPane = tv({
	slots: {
		base: 'flex w-full flex-col gap-6 md:flex-row',
		main: 'bg-md-sys-color-surface box-border grow order-2 md:order-1',
		supporting:
			'text-md-sys-color-on-surface-container box-border order-1 md:order-2 min-w-min md:w-80 overflow-x-visible'
	},
	variants: {
		anchor: {
			// supporting scrolls independently; main scrolls the page
			viewport: {
				supporting:
					'md:fixed md:top-[var(--supporting-pane-top,0px)] md:bottom-0 md:w-[var(--supporting-pane-width,320px)] md:overflow-y-auto scrollbar-none'
			},
			// supporting sticks as user scrolls the page (classic sticky)
			parent: {
				supporting: 'md:sticky md:top-4 overflow-y-scroll'
			}
		},
		position: {
			right: {
				base: 'md:flex-row',
				supporting: ''
			},
			left: {
				base: 'md:flex-row-reverse',
				supporting: ''
			}
		},
		centered: {
			true: {
				base: 'max-w-5xl mx-auto'
			},
			false: {
				base: 'justify-between'
			}
		},
		full: {
			true: { base: 'min-h-dvh' },
			false: ''
		},
		rounded: {
			true: {
				main: 'rounded-t-lg'
			},
			false: {
				main: ''
			}
		}
	},
	compoundVariants: [
		{
			anchor: 'viewport',
			position: 'right',
			class: {
				supporting: 'md:right-0',
				main: 'md:mr-[var(--supporting-pane-width,320px)]'
			}
		},
		{
			anchor: 'viewport',
			position: 'left',
			class: {
				supporting: 'md:left-0',
				main: 'md:ml-[var(--supporting-pane-width,320px)]'
			}
		}
	],
	defaultVariants: {
		anchor: 'parent',
		position: 'right',
		centered: true,
		rounded: true
	}
});
