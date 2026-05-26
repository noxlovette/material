<!--
@component
Cards contain content and actions about a single subject.

Material 3 cards come in three types: elevated, filled, and outlined.
They can be used to display information, provide a way for users to interact with it,
and serve as an entry point to more detailed information.

@see https://m3.material.io/components/cards/overview
-->
<script lang="ts">
  import type { CardProps } from './types.js';
  import { card } from './theme.js';
  import clsx from 'clsx';
  import { Layer } from '$lib/utils/index.js';

  let {
    children,
    type = 'filled',
    padding = 'md',
    class: className,
    href,
    hoverable = !!href,
    ...restProps
  }: CardProps = $props();

  const { base } = $derived(card({ type, hoverable, padding }));
</script>

{#if href}
  <a {href} class={base({ class: clsx(className) })} data-cy="m3-card" {...restProps}>
    {#if hoverable}<Layer />{/if}
    {@render children?.()}
  </a>
{:else}
  <div class={base({ class: clsx(className) })} data-cy="m3-card" {...restProps}>
    {#if hoverable}<Layer />{/if}
    {@render children?.()}
  </div>
{/if}
