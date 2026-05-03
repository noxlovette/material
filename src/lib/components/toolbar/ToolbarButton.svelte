<script lang="ts">
	/**
	 * An action button within a Toolbar. Non-toggleable.
	 */
	import { Toolbar } from 'bits-ui';
	import clsx from 'clsx';
	import { Icon, Layer } from '$lib/utils/index.js';
	import { toolbarButton } from './theme.js';
	import type { ToolbarButtonProps } from './types.js';

	let {
		iconProps,
		disabled = false,
		class: className,
		...restProps
	}: ToolbarButtonProps = $props();

	const { base, icon } = toolbarButton();
</script>

<Toolbar.Button {disabled} class={base({ class: clsx(className) })} {...restProps}>
	<Icon {...iconProps} class={icon()} />
	<Layer />
</Toolbar.Button>
