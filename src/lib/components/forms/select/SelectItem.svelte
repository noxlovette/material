<script lang="ts">
	import { Select } from 'bits-ui';
	import { select as selectCls } from './theme.js';
	import { Icon } from '$lib/utils/index.js';
	import type { Snippet } from 'svelte';

	let {
		value,
		label,
		disabled = false,
		class: className,
		children
	}: {
		value: string;
		label?: string;
		disabled?: boolean;
		class?: string;
		children?: Snippet<[{ selected: boolean; highlighted: boolean }]>;
	} = $props();

	const cls = selectCls();
</script>

<Select.Item {value} label={label ?? value} {disabled} class={cls.item({ class: className })}>
	{#snippet children({ selected, highlighted })}
		{#if children}
			{@render children({ selected, highlighted })}
		{:else}
			<span class="flex-1 truncate">{label ?? value}</span>
			{#if selected}
				<Icon name="check" class="size-5 shrink-0" />
			{/if}
		{/if}
	{/snippet}
</Select.Item>
