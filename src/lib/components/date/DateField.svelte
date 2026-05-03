<!--
@component
DateField is a text field that allows users to enter a date or pick it from a calendar.

@see https://m3.material.io/components/date-pickers/guidelines
-->
<script lang="ts">
	import { DatePicker } from 'bits-ui';
	import ButtonIcon from '../buttons/ButtonIcon.svelte';
	import Layer from '$lib/utils/Layer.svelte';
	import type { DateFieldProps } from './types.ts';
	import { dateField } from './theme.ts';

	let { value = $bindable(), required = false, disabled = false }: DateFieldProps = $props();

	const { base, input } = $derived(dateField());
</script>

<DatePicker.Root
	bind:value
	weekStartsOn={1}
	{required}
	{disabled}
	locale="ru"
	weekdayFormat="short"
	fixedWeeks
>
	<div class={base()}>
		<DatePicker.Input class={input()}>
			{#snippet children({ segments })}
				<div class="justify-betwee flex w-full tabular-nums">
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
								   focus:text-md-sys-color-on-primary-container
								   focus:outline-2 focus:outline-md-sys-color-primary focus-visible:ring-0!
								   focus-visible:ring-offset-0! aria-[valuetext=Empty]:text-md-sys-color-on-surface-variant"
							>
								{value}
							</DatePicker.Segment>
						{/if}
					{/each}
				</div>
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
