<script lang="ts">
	import { Select } from 'bits-ui';
	import { select as selectCls } from './theme.js';
	import type { Snippet } from 'svelte';

	let {
		children,
		class: className
	}: {
		children: Snippet;
		class?: string;
	} = $props();

	const cls = selectCls();
</script>

<Select.Group class={className}>
	{@render children()}
</Select.Group>
