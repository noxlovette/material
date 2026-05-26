<!--
@component
Material 3 Navigation Bar.

Navigation bars offer a convenient way to switch between primary destinations in an app.
They are typically used at the bottom of the screen for ergonomics and easy reach on mobile devices.

This component takes NavbarItems as its children

@see https://m3.material.io/components/navigation-bar/overview
-->
<script lang="ts">
  import clsx from 'clsx';
  import { NavigationMenu } from 'bits-ui';
  import { navbar } from './theme.js';
  import type { NavBarProps } from './types.js';

  const { children, fab, ghost = false, class: className, ...restProps }: NavBarProps = $props();
  const { base, items, fab: fabCls, ghost: ghostCls } = $derived(navbar());
</script>

<div class={base({ class: clsx(className) })} {...restProps}>
  {#if fab}
    <div class={fabCls()}>
      {@render fab?.()}
    </div>
  {/if}
  <NavigationMenu.Root orientation="horizontal" class="flex w-full">
    <NavigationMenu.List>
      {#snippet child({ props, wrapperProps })}
        <div {...wrapperProps} class="w-full">
          <ul {...props} class={items()}>
            {@render children()}
          </ul>
        </div>
      {/snippet}
    </NavigationMenu.List>
  </NavigationMenu.Root>
</div>
{#if ghost}
  <div class={ghostCls()} aria-hidden="true"></div>
{/if}
