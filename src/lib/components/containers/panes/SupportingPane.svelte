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
    supportingTop = 0
  }: SupportingPaneProps = $props();

  let entered = $state(false);
  let supportingVisible = $state(true);
  const supportingId = 'supporting-pane';

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
</script>

<div class={base({ class: clsx(className) })} style={cssVars}>
  <div class={mainCls({ class: clsx('relative', mainClass) })}>
    {#if collapsible}
      <div class="top-3 right-3 z-10 hidden h-12 w-12 md:absolute md:block">
        <ButtonIcon
          triggerClass=""
          type="button"
          variant="text"
          tooltipContent={supportingVisible ? 'Скрыть панель' : 'Показать панель'}
          size="sm"
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
  </div>
  {#if supportingVisible}
    <aside
      id={supportingId}
      class={supportingCls({
        class: clsx(supportingClass)
      })}
      data-entered={entered}
      data-position={position}
    >
      {@render supporting()}
    </aside>
  {/if}
</div>
