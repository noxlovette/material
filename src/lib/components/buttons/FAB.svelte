<!--
@component
Floating action buttons (FABs) help people take primary actions.

- Sizes: regular (56dp, default), medium (80dp), large (96dp); small (40dp) is baseline only
- `expanded` + `label`: the extended FAB, whose label slides open beside the icon. Responsive:
  a FAB on compact windows and an extended FAB from medium up by default, and inside a `Rail`
  it follows the rail's collapsed state
- `withMenu`: opens a FAB menu of `FABMenuItem`s; the FAB becomes its 56dp close button
- `surface`: opens into a surface with a container transform (FAB → sheet); the FAB's
  container grows into it and changes colour on the way

@see https://m3.material.io/components/floating-action-button/specs
@see https://m3.material.io/components/extended-fab/specs
@see https://m3.material.io/components/fab-menu/specs
-->
<script lang="ts">
  import clsx from 'clsx';
  import { getContext, setContext, tick, untrack } from 'svelte';
  import type { Attachment } from 'svelte/attachments';
  import { animate, type AnimationPlaybackControls } from 'motion';
  import { springTokens, springTransition } from '$lib/animation/spring.js';
  import { clickOutside } from '$lib/attachments/index.js';
  import { fab, fabExpandedClasses, fabMenuSet, fabSurface } from './theme.js';
  import type { Breakpoint } from '../containers/pane/theme.js';
  import type { FABProps } from './types.js';
  import FABMenu from './FABMenu.svelte';
  import { Layer, Icon, LoadingIndicator } from '$lib/utils/index.js';
  import { Button, DropdownMenu, type ButtonRootProps } from 'bits-ui';

  let {
    children,
    disabled,
    formaction,
    size = 'regular',
    color = 'primary-container',
    iconProps,
    label,
    loading,
    expanded,
    class: className,
    withMenu,
    surface,
    surfaceOpen = $bindable(false),
    onclick,
    ...restProps
  }: FABProps = $props();

  let menuOpen = $state(false);
  const menuSet = $derived(fabMenuSet(color));
  setContext('fabMenuSet', () => menuSet);

  // M3: in a collapsed rail use a FAB, in an expanded one an extended FAB; elsewhere a FAB when
  // space is limited (compact windows) and an extended FAB from medium windows up.
  const rail = getContext<{ collapsed: boolean } | undefined>('rail');
  const resolvedExpanded = $derived(
    expanded ?? (rail ? !rail.collapsed : { small: false, medium: true })
  );
  const hasLabel = $derived(!!label && size !== 'small');
  // Always a FAB: the menu keeps its footprint only then (an extended FAB's width is its label's).
  const neverExpanded = $derived(
    !hasLabel ||
      (typeof resolvedExpanded === 'object'
        ? Object.values(resolvedExpanded).every((v) => !v)
        : !resolvedExpanded)
  );

  const open = $derived(!!withMenu && menuOpen);
  const cls = $derived(fab({ size, color, menuOpen: open, menuSet }));
  const expandedCls = $derived.by(() => {
    const tiers: [Breakpoint, boolean][] =
      typeof resolvedExpanded === 'object'
        ? (Object.entries(resolvedExpanded) as [Breakpoint, boolean][])
        : [['small', resolvedExpanded]];
    const entries = tiers.map(([bp, v]) => fabExpandedClasses[bp][v ? 'true' : 'false']);
    return {
      track: entries.map((e) => e.track).join(' '),
      base: size === 'large' && !open ? entries.map((e) => e.large).join(' ') : ''
    };
  });

  // The close button shares the FAB's top trailing corner, so the FAB keeps its footprint while
  // it shrinks into it.
  const footprint: Record<NonNullable<FABProps['size']>, string> = {
    small: 'size-10',
    regular: 'size-14',
    medium: 'size-20',
    large: 'size-24'
  };

  const reducedMotion = () =>
    typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const spatial = springTransition(springTokens.spatial);
  const colorAndShape = { ...spatial, backgroundColor: springTransition(springTokens.effects) };

  let fabEl = $state<HTMLElement | null>(null);

  /*
   * FAB menu: the FAB springs into the 56dp round close button (M3: always 56dp, whatever the
   * FAB's size) and back. Measured before and after the DOM update, then sprung between the two
   * in px, so the corners stay a real radius instead of racing a 9999px `rounded-full`.
   */
  const CLOSE_BUTTON = { w: 56, h: 56, r: 28 };
  type Box = { w: number; h: number; r: number };
  const measure = (el: HTMLElement): Box => ({
    w: el.offsetWidth,
    h: el.offsetHeight,
    r: parseFloat(getComputedStyle(el).borderTopLeftRadius)
  });
  const clearBox = (el: HTMLElement) => {
    el.style.width = '';
    el.style.height = '';
    el.style.borderRadius = '';
  };
  let menuMorph: AnimationPlaybackControls | undefined;
  let beforeMenu: Box | null = null;
  $effect.pre(() => {
    void open;
    untrack(() => (beforeMenu = fabEl ? measure(fabEl) : null));
  });
  $effect(() => {
    const isOpen = open;
    untrack(() => {
      const el = fabEl;
      const from = beforeMenu;
      beforeMenu = null;
      if (!el || !from || !withMenu) return;
      menuMorph?.stop();
      clearBox(el);
      const to = isOpen ? CLOSE_BUTTON : measure(el);
      const keyframes = {
        width: [`${from.w}px`, `${to.w}px`],
        height: [`${from.h}px`, `${to.h}px`],
        borderRadius: [`${from.r}px`, `${to.r}px`]
      };
      if (reducedMotion()) {
        if (isOpen)
          Object.assign(el.style, { width: '56px', height: '56px', borderRadius: '28px' });
        return;
      }
      const controls = animate(el, keyframes, spatial);
      menuMorph = controls;
      // Closed: hand size and shape back to the classes once the spring settles.
      if (!isOpen) controls.then(() => !open && clearBox(el));
    });
  });

  /*
   * FAB ↔ extended FAB. The responsive classes decide which one shows; when that flips (the
   * prop, the rail, or the window crossing a tier), the FAB's width and padding spring from what
   * was on screen to the new layout, with the label kept laid out and clipped by the moving edge.
   */
  const tierOrder: Breakpoint[] = ['small', 'medium', 'large', 'extraLarge'];
  let tier = $state<Breakpoint>('small');
  $effect(() => {
    const root = getComputedStyle(document.documentElement);
    const min = (name: string, fallback: string) =>
      `(min-width: ${root.getPropertyValue(`--breakpoint-${name}`).trim() || fallback})`;
    const queries: [Breakpoint, MediaQueryList][] = [
      ['medium', matchMedia(min('md', '48rem'))],
      ['large', matchMedia(min('lg', '64rem'))],
      ['extraLarge', matchMedia(min('xl', '80rem'))]
    ];
    const update = () =>
      (tier = queries.reduce<Breakpoint>((t, [bp, q]) => (q.matches ? bp : t), 'small'));
    update();
    queries.forEach(([, q]) => q.addEventListener('change', update));
    return () => queries.forEach(([, q]) => q.removeEventListener('change', update));
  });
  // Missing tiers inherit upward, as in the classes.
  const expandedNow = $derived.by(() => {
    if (!hasLabel) return false;
    if (typeof resolvedExpanded !== 'object') return resolvedExpanded;
    let value = false;
    for (const bp of tierOrder.slice(0, tierOrder.indexOf(tier) + 1))
      value = resolvedExpanded[bp] ?? value;
    return value;
  });

  let trackEl = $state<HTMLElement | null>(null);
  // What was last on screen, kept by a ResizeObserver so a flip can start from it.
  let shown = { width: 0, padding: 0 };
  $effect(() => {
    const el = fabEl;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      shown = { width: el.offsetWidth, padding: parseFloat(getComputedStyle(el).paddingLeft) };
    });
    observer.observe(el);
    return () => observer.disconnect();
  });
  let labelMorph: AnimationPlaybackControls | undefined;
  let labelMorphStarted = false;
  $effect(() => {
    void expandedNow;
    untrack(() => {
      const el = fabEl;
      const track = trackEl;
      if (!labelMorphStarted) {
        labelMorphStarted = true;
        return;
      }
      if (!el || !track || open || !shown.width) return;
      labelMorph?.stop();
      // The new layout, with nothing inline.
      el.style.width = el.style.paddingInline = el.style.overflow = '';
      track.style.gridTemplateColumns = '';
      const to = { width: el.offsetWidth, padding: parseFloat(getComputedStyle(el).paddingLeft) };
      if (reducedMotion() || (to.width === shown.width && to.padding === shown.padding)) return;
      Object.assign(el.style, { overflow: 'hidden', width: `${shown.width}px` });
      track.style.gridTemplateColumns = '1fr';
      const controls = animate(
        el,
        {
          width: [`${shown.width}px`, `${to.width}px`],
          paddingInline: [`${shown.padding}px`, `${to.padding}px`]
        },
        spatial
      );
      labelMorph = controls;
      controls.then(() => {
        if (labelMorph !== controls) return;
        el.style.width = el.style.paddingInline = el.style.overflow = '';
        track.style.gridTemplateColumns = '';
      });
    });
  });

  /*
   * FAB → surface, M3's container transform with a persistent container: the FAB's container
   * grows from its corner into the surface (a clip-path), turning from the FAB's colour into the
   * surface's, and the content fades in once it has room. Closing plays it backwards and hands
   * focus back to the FAB, which stays in the layout, invisible, while the surface is open.
   */
  const surfaceCls = fabSurface();
  const SURFACE_RADIUS = 24;
  let surfaceEl: HTMLElement | null = null;
  let closing = false;
  const fabClip = (surfaceBox: DOMRect) => {
    const f = fabEl!.getBoundingClientRect();
    const r = parseFloat(getComputedStyle(fabEl!).borderTopLeftRadius);
    return `inset(${f.top - surfaceBox.top}px ${surfaceBox.right - f.right}px ${surfaceBox.bottom - f.bottom}px ${f.left - surfaceBox.left}px round ${r}px)`;
  };
  const focusFirst = (node: HTMLElement) => {
    const target = node.querySelector<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    (target ?? node).focus();
  };
  // The content grows out of the FAB with the container: scaled from the FAB's centre.
  const CONTENT_START_SCALE = 0.85;
  const fromFabCentre = (content: HTMLElement) => {
    const f = fabEl!.getBoundingClientRect();
    const c = content.getBoundingClientRect();
    content.style.transformOrigin = `${f.left + f.width / 2 - c.left}px ${f.top + f.height / 2 - c.top}px`;
  };
  const growFromFab: Attachment<HTMLElement> = (node) => {
    surfaceEl = node;
    const content = node.querySelector<HTMLElement>('[data-fab-surface-content]');
    if (fabEl && !reducedMotion()) {
      animate(
        node,
        {
          clipPath: [
            fabClip(node.getBoundingClientRect()),
            `inset(0px 0px 0px 0px round ${SURFACE_RADIUS}px)`
          ],
          backgroundColor: [
            getComputedStyle(fabEl).backgroundColor,
            getComputedStyle(node).backgroundColor
          ]
        },
        colorAndShape
      );
      if (content) {
        fromFabCentre(content);
        animate(
          content,
          { scale: [CONTENT_START_SCALE, 1], opacity: [0, 1] },
          { ...spatial, opacity: { ...springTransition(springTokens.effects), delay: 0.06 } }
        );
      }
    }
    focusFirst(node);
    return () => (surfaceEl = null);
  };
  const closeSurface = async () => {
    if (!surfaceOpen || closing) return;
    closing = true;
    const node = surfaceEl;
    if (node && fabEl && !reducedMotion()) {
      const content = node.querySelector<HTMLElement>('[data-fab-surface-content]');
      if (content) fromFabCentre(content);
      await Promise.all([
        content &&
          animate(
            content,
            { scale: CONTENT_START_SCALE, opacity: 0 },
            { ...spatial, opacity: springTransition(springTokens.fastEffects) }
          ),
        animate(
          node,
          {
            clipPath: fabClip(node.getBoundingClientRect()),
            backgroundColor: getComputedStyle(fabEl).backgroundColor
          },
          colorAndShape
        )
      ]);
    }
    surfaceOpen = false;
    closing = false;
    await tick();
    fabEl?.focus();
  };

  function handleClick(e: MouseEvent, triggerClick?: unknown) {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    (onclick as ((e: MouseEvent) => void) | null | undefined)?.(e);
    if (typeof triggerClick === 'function') triggerClick(e);
    if (surface && !e.defaultPrevented) surfaceOpen = true;
  }
