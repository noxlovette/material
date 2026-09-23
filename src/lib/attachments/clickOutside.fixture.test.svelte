<!-- Test fixture for clickOutside.svelte.test.ts — the conditional-attach pattern Rail uses. -->
<script lang="ts">
  import { clickOutside } from './clickOutside.js';

  let { open = $bindable(true) }: { open?: boolean } = $props();
</script>

<div data-testid="panel" {@attach open && clickOutside(() => (open = false))}>panel</div>
<button data-testid="outside">outside</button>
