<!--
@component
Material 3 Search Bar.

Search bars allow users to enter a query to find specific information within an app.

@see https://m3.material.io/components/search/overview
-->
<script lang="ts">
  import { search } from "./theme.js";
  import clsx from "clsx";
  import type { SearchProps } from "./types.js";
  import { Icon } from "$lib/utils/index.js";

  let {
    children,
    placeholder = "Поиск",
    value = $bindable(),
    elementRef = $bindable(),
    trailingIconProps = { name: "close" },
    leadingIconProps = { name: "search" },
    class: className,
    trailingClick = () => {
      value = "";
    },
    ...restProps
  }: SearchProps = $props();

  const { base, leadingIcon, trailingIcon, input } = $derived(search());
</script>

<label for="search" class={base({ class: clsx(className) })}>
  {#if leadingIconProps}
    <Icon {...leadingIconProps} class={leadingIcon()} />
  {/if}
  <input
    id="search"
    {...restProps}
    {placeholder}
    bind:this={elementRef}
    bind:value
    type="text"
    class={input()}
    oncancel={() => (value = undefined)}
  />

  {#if trailingIconProps && value}
    <button onclick={trailingClick} class="z-10">
      <Icon {...trailingIconProps} class={trailingIcon()} />
    </button>
  {/if}
</label>
