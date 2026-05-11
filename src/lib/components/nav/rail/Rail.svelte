<!--
@component
Material 3 Navigation Rail.

Navigation rails provide access to primary destinations in apps when using tablet and desktop screens.

@see https://m3.material.io/components/navigation-rail/overview
-->
<script lang="ts">
  import { clickOutside } from "$lib/actions/index.js";
  import clsx from "clsx";
  import type { RailProps } from "./types";
  import ButtonIcon from "$lib/components/buttons/ButtonIcon.svelte";
  import { rail } from "./theme";
  import { NavigationMenu } from "bits-ui";

  let {
    children,
    rounded = false,
    expandable = true,
    fab,
    collapsed = $bindable(true),
    anchor = "viewport",
    railTop = 0,
    class: className,
  }: RailProps = $props();

  const expanded = $derived(!collapsed);
  const { base, items, ghost, scrim } = $derived(
    rail({ expanded, anchor, rounded }),
  );
  const railBaseClass = $derived(
    `${base({ class: clsx(className) })} rail-base`,
  );
  const toggleClass = $derived(
    collapsed ? "cursor-e-resize" : "cursor-w-resize",
  );
  const cssVars = $derived(`--rail-top: ${railTop}px;`);
</script>

<div class={ghost()}></div>

<div class={`${scrim()} rail-scrim`} data-expanded={expanded}></div>
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
      tooltipContent={collapsed ? "Открыть" : "Закрыть"}
      iconProps={{ name: `${collapsed ? "menu" : "menu_open"}` }}
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
  }

  .rail-scrim[data-expanded="true"] {
    opacity: 1;
    pointer-events: auto;
  }
</style>
