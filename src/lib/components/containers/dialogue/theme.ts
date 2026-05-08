import { tv, type VariantProps } from 'tailwind-variants';

export type DialogueVariants = VariantProps<typeof dialogue>;

export const dialogue = tv({
	slots: {
		base: 'fixed inset-0 z-40 flex items-center justify-center bg-md-sys-color-scrim/20',
		inner:
			'bg-md-sys-color-surface-container-high shadow-elevation-3 flex relative max-w-4xl flex-col rounded-2xl p-6 gap-4 min-w-70 max-w-[560px]',
		headlineContainer: 'md-sys-typescale-headline-small text-md-sys-color-on-surface ',
		supportingTextContainer: 'md-sys-typescale-body-medium text-md-sys-color-on-surface-variant',
		buttonContainer:
			'mt-2 flex items-end justify-end gap-2 md-sys-typescale-label-large text-md-sys-color-primary'
	}
});
