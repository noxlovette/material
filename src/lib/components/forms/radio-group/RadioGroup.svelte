<!--
@component
Radio buttons let users select one option from a set.

@see https://m3.material.io/components/radio-button/overview
-->
<script lang="ts">
	import clsx from 'clsx';
	import { RadioGroup } from 'bits-ui';
	import { Layer } from '$lib/utils/index.js';
	import { radioGroup } from './theme.js';
	import type { RadioGroupProps } from './types.js';

	let {
		items,
		value = $bindable(''),
		orientation = 'vertical',
		disabled = false,
		error = false,
		class: className,
		...restProps
	}: RadioGroupProps = $props();

	const cls = $derived(radioGroup({ orientation }));
</script>

<RadioGroup.Root
	bind:value
	{disabled}
	{orientation}
	class={cls.root({ class: clsx(className) })}
	{...restProps}
>
	{#each items as item (item.value)}
		{@const isChecked = value === item.value}
		{@const isDisabled = disabled || !!item.disabled}
		{@const itemCls = radioGroup({ checked: isChecked, disabled: isDisabled, error })}

		<RadioGroup.Item value={item.value} disabled={isDisabled} class={itemCls.item()}>
			{#snippet children({ checked })}
				<div class={itemCls.indicator()}>
					<div class={itemCls.control()}>
						<Layer />
					</div>
					<div class={itemCls.outerRing()}></div>
					<div class={itemCls.innerDot()}></div>
				</div>
				<div class="flex flex-col gap-0.5 text-left">
					<span class={itemCls.label()}>{item.label}</span>
					{#if item.supportingText}
						<span class={itemCls.supporting()}>{item.supportingText}</span>
					{/if}
				</div>
			{/snippet}
		</RadioGroup.Item>
	{/each}
</RadioGroup.Root>
