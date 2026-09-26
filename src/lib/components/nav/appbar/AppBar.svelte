<!--
@component
Material 3 App Bar.

Top app bars provide content and actions related to the current screen.
They’re used for branding, screen titles, navigation, and actions.

Sizes: `small` (64dp, one line) and the Expressive `medium`/`large` flexible bars, whose
headline block wraps and grows. `size` also takes one value per breakpoint
(`{ small: 'small', large: 'large' }`), switched in CSS so server rendering needs no JS.
`align="center"` centres the title. Setting `search` makes it a search app bar; add
`searchResults` and selecting the field opens the search view, as with `Search`.

The bar takes its on-scroll color once `scrollContainer` (default: the page) scrolls.

Publishes its measured height as `--appbar-height` on the document root, so any
`Pane`/`PaneGrid` on the page (`full`, the default) shrinks its `min-height` by
that amount with no props or wiring on either side — see Pane.svelte's doc
comment.

A `ButtonIcon` anywhere inside it defaults to `variant="standard"`, per M3; pass
`variant` to override.

@see https://m3.material.io/components/app-bars/specs
-->
<script lang="ts">
  import { appbar, appbarSize } from './theme.js';
  import type { AppBarProps } from './types.js';
  import clsx from 'clsx';
  import ButtonIcon from '../../buttons/ButtonIcon.svelte';
  import { setButtonIconVariant } from '../../buttons/context.js';
  import SearchView from '../../forms/search/SearchView.svelte';
  import { ariaKeyShortcut, isApplePlatform, triggersShortcut } from '$lib/utils/index.js';

  let {
    children,
    title,
    subtitle,
    titleProps,
    subtitleProps,
    trailing,
    leading,
    class: className,
    rowClass,
    showBack = false,
    onback = () => history.back(),
    size = 'small',
    align = 'start',
    search,
    query = $bindable(''),
    searchProps,
    searchTrailing,
    searchResults,
    searchOpen = $bindable(false),
    searchLayout,
    searchShortcut = '/',
    onsearch,
    scrollContainer,
    ghost = false,
    ...rest
  }: AppBarProps = $props();

  // M3 app bar icon buttons are standard (no container); a filled one over-emphasizes a back or
  // action button. Applies to buttons passed in `leading`/`trailing`/`children` too.
  setButtonIconVariant('standard');

  let scrolled = $state(false);
  let barHeight = $state(64);

  $effect(() => {
    const target = scrollContainer ?? window;
    const read = () =>
      (scrolled = (scrollContainer ? scrollContainer.scrollTop : window.scrollY) > 10);
    read();
    target.addEventListener('scroll', read, { passive: true });
    return () => target.removeEventListener('scroll', read);
  });

  const isSearch = $derived(search !== undefined);

  let searchBar = $state<HTMLElement>();

  // Same as Search: `/` jumps to the field, or opens the view.
  let apple = $state(false);
  $effect(() => {
    apple = isApplePlatform();
  });
  const shortcut = $derived(isSearch ? searchShortcut : null);

  function onShortcut(e: KeyboardEvent) {
    if (!triggersShortcut(e, shortcut, searchBar)) return;
    e.preventDefault();
    if (searchResults) searchOpen = true;
    else {
      const field = searchBar?.querySelector('input');
      field?.focus();
      field?.select();
    }
  }

  // Same as Search: click or typing opens the view; focus alone doesn't.
  const opener = $derived(
    searchResults
      ? {
          'aria-haspopup': 'dialog' as const,
          'aria-expanded': searchOpen,
          onclick: (e: MouseEvent & { currentTarget: HTMLInputElement }) => {
            searchProps?.onclick?.(e);
            if (!e.defaultPrevented) searchOpen = true;
          },
          oninput: (e: Event & { currentTarget: HTMLInputElement }) => {
            searchProps?.oninput?.(e);
            if (!e.defaultPrevented) searchOpen = true;
          }
        }
      : {}
  );

  // ↓ opens the view; Enter searches for the query as typed.
  function onSearchKeydown(e: KeyboardEvent & { currentTarget: HTMLInputElement }) {
    searchProps?.onkeydown?.(e);
    if (e.defaultPrevented) return;
    if (e.key === 'ArrowDown' && searchResults) {
      e.preventDefault();
      searchOpen = true;
    } else if (e.key === 'Enter' && onsearch && query?.trim()) {
      e.preventDefault();
      onsearch(query);
    }
  }
  const noLeading = $derived(!leading && !showBack);

  const s = $derived(
    appbar({
      align: isSearch ? 'start' : align,
      scrolled,
      searchContainer: isSearch,
      hasSearchTrailing: !!searchTrailing,
      noLeading,
      noTrailing: !trailing
    })
  );
  // Search app bars are always the small, 64dp bar.
  const sized = $derived(appbarSize(isSearch ? 'small' : size, !!subtitle));

  function trackHeight(node: HTMLElement) {
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      barHeight = entry?.contentRect.height ?? barHeight;
    });
    observer.observe(node);
    return () => observer.disconnect();
  }

  $effect(() => {
    document.documentElement.style.setProperty('--appbar-height', `${barHeight}px`);
    return () => document.documentElement.style.removeProperty('--appbar-height');
  });
</script>

<svelte:window onkeydown={onShortcut} />

<nav {...rest} class={s.base({ class: clsx(className) })} {@attach trackHeight}>
  <div class={s.row({ class: clsx(sized.row, rowClass) })}>
    <div class={s.leading()}>
      {#if leading}
        {@render leading()}
      {:else if showBack}
        <ButtonIcon
          variant="standard"
          iconProps={{ name: 'arrow_back' }}
          aria-label="Back"
          onclick={onback}
        />
      {/if}
    </div>
    <div class={s.textContainer({ class: sized.textContainer })}>
      {#if isSearch}
        {#if title}
          <h1 {...titleProps} class={clsx('sr-only', titleProps?.class)}>{title}</h1>
        {/if}
        <label class={s.search()} bind:this={searchBar}>
          <input
            type="search"
            {...searchProps}
            {...opener}
            onkeydown={onSearchKeydown}
            placeholder={search}
            aria-keyshortcuts={shortcut ? ariaKeyShortcut(shortcut, apple) : undefined}
            aria-label={searchProps?.['aria-label'] ?? search}
            bind:value={query}
            class={s.searchInput({ class: clsx(searchProps?.class) })}
          />
          {#if searchTrailing}
            <span class={s.searchTrailing()}>{@render searchTrailing()}</span>
          {/if}
        </label>
      {:else}
        <h1 {...titleProps} class={s.title({ class: clsx(sized.title, titleProps?.class) })}>
          {title}
        </h1>
        {#if subtitle}
          <p
            {...subtitleProps}
            class={s.subtitle({ class: clsx(sized.subtitle, subtitleProps?.class) })}
          >
            {subtitle}
          </p>
        {/if}
      {/if}
    </div>
    <div class={s.trailing()}>
      {@render trailing?.()}
    </div>
  </div>
  {#if children}
    <div class={s.childrenRow()}>
      {@render children()}
    </div>
  {/if}
</nav>

{#if isSearch && searchResults}
  <SearchView
    bind:open={searchOpen}
    bind:value={query}
    anchor={searchBar}
    results={searchResults}
    layout={searchLayout}
    placeholder={search}
    trailing={searchTrailing}
    {onsearch}
  />
{/if}

{#if ghost}
  <div class={s.ghost()} style="height: {barHeight}px" aria-hidden="true"></div>
{/if}
