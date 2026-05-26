<!--
@component
An action button within a Toolbar. Non-toggleable.
Color is inherited from the parent Toolbar via context.
-->
<script lang="ts">
  import { Toolbar } from 'bits-ui';
  import clsx from 'clsx';
  import { getContext } from 'svelte';
  import { Icon, Layer } from '$lib/utils/index.js';
  import { toolbarButton } from './theme.js';
  import type { ToolbarButtonProps } from './types.js';
  import type { ToolbarColor } from './types.js';

  let {
    iconProps,
    disabled = false,
    class: className,
    ...restProps
  }: ToolbarButtonProps = $props();

  const color = getContext<ToolbarColor>('toolbar-color') ?? 'standard';
  const { base, icon } = toolbarButton({ color });
</script>

<Toolbar.Button {disabled} class={base({ class: clsx(className) })} {...restProps}>
  <Icon {...iconProps} class={icon()} />
  <Layer />
</Toolbar.Button>
