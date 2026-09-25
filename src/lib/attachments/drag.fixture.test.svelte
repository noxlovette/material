<!-- Test fixture for drag.svelte.test.ts: a draggable box around a button. -->
<script lang="ts">
  import { drag, type DragOptions } from './drag.js';

  let { options, onclick }: { options: DragOptions; onclick?: () => void } = $props();
</script>

<div data-testid="box" {@attach drag(() => options)}>
  <button data-testid="button" {onclick}>press</button>
</div>
