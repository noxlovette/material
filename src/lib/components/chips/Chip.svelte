<!--
@component
Chips help people enter information, make selections, filter content, or trigger actions.

- Assist: Represents a smart or automated action, such as adding an event to a calendar
- Filter: Uses tags or descriptive words to filter content; supports a selected state
- Input: Represents a discrete piece of information entered by a user, and can be removed
- Suggestion: Helps narrow a user's intent by presenting dynamically generated suggestions

@see https://m3.material.io/components/chips/overview
-->
<script lang="ts">
  import type { ChipProps } from './types.js';
  import { Icon, Layer } from '$lib/utils/index.js';
  import { chip } from './theme.js';
  import clsx from 'clsx';
  import { Button, Toggle, type ButtonRootProps, type ToggleRootProps } from 'bits-ui';
  import type { HTMLAttributes } from 'svelte/elements';

  let {
    children,
    variant = 'assist',
    elevated = false,
    selected = $bindable(false),
    onPressedChange,
    disabled = false,
    iconProps,
    avatar,
    onRemove,
    formaction,
    class: className,
    ...restProps
  }: ChipProps = $props();

  const isFilter = $derived(variant === 'filter');
  const isElevated = $derived(variant === 'input' ? false : elevated);
  const isSelected = $derived(variant === 'filter' || variant === 'input' ? selected : false);
  const showCheck = $derived(isFilter && selected);

  const leadingKind = $derived(
    showCheck ? 'icon' : avatar ? 'avatar' : iconProps ? 'icon' : 'none'
  );
  const removable = $derived(variant === 'input' && Boolean(onRemove));

  const {
    base,
    icon,
    avatar: avatarCls,
    label,
    trailing,
    checkIcon
  } = $derived(
    chip({
      variant,
      elevated: isElevated,
      selected: isSelected,
      leading: leadingKind,
      removable,
      disabled
    })
  );
  const chipCls = $derived(base({ class: clsx(className) }));
</script>

{#snippet leading()}
  {#if showCheck}
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      class={checkIcon()}
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M9.55 18 3.85 12.3 5.275 10.875 9.55 15.15 18.725 5.975 20.15 7.4Z" />
    </svg>
  {:else if avatar}
    <span class={avatarCls()}>{@render avatar()}</span>
  {:else if iconProps}
    <Icon size="sm" {...iconProps} class={icon({ class: clsx(iconProps.class) })} />
  {/if}
{/snippet}

{#if isFilter}
  <Toggle.Root
    bind:pressed={selected}
    {onPressedChange}
    {disabled}
    class={chipCls}
    data-cy="m3-chip"
    {...restProps as ToggleRootProps}
  >
    {@render leading()}
    <span class={label()}>{@render children()}</span>
    <Layer />
  </Toggle.Root>
{:else if variant === 'input'}
  <div
    class={chipCls}
    data-cy="m3-chip"
    aria-disabled={disabled}
    data-disabled={disabled ? true : undefined}
    {...restProps as HTMLAttributes<HTMLDivElement>}
  >
    {@render leading()}
    <span class={label()}>{@render children()}</span>
    {#if onRemove}
      <button
        type="button"
        class={trailing()}
        {disabled}
        onclick={(e) => {
          e.stopPropagation();
          onRemove?.();
        }}
        aria-label="Remove"
      >
        <Icon size="sm" name="close" class="size-[18px] text-[18px]" />
        <Layer />
      </button>
    {/if}
    <Layer />
  </div>
{:else}
  <Button.Root
    {disabled}
    {formaction}
    class={chipCls}
    data-cy="m3-chip"
    {...restProps as ButtonRootProps}
  >
    {@render leading()}
    <span class={label()}>{@render children()}</span>
    <Layer />
  </Button.Root>
{/if}
