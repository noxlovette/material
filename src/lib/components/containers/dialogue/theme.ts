import { tv, type VariantProps } from '$lib/utils/tv.js';

export type DialogueVariants = VariantProps<typeof dialogue>;

export const dialogue = tv({
  slots: {
    base: 'fixed inset-spacing-0 z-layer-modal bg-md-sys-color-scrim/32',
    inner:
      'fixed inset-spacing-0 z-layer-modal m-auto h-max w-full outline-none bg-md-sys-color-surface-container-high shadow-elevation-3 flex flex-col rounded-[28px] p-spacing-300 gap-spacing-200',
    headlineContainer: 'md-sys-typescale-headline-small text-md-sys-color-on-surface',
    supportingTextContainer: 'md-sys-typescale-body-medium text-md-sys-color-on-surface-variant',
    buttonContainer: 'mt-spacing-100 flex items-center justify-end gap-spacing-100'
  }
});
