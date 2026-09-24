import { tv, type VariantProps } from 'tailwind-variants';

/**
 * M3 Expressive slider: an active and an inactive track separated from a bar handle by a 6dp gap.
 * Per-size tokens (track / handle / outer corner / inset icon): XS 16/44/8/–, S 24/44/8/–,
 * M 40/52/12/24, L 56/68/16/24, XL 96/108/28/32. The value indicator sits 12dp above the handle.
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
    stop: 'pointer-events-none absolute size-spacing-50 rounded-full',
    stopOnActive:
      'bg-md-sys-color-on-primary group-data-[disabled]:bg-md-sys-color-inverse-on-surface',
    stopOnInactive:
      'bg-md-sys-color-on-secondary-container group-data-[disabled]:bg-md-sys-color-on-surface/38',
    icon: 'pointer-events-none absolute flex',
    iconGlyph: '',
    iconOnActive: 'text-md-sys-color-on-primary',
    iconOnInactive: 'text-md-sys-color-on-secondary-container',
    handle: `
      absolute rounded-full bg-md-sys-color-primary outline-none
      focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-md-sys-color-secondary
      group-data-[disabled]:bg-md-sys-color-on-surface/38
    `,
    value: `
      pointer-events-none absolute z-10 flex min-w-spacing-600 items-center justify-center rounded-full
      bg-md-sys-color-inverse-surface px-spacing-200 py-spacing-150
      md-sys-typescale-body-medium tracking-[0.5px] text-md-sys-color-inverse-on-surface
      opacity-0 transition-opacity md-sys-motion-effects
      group-has-[[data-slider-thumb]:focus-visible]:opacity-100
    `
  },
  variants: {
    size: {
      xs: { root: '[--track:1rem] [--handle:2.75rem] [--outer:var(--radius-sm)]' },
      s: { root: '[--track:1.5rem] [--handle:2.75rem] [--outer:var(--radius-sm)]' },
      m: {
        root: '[--track:2.5rem] [--handle:3.25rem] [--outer:var(--radius-md)]',
        iconGlyph: 'size-spacing-300 text-[24px]'
      },
      l: {
        root: '[--track:3.5rem] [--handle:4.25rem] [--outer:var(--radius-lg)]',
        iconGlyph: 'size-spacing-300 text-[24px]'
      },
      xl: {
        root: '[--track:6rem] [--handle:6.75rem] [--outer:var(--radius-xl)]',
        iconGlyph: 'size-spacing-400 text-[32px]'
      }
    },
    vertical: {
      false: {
        root: 'h-[var(--handle)] w-full min-w-40',
        track: 'top-1/2 h-[var(--track)] -translate-y-1/2',
        activeTrack: 'left-spacing-0 rounded-l-[var(--outer)] rounded-r-[2px]',
        inactiveTrack: 'right-spacing-0 rounded-l-[2px] rounded-r-[var(--outer)]',
        stop: 'top-1/2 -translate-x-1/2 -translate-y-1/2',
        icon: 'top-1/2 -translate-y-1/2',
        handle: 'top-spacing-0 h-full -translate-x-1/2',
        value: 'bottom-[calc(100%+12px)] -translate-x-1/2'
      },
      true: {
        root: 'h-full min-h-40 w-[var(--handle)]',
        track: 'left-1/2 w-[var(--track)] -translate-x-1/2',
        activeTrack: 'bottom-spacing-0 rounded-t-[2px] rounded-b-[var(--outer)]',
        inactiveTrack: 'top-spacing-0 rounded-t-[var(--outer)] rounded-b-[2px]',
        stop: 'left-1/2 -translate-x-1/2 translate-y-1/2',
        icon: 'left-1/2 -translate-x-1/2',
        handle: 'left-spacing-0 w-full translate-y-1/2',
        value: 'left-[calc(100%+12px)] translate-y-1/2'
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
