import { tv, type VariantProps } from 'tailwind-variants';

/**
 * M3 Expressive slider: an active and an inactive track separated from a bar handle by a 6dp gap.
 * Track/handle positions are set inline by `Slider.svelte` from one animated value; these slots
 * only carry size, shape and color.
 *
 * https://m3.material.io/components/sliders/specs
 */
export const slider = tv({
  slots: {
    root: 'group relative flex shrink-0 cursor-pointer touch-none select-none data-[disabled]:cursor-not-allowed',
    track: 'pointer-events-none absolute',
    activeTrack: 'bg-md-sys-color-primary group-data-[disabled]:bg-md-sys-color-on-surface/38',
    inactiveTrack:
      'bg-md-sys-color-secondary-container group-data-[disabled]:bg-md-sys-color-on-surface/12',
    stop: 'pointer-events-none absolute size-1 rounded-full',
    stopOnActive:
      'bg-md-sys-color-on-primary group-data-[disabled]:bg-md-sys-color-inverse-on-surface',
    stopOnInactive:
      'bg-md-sys-color-on-secondary-container group-data-[disabled]:bg-md-sys-color-on-surface/38',
    icon: 'pointer-events-none absolute',
    iconOnActive: 'text-md-sys-color-on-primary',
    iconOnInactive: 'text-md-sys-color-on-secondary-container',
    handle: `
      absolute rounded-full bg-md-sys-color-primary outline-none
      transition-[width,height] md-sys-motion-fast-spatial
      focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-md-sys-color-secondary
      group-data-[disabled]:bg-md-sys-color-on-surface/38
    `,
    value: `
      pointer-events-none absolute z-10 flex min-w-12 items-center justify-center rounded-full
      bg-md-sys-color-inverse-surface px-4 py-3
      md-sys-typescale-label-large text-md-sys-color-inverse-on-surface
      opacity-0 transition-opacity md-sys-motion-effects
      group-has-[[data-slider-thumb]:focus-visible]:opacity-100
    `
  },
  variants: {
    size: {
      xs: { root: '[--track:1rem] [--handle:2.75rem] [--outer:var(--radius-sm)]' },
      s: { root: '[--track:1.5rem] [--handle:2.75rem] [--outer:var(--radius-sm)]' },
      m: { root: '[--track:2.5rem] [--handle:3.25rem] [--outer:var(--radius-md)]' },
      l: { root: '[--track:3.5rem] [--handle:4.25rem] [--outer:var(--radius-lg)]' },
      xl: { root: '[--track:6rem] [--handle:6.75rem] [--outer:var(--radius-xl)]' }
    },
    vertical: {
      false: {
        root: 'h-[var(--handle)] w-full min-w-40',
        track: 'top-1/2 h-[var(--track)] -translate-y-1/2',
        activeTrack: 'left-0 rounded-l-[var(--outer)] rounded-r-[2px]',
        inactiveTrack: 'right-0 rounded-l-[2px] rounded-r-[var(--outer)]',
        stop: 'top-1/2 -translate-x-1/2 -translate-y-1/2',
        icon: 'top-1/2 -translate-y-1/2',
        handle: 'top-0 h-full w-1 -translate-x-1/2 data-[active]:w-0.5',
        value: 'bottom-[calc(100%+4px)] -translate-x-1/2'
      },
      true: {
        root: 'h-full min-h-40 w-[var(--handle)]',
        track: 'left-1/2 w-[var(--track)] -translate-x-1/2',
        activeTrack: 'bottom-0 rounded-t-[2px] rounded-b-[var(--outer)]',
        inactiveTrack: 'top-0 rounded-t-[var(--outer)] rounded-b-[2px]',
        stop: 'left-1/2 -translate-x-1/2 translate-y-1/2',
        icon: 'left-1/2 -translate-x-1/2',
        handle: 'left-0 h-1 w-full translate-y-1/2 data-[active]:h-0.5',
        value: 'left-[calc(100%+4px)] translate-y-1/2'
      }
    },
    active: {
      true: { value: 'opacity-100' }
    }
  },
  defaultVariants: {
    size: 'xs',
    vertical: false
  }
});

export type SliderVariants = VariantProps<typeof slider>;
