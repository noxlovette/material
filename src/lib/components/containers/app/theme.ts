import { tv, type VariantProps } from '$lib/utils/tv.js';

export type AppVariants = VariantProps<typeof app>;

export const app = tv({
  base: 'bg-md-sys-color-surface-container text-md-sys-color-on-background min-h-dvh caret-md-sys-color-primary selection:bg-md-sys-color-primary-container selection:text-md-sys-color-on-primary-container relative min-h-dvh pt-[env(safe-area-inset-top)] pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)] pl-[calc(env(safe-area-inset-left)+var(--md-rail-inset,0px))] antialiased'
});
