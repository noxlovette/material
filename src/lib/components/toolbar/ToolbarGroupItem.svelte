<!--
@component
A toggleable icon button within a ToolbarGroup.
Selected state is driven by data-[state=on] from Bits UI.
Color is inherited from the parent Toolbar via context.
-->
<script lang="ts">
  import { Toolbar } from 'bits-ui';
  import clsx from 'clsx';
  import { getContext } from 'svelte';
  import { Icon, Layer } from '$lib/utils/index.js';
  import { toolbarGroupItem } from './theme.js';
  import type { ToolbarGroupItemProps } from './types.js';
  import type { ToolbarColor } from './types.js';
  import Tooltip from '$lib/components/forms/tooltip/Tooltip.svelte';

  let {
    iconProps,
    value,
    disabled = false,
    tooltipContent,
    triggerClass = '',
    class: className,
    ...restProps
  }: ToolbarGroupItemProps = $props();

  const toolbarCtx = getContext<{ color: ToolbarColor; orientation: string } | undefined>(
    'toolbar'
  );
  const color = $derived(toolbarCtx?.color ?? 'standard');
  const { base, icon } = $derived(toolbarGroupItem({ color }));

  const btnCls = $derived(base({ class: clsx(className) }));
</script>

<Tooltip {triggerClass} variant="snack" supportingText={tooltipContent}>
  {#snippet trigger({
    class: triggerClass_,
    type: _tooltipType,
    onclick: _tooltipOnclick,
    ...triggerAttrs
  })}
    <Toolbar.GroupItem
      {value}
      {disabled}
      class={clsx(btnCls, triggerClass_ as string)}
      {...restProps}
      {...triggerAttrs}
    >
      <Icon {...iconProps} class={icon()} />
      <Layer />
    </Toolbar.GroupItem>
  {/snippet}
</Tooltip>
