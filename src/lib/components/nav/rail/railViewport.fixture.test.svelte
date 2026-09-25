<script lang="ts">
  import { Tooltip } from 'bits-ui';
  import Rail from './Rail.svelte';
  import RailItem from './RailItem.svelte';
</script>

<Tooltip.Provider>
  <Rail>
    <RailItem label="Home" href="/home" iconProps={{ name: 'house' }} />
  </Rail>
</Tooltip.Provider>
