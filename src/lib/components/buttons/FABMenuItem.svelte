<script lang="ts">
	/**
	 * An individual action within a FAB menu.
	 */
	import clsx from 'clsx';
	import { fabMenuItem, type FABMenuItemProps } from '$lib/components/index.js';
	import { Icon, LoadingIndicator, Layer } from '$lib/utils/index.js';
	import { Button, type ButtonRootProps } from 'bits-ui';

	let {
		class: className,
		variant = 'secondary',
		loading,
		children,
		iconProps,
		formaction,
		...restProps
	}: FABMenuItemProps = $props();

	const { base, icon } = $derived(fabMenuItem({ variant }));
	const btnCls = $derived(base({ class: clsx(className) }));
</script>

<Button.Root {formaction} class={btnCls} {...restProps as ButtonRootProps}>
	{#if iconProps}
		{#if loading}
			<LoadingIndicator />
		{:else}
			<Icon class={icon()} {...iconProps} />
		{/if}
	{:else if loading}
		<LoadingIndicator />
	{/if}
	{@render children?.()}
	<Layer />
</Button.Root>
