<script lang="ts">
	/**
	 * A toggle group within a Toolbar. Manages single or multiple selection.
	 */
	import { Toolbar } from 'bits-ui';
	import clsx from 'clsx';
	import { toolbar } from './theme.js';
	import type { ToolbarGroupProps } from './types.js';

	let { children, disabled = false, class: className, ...restProps }: ToolbarGroupProps = $props();

	const cls = toolbar();
</script>

<Toolbar.Group {disabled} class={cls.group({ class: clsx(className) })} {...restProps}>
	{@render children?.()}
</Toolbar.Group>
