<!--
@component
Toolbar provides a horizontal (or vertical) container for grouped actions.

- variant="floating" — elevated, rounded, inline (default)
- variant="docked"   — full-width, flat, anchored to top/bottom
- variant="mobile"   — fixed above the bottom Navbar (bottom-20), full-width
- ghost             — renders a h-16 spacer after the toolbar to prevent content scroll-under (pair with variant="mobile")
- color="standard"   — surface-container background
- color="vibrant"    — secondary-container background with inverted toggle selection
- fab snippet        — renders a FAB at the trailing edge (canonical for docked bottom bars)

@see https://m3.material.io/components/toolbars
-->
<script lang="ts">
  import { Toolbar } from 'bits-ui';
  import clsx from 'clsx';
  import { setContext } from 'svelte';
  import { toolbar } from './theme.js';
  import type { ToolbarProps } from './types.js';

  let {
    children,
    fab,
    ghost = false,
    orientation = 'horizontal',
    loop = true,
    variant = 'floating',
    color = 'standard',
    class: className,
    ...restProps
  }: ToolbarProps = $props();

  const toolbarCtx = {
    get color() {
      return color;
    },
    get orientation() {
      return orientation;
    }
  };
  setContext('toolbar', toolbarCtx);

  const cls = $derived(toolbar({ orientation, variant, color }));
</script>

<Toolbar.Root {orientation} {loop} class={cls.root({ class: clsx(className) })} {...restProps}>
  {@render children?.()}
  {#if fab}
    <div class={cls.fabSlot()}>
      {@render fab()}
    </div>
  {/if}
</Toolbar.Root>
{#if ghost}
  <div class={cls.ghost()} aria-hidden="true"></div>
{/if}
