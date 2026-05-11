<!--
@component
Shell for an action dropdown menu.

`Menu` owns exactly two things: open/close state and the floating panel's
position. It renders whatever you pass as `children` — typically `MenuItem`
components, but also `Divider`, group headings, or any custom element.

Use the `trigger` snippet to supply a fully custom trigger element (e.g. an
icon button). When omitted, a default filled `Button` labelled by `label`
is rendered.

Contrast with `MenuItem` (a single interactive row inside the panel) and
`ContextMenu` (right-click variant that remains data-driven).

@see https://m3.material.io/components/menus/guidelines
-->
<script lang="ts">
  import { DropdownMenu } from "bits-ui";
  import clsx from "clsx";
  import Button from "../../buttons/Button.svelte";
  import { enterExit } from "$lib/animation/enterExit.js";
  import { easeEmphasizedDecel } from "$lib/animation/easing.js";
  import type { MenuProps } from "./types.js";

  let {
    children,
    trigger,
    label = "Open menu",
    align = "start",
    open = $bindable(false),
    class: contentClass,
  }: MenuProps = $props();
</script>

<DropdownMenu.Root bind:open>
  <DropdownMenu.Trigger>
    {#if trigger}
      {@render trigger()}
    {:else}
      <Button variant="filled" type="button">{label}</Button>
    {/if}
  </DropdownMenu.Trigger>

  <DropdownMenu.Portal>
    <DropdownMenu.Content forceMount {align} sideOffset={4} class="z-[100]">
      {#snippet child({ wrapperProps, props, open: isOpen })}
        {#if isOpen}
          <div {...wrapperProps} class={wrapperProps.class as any}>
            <div
              {...props}
              class={clsx(
                "bg-md-sys-color-surface-container-high shadow-elevation-3 ring-md-sys-color-outline/10 max-w-sm min-w-48 overflow-hidden rounded-xl py-2 ring-1",
                props.class as any,
                contentClass,
              )}
              transition:enterExit={{
                duration: 200,
                easing: easeEmphasizedDecel,
                mode: "scale",
              }}
            >
              {@render children()}
            </div>
          </div>
        {/if}
      {/snippet}
    </DropdownMenu.Content>
  </DropdownMenu.Portal>
</DropdownMenu.Root>
