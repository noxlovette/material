<!--
@component
SupportingPane provides a layout with a main content area and a supporting side pane.

@see https://m3.material.io/foundations/layout/canonical-layouts/supporting-pane
-->
<script lang="ts">
  import clsx from 'clsx';
  import type { SupportingPaneProps } from './types.js';
  import { supportingPane } from './theme.js';
  import ButtonIcon from '$lib/components/buttons/ButtonIcon.svelte';
  import {
    easeEmphasized,
    easeEmphasizedAccel,
    easeEmphasizedDecel
  } from '$lib/animation/easing.js';
  import { fade } from 'svelte/transition';
  import type { TransitionConfig } from 'svelte/transition';

  function slideWidth(node: HTMLElement): TransitionConfig {
    const width = node.offsetWidth;
    return {
      duration: 500,
      easing: easeEmphasized,
      css: (t) => `width: ${t * width}px; min-width: 0; overflow: hidden;`
    };
  }

  function sheetIn(_node: HTMLElement): TransitionConfig {
    return {
      duration: 500,
      easing: easeEmphasizedDecel,
      css: (t) => `transform: translateY(${(1 - t) * 100}%);`
    };
  }

  function sheetOut(_node: HTMLElement): TransitionConfig {
    return {
      duration: 280,
      easing: easeEmphasizedAccel,
      css: (t) => `transform: translateY(${(1 - t) * 100}%);`
    };
  }

  const {
    main,
    supporting,
    anchor = 'viewport',
    position = 'right',
    centered = false,
    rounded = true,
    gap = 'md',
    class: className,
    mainClass,
    full = true,
    supportingClass,
    collapsible,
    supportingWidth = 320,
    supportingTop = 0,
    mobileSheet = false,
    mobileSheetIcon = 'info',
    mobileTriggerClass
  }: SupportingPaneProps = $props();

  let entered = $state(false);
  let supportingVisible = $state(true);
  let mobileSheetOpen = $state(false);
  let isLargeScreen = $state(false);
  const supportingId = 'supporting-pane';

  $effect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    isLargeScreen = mq.matches;
    const handler = (e: MediaQueryListEvent) => {
      isLargeScreen = e.matches;
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  });

  const {
    base,
    main: mainCls,
    supporting: supportingCls
  } = $derived(supportingPane({ anchor, position, centered, full, rounded, gap }));

  const cssVars = $derived(
    anchor === 'viewport'
      ? `--supporting-pane-width: ${supportingWidth}px; --supporting-pane-top: ${supportingTop}px;`
      : ''
  );

  const mainViewportStyle = $derived(
    anchor === 'viewport' && isLargeScreen
      ? `transition: margin-${position === 'right' ? 'right' : 'left'} ${supportingVisible ? '500ms' : '280ms'} cubic-bezier(0.2, 0, 0, 1); margin-${position === 'right' ? 'right' : 'left'}: ${supportingVisible ? supportingWidth : 0}px;`
      : ''
  );

  const inlineSupportingClass = $derived(mobileSheet ? 'hidden lg:block' : '');
</script>

<div class={base({ class: clsx(className) })} style={cssVars}>
  <div class={mainCls({ class: clsx('relative', mainClass) })} style={mainViewportStyle}>
    {#if collapsible}
      <div class="top-3 right-3 z-10 hidden h-12 w-12 lg:absolute lg:block">
        <ButtonIcon
          type="button"
          variant="elevated"
          tooltipContent={supportingVisible ? 'Скрыть панель' : 'Показать панель'}
          size="xs"
          iconProps={{
            name: supportingVisible ? 'right_panel_close' : 'right_panel_open'
          }}
          aria-controls={supportingId}
          aria-expanded={supportingVisible}
          aria-label={supportingVisible ? 'Hide supporting pane' : 'Show supporting pane'}
          onclick={() => {
            supportingVisible = !supportingVisible;
          }}
        />
      </div>
    {/if}
    {@render main()}
    {#if mobileSheet}
      <ButtonIcon
        class={clsx('fixed right-4 bottom-6 z-30 lg:hidden', mobileTriggerClass)}
        type="button"
        variant="tonal"
        iconProps={{ name: mobileSheetIcon }}
        aria-label="Open supporting panel"
        onclick={() => (mobileSheetOpen = true)}
      />
    {/if}
  </div>

  {#if supportingVisible}
    <aside
      transition:slideWidth
      id={supportingId}
      class={supportingCls({
        class: clsx(supportingClass, inlineSupportingClass)
      })}
      data-entered={entered}
      data-position={position}
    >
      {@render supporting()}
    </aside>
  {/if}
</div>

{#if mobileSheet && mobileSheetOpen}
  <!-- Scrim -->
  <div
    class="bg-md-sys-color-scrim/40 fixed inset-0 z-40 lg:hidden"
    transition:fade={{ duration: 220 }}
    onclick={() => (mobileSheetOpen = false)}
    aria-hidden="true"
  ></div>

  <!-- Sheet -->
  <div
    class="bg-md-sys-color-surface-container-low fixed inset-x-0 bottom-0 z-50 max-h-[85dvh] scrollbar-none overflow-y-auto rounded-t-[28px] pb-[env(safe-area-inset-bottom)] lg:hidden"
    in:sheetIn
    out:sheetOut
    role="dialog"
    aria-modal="true"
  >
    <button
      class="flex w-full cursor-pointer items-center justify-center pt-4 pb-2"
      aria-label="Close supporting panel"
      onclick={() => (mobileSheetOpen = false)}
    >
      <div class="bg-md-sys-color-on-surface-variant/40 h-1 w-8 rounded-full"></div>
    </button>
    {@render supporting()}
  </div>
{/if}
