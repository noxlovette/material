<!--
@component
Material 3 Navigation Rail.

Navigation rails give access to primary destinations on medium and larger windows. Collapsed it's
96dp wide; expanded it shows labels beside the icons. On large windows the expanded rail pushes
the content aside (standard); on medium windows it opens over it, above a scrim (modal), and
closes on a scrim click, Escape, or picking a destination. Below `md` it's hidden: mount a
`Navbar` for small windows.

@see https://m3.material.io/components/navigation-rail/specs
-->
<script lang="ts">
  import clsx from 'clsx';
  import { setContext, untrack } from 'svelte';
  import { animate, type AnimationPlaybackControls } from 'motion';
  import type { RailProps } from './types';
  import ButtonIcon from '$lib/components/buttons/ButtonIcon.svelte';
  import { springTokens, springTransition } from '$lib/animation/spring.js';
  import { rail } from './theme';
  import { NavigationMenu } from 'bits-ui';
  import { railStore } from './railStore.svelte.js';

  let {
    children,
    rounded = false,
    expandable = true,
    fab,
    collapsed = $bindable(true),
    anchor = 'viewport',
    railTop = 0,
    expandLabel = 'Expand navigation',
    collapseLabel = 'Collapse navigation',
    class: className,
    showHelp: _showHelp,
    withNavbar: _withNavbar,
    ...restProps
  }: RailProps = $props();

  const expanded = $derived(!collapsed);
  const railCtx = {
    get collapsed() {
      return collapsed;
    },
    get progress() {
      return progress;
    }
  };
  setContext('rail', railCtx);

  $effect(() => {
    railStore.collapsed = collapsed;
  });

  const styles = $derived(rail({ expanded, anchor, rounded, header: expandable || !!fab }));
  const toggleClass = $derived(collapsed ? 'cursor-e-resize' : 'cursor-w-resize');

  let railEl = $state<HTMLElement>();
  let ghostEl = $state<HTMLElement>();
  let scrimEl = $state<HTMLElement>();

  /* The scrim is only displayed while the expanded rail is modal (medium windows). */
  const isModal = () => !!scrimEl && getComputedStyle(scrimEl).display !== 'none';

  /*
    Making room for the rail. A viewport-anchored rail publishes its drawn width on <html>
    (--md-rail-width, every frame while it springs) plus --md-rail-rest, its collapsed width;
    styles/components.css turns them into --md-rail-inset per window size, which App's shell and
    AppBar use. A parent-anchored rail instead renders a ghost in the layout that holds its place
    the same way: the rail's width from lg, the collapsed width on medium windows, where the
    expanded rail overlays the content.
  */
  $effect(() => {
    const el = railEl;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const target = anchor === 'viewport' ? document.documentElement : ghostEl;
    if (!target) return;
    if (anchor === 'viewport') {
      target.style.setProperty(
        '--md-rail-rest',
        'var(--md-comp-nav-rail-collapsed-container-width)'
      );
    }
    const property = anchor === 'viewport' ? '--md-rail-width' : '--rail-width';
    const observer = new ResizeObserver(() => {
      target.style.setProperty(property, `${el.offsetWidth}px`);
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      target.style.removeProperty(property);
      if (anchor === 'viewport') target.style.removeProperty('--md-rail-rest');
    };
  });

  /*
    Expanding is one spring on `progress`, 0 collapsed to 1 expanded, on spatial: a container
    reshaping, not a navigation transition, so no fastSpatial bounce. It's the choreography of
    Compose's WideNavigationRail: `--rail-p` carries the progress to the destinations (their
    height, indicator and icon interpolate on it; the label fades out, swaps sides at the halfway
    point, and fades back in) and to the gap between them, and the width follows it here.

    The classes hold each end state, so SSR and reduced motion need no JS. For the width, measure
    where the rail is drawn before the change and where the new classes put it, and map the
    progress onto that span; an interrupted spring picks up from where it's drawn.
  */
  const SPRING = springTransition(springTokens.spatial);
  let progress = $state(untrack(() => (collapsed ? 0 : 1)));
  let widthFrom: number | null = null;
  let progressFrom = 0;
  let spring: AnimationPlaybackControls | undefined;

  const clearWidth = (el: HTMLElement) =>
    Object.assign(el.style, { width: '', minWidth: '', maxWidth: '' });

  $effect.pre(() => {
    void expanded;
    if (!railEl) return;
    widthFrom = railEl.getBoundingClientRect().width;
    progressFrom = untrack(() => progress);
  });

  $effect(() => {
    const target = expanded ? 1 : 0;
    const el = railEl;
    const from = widthFrom;
    widthFrom = null;
    if (!el || from === null) return;

    spring?.stop();
    clearWidth(el);
    const to = el.getBoundingClientRect().width;
    if (progressFrom === target || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      progress = target;
      return;
    }

    // Lift the expanded min/max for the ride, or the width would snap to 220dp at the start.
    Object.assign(el.style, { width: `${from}px`, minWidth: '0', maxWidth: 'none' });
    const start = progressFrom;
    const controls = animate(start, target, {
      ...SPRING,
      onUpdate: (p) => {
        progress = p;
        el.style.width = `${from + ((to - from) * (p - start)) / (target - start)}px`;
      },
      onComplete: () => {
        progress = target;
        clearWidth(el);
      }
    });
    spring = controls;
  });

  function onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && expanded && isModal()) {
      collapsed = true;
    }
  }

  // Picking a destination closes the modal rail; the standard one stays as it is.
  function onNavClick(event: MouseEvent) {
    if (expanded && isModal() && (event.target as Element).closest('a[href]')) {
      collapsed = true;
    }
  }
</script>

<svelte:window onkeydown={onKeydown} />

{#if anchor === 'parent'}
  <div
    bind:this={ghostEl}
    class={styles.ghost()}
    style="--rail-width: var(--md-comp-nav-rail-collapsed-container-width)"
  ></div>
{/if}

<div
  bind:this={scrimEl}
  class={styles.scrim()}
  onclick={() => (collapsed = true)}
  role="presentation"
></div>

<div
  bind:this={railEl}
  {...restProps}
  class={styles.base({ class: clsx(className) })}
  style:--rail-top="{railTop}px"
  style:--rail-p={progress}
  data-expanded={expanded}
>
  {#if expandable || fab}
    <div class={styles.header()}>
      {#if expandable}
        <div class={styles.menu()}>
          <ButtonIcon
            variant="standard"
            type="button"
            tooltipContent={collapsed ? expandLabel : collapseLabel}
            iconProps={{ name: collapsed ? 'menu' : 'menu_open' }}
            aria-expanded={expanded}
            class={toggleClass}
            onclick={() => (collapsed = !collapsed)}
          />
        </div>
      {/if}

      {@render fab?.()}
    </div>
  {/if}

  <!-- The click is delegated from the links inside; Enter on a link fires it too. -->
  <NavigationMenu.Root orientation="vertical" class={styles.nav()} onclick={onNavClick}>
    <NavigationMenu.List class={styles.items()}>
      {@render children?.()}
    </NavigationMenu.List>
  </NavigationMenu.Root>
</div>
