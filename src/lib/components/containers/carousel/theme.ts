import { tv, type VariantProps } from 'tailwind-variants';

export type CarouselVariants = VariantProps<typeof carousel>;

/*
  M3 carousel (https://m3.material.io/components/carousel/specs): 28dp items on `surface`, 8dp
  apart. Multi-browse and hero layouts pad 16dp on both sides and 8dp top/bottom; uncontained
  pads only the leading edge and lets items bleed off the trailing one; full-screen is edge to
  edge, 16dp between items, scrolling vertically.
*/
export const carousel = tv({
  slots: {
    base: 'relative h-56 w-full',
    scroller:
      'h-full w-full overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-3 focus-visible:-outline-offset-3 focus-visible:outline-md-sys-color-secondary',
    track: 'relative h-full',
    snapPoint: 'pointer-events-none absolute top-0 h-px w-px snap-start',
    viewport: 'sticky left-0 h-full overflow-clip',
    item: [
      'text-md-sys-color-on-surface bg-md-sys-color-surface relative block shrink-0 overflow-hidden rounded-[28px] text-start',
      'md-sys-state-focus-indicator transition-shadow md-sys-motion-effects'
    ],
    content: 'h-full'
  },
  variants: {
    layout: {
      multiBrowse: {},
      hero: {},
      centeredHero: {},
      uncontained: {
        scroller:
          'flex gap-2 overflow-x-auto overflow-y-clip ps-4 pe-4 pt-2 pb-2 [scroll-padding-inline:1rem]'
      },
      fullScreen: {
        scroller: 'flex snap-y snap-mandatory flex-col gap-4 overflow-y-auto',
        item: 'h-full w-full snap-start [scroll-snap-stop:always]'
      }
    },
    // Multi-browse and hero layouts: items are positioned by `place()`, content keeps the large
    // width and stays centred inside its masked item, which gives the parallax as items resize.
    keyline: {
      true: {
        scroller: 'overflow-x-auto overflow-y-clip',
        item: 'absolute top-2 bottom-2 left-4 will-change-transform',
        content: 'absolute inset-y-0 left-1/2 -translate-x-1/2'
      },
      false: {}
    },
    snap: { true: { scroller: 'snap-x snap-mandatory' }, false: {} },
    outlined: { true: { item: 'border border-md-sys-color-outline' }, false: {} },
    interactive: {
      true: { item: 'cursor-pointer hover:shadow-elevation-1 active:shadow-elevation-0' },
      false: {}
    },
    disabled: {
      true: { item: 'pointer-events-none opacity-38' },
      false: {}
    }
  },
  compoundVariants: [
    { layout: 'uncontained', class: { item: 'h-full snap-start' } },
    { outlined: true, disabled: true, class: { item: 'border-md-sys-color-outline/12' } }
  ],
  defaultVariants: {
    layout: 'multiBrowse',
    keyline: true,
    snap: true,
    outlined: false,
    interactive: false,
    disabled: false
  }
});
