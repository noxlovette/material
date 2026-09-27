<script lang="ts">
  import { Tooltip } from 'bits-ui';
  import DraggablePane from './DraggablePane.svelte';

  let { x = $bindable(), y = $bindable(), collapsed = $bindable(false), ...rest } = $props();
</script>

<Tooltip.Provider>
  <DraggablePane title="Tools" collapsible bind:x bind:y bind:collapsed {...rest}>
    <p>Content</p>
  </DraggablePane>
</Tooltip.Provider>
