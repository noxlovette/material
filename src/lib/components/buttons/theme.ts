import { tv, type VariantProps } from 'tailwind-variants';

// Variants
export type ButtonVariants = VariantProps<typeof button>;
export type ButtonGroupVariants = VariantProps<typeof buttonGroup>;
export type FABVariants = VariantProps<typeof fab>;
export type FABMenuVariants = VariantProps<typeof fabMenu>;
export type ButtonMDVariants = VariantProps<typeof button>;
export type ButtonIconVariants = VariantProps<typeof buttonIcon>;
export type FABMenuItemVariants = VariantProps<typeof fabMenuItem>;

export const button = tv({
	slots: {
		base: 'md-component-button-base md-btn-morph group max-w-max',
		icon: 'inline-flex items-center justify-center leading-none'
	},
	variants: {
		variant: {
			elevated: '',
			filled: '',
			tonal: '',
			outlined: '',
			text: '',
			bare: ''
		},
		color: {
			default: '',
			primary: '',
			secondary: '',
			tertiary: '',
			error: ''
		},
		usage: {
			selection: '',
			default: ''
		},
		size: {
			xs: {
				base: 'h-8 gap-2 px-4 md-sys-typescale-label-large font-medium [--btn-shape:1rem] [--btn-pressed-shape:4px]',
				icon: 'text-[20px] size-5'
			},
			sm: {
				base: 'h-10 gap-2 px-4 md-sys-typescale-label-large font-medium [--btn-shape:1.25rem] [--btn-pressed-shape:4px]',
				icon: 'size-5 text-[20px]'
			},
			md: {
				base: 'h-14 px-6 gap-2 md-sys-typescale-title-medium font-medium [--btn-shape:1.75rem] [--btn-pressed-shape:12px]',
				icon: 'size-6 text-[24px]'
			},
			lg: {
				base: 'h-24 px-12 gap-3 md-sys-typescale-headline-small [--btn-shape:3rem] [--btn-pressed-shape:16px]',
				icon: 'size-8 text-[32px]'
			},
			xl: {
				base: 'h-34 px-16 md-sys-typescale-headline-large gap-4 [--btn-shape:4.25rem] [--btn-pressed-shape:28px]',
				icon: 'text-[40px] size-10'
			}
		},
		shape: {
			round: '',
			square: '[--btn-shape-override:0.375rem]'
		},
		selected: {
			true: '',
			false: ''
		}
	},
	compoundVariants: [
		{
			usage: 'selection',
			selected: true,
			class: { base: 'bg-md-sys-color-primary text-md-sys-color-on-primary [--btn-shape-override:0.75rem]' }
		},
		{
			usage: 'selection',
			selected: false,
			class: { base: 'bg-md-sys-color-surface-container' }
		},
		{
			variant: 'text',
			class: { base: 'bg-transparent' }
		},
		{
			variant: 'bare',
			class: { base: 'bg-transparent' }
		},
		{
			variant: 'filled',
			color: 'default',
			class: { base: 'md-component-button-filled-primary' }
		},
		{
			variant: 'filled',
			color: 'primary',
			class: { base: 'md-component-button-filled-primary' }
		},
		{
			variant: 'filled',
			color: 'secondary',
			class: { base: 'md-component-button-filled-secondary' }
		},
		{
			variant: 'filled',
			color: 'tertiary',
			class: { base: 'md-component-button-filled-tertiary' }
		},
		{
			variant: 'filled',
			color: 'error',
			class: { base: 'md-component-button-filled-error' }
		},
		{
			variant: 'tonal',
			color: 'default',
			class: { base: 'md-component-button-tonal-primary' }
		},
		{
			variant: 'tonal',
			color: 'primary',
			class: { base: 'md-component-button-tonal-primary' }
		},
		{
			variant: 'tonal',
			color: 'secondary',
			class: { base: 'md-component-button-tonal-secondary' }
		},
		{
			variant: 'tonal',
			color: 'tertiary',
			class: { base: 'md-component-button-tonal-tertiary' }
		},
		{
			variant: 'tonal',
			color: 'error',
			class: { base: 'md-component-button-tonal-error' }
		},
		{
			variant: 'outlined',
			color: 'default',
			class: { base: 'md-component-button-outline-default' }
		},
		{
			variant: 'outlined',
			color: 'primary',
			class: { base: 'md-component-button-outline-primary' }
		},
		{
			variant: 'outlined',
			color: 'secondary',
			class: { base: 'md-component-button-outline-secondary' }
		},
		{
			variant: 'outlined',
			color: 'tertiary',
			class: { base: 'md-component-button-outline-tertiary' }
		},
		{
			variant: 'outlined',
			color: 'error',
			class: { base: 'md-component-button-outline-error' }
		},
		{
			variant: 'text',
			color: 'default',
			class: { base: 'md-component-button-text-default' }
		},
		{
			variant: 'text',
			color: 'primary',
			class: { base: 'md-component-button-text-primary' }
		},
		{
			variant: 'text',
			color: 'secondary',
			class: { base: 'md-component-button-text-secondary' }
		},
		{
			variant: 'text',
			color: 'tertiary',
			class: { base: 'md-component-button-text-tertiary' }
		},
		{
			variant: 'text',
			color: 'error',
			class: { base: 'md-component-button-text-error' }
		},
		{
			variant: 'elevated',
			color: 'default',
			class: { base: 'md-component-button-elevated-default' }
		},
		{
			variant: 'elevated',
			color: 'primary',
			class: { base: 'md-component-button-elevated-primary' }
		},
		{
			variant: 'elevated',
			color: 'secondary',
			class: { base: 'md-component-button-elevated-secondary' }
		},
		{
			variant: 'elevated',
			color: 'tertiary',
			class: { base: 'md-component-button-elevated-tertiary' }
		},
		{
			variant: 'elevated',
			color: 'error',
			class: { base: 'md-component-button-elevated-error' }
		}
	]
});

