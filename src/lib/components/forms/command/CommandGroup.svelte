<script lang="ts">
	import { Command } from 'bits-ui';
	import clsx from 'clsx';
	import { command } from './theme.js';
	import type { CommandGroupProps } from './types.js';

	let { children, class: className, heading, ...restProps }: CommandGroupProps = $props();

	const { group } = command();
</script>

<Command.Group {...restProps} class={group({ class: clsx(className) })}>
	{#if heading}
		<div data-command-group-heading="">{heading}</div>
	{/if}
	{@render children()}
</Command.Group>
