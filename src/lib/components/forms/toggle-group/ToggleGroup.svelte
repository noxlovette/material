<!--
@component
Toggle group renders as M3 segmented buttons — a continuous pill of
connected toggle items for filtering or mode selection.

@see https://m3.material.io/components/segmented-buttons/overview
-->
<script lang="ts">
	import { ToggleGroup } from 'bits-ui';
	import clsx from 'clsx';
	import { toggleGroup } from './theme.js';
	import type { ToggleGroupProps } from './types.js';

	let {
		type,
		value = $bindable(undefined),
		onValueChange,
		disabled = false,
		loop = true,
		orientation = 'horizontal',
		children,
		class: className
	}: ToggleGroupProps = $props();

	const cls = $derived(toggleGroup({ orientation }));
</script>

<ToggleGroup.Root
	{type}
	bind:value
	{onValueChange}
	{disabled}
	{loop}
	{orientation}
	class={cls.root({ class: clsx(className) })}
>
	{@render children?.()}
</ToggleGroup.Root>
