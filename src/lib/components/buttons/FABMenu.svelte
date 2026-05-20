<!--
@component
A menu container for multiple FAB actions.
Should be used with `FABMenuItem` as children.
-->
<script lang="ts">
  import clsx from 'clsx';
  import { flip } from '@floating-ui/dom';
  import { fabMenu } from './theme.js';
  import type { FABMenuProps } from './types.js';
  import { enterExit } from '$lib/animation/enterExit.js';
  import { easeEmphasizedAccel, easeEmphasizedDecel } from '$lib/animation/easing.js';
  import { floating, portal } from '$lib/actions/index.js';

  let { children, class: className, anchorEl, ...restProps }: FABMenuProps = $props();

  const { base } = fabMenu();
</script>

<ul
  data-cy="m3-fab-menu"
  {...restProps}
  class={base({ class: clsx(className, 'fab-menu overflow-y-auto') })}
  in:enterExit={{ duration: 300, easing: easeEmphasizedDecel, mode: 'scale' }}
  out:enterExit={{ duration: 200, easing: easeEmphasizedAccel, mode: 'scale' }}
  use:portal
  use:floating={{
    reference: anchorEl,
    strategy: 'fixed',
    placement: 'top-end',
    offsetPx: 8,
    middleware: [flip()]
  }}
>
  {@render children()}
</ul>

<style>
  .fab-menu {
    transform-origin: bottom right;
  }
</style>
