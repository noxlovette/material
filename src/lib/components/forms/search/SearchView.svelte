<!--
@component
Material 3 search view (contained, M3 Expressive): where a search bar's suggestions and results go.

`Search` and the search `AppBar` render it for you when given `results`; use it directly only to
open a view from a bar of your own, passing that bar as `anchor`.

- **Layouts.** `fullScreen` covers the window; `docked` widens the bar in place (its margins go
  from 24dp to 12dp) with results in a container 2dp below. `layout` takes one per window tier and
  defaults to full-screen on compact windows, docked from medium up. Switched in CSS.
- **Motion.** Opening and closing are an M3 container transform between the bar and the view, on
  the `spatial` spring; a crossfade under reduced motion.
- **Behavior.** A bits-ui `Dialog`: focus stays in the view, the page doesn't scroll, and Esc, the
  back button or a click outside closes it. The field is a combobox over the `results` listbox:
  arrow keys move through the `role="option"` items and Enter picks one. Enter with no item
  highlighted searches for the query as typed (`onsearch`).

@see https://m3.material.io/components/search/specs
-->
<script lang="ts">
  import { tick, untrack } from 'svelte';
  import { Dialog } from 'bits-ui';
  import clsx from 'clsx';
  import { containerTransform } from '$lib/animation/index.js';
  import ButtonIcon from '$lib/components/buttons/ButtonIcon.svelte';
  import { defaultSearchLayout, searchView, searchViewLayout } from './theme.js';
  import type { SearchViewProps } from './types.js';

  const uid = $props.id();

  let {
    open = $bindable(false),
    value = $bindable(),
    anchor,
    results,
    layout = defaultSearchLayout,
    placeholder = 'Search',
    resultsLabel,
    backLabel = 'Back',
    clearLabel = 'Clear search',
    trailing,
    inputProps,
    inputRef = $bindable(),
    onsearch
  }: SearchViewProps = $props();

  const listboxId = `${uid}-listbox`;
  const label = $derived(resultsLabel ?? placeholder ?? 'Search');
  const s = $derived(searchView({ hasTrailing: !!value || !!trailing }));
  const placed = $derived(searchViewLayout(layout));

  /*
    `open` is what was asked for; `shown` is what's on screen. The container transform flips
    `shown` inside its update, so the View Transition API snapshots the bar before and the view
    after (or the reverse). One transform at a time: a request made mid-flight is picked up when
    the running one settles, so a quick open-close never strands the view.
  */
  let shown = $state(untrack(() => open));
  let view = $state<HTMLElement>();
  let busy = false;

  const sync = () => {
    if (busy || open === shown) return;
    const opening = open;
    if (opening) measure();
    const update = async () => {
      // The view takes the bar's place: hidden, the bar isn't left behind in the page's snapshot
      // (a second, static bar under the morph). Shown again first on close, so focus can return.
      hideAnchor(opening);
      shown = opening;
      await tick();
    };
    const from = opening ? anchor : view;
    const to = opening ? `[data-search-view="${uid}"]` : anchor;
    busy = true;
    const settle = () => {
      busy = false;
      sync();
    };
    if (!from || !to) update().then(settle, settle);
    else containerTransform(update, { from, to }).then(settle, settle);
  };

  $effect(() => {
    void open;
    untrack(sync);
  });

  const hideAnchor = (hidden: boolean) => {
    if (anchor) anchor.style.visibility = hidden ? 'hidden' : '';
  };

  // Covers a view that starts open, and a bar swapped while it's open.
  $effect(() => {
    if (!anchor) return;
    hideAnchor(untrack(() => shown));
    return () => hideAnchor(false);
  });

  /*
    Docked: the view's bar is the search bar widened by the 12dp contained margin on each side,
    held to 360–720dp and to the window; results may grow to ⅔ of the window, stopping 16dp
    above its bottom edge. Read in px from the bar and the --md-comp-search-view-* tokens.
  */
  let pos = $state({ top: 0, left: 0, width: 0, room: 0 });

  function measure() {
    if (!anchor) return;
    const r = anchor.getBoundingClientRect();
    const root = getComputedStyle(document.documentElement);
    const rem = parseFloat(root.fontSize) || 16;
    const token = (name: string, fallback: number) =>
      parseFloat(
        root.getPropertyValue(`--md-comp-search-view-contained-docked-container-width-${name}`)
      ) * rem || fallback;
    const margin = 0.75 * rem;
    const width = Math.min(
      Math.max(r.width + 2 * margin, token('minimum', 0)),
      token('maximum', Infinity),
      innerWidth
    );
    const left = Math.max(0, Math.min(r.left - margin, innerWidth - width));
    pos = { top: r.top, left, width, room: innerHeight - r.top - rem };
  }

  $effect(() => {
    if (!shown) return;
    addEventListener('resize', measure);
    return () => removeEventListener('resize', measure);
  });

  /* Combobox: the input keeps focus; aria-activedescendant points at the highlighted option. */
  let resultsEl = $state<HTMLElement>();
  let active = $state<HTMLElement | null>(null);
  let optionIds = 0;

  const options = () =>
    [...(resultsEl?.querySelectorAll<HTMLElement>('[role="option"]') ?? [])].filter(
      (o) => o.getAttribute('aria-disabled') !== 'true' && !o.hasAttribute('disabled')
    );

  const highlight = (el: HTMLElement | null) => {
    active?.removeAttribute('data-highlighted');
    if (el) {
      el.id ||= `${uid}-option-${optionIds++}`;
      el.setAttribute('data-highlighted', '');
      el.scrollIntoView?.({ block: 'nearest' });
    }
    active = el;
  };

  // A new query means new results: start over from the field.
  $effect(() => {
    void value;
    void shown;
    untrack(() => highlight(null));
  });

  function onkeydown(e: KeyboardEvent & { currentTarget: HTMLInputElement }) {
    inputProps?.onkeydown?.(e);
    if (e.defaultPrevented) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      const list = options();
      if (!list.length) return;
      e.preventDefault();
      const i = active ? list.indexOf(active) : -1;
      const next = e.key === 'ArrowDown' ? (i + 1) % list.length : i <= 0 ? list.length - 1 : i - 1;
      highlight(list[next]);
    } else if (e.key === 'Enter' && active?.isConnected) {
      e.preventDefault();
      active.click();
    } else if (e.key === 'Enter' && onsearch && value?.trim()) {
      e.preventDefault();
      onsearch(value);
    }
  }

  function focusInput(e: Event) {
    e.preventDefault();
    const end = inputRef?.value.length ?? 0;
    inputRef?.focus();
    inputRef?.setSelectionRange(end, end);
  }

  // Back to the bar's field. The bar opens on click or typing, never on focus, so this is safe.
  function focusBar(e: Event) {
    e.preventDefault();
    const field = anchor instanceof HTMLInputElement ? anchor : anchor?.querySelector('input');
    field?.focus();
  }

  function clear() {
    value = '';
    inputRef?.focus();
  }
