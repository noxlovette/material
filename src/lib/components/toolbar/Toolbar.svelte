<!--
@component
Toolbar provides a horizontal (or vertical) container for grouped actions.

- variant="floating" — elevated, rounded, inline (default)
- variant="docked"   — full-width, flat, anchored to top/bottom
- ghost             — renders a h-16 spacer after the toolbar to prevent content scroll-under
- color="standard"   — surface-container background
- color="vibrant"    — secondary-container background with inverted toggle selection
- fab snippet        — renders a FAB at the trailing edge (canonical for docked bottom bars)
- sections           — splits the pill/bar into independently painted surfaces: root becomes a
                        plain flex layout and `children` render raw, so compose it from
                        `ToolbarSection` clusters (each gets its own bg/shape/elevation),
                        separated by `ToolbarSpacer` — a plain marker gap, the same size as
                        the toolbar's normal item spacing, not a flex-growing push to opposite
                        edges. Default (false) renders one implicit ToolbarSection around all
                        of `children`, unchanged from before.

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
    sections = false,
    class: className,
    ...restProps
  }: ToolbarProps = $props();

  const toolbarCtx = {
    get color() {
      return color;
    },
    get orientation() {
      return orientation;
    },
    get variant() {
      return variant;
    }
  };
  setContext('toolbar', toolbarCtx);

  const cls = $derived(toolbar({ orientation, variant, color }));
</script>

<Toolbar.Root {orientation} {loop} class={cls.root({ class: clsx(className) })} {...restProps}>
  {#if sections}
    {@render children?.()}
  {:else}
    <div class={cls.segment()}>
      {@render children?.()}
    </div>
  {/if}
  {#if fab}
    <div class={cls.fabSlot()}>
      {@render fab()}
    </div>
  {/if}
</Toolbar.Root>
{#if ghost}
  <div class={cls.ghost()} aria-hidden="true"></div>
{/if}