export const buttonIcon = tv({
	slots: {
		base: 'md-component-button-base md-btn-morph group max-w-max',
		icon: 'inline-flex items-center justify-center leading-none'
	},
	variants: {
		variant: {
			elevated: '',
			filled: '',
			tonal: '',
			outlined: '',
			text: '',
			bare: ''
		},
		color: {
			default: '',
			primary: '',
			secondary: '',
			tertiary: '',
			error: ''
		},
		size: {
			xs: {
				base: 'h-8 gap-2 px-4 md-sys-typescale-label-large font-medium [--btn-shape:1rem] [--btn-pressed-shape:4px]',
				icon: 'text-[20px] size-5'
			},
			sm: {
				base: 'h-10 gap-2 px-4 md-sys-typescale-label-large font-medium [--btn-shape:1.25rem] [--btn-pressed-shape:4px]',
				icon: 'size-5 text-[20px]'
			},
			md: {
				base: 'h-14 px-6 gap-2 md-sys-typescale-title-medium font-medium [--btn-shape:1.75rem] [--btn-pressed-shape:12px]',
				icon: 'size-6 text-[24px]'
			},
			lg: {
				base: 'h-24 px-12 gap-3 md-sys-typescale-headline-small [--btn-shape:3rem] [--btn-pressed-shape:16px]',
				icon: 'size-8 text-[32px]'
			},
			xl: {
				base: 'h-34 px-16 md-sys-typescale-headline-large gap-4 [--btn-shape:4.25rem] [--btn-pressed-shape:28px]',
				icon: 'text-[40px] size-10'
			}
		},
		width: {
			narrow: '',
			wide: '',
			default: 'aspect-square'
		},
		shape: {
			round: '',
			square: '[--btn-shape-override:0.75rem]'
		},
		selected: {
			true: '',
			false: ''
		},
		variation: {
			toggle: '',
			default: ''
		}
	},
	compoundVariants: [
		{
			variation: 'toggle',
			selected: true,
			class: { base: 'bg-md-sys-color-primary text-md-sys-color-on-primary [--btn-shape-override:0.75rem]' }
		},
		{
			variation: 'toggle',
			selected: false,
			class: { base: 'bg-md-sys-color-surface-container' }
		},
		{
			variant: 'text',
			class: { base: 'bg-transparent' }
		},
		{
			variant: 'bare',
			class: { base: 'bg-transparent' }
		},
		{
			variant: 'filled',
			color: 'default',
			class: { base: 'md-component-button-filled-primary' }
		},
		{
			variant: 'filled',
			color: 'primary',
			class: { base: 'md-component-button-filled-primary' }
		},
		{
			variant: 'filled',
			color: 'secondary',
			class: { base: 'md-component-button-filled-secondary' }
		},
		{
			variant: 'filled',
			color: 'tertiary',
			class: { base: 'md-component-button-filled-tertiary' }
		},
		{
			variant: 'filled',
			color: 'error',
			class: { base: 'md-component-button-filled-error' }
		},
		{
			variant: 'tonal',
			color: 'default',
			class: { base: 'md-component-button-tonal-primary' }
		},
		{
			variant: 'tonal',
			color: 'primary',
			class: { base: 'md-component-button-tonal-primary' }
		},
		{
			variant: 'tonal',
			color: 'secondary',
			class: { base: 'md-component-button-tonal-secondary' }
		},
		{
			variant: 'tonal',
			color: 'tertiary',
			class: { base: 'md-component-button-tonal-tertiary' }
		},
		{
			variant: 'tonal',
			color: 'error',
			class: { base: 'md-component-button-tonal-error' }
		},
		{
			variant: 'outlined',
			color: 'default',
			class: { base: 'md-component-button-outline-default' }
		},
		{
			variant: 'outlined',
			color: 'primary',
			class: { base: 'md-component-button-outline-primary' }
		},
		{
			variant: 'outlined',
			color: 'secondary',
			class: { base: 'md-component-button-outline-secondary' }
		},
		{
			variant: 'outlined',
			color: 'tertiary',
			class: { base: 'md-component-button-outline-tertiary' }
		},
		{
			variant: 'outlined',
			color: 'error',
			class: { base: 'md-component-button-outline-error' }
		},
		{
			variant: 'text',
			color: 'default',
			class: { base: 'md-component-button-text-default' }
		},
		{
			variant: 'text',
			color: 'primary',
			class: { base: 'md-component-button-text-primary' }
		},
		{
			variant: 'text',
			color: 'secondary',
			class: { base: 'md-component-button-text-secondary' }
		},
		{
			variant: 'text',
			color: 'tertiary',
			class: { base: 'md-component-button-text-tertiary' }
		},
		{
			variant: 'text',
			color: 'error',
			class: { base: 'md-component-button-text-error' }
		},
		{
			variant: 'elevated',
			color: 'default',
			class: { base: 'md-component-button-elevated-default' }
		},
		{
			variant: 'elevated',
			color: 'primary',
			class: { base: 'md-component-button-elevated-primary' }
		},
		{
			variant: 'elevated',
			color: 'secondary',
			class: { base: 'md-component-button-elevated-secondary' }
		},
		{
			variant: 'elevated',
			color: 'tertiary',
			class: { base: 'md-component-button-elevated-tertiary' }
		},
		{
			variant: 'elevated',
			color: 'error',
			class: { base: 'md-component-button-elevated-error' }
		}
	]
});

