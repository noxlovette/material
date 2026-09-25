<!--
@component
A Material Symbol, rendered from the variable icon font with its four axes: fill, weight, grade and
optical size. https://m3.material.io/styles/icons/applying-icons

Decorative by default (`aria-hidden`), so a screen reader doesn't read out the ligature name.
Pass `aria-label` when the icon carries meaning with no visible text next to it.
-->
<script lang="ts">
  import clsx from 'clsx';
  import { twMerge } from '$lib/utils/tv.js';
  import type { IconProps, IconSize } from './types.js';

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
    class: className,
    ...restProps
  }: IconProps = $props();

  const resolved = $derived(sizeMap[size]);
  const resolvedOpsz = $derived(opsz ?? resolved.opsz);
  // 'auto' reads --md-icon-grade (styles/icon.css): 0 on light schemes, -25 on dark ones.
  const resolvedGrad = $derived(grad === 'auto' ? 'var(--md-icon-grade, 0)' : grad);
  const labelled = $derived(Boolean(restProps['aria-label'] || restProps['aria-labelledby']));
  const wrapperClass = 'inline-flex shrink-0 items-center justify-center leading-none';
</script>

<!-- twMerge: a caller's size class replaces the preset's instead of racing it in the cascade. -->
<span
  role={labelled ? 'img' : undefined}
  aria-hidden={labelled ? undefined : 'true'}
  {...restProps}
  class={twMerge(resolved.cls, clsx(className), wrapperClass)}
>
  <!-- translate="no": page translation would rename the ligature and break the glyph. -->
  <span
    class="material-symbols-{variant} md-sys-motion-fast-effects transition-[font-variation-settings] select-none"
    translate="no"
    style="font-size: 1em; font-variation-settings: 'FILL' {fill}, 'wght' {wght}, 'GRAD' {resolvedGrad}, 'opsz' {resolvedOpsz};"
    >{name}</span
  >
</span>
