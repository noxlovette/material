<!--
@component
The item stack of a FAB menu, rendered by `FAB` when `withMenu` is set. It lives inside the
FAB's `DropdownMenu.Root`, which owns open state, positioning, and outside-click/Escape
dismissal. Items are end-aligned, 4dp apart and 8dp above the close button. Use up to six
`FABMenuItem`s.

Motion: the items grow out of the close button one after another, nearest first, on the fast
spatial spring; the stack fades out on close.
-->
<script lang="ts">
  import clsx from 'clsx';
  import { DropdownMenu } from 'bits-ui';
  import { animate, stagger } from 'motion';
  import type { Attachment } from 'svelte/attachments';
  import { fabMenu } from './theme.js';
  import type { FABMenuProps } from './types.js';
  import { enterExit, presence } from '$lib/animation/index.js';
  import { springTokens, springTransition } from '$lib/animation/spring.js';

  let { children, class: className, ...restProps }: FABMenuProps = $props();

  const { base } = fabMenu();

  const STAGGER_S = 0.03;
  const itemsIn: Attachment<HTMLElement> = (node) => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const items = [...node.children] as HTMLElement[];
    for (const item of items) item.style.transformOrigin = 'right center';
    const controls = animate(
      items,
      { y: [8, 0], scale: [0.6, 1] },
      { ...springTransition(springTokens.fastSpatial), delay: stagger(STAGGER_S, { from: 'last' }) }
    );
    return () => controls.stop();
  };
</script>

<DropdownMenu.Portal>
  <DropdownMenu.Content side="top" align="end" sideOffset={3} collisionPadding={8}>
    {#snippet child({ wrapperProps, props, open })}
      <div {...wrapperProps}>
        <div
          data-cy="m3-fab-menu"
          {...restProps}
          {...props}
          class={base({ class: clsx(className) })}
          {@attach presence(() => open, enterExit.fade)}
          {@attach itemsIn}
        >
          {@render children()}
        </div>
      </div>
    {/snippet}
  </DropdownMenu.Content>
</DropdownMenu.Portal>