</script>

{#snippet fabButton(triggerProps: Record<string, unknown>)}
  <Button.Root
    {disabled}
    {formaction}
    aria-label={label}
    aria-busy={loading || undefined}
    data-cy="m3-fab"
    aria-haspopup={surface ? 'dialog' : undefined}
    aria-expanded={surface ? surfaceOpen : undefined}
    bind:ref={fabEl}
    {...restProps as ButtonRootProps}
    {...triggerProps}
    class={cls.base({
      class: clsx(
        expandedCls.base,
        surfaceOpen && 'invisible',
        // In its footprint, pinned to the top trailing corner the close button shares.
        withMenu &&
          neverExpanded && ['col-start-1 row-start-1 self-start justify-self-end', footprint[size]],
        className
      )
    })}
    onclick={(e: MouseEvent) => handleClick(e, triggerProps.onclick)}
  >
    {#if loading}
      <LoadingIndicator center={false} class={cls.icon({ class: 'text-current' })} />
    {:else}
      <Icon
        {...open ? { name: 'close' } : iconProps}
        class={cls.icon({ class: clsx(!open && iconProps.class) })}
      />
    {/if}
    {#if hasLabel}
      <span
        bind:this={trackEl}
        class={cls.labelTrack({ class: expandedCls.track })}
        aria-hidden="true"
      >
        <span class={cls.labelClip()}>
          <span class={cls.label()}>{label}</span>
        </span>
      </span>
    {/if}
    <Layer />
  </Button.Root>
{/snippet}

{#if withMenu}
  <DropdownMenu.Root bind:open={menuOpen}>
    <DropdownMenu.Trigger disabled={disabled || loading}>
      {#snippet child({ props })}
        {#if !neverExpanded}
          {@render fabButton(props)}
        {:else}
          <span class="inline-grid">
            <span class="invisible col-start-1 row-start-1 {footprint[size]}"></span>
            {@render fabButton(props)}
          </span>
        {/if}
      {/snippet}
    </DropdownMenu.Trigger>
    <FABMenu>
      {@render children?.()}
    </FABMenu>
  </DropdownMenu.Root>
{:else if surface}
  <span class={surfaceCls.anchor()}>
    {@render fabButton({})}
    {#if surfaceOpen}
      <div class={surfaceCls.wrapper()}>
        <div
          role="dialog"
          aria-label={label ?? restProps['aria-label']}
          tabindex="-1"
          class={surfaceCls.surface()}
          onkeydown={(e) => {
            if (e.key === 'Escape') {
              e.stopPropagation();
              closeSurface();
            }
          }}
          {@attach growFromFab}
          {@attach clickOutside(closeSurface)}
        >
          <div data-fab-surface-content>
            {@render surface({ close: closeSurface })}
          </div>
        </div>
      </div>
    {/if}
  </span>
{:else}
  {@render fabButton({})}
{/if}
