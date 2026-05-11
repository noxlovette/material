<!--
@component
A menu container for multiple FAB actions.
Should be used with `FABMenuItem` as children.
-->
<script lang="ts">
  import clsx from 'clsx';
  import { fabMenu } from './theme.js';
  import type { FABMenuProps } from './types.js';
  import { enterExit } from '$lib/animation/enterExit.js';
  import { easeEmphasizedDecel, easeEmphasizedAccel } from '$lib/animation/easing.js';

  let { children, class: className, position = 'top', ...restProps }: FABMenuProps = $props();

  const { base } = $derived(fabMenu({ position }));

  const margin = 8;
  const gap = 8;
  let coords = $state({
    x: 0,
    y: 0,
    originX: 'left',
    originY: 'top',
    maxHeight: 0
  });

  // TODO: out:enterExit={{ duration: 200, easing: easeEmphasizedAccel, mode: 'scale' }} – if you can solve how to eliminate another button from appearing here, use this too
</script>

<ul
  {...restProps}
  class={base({
    class: clsx(className, 'fab-menu overflow-y-auto')
  })}
  in:enterExit={{ duration: 300, easing: easeEmphasizedDecel, mode: 'scale' }}
  style:translate={`${coords.x}px ${coords.y}px`}
  style:max-height={coords.maxHeight ? `${coords.maxHeight}px` : undefined}
  style:--enter-exit-origin={`${coords.originY} ${coords.originX}`}
  {@attach (menu) => {
    const rect = menu.getBoundingClientRect();
    const anchorRect = menu.parentElement?.getBoundingClientRect();
    if (!anchorRect) return;

    const spaceAbove = anchorRect.top - gap - margin;
    const spaceBelow = window.innerHeight - margin - (anchorRect.bottom + gap);
    const placeAbove = spaceAbove >= rect.height || spaceAbove >= Math.max(0, spaceBelow);

    let maxHeight = placeAbove ? spaceAbove : spaceBelow;
    maxHeight = Math.max(0, Math.min(rect.height, maxHeight));

    const targetTop = placeAbove ? anchorRect.top - gap - maxHeight : anchorRect.bottom + gap;

    let targetLeft = anchorRect.right - rect.width;

    if (targetLeft + rect.width > window.innerWidth - margin) {
      targetLeft = window.innerWidth - margin - rect.width;
    }
    if (targetLeft < margin) {
      targetLeft = margin;
    }

    let clampedTop = targetTop;
    if (clampedTop < margin) {
      clampedTop = margin;
    }
    if (clampedTop + maxHeight > window.innerHeight - margin) {
      clampedTop = window.innerHeight - margin - maxHeight;
    }

    const x = targetLeft - rect.left;
    const y = clampedTop - rect.top;
    const originY = placeAbove ? 'bottom' : 'top';
    const originX =
      anchorRect.left + anchorRect.width / 2 < targetLeft + rect.width / 2 ? 'left' : 'right';

    coords = { x, y, originX, originY, maxHeight };
  }}
>
  {@render children()}
</ul>

<style>
  .fab-menu {
    transform-origin: var(--enter-exit-origin, bottom right);
  }
</style>
