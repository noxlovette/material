<script lang="ts">
  import clsx from 'clsx';
  import type { IconProps, IconSize } from './types.js';

  const sizeMap: Record<IconSize, { cls: string; opsz: number }> = {
    xs: { cls: 'size-4 text-[16px]', opsz: 20 },
    sm: { cls: 'size-5 text-[20px]', opsz: 20 },
    md: { cls: 'size-6 text-[24px]', opsz: 24 },
    lg: { cls: 'size-10 text-[40px]', opsz: 40 },
    xl: { cls: 'size-12 text-[48px]', opsz: 48 }
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

<div class={clsx(resolved.cls, className, wrapperClass)}>
  <span
    class="material-symbols-{variant}"
    style="font-size: 1em; font-variation-settings: 'FILL' {fill}, 'wght' {wght}, 'GRAD' {grad}, 'opsz' {resolvedOpsz};"
    >{name}</span
  >
</div>
