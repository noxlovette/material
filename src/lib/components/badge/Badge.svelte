<!--
@component
Badges communicate a notification count or status for an element.

Small badges are used for a general notification.
Large badges are used for specific counts.

@see https://m3.material.io/components/badges/overview
-->
<script lang="ts">
  import clsx from 'clsx';
  import { badge } from './theme.js';
  import type { BadgeProps } from './types.js';

  const {
    number,
    size = 'lg',
    max = 999,
    standalone = false,
    class: className,
    ...restProps
  }: BadgeProps = $props();

  const styling = $derived(badge({ size, standalone }));
</script>

{#if size === 'sm' || number}
  <span class={clsx(styling, className)} {...restProps}>
    {#if size !== 'sm' && number}
      {number > max ? `${max}+` : number}
    {/if}
  </span>
{/if}
