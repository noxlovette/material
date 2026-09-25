<!--
@component
Material 3 Search Bar (contained, M3 Expressive).

Search bars allow users to enter a query to find specific information within an app.

Give it `results` and the bar opens a search view (`SearchView`) when clicked or typed in:
full-screen on compact windows, docked from medium up, with a container transform between them.

@see https://m3.material.io/components/search/specs
-->
<script lang="ts">
  import { search } from './theme.js';
  import clsx from 'clsx';
  import type { SearchProps } from './types.js';
  import { Icon } from '$lib/utils/index.js';
  import ButtonIcon from '$lib/components/buttons/ButtonIcon.svelte';
  import SearchView from './SearchView.svelte';

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
    open = $bindable(false),
    results,
    layout,
    backLabel,
    resultsLabel,
    class: className,
    id = uid,
    trailingClick = () => {
      value = '';
      elementRef?.focus();
    },
    ...restProps
  }: SearchProps = $props();

  let bar = $state<HTMLElement>();

  // With a search view, clicking the bar, typing in it or pressing ↓ opens the view. Not focus:
  // closing the view hands focus back here, which must not reopen it.
  const opener = $derived(
    results
      ? {
          'aria-haspopup': 'dialog' as const,
          'aria-expanded': open,
          onclick: (e: MouseEvent & { currentTarget: HTMLInputElement }) => {
            restProps.onclick?.(e);
            if (!e.defaultPrevented) open = true;
          },
          oninput: (e: Event & { currentTarget: HTMLInputElement }) => {
            restProps.oninput?.(e);
            if (!e.defaultPrevented) open = true;
          },
          onkeydown: (e: KeyboardEvent & { currentTarget: HTMLInputElement }) => {
            restProps.onkeydown?.(e);
            if (!e.defaultPrevented && e.key === 'ArrowDown') {
              e.preventDefault();
              open = true;
            }
          }
        }
      : {}
  );

  const showClear = $derived(!!trailingIconProps && !!value);

  const s = $derived(
    search({
      hasLeading: !!leading || !!leadingIconProps,
      hasTrailing: !!trailing || showClear
    })
  );
</script>

<label for={id} class={s.base({ class: clsx(className) })} bind:this={bar}>
  {#if leading}
    <span class={s.leading()}>{@render leading()}</span>
  {:else if leadingIconProps}
    <span class={s.leadingIcon()} aria-hidden="true"><Icon {...leadingIconProps} /></span>
  {/if}
  <input
    {...restProps}
    {...opener}
    {id}
    placeholder={placeholder ?? undefined}
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

{#if results}
  <SearchView
    bind:open
    bind:value
    anchor={bar}
    {results}
    {layout}
    placeholder={placeholder ?? undefined}
    {backLabel}
    {resultsLabel}
    {clearLabel}
    {trailing}
  />
{/if}
