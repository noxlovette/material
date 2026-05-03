<script lang="ts">
	/**
	 * ScrollArea is a custom scrollbar component based on Bits UI.
	 */
	import { ScrollArea as BitsScrollArea } from 'bits-ui';
	import { scrollArea } from './theme.js';
	import type { ScrollAreaProps } from './types.js';
	import { clsx } from 'clsx';

	let {
		children,
		class: className,
		orientation = 'vertical',
		type = 'hover',
		scrollHideDelay = 600,
		...restProps
	}: ScrollAreaProps = $props();

	const styles = $derived(scrollArea({ orientation }));
</script>

<BitsScrollArea.Root class={clsx(styles.root(), className)} {type} {scrollHideDelay} {...restProps}>
	<BitsScrollArea.Viewport class={styles.viewport()}>
		{@render children?.()}
	</BitsScrollArea.Viewport>

	{#if orientation === 'vertical' || orientation === 'both'}
		<BitsScrollArea.Scrollbar orientation="vertical" class={styles.scrollbar()}>
			<BitsScrollArea.Thumb class={styles.thumb()} />
		</BitsScrollArea.Scrollbar>
	{/if}

	{#if orientation === 'horizontal' || orientation === 'both'}
		<BitsScrollArea.Scrollbar orientation="horizontal" class={styles.scrollbar()}>
			<BitsScrollArea.Thumb class={styles.thumb()} />
		</BitsScrollArea.Scrollbar>
	{/if}

	<BitsScrollArea.Corner class={styles.corner()} />
</BitsScrollArea.Root>
