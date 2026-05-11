<!--
@component
A toggleable icon button within a ToolbarGroup.
Selected state is driven by data-[state=on] from Bits UI.
-->
<script lang="ts">
  import { Toolbar } from "bits-ui";
  import clsx from "clsx";
  import { Icon, Layer } from "$lib/utils/index.js";
  import { toolbarGroupItem } from "./theme.js";
  import type { ToolbarGroupItemProps } from "./types.js";

  let {
    iconProps,
    value,
    disabled = false,
    class: className,
    ...restProps
  }: ToolbarGroupItemProps = $props();

  const { base, icon } = toolbarGroupItem();
</script>

<Toolbar.GroupItem
  {value}
  {disabled}
  class={base({ class: clsx(className) })}
  {...restProps}
>
  <Icon {...iconProps} class={icon()} />
  <Layer />
</Toolbar.GroupItem>
