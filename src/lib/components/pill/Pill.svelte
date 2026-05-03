<!--
@component
Standard Pill component with Material 3 color variants.
-->
<script lang="ts">
	import { pill } from './theme.js';
	import type { PillProps } from './types.js';
	import clsx from 'clsx';

	const {
		variant = 'primary',
		children,
		class: className,
		...restProps
	}: PillProps = $props();

	const styling = $derived(pill({ variant }));
</script>

<div class={clsx(styling, className)} {...restProps}>
	{@render children?.()}
</div>
