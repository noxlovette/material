<script lang="ts">
  import { getContext } from 'svelte';
  import { toolbar, type ToolbarVariants } from './theme.js';

  const toolbarCtx = getContext<
    | { color: string; orientation: 'horizontal' | 'vertical'; variant: ToolbarVariants['variant'] }
    | undefined
  >('toolbar');
  const orientation = $derived(toolbarCtx?.orientation ?? 'horizontal');
  const cls = $derived(toolbar({ orientation, variant: toolbarCtx?.variant }));

  // separator runs perpendicular to the toolbar flow
  const ariaOrientation = $derived(orientation === 'horizontal' ? 'vertical' : 'horizontal');
</script>

<div class={cls.divider()} role="separator" aria-orientation={ariaOrientation}></div>