export const buttonGroup = tv({
	base: 'inline-flex rounded-lg shadow-xs',
	variants: {
		size: {
			sm: '',
			md: '',
			lg: ''
		}
	},
	defaultVariants: {
		size: 'md'
	}
});

export const fab = tv({
	slots: {
		base: 'md-component-button-base relative z-50',
		icon: '',
		label: ''
	},
	variants: {
		config: {
			primary: {
				base: 'md-component-button-filled-primary shadow-elevation-1 hover:shadow-elevation-2',
				icon: 'text-md-sys-color-on-primary',
				label: 'text-md-sys-color-on-primary'
			},
			secondary: {
				base: 'md-component-button-filled-secondary shadow-elevation-1 hover:shadow-elevation-2',
				icon: 'text-md-sys-color-on-secondary',
				label: 'text-md-sys-color-on-secondary'
			},
			tertiary: {
				base: 'md-component-button-filled-tertiary shadow-elevation-1 hover:shadow-elevation-2',
				icon: 'text-md-sys-color-on-tertiary',
				label: 'text-md-sys-color-on-tertiary'
			}
		},
		expanded: {
			true: 'gap-3 px-4',
			false: 'aspect-square'
		},
		size: {
			small: {
				base: 'h-10 rounded-xl before:rounded-xl',
				icon: 'size-6 text-[24px]',
				label: 'md-sys-typescale-label-large'
			},
			regular: {
				base: 'h-14 rounded-2xl before:rounded-2xl',
				icon: 'size-6 text-[24px]',
				label: 'md-sys-typescale-fab-label'
			},
			large: {
				base: 'h-24 rounded-[28px] before:rounded-[28px]',
				icon: 'size-9 text-[36px]',
				label: 'md-sys-typescale-headline-small'
			}
		}
	}
});

export const fabMenu = tv({
	slots: {
		base: 'gap-2 pb-2 flex flex-col absolute z-50 overflow-visible p-1'
	},
	variants: {
		position: { top: 'top-16' }
	}
});

export const fabMenuItem = tv({
	slots: {
		base: 'md-component-button-base group relative max-w-max h-14 rounded-full before:rounded-full gap-2 px-6 md-sys-typescale-fab-label z-50 shadow-elevation-2 hover:shadow-elevation-3',
		icon: 'size-6 text-[24px]'
	},
	variants: {
		variant: {
			primary: 'md-component-button-filled-primary',
			secondary: 'md-component-button-tonal-secondary',
			tertiary: 'md-component-button-outline-tertiary'
		}
	}
});
