<!--
@component
InputMerger is a container that groups multiple input components together visually.
-->
<script lang="ts">
	import clsx from 'clsx';

	interface Props {
		/**
		 * The input components to be merged.
		 */
		children: import('svelte').Snippet;
		/**
		 * Additional CSS classes for the container.
		 */
		class?: string;
	}

	let { children, class: className = '' }: Props = $props();
</script>

<div
	class={clsx(
		className,
		'border-primary padding-default gap-narrow grid max-h-max w-full shrink rounded-none border-x-0 px-0 md:rounded-2xl md:border-x-2 md:px-2.5'
	)}
>
	{@render children()}
</div>
