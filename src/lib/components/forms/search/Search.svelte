<!--
@component
Material 3 Search Bar (contained, M3 Expressive).

Search bars allow users to enter a query to find specific information within an app.

@see https://m3.material.io/components/search/specs
-->
<script lang="ts">
  import { search } from './theme.js';
  import clsx from 'clsx';
  import type { SearchProps } from './types.js';
  import { Icon } from '$lib/utils/index.js';
  import ButtonIcon from '$lib/components/buttons/ButtonIcon.svelte';

  const uid = $props.id();

  let {
    placeholder = 'Search',
    value = $bindable(),
    elementRef = $bindable(),
    leading,
    trailing,
    trailingIconProps = { name: 'close' },
    leadingIconProps = { name: 'search' },
    clearLabel = 'Clear search',
    class: className,
    id = uid,
    trailingClick = () => {
      value = '';
      elementRef?.focus();
    },
    ...restProps
  }: SearchProps = $props();

  const showClear = $derived(!!trailingIconProps && !!value);

  const s = $derived(
    search({
      hasLeading: !!leading || !!leadingIconProps,
      hasTrailing: !!trailing || showClear
    })
  );
</script>

<label for={id} class={s.base({ class: clsx(className) })}>
  {#if leading}
    <span class={s.leading()}>{@render leading()}</span>
  {:else if leadingIconProps}
    <span class={s.leadingIcon()} aria-hidden="true"><Icon {...leadingIconProps} /></span>
  {/if}
  <input
    {...restProps}
    {id}
    {placeholder}
    bind:this={elementRef}
    bind:value
    type="search"
    class={s.input()}
  />
  {#if showClear || trailing}
    <span class={s.trailing()}>
      {#if showClear}
        <ButtonIcon
          variant="standard"
          type="button"
          iconProps={trailingIconProps!}
          aria-label={clearLabel}
          onclick={trailingClick}
        />
      {/if}
      {@render trailing?.()}
    </span>
  {/if}
</label>
