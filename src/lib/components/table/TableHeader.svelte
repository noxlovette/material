<!--
@component
A header cell (`<th>`). Supports sort indicators via `sortable`, `sorted`,
and `sortDirection` props. Defaults to `scope="col"`.
-->
<script lang="ts">
	import type { TableHeaderProps } from './types.js';
	import { table } from './theme.js';
	import { getTableContext } from './context.js';
	import { Icon } from '$lib/utils/index.js';
	import clsx from 'clsx';

	let {
		children,
		numeric = false,
		align,
		sortable = false,
		sorted = false,
		sortDirection = 'asc',
		scope = 'col',
		class: className,
		...restProps
	}: TableHeaderProps = $props();

	const { rounded } = $derived(getTableContext());
	const { header } = $derived(table({ numeric, align, sortable, sorted, rounded }));
</script>

<th {scope} class={header({ class: clsx(className) })} {...restProps}>
	<span class="inline-flex items-center gap-1">
		{@render children?.()}
		{#if sortable}
			<span
				class={[
					'transition-[opacity,transform] duration-200',
					sorted ? 'opacity-100' : 'opacity-0 group-hover:opacity-40',
					sortDirection === 'desc' ? 'rotate-180' : 'rotate-0'
				].join(' ')}
				aria-hidden="true"
			>
				<Icon name="arrow_upward" class="size-[18px] text-[18px]" />
			</span>
		{/if}
	</span>
</th>
