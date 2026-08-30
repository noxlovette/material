<!--
@component
A standard button group — an invisible container that adds spacing between
buttons and lets them mix variants, colors, and widths freely. Pressing a
button also nudges the width of its immediate neighbors, per the M3 spec.

Buttons keep their own identity here; this is a plain layout wrapper around
`Button` / `ButtonIcon` / `Toggle` children, not a selection primitive. For a
single/multi-select segmented control, use `ConnectedButtonGroup` instead.

@see https://m3.material.io/components/button-groups/overview
-->
<script lang="ts">
  import clsx from 'clsx';
  import { buttonGroup } from './theme.js';
  import type { ButtonGroupProps } from './types.js';

  let {
    orientation = 'horizontal',
    size = 'sm',
    children,
    class: className
  }: ButtonGroupProps = $props();

  const cls = $derived(buttonGroup({ orientation, size }));
</script>

<div class={cls.root({ class: clsx(className) })} data-size={size} data-orientation={orientation}>
  {@render children()}
</div>
