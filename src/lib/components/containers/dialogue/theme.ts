import { tv, type VariantProps } from 'tailwind-variants';

export type DialogueVariants = VariantProps<typeof dialogue>;

export const dialogue = tv({
  slots: {
    base: 'fixed inset-spacing-0 z-40 bg-md-sys-color-scrim/32',
    inner:
      'fixed inset-spacing-0 z-50 m-auto h-max w-full outline-none bg-md-sys-color-surface-container-high shadow-elevation-3 flex flex-col rounded-[28px] p-spacing-300 gap-spacing-200',
    headlineContainer: 'md-sys-typescale-headline-small text-md-sys-color-on-surface',
    supportingTextContainer: 'md-sys-typescale-body-medium text-md-sys-color-on-surface-variant',
    buttonContainer: 'mt-spacing-100 flex items-center justify-end gap-spacing-100'
  }
});