</script>

<!--
  forceMount + {#if shown}: the view mounts and unmounts in the same tick as `shown`, inside the
  transform's update. bits-ui's own presence would unmount a frame later, after the snapshot.
-->
<Dialog.Root
  bind:open={
    () => shown,
    (next) => {
      if (!next) open = false;
    }
  }
>
  <Dialog.Portal>
    <Dialog.Content forceMount onOpenAutoFocus={focusInput} onCloseAutoFocus={focusBar}>
      {#snippet child({ props })}
        {#if shown}
          <div
            {...props}
            bind:this={view}
            data-search-view={uid}
            class={s.base({ class: placed.base })}
            style:--sv-top="{pos.top}px"
            style:--sv-left="{pos.left}px"
            style:--sv-width="{pos.width}px"
            style:--sv-max-height="min(var(--md-comp-search-view-contained-docked-container-height-maximum),
            {pos.room}px)"
          >
            <Dialog.Title class="sr-only">{label}</Dialog.Title>
            <div class={s.bar()}>
              <span class={s.leading()}>
                <ButtonIcon
                  variant="standard"
                  type="button"
                  iconProps={{ name: 'arrow_back' }}
                  aria-label={backLabel}
                  onclick={() => (open = false)}
                />
              </span>
              <input
                {...inputProps}
                bind:this={inputRef}
                bind:value
                type="search"
                role="combobox"
                aria-autocomplete="list"
                aria-expanded="true"
                aria-controls={listboxId}
                aria-activedescendant={active?.id}
                aria-label={inputProps?.['aria-label'] ?? placeholder}
                {placeholder}
                class={s.input({ class: clsx(inputProps?.class) })}
                {onkeydown}
              />
              {#if value || trailing}
                <span class={s.trailing()}>
                  {#if value}
                    <ButtonIcon
                      variant="standard"
                      type="button"
                      iconProps={{ name: 'close' }}
                      aria-label={clearLabel}
                      onclick={clear}
                    />
                  {/if}
                  {@render trailing?.()}
                </span>
              {/if}
            </div>
            <div bind:this={resultsEl} class={s.results({ class: placed.results })}>
              {@render results({ id: listboxId, role: 'listbox', 'aria-label': label })}
            </div>
          </div>
        {/if}
      {/snippet}
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
