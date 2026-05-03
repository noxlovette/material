<!--
@component
Menu items represent options within a menu.

@see https://m3.material.io/components/menus/guidelines
-->
<script lang="ts">
	import type { MenuItemProps } from './types.js';
	import Icon from '$lib/utils/icon/Icon.svelte';
	import Layer from '$lib/utils/Layer.svelte';
	import { DropdownMenu } from 'bits-ui';
	import clsx from 'clsx';
	import { tv } from 'tailwind-variants';

	let {
		iconProps,
		disabled = false,
		onclick,
		onSelect,
		selected,
		helper,
		children,
		...restProps
	}: MenuItemProps & Record<string, any> = $props();

	// bits-ui fires onSelect at the Item level; avoid wiring onclick to the
	// native button as well or it would fire twice on every click.
	const handleSelect = $derived(onSelect ?? (onclick ? () => onclick() : undefined));

	const itemClass = $derived(
		tv({
			base: 'relative flex w-full cursor-pointer items-start gap-3 border-none bg-transparent px-4 py-3 text-left md-sys-typescale-body-large whitespace-nowrap text-md-sys-color-on-surface hover:bg-md-sys-color-on-surface/8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-md-sys-color-primary disabled:cursor-default disabled:opacity-38',
			variants: {
				selected: {
					true: 'bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container'
				}
			}
		})({ selected })
	);
</script>

<DropdownMenu.Item {disabled} onSelect={handleSelect}>
	<button {...restProps} type="button" class={itemClass} {disabled}>
		{#if iconProps}
			<Icon class="size-6 text-[24px] text-md-sys-color-on-surface-variant" {...iconProps} />
		{/if}

		<div class="flex flex-1 flex-col gap-1">
			<span class="md-sys-typescale-body-large text-md-sys-color-on-surface">
				{@render children()}
			</span>
			{#if helper}
				<span class="md-sys-typescale-body-medium text-md-sys-color-on-surface-variant">
					{helper}
				</span>
			{/if}
		</div>

		{#if selected}
			<Icon aria-hidden="true" name="check" />
		{/if}

		<Layer />
	</button>
</DropdownMenu.Item>
