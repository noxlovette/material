<!--
@component
Material 3 Search Bar (contained, M3 Expressive).

Search bars allow users to enter a query to find specific information within an app.

Give it `results` and the bar opens a search view (`SearchView`) when clicked or typed in:
full-screen on compact windows, docked from medium up, with a container transform between them.

`/` anywhere on the page (outside a text field) jumps to the bar, or opens its view; `shortcut`
changes the key, `null` turns it off.

@see https://m3.material.io/components/search/specs
-->
<script lang="ts">
  import { search } from './theme.js';
  import clsx from 'clsx';
  import type { SearchProps } from './types.js';
  import { Icon, ariaKeyShortcut, isApplePlatform, triggersShortcut } from '$lib/utils/index.js';
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
    shortcut = '/',
    onsearch,
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

  // With a search view, clicking the bar or typing in it opens the view. Not focus:
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
          }
        }
      : {}
  );

  // ↓ opens the view; Enter searches for the query as typed.
  function onkeydown(e: KeyboardEvent & { currentTarget: HTMLInputElement }) {
    restProps.onkeydown?.(e);
    if (e.defaultPrevented) return;
    if (e.key === 'ArrowDown' && results) {
      e.preventDefault();
      open = true;
    } else if (e.key === 'Enter' && onsearch && value?.trim()) {
      e.preventDefault();
      onsearch(value);
    }
  }

  // `Mod` resolves on the client, so SSR and the first render agree.
  let apple = $state(false);
  $effect(() => {
    apple = isApplePlatform();
  });

  function onShortcut(e: KeyboardEvent) {
    if (!triggersShortcut(e, shortcut, bar)) return;
    e.preventDefault();
    if (results) open = true;
    else {
      elementRef?.focus();
      elementRef?.select();
    }
  }

  const showClear = $derived(!!trailingIconProps && !!value);

  const s = $derived(
    search({
      hasLeading: !!leading || !!leadingIconProps,
      hasTrailing: !!trailing || showClear
    })
  );
</script>

<svelte:window onkeydown={onShortcut} />

<label for={id} class={s.base({ class: clsx(className) })} bind:this={bar}>
  {#if leading}
    <span class={s.leading()}>{@render leading()}</span>
  {:else if leadingIconProps}
    <span class={s.leadingIcon()} aria-hidden="true"><Icon {...leadingIconProps} /></span>
  {/if}
  <input
    {...restProps}
    {...opener}
    {onkeydown}
    {id}
    aria-keyshortcuts={shortcut ? ariaKeyShortcut(shortcut, apple) : undefined}
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
    {onsearch}
  />
{/if}
