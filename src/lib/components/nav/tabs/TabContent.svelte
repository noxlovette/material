<script lang="ts">
	import type { TabContentProps } from './types.js';
	import { Tabs } from 'bits-ui';
	import type { Snippet } from 'svelte';

	const { value, class: className, children }: TabContentProps & { children?: Snippet } = $props();
</script>

<Tabs.Content {value} class={className}>
	{@render children?.()}
</Tabs.Content>
