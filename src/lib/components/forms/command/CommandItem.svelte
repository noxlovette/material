<script lang="ts">
  import { Command } from "bits-ui";
  import clsx from "clsx";
  import { command } from "./theme.js";
  import type { CommandItemProps } from "./types.js";

  let {
    children,
    class: className,
    value,
    ...restProps
  }: CommandItemProps = $props();

  const { item } = command();
</script>

<Command.Item {...restProps} {value} class={item({ class: clsx(className) })}>
  {@render children()}
</Command.Item>
