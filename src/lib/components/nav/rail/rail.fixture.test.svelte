<script lang="ts">
  import { Tooltip } from 'bits-ui';
  import Rail from './Rail.svelte';
  import RailItem from './RailItem.svelte';

  let {
    collapsed = $bindable(true),
    inboxSelected = false
  }: { collapsed?: boolean; inboxSelected?: boolean } = $props();
</script>

<Tooltip.Provider>
  <Rail bind:collapsed anchor="parent">
    <RailItem label="Home" href="/home" iconProps={{ name: 'house' }} />
    <RailItem
      label="Inbox"
      href="/inbox"
      iconProps={{ name: 'mail' }}
      badge={3}
      selected={inboxSelected}
    />
  </Rail>
</Tooltip.Provider>
<output data-testid="state">{collapsed ? 'collapsed' : 'expanded'}</output>
