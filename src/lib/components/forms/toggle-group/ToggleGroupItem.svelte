<!--
@component
A single segment within a ToggleGroup.
Shows a leading check icon when selected, per M3 segmented button spec.
-->
<script lang="ts">
	import { ToggleGroup } from 'bits-ui';
	import clsx from 'clsx';
	import { Icon, Layer } from '$lib/utils/index.js';
	import { toggleGroupItem } from './theme.js';
	import type { ToggleGroupItemProps } from './types.js';

	let {
		value,
		label,
		iconProps,
		disabled = false,
		class: className
	}: ToggleGroupItemProps = $props();

	const { base, checkIcon, icon } = toggleGroupItem();
</script>

<ToggleGroup.Item {value} {disabled} class={base({ class: clsx(className) })}>
	{#snippet children({ pressed })}
		{#if pressed}
			<Icon name="check" class={checkIcon()} />
		{:else if iconProps}
			<Icon {...iconProps} class={icon()} />
		{/if}
		{#if label}
			<span>{label}</span>
		{/if}
		<Layer />
	{/snippet}
</ToggleGroup.Item>
