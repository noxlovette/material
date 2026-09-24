import { tv, type VariantProps } from '$lib/utils/tv.js';

export type LinkPreviewVariants = VariantProps<typeof linkPreview>;

export const linkPreview = tv({
  slots: {
    base: 'relative z-layer-popup min-w-48 max-w-sm rounded-2xl bg-md-sys-color-surface-container-high p-spacing-200 shadow-elevation-3 ring-1 ring-md-sys-color-outline/20 overflow-hidden',
    content: 'flex flex-col gap-spacing-100'
  }
});
