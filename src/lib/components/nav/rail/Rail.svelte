<!--
@component
Material 3 Navigation Rail.

Navigation rails provide access to primary destinations in apps when using tablet and desktop screens.
On mobile (< md) it automatically renders as a bottom navigation bar.

@see https://m3.material.io/components/navigation-rail/overview
-->
<script lang="ts">
  import { clickOutside } from '$lib/attachments/index.js';
  import clsx from 'clsx';
  import { setContext, untrack } from 'svelte';
  import type { RailProps } from './types';
  import ButtonIcon from '$lib/components/buttons/ButtonIcon.svelte';
  import { rail } from './theme';
  import { NavigationMenu } from 'bits-ui';
  import { railStore } from './railStore.svelte.js';

  let {
    children,
    rounded = false,
    expandable = true,
    fab,
    collapsed = $bindable(true),
    anchor = 'viewport',
    railTop = 0,
    expandLabel = 'Expand navigation',
    collapseLabel = 'Collapse navigation',
    class: className
  }: RailProps = $props();

  const expanded = $derived(!collapsed);
  const railCtx = {
    get collapsed() {
      return collapsed;
    }
  };
  setContext('rail', railCtx);

  $effect(() => {
    railStore.collapsed = collapsed;
  });

  const { base, items, ghost, scrim } = $derived(rail({ expanded, anchor, rounded }));
  const railBaseClass = $derived(`${base({ class: clsx(className) })} rail-base`);
  const toggleClass = $derived(collapsed ? 'cursor-e-resize' : 'cursor-w-resize');
  const cssVars = $derived(`--rail-top: ${railTop}px;`);
</script>

<!-- Push ghost: hidden on mobile, becomes flex item on md+ to push content -->
<div class={ghost()}></div>

<!-- Tablet scrim (md:block lg:hidden) — overlays content on expand -->
<div
  class={`${scrim()} rail-scrim`}
  data-expanded={expanded}
  onclick={() => (collapsed = true)}
  role="presentation"
></div>

<!-- Desktop/tablet sidebar rail -->
<div
  class={railBaseClass}
  style={cssVars}
  data-expanded={expanded}
  {@attach expanded && clickOutside(() => (collapsed = true))}
>
  {#if expandable}
    <ButtonIcon
      variant="standard"
      type="button"
      tooltipContent={collapsed ? expandLabel : collapseLabel}
      iconProps={{ name: `${collapsed ? 'menu' : 'menu_open'}` }}
      class={toggleClass}
      onclick={() => (collapsed = !collapsed)}
    />
  {/if}

  {@render fab?.()}

  <NavigationMenu.Root orientation="vertical" class="w-full">
    <NavigationMenu.List class={`${items()} rail-items`}>
      {@render children?.()}
    </NavigationMenu.List>
  </NavigationMenu.Root>
</div>

<style>
  .rail-scrim {
    opacity: 0;
    pointer-events: none;
    background-color: transparent;
    z-index: -1;
    transition: opacity var(--md-sys-motion-duration-effects-spring)
      var(--md-sys-motion-timing-function-effects-spring);
  }

  .rail-scrim[data-expanded='true'] {
    opacity: 1;
    pointer-events: auto;
    background-color: rgb(0 0 0 / 0.4);
    z-index: var(--z-layer-rail);
  }
</style>
