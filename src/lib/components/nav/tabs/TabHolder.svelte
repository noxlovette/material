<script lang="ts">
	/**
	 * Material 3 Tabs container.
	 *
	 * Wraps bits-ui Tabs.Root + Tabs.List and renders a sliding active indicator.
	 * Use TabContent for content-panel tabs; omit it for navigation (href) tabs.
	 *
	 * @see https://m3.material.io/components/tabs/overview
	 */
	import { tabHolder } from './theme.js';
	import type { TabHolderProps } from './types.js';
	import Tab from './Tab.svelte';
	import { Tabs } from 'bits-ui';
	import type { Snippet } from 'svelte';

	let {
		value = $bindable(),
		onValueChange,
		activationMode = 'automatic',
		variant = 'primary',
		items,
		children
	}: TabHolderProps & { children?: Snippet } = $props();

	const idx = $derived(items.findIndex((i) => i.value === value));
	const count = $derived(items.length);
	const { base, bar } = tabHolder();
</script>

<Tabs.Root bind:value {onValueChange} {activationMode}>
	<Tabs.List class={base()}>
		{#each items as item}
			<Tab {...item} {variant} />
		{/each}

		<div
			class={bar()}
			style="width: calc(100% / {count}); transform: translateX(calc({idx} * 100%));"
		></div>
	</Tabs.List>

	{@render children?.()}
</Tabs.Root>
