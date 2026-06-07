<script lang="ts">
  import { setContext } from 'svelte';
  import type { Snippet } from 'svelte';

  let { children, mobile = false }: { children: Snippet; mobile?: boolean } = $props();

  setContext('railMode', {
    get mobile() {
      return mobile;
    }
  });
</script>

{@render children()}
