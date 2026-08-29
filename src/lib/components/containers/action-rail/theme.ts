import { tv, type VariantProps } from 'tailwind-variants';

export type ActionRailVariants = VariantProps<typeof actionRail>;

export const actionRail = tv({
  slots: {
    base: 'z-30 flex flex-col items-center justify-center right-0'
  },
  variants: {
    anchor: {
      // Fixes to the true viewport edge — for an outermost, full-page rail.
      viewport: {
        base: 'fixed top-[var(--action-rail-top,0px)] bottom-[var(--action-rail-bottom,0px)]'
      },
      // Absolutely positioned within a relative ancestor — for embedded/contained demos.
      parent: {
        base: 'absolute top-[var(--action-rail-top,0px)] bottom-[var(--action-rail-bottom,0px)]'
      },
      // In-flow and sticks to the top as the page scrolls — for a rail nested inside
      // other already-offset content (the default: this is the M3 "sticky toolbar host" role).
      sticky: {
        base: 'sticky top-[var(--action-rail-top,0px)] self-start max-h-dvh'
      }
    }
  },
  defaultVariants: {
    anchor: 'sticky'
  }
});
