import { tv, type VariantProps } from 'tailwind-variants';

export type ListVariants = VariantProps<typeof list>;
export type ListMediaVariants = VariantProps<typeof listMedia>;

/*
  M3 Expressive lists (https://m3.material.io/components/lists/specs).

  Item shape: every item reads its corners from `--li-top`/`--li-bottom`, falling back to its own
  state shape `--li-shape` (4dp at rest, 12dp hovered, 16dp focused/pressed/selected). A segmented
  `List` sets `--li-top`/`--li-bottom` to 16dp on its first/last child, so the list's outer
  corners stay 16dp while the inner ones morph. Custom properties inherit, so this reaches an item
  through its `<li>`; each `<ul>` resets both so nested lists start clean.
*/
export const list = tv({
  base: 'flex w-full flex-col [--li-bottom:initial] [--li-top:initial]',
  variants: {
    variant: {
      standard: '',
      // 2dp between segments; outer corners 16dp (md.comp.list.container.shape).
      segmented: 'gap-0.5 [&>:first-child]:[--li-top:1rem] [&>:last-child]:[--li-bottom:1rem]'
    }
  },
  defaultVariants: { variant: 'standard' }
});

export const listItem = tv({
  slots: {
    base: [
      'relative flex w-full min-w-0 gap-3 ps-4 pe-4 pt-2.5 pb-2.5 text-start',
      '[--li-shape:0.25rem] rounded-t-[var(--li-top,var(--li-shape))] rounded-b-[var(--li-bottom,var(--li-shape))]',
      'state-layer before:rounded-[inherit]',
      'transition-[border-radius,background-color,color] md-sys-motion-fast-spatial',
      'text-md-sys-color-on-surface-variant'
    ],
    leading: 'flex shrink-0 items-center text-md-sys-color-on-surface-variant',
    body: 'flex min-w-0 flex-1 flex-col justify-center',
    overline: 'md-sys-typescale-label-small line-clamp-1 text-md-sys-color-on-surface-variant',
    headline: 'md-sys-typescale-body-large line-clamp-1 text-md-sys-color-on-surface',
    supporting: 'md-sys-typescale-body-medium line-clamp-2 text-md-sys-color-on-surface-variant',
    trailing:
      'relative flex shrink-0 items-center gap-3 overflow-visible text-md-sys-color-on-surface-variant',
    trailingText: 'md-sys-typescale-label-small text-md-sys-color-on-surface-variant',
    expandIcon:
      'grid size-8 place-items-center rounded-full text-md-sys-color-on-surface transition-[background-color,rotate] md-sys-motion-fast-spatial',
    group: 'flex flex-col',
    region: 'grid transition-[grid-template-rows] md-sys-motion-spatial',
    regionInner: 'min-h-0 overflow-hidden',
    nested: 'flex flex-col [--li-top:initial] [--li-bottom:initial]'
  },
  variants: {
    // md.comp.list.list-item.{one,two,three}-line.container.height: minimums, so larger text grows
    // the item instead of clipping. From 88dp up, leading/text/trailing align to the top.
    lines: {
      1: { base: 'min-h-14 items-center' },
      2: { base: 'min-h-18 items-center' },
      3: { base: 'min-h-22 items-start', leading: 'items-start', trailing: 'items-start' }
    },
    variant: {
      standard: { base: 'bg-md-sys-color-surface', nested: '' },
      /* The segmented token resolves to `surface`, but the spec's own figures draw segments one
         tone up so they read against the page; surface-container matches the figures. */
      segmented: {
        base: 'bg-md-sys-color-surface-container',
        nested: 'gap-0.5 pt-0.5'
      }
    },
    interactive: {
      true: {
        base: [
          'cursor-pointer outline-none',
          'hover:before:bg-md-sys-color-on-surface/8 hover:[--li-shape:0.75rem]',
          'focus-visible:before:bg-md-sys-color-on-surface/10 focus-visible:[--li-shape:1rem]',
          'focus-visible:outline-3 focus-visible:-outline-offset-3 focus-visible:outline-md-sys-color-secondary',
          'active:before:bg-md-sys-color-on-surface/10 active:[--li-shape:1rem]'
        ]
      },
      false: ''
    },
    selected: {
      true: {
        base: 'bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container [--li-shape:1rem] hover:[--li-shape:1rem]',
        leading: 'text-md-sys-color-on-secondary-container',
        overline: 'text-md-sys-color-on-secondary-container',
        headline: 'text-md-sys-color-on-secondary-container',
        supporting: 'text-md-sys-color-on-secondary-container',
        trailing: 'text-md-sys-color-on-secondary-container',
        trailingText: 'text-md-sys-color-on-secondary-container'
      },
      false: ''
    },
    disabled: {
      true: {
        base: 'pointer-events-none cursor-default',
        leading: 'text-md-sys-color-on-surface opacity-38',
        overline: 'text-md-sys-color-on-surface/38',
        headline: 'text-md-sys-color-on-surface/38',
        supporting: 'text-md-sys-color-on-surface/38',
        trailing: 'text-md-sys-color-on-surface opacity-38',
        trailingText: 'text-md-sys-color-on-surface/38'
      },
      false: ''
    },
    expanded: {
      true: {
        // The expanded group is one 16dp container: header on top, nested items below.
        base: '[--li-top:1rem] [--li-bottom:var(--li-shape)]',
        expandIcon: 'rotate-180 bg-md-sys-color-surface-container',
        region: 'grid-rows-[1fr]',
        nested: '[&>:last-child]:[--li-bottom:1rem]'
      },
      false: {
        expandIcon: 'bg-md-sys-color-surface',
        region: 'grid-rows-[0fr]'
      }
    }
  },
  compoundVariants: [
    {
      selected: true,
      disabled: true,
      class: { base: 'bg-md-sys-color-on-surface/12 text-md-sys-color-on-surface/38' }
    }
  ],
  defaultVariants: {
    lines: 1,
    variant: 'standard',
    interactive: false,
    selected: false,
    disabled: false
  }
});

/** @deprecated Misspelled; use `listItem`. */
export const listiem = listItem;

/**
 * Sizes and shapes for a list item's leading media, per the M3 list spec. Apply it to whatever you
 * render in `leading`, so the item keeps spec padding and alignment:
 *
 * ```svelte
 * {#snippet leading()}
 *   <img src={cover} alt="" class={listMedia({ kind: 'image' })} />
 * {/snippet}
 * ```
 *
 * - `icon`: 20dp. Prefer `<Icon size="sm">`, which is already 20dp.
 * - `avatar`: 40dp circle, e.g. `<Avatar class={listMedia({ kind: 'avatar' })} />`.
 * - `image`: 56dp square, 8dp corners.
 * - `video`: 100×56dp, 8dp corners. `videoLarge`: 114×64dp.
 */
export const listMedia = tv({
  base: 'shrink-0',
  variants: {
    kind: {
      icon: 'size-5',
      avatar: 'size-10 rounded-full',
      image: 'size-14 rounded-lg object-cover',
      video: 'h-14 w-25 rounded-lg object-cover',
      videoLarge: 'h-16 w-28.5 rounded-lg object-cover'
    }
  },
  defaultVariants: { kind: 'icon' }
});
