import { tv, type VariantProps } from 'tailwind-variants';

export type ToolbarVariants = VariantProps<typeof toolbar>;
export type ToolbarButtonVariants = VariantProps<typeof toolbarButton>;
export type ToolbarGroupItemVariants = VariantProps<typeof toolbarGroupItem>;

export const toolbar = tv({
	slots: {
		root: 'inline-flex items-center gap-0.5 rounded-2xl bg-md-sys-color-surface-container px-2 py-1 shadow-elevation-1',
		group: 'inline-flex items-center gap-0.5',
		divider: 'mx-1 h-6 w-px shrink-0 bg-md-sys-color-outline-variant'
	},
	variants: {
		orientation: {
			horizontal: { root: 'flex-row' },
			vertical: { root: 'flex-col h-auto w-14' }
		}
	},
	defaultVariants: { orientation: 'horizontal' }
});

export const toolbarButton = tv({
	slots: {
		base: 'layer-container state-layer before:rounded-full relative inline-flex size-10 items-center justify-center rounded-full text-md-sys-color-on-surface-variant outline-none transition-colors disabled:pointer-events-none disabled:opacity-38',
		icon: 'size-5 text-[20px]'
	}
});

export const toolbarGroupItem = tv({
	slots: {
		base: 'layer-container state-layer before:rounded-full relative inline-flex size-10 items-center justify-center rounded-full text-md-sys-color-on-surface-variant outline-none transition-colors disabled:pointer-events-none disabled:opacity-38 data-[state=on]:bg-md-sys-color-secondary-container data-[state=on]:text-md-sys-color-on-secondary-container',
		icon: 'size-5 text-[20px]'
	}
});
