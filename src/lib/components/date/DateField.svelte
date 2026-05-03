<script lang="ts">
	/**
	 * DateField is a text field that allows users to enter a date or pick it from a calendar.
	 *
	 * @see https://m3.material.io/components/date-pickers/guidelines
	 */
	import { buttonIcon, Textfield, type DateFieldProps } from '$lib/components/index.js';
	import DatePickerDocked from './DatePickerDocked.svelte';
	import { clickOutside, positionFloating } from '$lib/actions/index.js';
	import { enterExit } from '$lib/animation/enterExit.js';
	import { easeEmphasizedDecel, easeEmphasizedAccel } from '$lib/animation/easing.js';
	import { Calendar, DatePicker } from 'bits-ui';
	import ButtonIcon from '../buttons/ButtonIcon.svelte';
	import Icon from '$lib/utils/icon/Icon.svelte';
	import Layer from '$lib/utils/Layer.svelte';
	import Label from '../typography/label/Label.svelte';
	import { textfield } from '$lib/components/index.js';
	import { tv } from 'tailwind-variants';

	let {
		value = $bindable(),
		required = false,
		disabled = false,
		error = false,
		supportingText
	}: DateFieldProps = $props();

	const dateField = tv({
		slots: {
			base: `
				group w-full h-14 bg-md-sys-color-surface-container-highest rounded-t-xs
				after:absolute after:bottom-0 after:left-0 after:right-0
				relative
				state-layer before:rounded-xs hover:before:bg-md-sys-color-on-surface/8
				flex items-center
				after:h-px after:bg-md-sys-color-on-surface-variant
				after:transition-[height,background-color] after:duration-200
				hover:after:bg-md-sys-color-on-surface
				focus-within:after:bg-md-sys-color-primary focus-within:after:h-[2px]
				disabled:bg-md-sys-color-on-surface/4
				disabled:after:bg-md-sys-color-on-surface/12
				justify-between
			`,
			input: `
				w-full bg-transparent outline-none
				md-sys-typescale-body-large text-md-sys-color-on-surface
				disabled:text-md-sys-color-on-surface/38 px-3 flex items-center
			`
		}
	});

	const { base, input } = $derived(dateField());
</script>

<DatePicker.Root weekStartsOn={1} weekdayFormat="short" fixedWeeks>
	<div class={base()}>
		<DatePicker.Input class={input()}>
			{#snippet children({ segments })}
				{#each segments as { part, value }}
					{#if part === 'literal'}
						<DatePicker.Segment
							{part}
							class="px-1.5 text-md-sys-color-on-surface-variant select-none"
						>
							{value}
						</DatePicker.Segment>
					{:else}
						<DatePicker.Segment
							{part}
							class="cursor-default rounded-xs px-1 py-0.5 text-md-sys-color-on-surface
								   transition-colors duration-100
								   select-none
								   hover:bg-md-sys-color-on-surface/8
								   focus:bg-md-sys-color-primary-container
								   focus:text-md-sys-color-on-primary-container focus:outline
								   focus:outline-2 focus:outline-md-sys-color-primary focus-visible:ring-0!
								   focus-visible:ring-offset-0! aria-[valuetext=Empty]:text-md-sys-color-on-surface-variant"
						>
							{value}
						</DatePicker.Segment>
					{/if}
				{/each}
				<DatePicker.Trigger>
					<ButtonIcon variant="bare" iconProps={{ name: 'calendar_month' }} />
				</DatePicker.Trigger>
			{/snippet}
		</DatePicker.Input>
	</div>
	<DatePicker.Content sideOffset={6} class="z-50">
		<DatePicker.Calendar
			class="h-104 w-90 rounded-lg bg-md-sys-color-surface-container-high p-6 shadow-elevation-3"
		>
			{#snippet children({ months, weekdays })}
				<DatePicker.Header
					class="z-10 flex w-full items-center justify-between pb-7.5 text-md-sys-color-on-surface-variant"
				>
					<DatePicker.PrevButton>
						<ButtonIcon iconProps={{ name: 'chevron_left' }} />
					</DatePicker.PrevButton>
					<DatePicker.Heading class="md-sys-typescale-label-large" />
					<DatePicker.NextButton>
						<ButtonIcon iconProps={{ name: 'chevron_right' }} />
					</DatePicker.NextButton>
				</DatePicker.Header>

				{#each months as month}
					<DatePicker.Grid class="w-full border-collapse select-none">
						<DatePicker.GridHead>
							<DatePicker.GridRow class="flex w-full justify-between">
								{#each weekdays as day}
									<DatePicker.HeadCell
										class="size-10 md-sys-typescale-label-large text-md-sys-color-on-surface-variant"
									>
										{day}
									</DatePicker.HeadCell>
								{/each}
							</DatePicker.GridRow>
						</DatePicker.GridHead>
						<DatePicker.GridBody>
							{#each month.weeks as weekDates}
								<DatePicker.GridRow class="flex w-full justify-between">
									{#each weekDates as date}
										<DatePicker.Cell
											{date}
											month={month.value}
											class="text-center md-sys-typescale-body-large"
										>
											<DatePicker.Day
												class="group relative flex size-10 items-center justify-center rounded-full bg-transparent p-0 data-disabled:pointer-events-none data-disabled:text-md-sys-color-on-surface/38 data-outside-month:pointer-events-none data-selected:bg-md-sys-color-primary data-selected:text-md-sys-color-on-primary data-unavailable:text-md-sys-color-on-surface/38 data-unavailable:line-through"
											>
												<Layer />

												{date.day}
											</DatePicker.Day>
										</DatePicker.Cell>
									{/each}
								</DatePicker.GridRow>
							{/each}
						</DatePicker.GridBody>
					</DatePicker.Grid>
				{/each}
			{/snippet}
		</DatePicker.Calendar>
	</DatePicker.Content>
</DatePicker.Root>
