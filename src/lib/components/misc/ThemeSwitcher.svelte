<script lang="ts">
  import { Popover } from '../containers/popover/index.js';
  import { FAB } from '../buttons/index.js';
  import ThemeSettings from './ThemeSettings.svelte';

  let open = $state(false);
</script>

<div class="fixed right-4 bottom-4 z-50 hidden md:block">
  <Popover bind:open title="Theme Settings" side="top" align="end" sideOffset={16}>
    {#snippet trigger()}
      <FAB iconProps={{ name: 'palette' }} config="primary" />
    {/snippet}

    <div
      class="scrollbar-thumb-md-sys-color-outline-variant hover:scrollbar-thumb-md-sys-color-outline flex max-h-[80vh] w-72 scrollbar-thin flex-col overflow-y-auto p-4"
    >
      <ThemeSettings />
    </div>
  </Popover>
</div>
