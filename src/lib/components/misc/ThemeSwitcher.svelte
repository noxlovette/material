<script lang="ts">
  import { Popover } from '../containers/popover/index.js';
  import { FAB } from '../buttons/index.js';
  import ThemeSettings from './ThemeSettings.svelte';

  let open = $state(false);
</script>

<div class="right-spacing-200 bottom-spacing-200 fixed z-50 hidden md:block">
  <Popover bind:open title="Theme Settings" side="top" align="end" sideOffset={16}>
    {#snippet trigger(triggerProps)}
      <FAB iconProps={{ name: 'palette' }} {...triggerProps} />
    {/snippet}

    <div
      class="scrollbar-thumb-md-sys-color-outline-variant hover:scrollbar-thumb-md-sys-color-outline p-spacing-200 flex max-h-[80vh] w-72 scrollbar-thin flex-col overflow-y-auto"
    >
      <ThemeSettings />
    </div>
  </Popover>
</div>
