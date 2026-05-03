<!--
@component
Material 3 Pin Input.

Pin inputs allow users to enter a multi-digit code, such as an OTP or a security PIN.
-->
<script lang="ts">
	import { PinInput } from 'bits-ui';
	import { pinInput } from './theme.js';
	import type { PinInputProps } from './types.js';

	let {
		value = $bindable(''),
		count = 4,
		label,
		supportingText,
		error = false,
		disabled = false,
		placeholder = '○',
		maxlength,
		...restProps
	}: PinInputProps = $props();

	const cls = $derived(pinInput({ error, disabled }));
</script>

<div class={cls.root()}>
	{#if label}
		<span class={cls.label()}>{label}</span>
	{/if}

	<PinInput.Root bind:value maxlength={maxlength ?? count} {disabled} {...restProps}>
		{#snippet children({ cells })}
			<div class={cls.container()}>
				{#each cells as cell}
					<PinInput.Cell {cell} class={cls.cell()}>
						{#if cell.char}
							{cell.char}
						{:else}
							{placeholder}
						{/if}
					</PinInput.Cell>
				{/each}
			</div>
		{/snippet}
	</PinInput.Root>

	{#if supportingText}
		<span class={cls.supportingText()}>{supportingText}</span>
	{/if}
</div>
