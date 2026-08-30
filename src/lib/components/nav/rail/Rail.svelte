<!--
@component
Material 3 Navigation Rail.

Navigation rails provide access to primary destinations in apps when using tablet and desktop screens.
On mobile (< md) it automatically renders as a bottom navigation bar.

`companion` mode repurposes this same component as a lightweight host for a page-action
`Toolbar` instead of a nav-destination rail — see the `companion` prop.

@see https://m3.material.io/components/navigation-rail/overview
-->
<script lang="ts">
  import { clickOutside } from '$lib/actions/index.js';
  import clsx from 'clsx';
  import { setContext, untrack } from 'svelte';
  import type { RailProps } from './types';
  import ButtonIcon from '$lib/components/buttons/ButtonIcon.svelte';
  import { rail } from './theme';
  import { NavigationMenu } from 'bits-ui';
  import { railStore } from './railStore.svelte.js';
  import RailNavContext from './RailNavContext.svelte';
  import Navbar from '../navbar/Navbar.svelte';

  let {
    children,
    rounded = false,
    expandable = true,
    fab,
    collapsed = $bindable(true),
    anchor = 'viewport',
    railTop = 0,
    withNavbar = false,
    class: className,
    companion,
    navbarProps
  }: RailProps = $props();

  const expanded = $derived(!collapsed);
  const railCtx = {
    get collapsed() {
      return collapsed;
    }
  };
  // A companion rail hosts a Toolbar (see the `{:else}` branch below) rather than acting
  // as the primary nav rail, so it neither publishes rail-collapse state nor shares the
  // singleton `railStore` with a real nav Rail that may also be on the page. `companion`
  // isn't meant to change after mount, so snapshot it once for this setup-time branching.
  const isCompanion = untrack(() => companion);
  if (!isCompanion) {
    setContext('rail', railCtx);
  }
  setContext('inRail', isCompanion);

  $effect(() => {
    if (!isCompanion) railStore.collapsed = collapsed;
  });

  const { base, items, ghost, scrim } = $derived(rail({ expanded, anchor, rounded }));
  const railBaseClass = $derived(`${base({ class: clsx(className) })} rail-base`);
  const toggleClass = $derived(collapsed ? 'cursor-e-resize' : 'cursor-w-resize');
  const cssVars = $derived(`--rail-top: ${railTop}px;`);
</script>

{#if !companion}
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
  </div>

  <!-- Mobile bottom navbar (md:hidden) -->
  {#if withNavbar}
    <Navbar {...navbarProps}>
      <RailNavContext mobile={true}>
        {@render children?.()}
      </RailNavContext>
    </Navbar>
  {/if}
{:else}
  <!-- Companion rail: hosts a Toolbar. Rendered once — the `inRail` context set above makes
       a nested Toolbar auto-adopt the `companion` variant, which handles both layouts itself
       (floating vertical, right-center, from lg up; fixed bottom bar below lg). Rendering the
       children a single time (rather than once per breakpoint) is what dedupes interactive
       controls — two live copies of the same Toolbar would desync toggle/group state. -->
  {@render children?.()}
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
