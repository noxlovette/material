<!--
@component
The floating panel of a FAB menu. Rendered by `FAB` when `withMenu` is set — must live inside
its `DropdownMenu.Root`, which owns open state, positioning, and outside-click/Escape dismissal.
Should be used with `FABMenuItem` as children.
-->
<script lang="ts">
  import clsx from 'clsx';
  import { DropdownMenu } from 'bits-ui';
  import { fabMenu } from './theme.js';
  import type { FABMenuProps } from './types.js';
  import { enterExit, presence } from '$lib/animation/index.js';

  let { children, class: className, ...restProps }: FABMenuProps = $props();

  const { base } = fabMenu();
</script>

<DropdownMenu.Portal>
  <DropdownMenu.Content side="top" align="end" sideOffset={8} collisionPadding={8}>
    {#snippet child({ wrapperProps, props, open })}
      <div {...wrapperProps}>
        <div
          data-cy="m3-fab-menu"
          {...restProps}
          {...props}
          class={base({
            class: clsx(className, 'overflow-y-auto')
          })}
          {@attach presence(() => open, enterExit.scale)}
        >
          {@render children()}
        </div>
      </div>
    {/snippet}
  </DropdownMenu.Content>
</DropdownMenu.Portal>
