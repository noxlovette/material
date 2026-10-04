<script lang="ts">
  import { Tabs } from 'bits-ui';
  import type { Snippet } from 'svelte';

  import type { TabContentProps } from './types.js';

  const { value, class: className, children }: TabContentProps & { children?: Snippet } = $props();
</script>

<Tabs.Content {value} class={className}>
  {@render children?.()}
</Tabs.Content>
