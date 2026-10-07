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

With `collapse`, a medium/large bar fades through to the small bar (at every breakpoint, subtitle
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
  import { animate } from 'motion';
  import { tick, untrack } from 'svelte';

  import { enterExit } from '#lib/animation/enterExit.js';
  import { prefersReducedMotion } from '#lib/animation/reducedMotion.js';
  import { springTokens, springTransition } from '#lib/animation/spring.js';
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

  /*
    `compact` is where the bar is going; `layoutCompact` is what's rendered. Like Rail, the change
    is one spring on a progress p (0 old, 1 new) with both ends measured: the layout swaps at
    once, then each frame the bar's height, the title's type size and the text block's position
    are interpolated between where they were drawn and where the new layout puts them. Blocks that
    only exist on one side (subtitle, the children row) fade: the old ones as an inert clone left
    where they were, the new ones in place. An interrupted run picks up from where it is drawn.
  */
  let layoutCompact = $state(false);
  let navEl = $state<HTMLElement>();
  let textEl = $state<HTMLElement>();
  let running: { stop: () => void } | undefined;
  let clones: HTMLElement[] = [];
  const MORPH = springTransition(springTokens.spatial);
  const TYPE = ['fontSize', 'lineHeight', 'letterSpacing'] as const;

  const blocks = () =>
    [...(navEl?.querySelectorAll<HTMLElement>('[data-appbar-block]') ?? [])].filter(
      (el) => !el.classList.contains('sr-only')
    );
  const readType = (el: HTMLElement) => {
    const css = getComputedStyle(el);
    return TYPE.map((key) => parseFloat(css[key]));
  };

  // An inert copy of a block, pinned where it is drawn, to play its exit on after the swap.
  function cloneAt(el: HTMLElement, bar: DOMRect) {
    const copy = el.cloneNode(true) as HTMLElement;
    copy.querySelectorAll('[id]').forEach((n) => n.removeAttribute('id'));
    copy.removeAttribute('id');
    copy.removeAttribute('data-appbar-block');
    copy.inert = true;
    copy.setAttribute('aria-hidden', 'true');
    const box = el.getBoundingClientRect();
    Object.assign(copy.style, {
      position: 'absolute',
      margin: '0',
      pointerEvents: 'none',
      left: `${box.left - bar.left}px`,
      top: `${box.top - bar.top}px`,
      width: `${box.width}px`,
      height: `${box.height}px`
    });
    navEl!.append(copy);
    return copy;
  }

  function reset(bar: HTMLElement, text: HTMLElement) {
    running?.stop();
    running = undefined;
    clones.forEach((c) => c.remove());
    clones = [];
    bar.style.height = bar.style.overflow = '';
    text.style.transform = '';
    text.querySelectorAll<HTMLElement>('h1').forEach((h) => {
      for (const key of TYPE) h.style[key] = '';
    });
  }

  $effect(() => {
    const target = compact;
    untrack(() => {
      if (target === layoutCompact) return;
      const bar = navEl;
      const text = textEl;
      if (!bar || !text || prefersReducedMotion()) {
        layoutCompact = target;
        return;
      }

      // Where everything is drawn now (mid-run included).
      const from = bar.offsetHeight;
      const textFrom = text.getBoundingClientRect();
      const barBox = bar.getBoundingClientRect();
      const title = text.querySelector<HTMLElement>('h1');
      const typeFrom = title ? readType(title) : [];
      const copies = new Map(blocks().map((el) => [el, cloneAt(el, barBox)]));
      reset(bar, text);
      clones = [...copies.values()];

      layoutCompact = target;
      tick().then(() => {
        const to = bar.offsetHeight;
        const textTo = text.getBoundingClientRect();
        const visible = new Set(blocks());
        const morphs = !!title && visible.has(title) && copies.has(title);
        const typeTo = morphs ? readType(title) : [];

        for (const [el, copy] of copies) {
          if (visible.has(el)) copy.remove();
          else animate(copy, { opacity: 0 }, enterExit.fade.exit).then(() => copy.remove());
        }
        clones = clones.filter((c) => c.isConnected);
        for (const el of visible) {
          if (!copies.has(el)) animate(el, { opacity: [0, 1] }, enterExit.fade.enter);
        }

        const frame = (p: number) => {
          bar.style.height = `${from + (to - from) * p}px`;
          if (morphs) {
            TYPE.forEach((key, i) => {
              if (Number.isFinite(typeFrom[i]) && Number.isFinite(typeTo[i]))
                title.style[key] = `${typeFrom[i] + (typeTo[i] - typeFrom[i]) * p}px`;
            });
          }
          // Where the new layout draws the block at this size, versus where it should be.
          text.style.transform = '';
          const now = text.getBoundingClientRect();
          const x = textFrom.left + (textTo.left - textFrom.left) * p - now.left;
          const y = textFrom.top + (textTo.top - textFrom.top) * p - now.top;
          text.style.transform = `translate(${x}px, ${y}px)`;
        };

        bar.style.overflow = 'clip';
        frame(0);
        const controls = animate(0, 1, {
          ...MORPH,
          onUpdate: frame,
          onComplete: () => {
            if (running === controls) reset(bar, text);
          }
        });
        running = controls;
      });
    });
  });

  $effect(() => () => {
    running?.stop();
    clones.forEach((c) => c.remove());
  });

  // Before the first measurement, read the bar directly rather than guessing 64dp, so a tall bar
  // doesn't publish a short height for a frame.
  const barHeight = $derived(barRect?.height ?? navEl?.offsetHeight ?? 0);

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
  const showSubtitle = $derived(!!subtitle && !layoutCompact);
  // Collapsed with a children row: the row takes the title's place. Without one, the title stays.
  const childrenInTitle = $derived(layoutCompact && !!children && !isSearch);
  const sized = $derived(
    appbarSize(isSearch || layoutCompact ? 'small' : size, showSubtitle, disableClipping)
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

<nav
  {...rest}
  class={s.base({ class: clsx(className) })}
  bind:this={navEl}
  bind:contentRect={barRect}
>
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
    <div class={s.textContainer({ class: sized.textContainer })} bind:this={textEl}>
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
          data-appbar-block
          class={childrenInTitle
            ? clsx('sr-only', titleProps?.class)
            : s.title({ class: clsx(sized.title, titleProps?.class) })}
        >
          {@render titleContent()}
        </h1>
        {#if childrenInTitle}
          <div class="min-w-spacing-0 w-full" data-appbar-block>
            {@render children?.()}
          </div>
        {/if}
        {#if showSubtitle}
          <p
            {...subtitleProps}
            data-appbar-block
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
    <div class={s.childrenRow()} data-appbar-block>
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
  <!-- Same size classes as the bar's row, so the reserved space is right from the first
       server-rendered frame; the measured height takes over once known. -->
  <div
    class={s.ghost({ class: sized.row })}
    style:height={barRect ? `${barRect.height}px` : undefined}
    aria-hidden="true"
  ></div>
{/if}
