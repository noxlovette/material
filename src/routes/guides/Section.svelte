<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Title } from '$lib/index.js';

  let { id, title, children }: { id: string; title: string; children: Snippet } = $props();
</script>

<section {id} class="scroll-mt-spacing-300 gap-spacing-200 flex flex-col">
  <Title size="large">{title}</Title>
  {@render children()}
</section>
