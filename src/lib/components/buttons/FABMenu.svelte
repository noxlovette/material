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
  import { enterExit } from '$lib/animation/enterExit.js';
  import { easeEmphasizedAccel, easeEmphasizedDecel } from '$lib/animation/easing.js';

  let { children, class: className, ...restProps }: FABMenuProps = $props();

  const { base } = fabMenu();
</script>

<DropdownMenu.Portal>
  <DropdownMenu.Content forceMount side="top" align="end" sideOffset={8} collisionPadding={8}>
    {#snippet child({ wrapperProps, props, open })}
      {#if open}
        <div {...wrapperProps}>
          <div
            data-cy="m3-fab-menu"
            {...restProps}
            {...props}
            class={base({
              class: clsx(className, 'origin-(--bits-floating-transform-origin) overflow-y-auto')
            })}
            in:enterExit={{ duration: 300, easing: easeEmphasizedDecel, mode: 'scale' }}
            out:enterExit={{ duration: 200, easing: easeEmphasizedAccel, mode: 'scale' }}
          >
            {@render children()}
          </div>
        </div>
      {/if}
    {/snippet}
  </DropdownMenu.Content>
</DropdownMenu.Portal>
