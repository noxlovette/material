<script lang="ts">
	/**
	 * A container for grouping buttons with shared borders and rounding.
	 * Typically used for segmented controls or closely related actions.
	 */
	import type { ConnectedButtonsProps } from './types.js';

	let { children, ...rest }: ConnectedButtonsProps = $props();
</script>

<div class="grid auto-cols-fr grid-flow-col gap-0.5 overflow-hidden rounded-full" {...rest}>
	{@render children()}
</div>
