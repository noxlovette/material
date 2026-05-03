import { tv, type VariantProps } from 'tailwind-variants';

export type PopoverVariants = VariantProps<typeof popover>;

export const popover = tv({
	slots: {
		base: 'relative z-50 min-w-48 max-w-sm rounded-2xl bg-md-sys-color-surface-container-high p-4 shadow-elevation-3 ring-1 ring-md-sys-color-outline/20',
		close: 'absolute top-3 right-3',
		header: 'mb-2 flex items-center justify-between gap-4',
		title: 'md-sys-typescale-title-small text-md-sys-color-on-surface',
		body: 'md-sys-typescale-body-medium text-md-sys-color-on-surface-variant'
	}
});
