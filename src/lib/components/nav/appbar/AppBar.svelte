<!--
@component
Material 3 App Bar.

Top app bars provide content and actions related to the current screen.
They’re used for branding, screen titles, navigation, and actions.

Sizes: `small` (64dp, one line) and the Expressive `medium`/`large` flexible bars, whose
headline block wraps and grows. `size` also takes one value per breakpoint
(`{ small: 'small', large: 'large' }`), switched in CSS so server rendering needs no JS.
`title` is a string, or a snippet for rich content (rendered inside the `<h1>`).
`align="center"` centres the title. Setting `search` makes it a search app bar; add
`searchResults` and selecting the field opens the search view, as with `Search`.

The bar takes its on-scroll color once `scrollContainer` (default: the page) scrolls.

With `collapse`, a medium/large bar snaps to the small bar (at every breakpoint, subtitle
hidden) once scrolled past 48px, and expands again only below 8px. The gap keeps the
height change from flipping the state back and forth. If the bar has `children`, the collapsed
bar shows them in place of the title (the title stays for assistive tech only).

Publishes its measured height as `--appbar-height` on the document root, so any
`Pane`/`PaneGrid` on the page (`full`, the default) shrinks its `min-height` by
that amount with no props or wiring on either side — see Pane.svelte's doc
comment.

A `ButtonIcon` anywhere inside it defaults to `variant="standard"`, per M3; pass
`variant` to override.

@see https://m3.material.io/components/app-bars/specs
-->
<script lang="ts">
  import clsx from 'clsx';

  import { ariaKeyShortcut, isApplePlatform, triggersShortcut } from '#lib/utils/index.js';

  import ButtonIcon from '../../buttons/ButtonIcon.svelte';
  import { setButtonIconVariant } from '../../buttons/context.js';
  import SearchView from '../../forms/search/SearchView.svelte';
  import { appbar, appbarSize } from './theme.js';
  import type { AppBarProps } from './types.js';

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
    disableClipping = false,
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
    collapse = false,
    ...rest
  }: AppBarProps = $props();

  // M3 app bar icon buttons are standard (no container); a filled one over-emphasizes a back or
  // action button. Applies to buttons passed in `leading`/`trailing`/`children` too.
  setButtonIconVariant('standard');

  let scrollY = $state(0);
  let containerScrollTop = $state(0);
  const scrolled = $derived((scrollContainer ? containerScrollTop : scrollY) > 10);

  // Hysteresis: shrinking the bar shortens the page, which can pull scroll back under a single
  // threshold and re-expand it.
  let compact = $state(false);
  $effect(() => {
    const y = scrollContainer ? containerScrollTop : scrollY;
    if (!collapse) compact = false;
    else if (y > 48) compact = true;
    else if (y < 8) compact = false;
  });
  let barRect = $state<DOMRectReadOnly>();
  const barHeight = $derived(barRect?.height ?? 64);

  // Window scrolling is bound below; a custom container still owns its scroll events.
  $effect(() => {
    const target = scrollContainer;
    if (!target) return;
    const read = () => (containerScrollTop = target.scrollTop);
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
  const showSubtitle = $derived(!!subtitle && !compact);
  // Collapsed with a children row: the row takes the title's place. Without one, the title stays.
  const childrenInTitle = $derived(compact && !!children && !isSearch);
  const sized = $derived(
    appbarSize(isSearch || compact ? 'small' : size, showSubtitle, disableClipping)
  );

  $effect(() => {
    document.documentElement.style.setProperty('--appbar-height', `${barHeight}px`);
    return () => document.documentElement.style.removeProperty('--appbar-height');
  });
</script>

<svelte:window bind:scrollY onkeydown={onShortcut} />

{#snippet titleContent()}
  {#if typeof title === 'function'}
    {@render title()}
  {:else}
    {title}
  {/if}
{/snippet}

<nav {...rest} class={s.base({ class: clsx(className) })} bind:contentRect={barRect}>
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
          <h1 {...titleProps} class={clsx('sr-only', titleProps?.class)}>
            {@render titleContent()}
          </h1>
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
        <h1
          {...titleProps}
          class={childrenInTitle
            ? clsx('sr-only', titleProps?.class)
            : s.title({ class: clsx(sized.title, titleProps?.class) })}
        >
          {@render titleContent()}
        </h1>
        {#if childrenInTitle}
          <div class="min-w-spacing-0 w-full">
            {@render children?.()}
          </div>
        {/if}
        {#if showSubtitle}
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
  {#if children && !childrenInTitle}
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
