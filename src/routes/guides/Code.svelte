<!-- Inline code in guide prose. -->
<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

<code
  class="bg-md-sys-color-surface-container-high text-md-sys-color-on-surface px-spacing-75 py-spacing-25 rounded-xs font-mono text-[0.875em]"
  >{@render children()}</code
>
