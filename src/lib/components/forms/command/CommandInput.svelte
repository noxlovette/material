<script lang="ts">
  import { Command } from "bits-ui";
  import clsx from "clsx";
  import { command } from "./theme.js";
  import type { CommandInputProps } from "./types.js";
  import { Icon } from "$lib/utils/index.js";

  let {
    class: className,
    showIcon = true,
    ...restProps
  }: CommandInputProps = $props();

  const { inputWrapper, inputIcon, input } = command();
</script>

<div class={inputWrapper()} data-command-input-wrapper="">
  {#if showIcon}
    <Icon name="search" class={inputIcon()} />
  {/if}
  <Command.Input {...restProps} class={input({ class: clsx(className) })} />
</div>
