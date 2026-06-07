<!--
@component
Material 3 Navigation Rail.

Navigation rails provide access to primary destinations in apps when using tablet and desktop screens.
On mobile (< md) it automatically renders as a bottom navigation bar.

@see https://m3.material.io/components/navigation-rail/overview
-->
<script lang="ts">
  import { clickOutside } from '$lib/actions/index.js';
  import clsx from 'clsx';
  import { setContext } from 'svelte';
  import type { RailProps } from './types';
  import ButtonIcon from '$lib/components/buttons/ButtonIcon.svelte';
  import { rail } from './theme';
  import { NavigationMenu } from 'bits-ui';
  import { railStore } from './railStore.svelte.js';
  import RailNavContext from './RailNavContext.svelte';

  let {
    children,
    rounded = false,
    expandable = true,
    fab,
    railFooter,
    collapsed = $bindable(true),
    anchor = 'viewport',
    railTop = 0,
    mobileNav = true,
    showMobileFab = true,
    showMobileFooter = false,
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
  use:clickOutside={() => {
    if (expanded) collapsed = true;
  }}
>
  {#if expandable}
    <ButtonIcon
      type="button"
      tooltipContent={collapsed ? 'Открыть' : 'Закрыть'}
      iconProps={{ name: `${collapsed ? 'menu' : 'menu_open'}` }}
      class={toggleClass}
      onclick={() => (collapsed = !collapsed)}
    />
  {/if}

  {@render fab?.()}

  <NavigationMenu.Root orientation="vertical" class="w-full">
    <NavigationMenu.List class={`${items()} rail-items`}>
      <RailNavContext mobile={false}>
        {@render children?.()}
      </RailNavContext>
    </NavigationMenu.List>
  </NavigationMenu.Root>

  {#if railFooter}
    <div class="mt-auto flex flex-col items-center pb-2">
      {@render railFooter()}
    </div>
  {/if}
</div>

<!-- Mobile bottom navbar (md:hidden) -->
{#if mobileNav}
  {#if showMobileFab && fab}
    <div class="fixed right-4 bottom-24 z-30 md:hidden">
      {@render fab?.()}
    </div>
  {/if}

  <nav
    class="bg-md-sys-color-surface-container shadow-elevation-2 fixed right-0 bottom-0 left-0 z-20 flex h-20 items-center py-3 md:hidden"
    aria-label="Mobile navigation"
  >
    <NavigationMenu.Root orientation="horizontal" class="flex w-full">
      <NavigationMenu.List class="flex w-full justify-around">
        <RailNavContext mobile={true}>
          {@render children?.()}
        </RailNavContext>
      </NavigationMenu.List>
    </NavigationMenu.Root>

    {#if showMobileFooter && railFooter}
      <div class="shrink-0 px-2">
        {@render railFooter()}
      </div>
    {/if}
  </nav>

  <!-- Spacer so page content clears the fixed mobile navbar -->
  <div class="h-20 w-full shrink-0 md:hidden" aria-hidden="true"></div>
{/if}

<style>
  .rail-scrim {
    opacity: 0;
    pointer-events: none;
    background-color: transparent;
    z-index: -1;
    transition: opacity 200ms ease;
  }

  .rail-scrim[data-expanded='true'] {
    opacity: 1;
    pointer-events: auto;
    background-color: rgb(0 0 0 / 0.4);
    z-index: 30;
  }
</style>
