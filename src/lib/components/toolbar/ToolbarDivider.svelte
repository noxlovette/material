<script lang="ts">
  import { getContext } from 'svelte';
  import { toolbar } from './theme.js';

  const toolbarCtx = getContext<
    { color: string; orientation: 'horizontal' | 'vertical' } | undefined
  >('toolbar');
  const orientation = $derived(toolbarCtx?.orientation ?? 'horizontal');
  const cls = $derived(toolbar({ orientation }));

  // separator runs perpendicular to the toolbar flow
  const ariaOrientation = $derived(orientation === 'horizontal' ? 'vertical' : 'horizontal');
</script>

<div class={cls.divider()} role="separator" aria-orientation={ariaOrientation}></div>
