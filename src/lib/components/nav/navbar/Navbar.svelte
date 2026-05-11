<!--
@component
Material 3 Navigation Bar.

Navigation bars offer a convenient way to switch between primary destinations in an app.
They are typically used at the bottom of the screen for ergonomics and easy reach on mobile devices.

This component takes NavbarItems as its children

@see https://m3.material.io/components/navigation-bar/overview
-->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import { navbar } from './theme.js';
  import { NavigationMenu } from 'bits-ui';

  const { children, fab }: { children: Snippet; fab?: Snippet } = $props();

  const { base, items, fab: fabCls } = $derived(navbar());
</script>

<div class={base()}>
  {#if fab}
    <div class={fabCls()}>
      {@render fab?.()}
    </div>
  {/if}
  <NavigationMenu.Root orientation="horizontal" class="flex w-full">
    <NavigationMenu.List class={items()}>
      {@render children()}
    </NavigationMenu.List>
  </NavigationMenu.Root>
</div>
