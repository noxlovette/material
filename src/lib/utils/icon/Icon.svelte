<script lang="ts">
  import clsx from 'clsx';
  import { twMerge } from 'tailwind-merge';
  import type { IconProps, IconSize } from './types.js';

  const sizeMap: Record<IconSize, { cls: string; opsz: number }> = {
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
    grad = 0,
    opsz,
    class: className
  }: IconProps = $props();

  const resolved = $derived(sizeMap[size]);
  const resolvedOpsz = $derived(opsz ?? resolved.opsz);
  const wrapperClass = 'inline-flex items-center justify-center leading-none';
</script>

<!-- twMerge: a caller's size class replaces the preset's instead of racing it in the cascade. -->
<div class={twMerge(resolved.cls, clsx(className), wrapperClass)}>
  <span
    class="material-symbols-{variant}"
    style="font-size: 1em; font-variation-settings: 'FILL' {fill}, 'wght' {wght}, 'GRAD' {grad}, 'opsz' {resolvedOpsz};"
    >{name}</span
  >
</div>
