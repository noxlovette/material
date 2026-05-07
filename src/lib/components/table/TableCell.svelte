<!--
@component
A data cell (`<td>`). Use `numeric` for right-aligned tabular numbers,
or `align` for explicit alignment control.
-->
<script lang="ts">
	import type { TableCellProps } from './types.js';
	import { table } from './theme.js';
	import { getTableContext } from './context.js';
	import clsx from 'clsx';

	let {
		children,
		numeric = false,
		align,
		class: className,
		...restProps
	}: TableCellProps = $props();

	const { rounded } = $derived(getTableContext());
	const { cell } = $derived(table({ numeric, align, rounded }));
</script>

<td class={cell({ class: clsx(className) })} {...restProps}>
	{@render children?.()}
</td>
