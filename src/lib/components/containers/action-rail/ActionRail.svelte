<!--
@component
Material 3 Action Rail.

A rightmost, sticky container for hosting a vertical `Toolbar` (or other grouped
actions) alongside page content. This is the M3 spec's newer "rail as a toolbar
host" role — distinct from `Rail` (the navigation-rail component under `nav/`).
Because it holds actions rather than destinations, it renders a plain container
and is intentionally NOT wrapped in bits-ui's `NavigationMenu` — `Toolbar.svelte`
(bits-ui `Toolbar.Root`) already supplies the correct `role="toolbar"` semantics
for whatever is placed inside.

@see https://m3.material.io/components/toolbars
-->
<script lang="ts">
  import clsx from 'clsx';
  import { actionRail } from './theme.js';
  import type { ActionRailProps } from './types.js';

  let {
    children,
    anchor = 'sticky',
    top = 0,
    bottom = 0,
    class: className,
    ...rest
  }: ActionRailProps = $props();

  const { base } = $derived(actionRail({ anchor }));
  const cssVars = $derived(`--action-rail-top: ${top}px; --action-rail-bottom: ${bottom}px;`);
</script>

<div class={base({ class: clsx(className) })} style={cssVars} {...rest}>
  {@render children()}
</div>
