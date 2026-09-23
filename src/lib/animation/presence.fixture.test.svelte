<!-- Test fixture for presence.svelte.test.ts — the Presence pattern Snackbar and the sheets use. -->
<script lang="ts">
  import { enterExit, type PresenceTransition } from './enterExit.js';
  import { Presence } from './presence.svelte.js';

  let {
    open = false,
    transition = enterExit.fade
  }: { open?: boolean; transition?: PresenceTransition } = $props();

  const panel = new Presence(() => open);
</script>

{#if panel.mounted}
  <div data-testid="panel" {@attach panel.attach(transition)}>panel</div>
{/if}
