<!--
@component
A single tab trigger within a TabHolder.
Renders as <a> when href is provided (navigation tabs),
otherwise as <button> (content-panel tabs).
-->
<script lang="ts">
  import { Icon, Layer } from "$lib/utils/index.js";
  import { tab } from "./theme.js";
  import type { TabProps } from "./types.js";
  import { Tabs } from "bits-ui";
  import clsx from "clsx";

  const {
    iconProps,
    name,
    value,
    href,
    variant = "primary",
    disabled,
    class: className,
  }: TabProps = $props();

  const {
    base,
    icon: iconCls,
    label: labelCls,
  } = $derived(tab({ variant, disabled }));
  const cls = $derived(base({ class: clsx(className) }));
</script>

<Tabs.Trigger value={value ?? ""} {disabled}>
  {#snippet child({ props })}
    {@const { type: _type, disabled: _disabled, ...anchorProps } = props}
    {#if href}
      <a
        {href}
        {...anchorProps}
        class={cls}
        aria-disabled={disabled || undefined}
      >
        {#if variant === "primary" && iconProps}
          <Icon {...iconProps} class={iconCls()} />
        {/if}
        <span class={labelCls()}>{name}</span>
        <Layer />
      </a>
    {:else}
      <button type="button" {...props} class={cls}>
        {#if variant === "primary" && iconProps}
          <Icon {...iconProps} class={iconCls()} />
        {/if}
        <span class={labelCls()}>{name}</span>
        <Layer />
      </button>
    {/if}
  {/snippet}
</Tabs.Trigger>
