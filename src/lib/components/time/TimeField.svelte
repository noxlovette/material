<!--
@component
TimeField component provides a text input that opens a Timepicker overlay when interacted with.
It combines a Material 3 Textfield with a TimepickerInput for intuitive time selection.

@see https://m3.material.io/components/time-pickers/overview
-->
<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { Textfield, TimepickerInput } from '$lib/components/index.js';
	import { clickOutside, positionFloating } from '$lib/actions/index.js';
	import { enterExit } from '$lib/animation/enterExit.js';
	import { easeEmphasizedDecel, easeEmphasizedAccel } from '$lib/animation/easing.js';

	let {
		label = 'Время',
		value = $bindable(),
		required = false,
		disabled = false,
		error = false,
		datePickerTitle = 'Pick date',
		name,
		...restProps
	}: {
		/** The label for the text field. */
		label?: string;
		/** The current time value (bindable). */
		value?: string;
		/** The name for the hidden input submitted with the form. */
		name?: string;
		/** Whether the field is required for form submission. */
		required?: boolean;
		/** Whether the field is disabled. */
		disabled?: boolean;
		/** Whether the field is in an error state. */
		error?: boolean;
		/** Title for the picker overlay. */
		datePickerTitle?: string;
	} & HTMLInputAttributes = $props();

	const id = $props.id();

	let picker = $state(false);
	let anchorEl = $state<HTMLDivElement>();
</script>

<div
	class="relative w-full"
	bind:this={anchorEl}
	use:clickOutside={() => {
		picker = false;
	}}
>
	<Textfield
		{id}
		{label}
		{value}
		{name}
		{disabled}
		class="pointer-events-none"
		trailingIconProps={{ name: 'timer' }}
		trailingOnClick={() => !disabled && (picker = !picker)}
	>
		{#snippet supportingText()}
			ЧЧ-ММ
		{/snippet}
	</Textfield>

	<button
		{disabled}
		title="time-overlay"
		class="absolute inset-0 cursor-pointer disabled:cursor-not-allowed"
		type="button"
		onclick={() => !disabled && (picker = !picker)}
		data-cy="calendar-time-toggle"
	></button>

	{#if picker}
		<div
			class="picker"
			use:positionFloating={{ anchor: anchorEl, offset: 12 }}
			in:enterExit={{ duration: 200, easing: easeEmphasizedDecel, mode: 'scale' }}
			out:enterExit={{ duration: 150, easing: easeEmphasizedAccel, mode: 'scale' }}
			style="transform-origin: top center;"
		>
			<TimepickerInput time={value} close={() => (picker = false)} setTime={(t) => (value = t)} />
		</div>
	{/if}
</div>

<style>
	.picker {
		z-index: 1;
		position: absolute;
	}
</style>
