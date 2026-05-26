<script lang="ts">
  import { getContext } from 'svelte';
  import { toolbar } from './theme.js';

  const orientation = getContext<'horizontal' | 'vertical'>('toolbar-orientation') ?? 'horizontal';
  const cls = toolbar({ orientation });

  // separator runs perpendicular to the toolbar flow
  const ariaOrientation = orientation === 'horizontal' ? 'vertical' : 'horizontal';
</script>

<div class={cls.divider()} role="separator" aria-orientation={ariaOrientation}></div>
