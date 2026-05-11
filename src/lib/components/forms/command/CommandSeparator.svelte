<script lang="ts">
  import { Command } from "bits-ui";
  import clsx from "clsx";
  import { command } from "./theme.js";
  import type { CommandSeparatorProps } from "./types.js";

  let { class: className, ...restProps }: CommandSeparatorProps = $props();

  const { separator } = command();
</script>

<Command.Separator
  {...restProps}
  class={separator({ class: clsx(className) })}
/>
