<!--
@component
Primitive root element for building MD3-styled data tables.
Compose with TableHead, TableBody, TableFoot, TableRow, TableCell, and TableHeader.
-->
<script lang="ts">
	import type { TableProps } from './types.js';
	import { table } from './theme.js';
	import clsx from 'clsx';

	let { children, class: className, ...restProps }: TableProps = $props();

	const { root } = table();
</script>

<table class={root({ class: clsx(className) })} {...restProps}>
	{@render children()}
</table>
