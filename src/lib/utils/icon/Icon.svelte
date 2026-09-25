<!--
@component
A Material Symbol, rendered from the variable icon font with its four axes: fill, weight, grade and
optical size. https://m3.material.io/styles/icons/applying-icons

Decorative by default (`aria-hidden`), so a screen reader doesn't read out the ligature name.
Pass `aria-label` when the icon carries meaning with no visible text next to it.

With `transition`, a change of `name` crossfades on a spring instead of swapping the glyph.
-->
<script lang="ts">
  import clsx from 'clsx';
  import { untrack } from 'svelte';
  import { presence } from '$lib/animation/presence.svelte.js';
  import { twMerge } from '$lib/utils/tv.js';
  import { atRest, iconSwap, iconSwapReduced } from './swap.js';
  import type { IconProps, IconSize, MaterialSymbolName } from './types.js';

  /*
    The optical size tracks the rendered size, so a 40dp icon keeps its stroke weight instead of
    being a scaled-up 24dp glyph (M3 designs 20, 24, 40 and 48). `inline` takes the size of the
    surrounding text and drops the baseline by ~11.5% of it, as M3 asks for symbols set in a line
    of text; body and label text sit nearest the 20 optical size.
  */
  const sizeMap: Record<IconSize, { cls: string; opsz: number }> = {
    inline: { cls: 'size-[1em] align-[-0.115em]', opsz: 20 },
    xs: { cls: 'size-spacing-200 text-[16px]', opsz: 20 },
    sm: { cls: 'size-spacing-250 text-[20px]', opsz: 20 },
    md: { cls: 'size-spacing-300 text-[24px]', opsz: 24 },
    lg: { cls: 'size-spacing-500 text-[40px]', opsz: 40 },
    xl: { cls: 'size-spacing-600 text-[48px]', opsz: 48 }
  };

  const {
    name,
    size = 'md',
    variant = 'rounded',
    fill = 0,
    wght = 400,
    grad = 'auto',
    opsz,
    transition = 'none',
    class: className,
    ...restProps
  }: IconProps = $props();

  const resolved = $derived(sizeMap[size]);
  const resolvedOpsz = $derived(opsz ?? resolved.opsz);
  // 'auto' reads --md-icon-grade (styles/icon.css): 0 on light schemes, -25 on dark ones.
  const resolvedGrad = $derived(grad === 'auto' ? 'var(--md-icon-grade, 0)' : grad);
  const labelled = $derived(Boolean(restProps['aria-label'] || restProps['aria-labelledby']));
  // With a transition the glyphs stack in one grid cell; without, the original single glyph.
  const wrapperClass = $derived(
    transition === 'none'
      ? 'inline-flex shrink-0 items-center justify-center leading-none'
      : 'inline-grid shrink-0 place-items-center leading-none'
  );
  const glyphClass = $derived(
    `material-symbols-${variant} md-sys-motion-fast-effects transition-[font-variation-settings] select-none`
  );
  const glyphStyle = $derived(
    `font-size: 1em; font-variation-settings: 'FILL' ${fill}, 'wght' ${wght}, 'GRAD' ${resolvedGrad}, 'opsz' ${resolvedOpsz};`
  );

  /*
    With a transition, the glyphs are a stack: the current one plus any still leaving. A name
    change marks the current glyph leaving and adds the new one; each drops out of the stack when
    its exit spring finishes. Changing back to a name that's still leaving brings that glyph back,
    retargeted mid-flight, instead of stacking a third.
  */
  type Glyph = { id: number; name: MaterialSymbolName; leaving: boolean; initial: boolean };
  let nextId = 1;
  let glyphs = $state<Glyph[]>([
    { id: 0, name: untrack(() => name), leaving: false, initial: true }
  ]);

  $effect.pre(() => {
    const next = name;
    untrack(() => {
      if (glyphs.find((g) => !g.leaving)?.name === next) return;
      if (transition === 'none') {
        glyphs = [{ id: nextId++, name: next, leaving: false, initial: true }];
        return;
      }
      for (const g of glyphs) g.leaving = g.name !== next;
      if (!glyphs.some((g) => g.name === next)) {
        glyphs.push({ id: nextId++, name: next, leaving: false, initial: false });
      }
    });
  });

  const reducedMotion = () =>
    typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

  function swap(glyph: Glyph) {
    const preset =
      transition === 'none' || reducedMotion() ? iconSwapReduced : iconSwap[transition];
    return presence(
      () => !glyph.leaving,
      glyph.initial ? atRest(preset) : preset,
      () => (glyphs = glyphs.filter((g) => g.id !== glyph.id))
    );
  }
</script>

<!-- twMerge: a caller's size class replaces the preset's instead of racing it in the cascade. -->
<span
  role={labelled ? 'img' : undefined}
  aria-hidden={labelled ? undefined : 'true'}
  {...restProps}
  class={twMerge(resolved.cls, clsx(className), wrapperClass)}
>
  <!-- translate="no": page translation would rename the ligature and break the glyph. -->
  {#if transition === 'none'}
    <span class={glyphClass} translate="no" style={glyphStyle}>{name}</span>
  {:else}
    {#each glyphs as glyph (glyph.id)}
      <span
        class="{glyphClass} [grid-area:1/1]"
        translate="no"
        style={glyphStyle}
        {@attach swap(glyph)}>{glyph.name}</span
      >
    {/each}
  {/if}
</span>
