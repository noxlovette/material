<!--
@component
Icon buttons help people take minor actions and are often used in app bars.

- Standard: Low emphasis
- Filled: High emphasis
- Filled Tonal: Medium-high emphasis
- Outlined: Medium emphasis

@see https://m3.material.io/components/icon-buttons/overview
-->
<script lang="ts">
	import type { ButtonIconProps } from './types.js';
	import { Icon, LoadingIndicator, Layer } from '$lib/utils/index.js';
	import { buttonIcon } from './theme.js';
	import clsx from 'clsx';
	import { Tooltip } from '$lib/components/index.js';
	import { Button, Toggle, type ButtonRootProps } from 'bits-ui';
	import type { ToggleRootProps } from 'bits-ui';

	let {
		iconProps,
		variant = 'text',
		color = 'default',
		size = 'md',
		shape = 'round',
		variation = 'default',
		triggerClass = '',
		triggerSide = 'top',
		triggerAlign = 'center',
		disabled,
		formaction,
		tooltipContent,
		loading,
		width = 'default',
		pressed = false,
		onPressedChange,
		class: className,
		...restProps
	}: ButtonIconProps = $props();

	const selected = $derived(variation === 'toggle' ? pressed : undefined);

	const { base, icon } = $derived(
		buttonIcon({ variant, color, shape, variation, size, width, selected })
	);

	const btnCls = $derived(base({ class: clsx(className) }));
</script>

<Tooltip {triggerClass} variant="snack" supportingText={tooltipContent}>
	{#snippet trigger()}
		{#if variation === 'toggle'}
			<Toggle.Root
				bind:pressed
				{onPressedChange}
				{disabled}
				class={btnCls}
				{...restProps as ToggleRootProps}
			>
				{#if loading}
					<LoadingIndicator />
				{:else}
					<Icon class={icon()} {...iconProps} />
					<Layer />
				{/if}
			</Toggle.Root>
		{:else}
			<Button.Root {disabled} {formaction} class={btnCls} {...restProps as ButtonRootProps}>
				{#if loading}
					<LoadingIndicator />
				{:else}
					<Icon class={icon()} {...iconProps} />
					<Layer />
				{/if}
			</Button.Root>
		{/if}
	{/snippet}
</Tooltip>
