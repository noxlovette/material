<!--
@component
SinglePane provides a centered or full-width container for content.
-->
<script lang="ts">
	import clsx from 'clsx';
	import { singlePane } from './theme.js';
	import type { SinglePaneProps } from './types.js';
	import type { Snippet } from 'svelte';

	const {
		children,
		centered = 'none',
		background = true,
		full = true,
		rounded = true,
		class: className,
		contentClass,
		...rest
	}: SinglePaneProps = $props();

	const { base, content } = $derived(singlePane({ centered, full, background, rounded }));
</script>

<div class={base({ class: clsx(className) })} {...rest}>
	<div class={content({ class: clsx(contentClass) })}>
		{@render children()}
	</div>
</div>
