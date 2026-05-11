<script lang="ts">
  import { Command } from "bits-ui";
  import clsx from "clsx";
  import { command } from "./theme.js";
  import type { CommandEmptyProps } from "./types.js";

  let {
    children,
    class: className,
    ...restProps
  }: CommandEmptyProps = $props();

  const { empty } = command();
</script>

<Command.Empty {...restProps} class={empty({ class: clsx(className) })}>
  {@render children()}
</Command.Empty>
