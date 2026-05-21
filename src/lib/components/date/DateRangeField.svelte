<!--
@component
DateRangeField lets users enter or pick a date range (start + end) via two
segment inputs and a shared calendar popover.

@see https://m3.material.io/components/date-pickers/guidelines
-->
<script lang="ts">
  import { DateRangePicker } from 'bits-ui';
  import ButtonIcon from '../buttons/ButtonIcon.svelte';
  import Icon from '$lib/utils/icon/Icon.svelte';
  import Layer from '$lib/utils/Layer.svelte';
  import type { DateRangeFieldProps } from './types';
  import { dateRangeField } from './theme';

  let {
    value = $bindable(),
    label,
    startLabel = 'Start',
    endLabel = 'End',
    id,
    required = false,
    disabled = false,
    error = false,
    supportingText,
    name,
    leadingIconProps
  }: DateRangeFieldProps & { leadingIconProps?: any } = $props();

  const cls = $derived(dateRangeField({ disabled, error }));
</script>

<DateRangePicker.Root
  bind:value
  weekStartsOn={1}
  {required}
  {disabled}
  locale="ru"
  weekdayFormat="short"
  fixedWeeks
  closeOnRangeSelect
>
  <div class="relative w-full">
    <div class={cls.base()} data-invalid={error || undefined}>
      {#if leadingIconProps}
        <Icon class={cls.leadingIcon()} {...leadingIconProps} />
      {/if}

      <div class={cls.inputWrapper()}>
        <!-- Start date input -->
        <DateRangePicker.Input type="start" class={cls.input()} {name} id={id ?? undefined}>
          {#snippet children({ segments })}
            <div class="flex w-full flex-col pt-4 tabular-nums">
              <div class="flex">
                {#each segments as { part, value: segVal }}
                  {#if part === 'literal'}
                    <DateRangePicker.Segment
                      {part}
                      class="text-md-sys-color-on-surface-variant px-0.5 select-none first:pl-0"
                    >
                      {segVal}
                    </DateRangePicker.Segment>
                  {:else}
                    <DateRangePicker.Segment
                      {part}
                      class="text-md-sys-color-on-surface hover:bg-md-sys-color-on-surface/8 focus:bg-md-sys-color-primary-container focus:text-md-sys-color-on-primary-container focus:outline-md-sys-color-primary
										   aria-[valuetext=Empty]:text-md-sys-color-on-surface-variant cursor-default rounded-xs
										   px-1
										   py-0.5
										   transition-colors
										   duration-100 select-none focus:outline-2
										   focus-visible:ring-0! focus-visible:ring-offset-0!"
                    >
                      {segVal}
                    </DateRangePicker.Segment>
                  {/if}
                {/each}
              </div>
            </div>
          {/snippet}
        </DateRangePicker.Input>

        <label class={cls.label()} for={id}>
          {startLabel ?? label}{#if required}<span class={cls.requiredAsterisk()} aria-hidden="true"
              >*</span
            >{/if}
        </label>
      </div>

      <span class={cls.separator()}>–</span>

      <div class={cls.inputWrapper()}>
        <!-- End date input -->
        <DateRangePicker.Input type="end" class={cls.input()} id={id ? `${id}-end` : undefined}>
          {#snippet children({ segments })}
            <div class="flex w-full flex-col pt-4 tabular-nums">
              <div class="flex">
                {#each segments as { part, value: segVal }}
                  {#if part === 'literal'}
                    <DateRangePicker.Segment
                      {part}
                      class="text-md-sys-color-on-surface-variant px-0.5 select-none first:pl-0"
                    >
                      {segVal}
                    </DateRangePicker.Segment>
                  {:else}
                    <DateRangePicker.Segment
                      {part}
                      class="text-md-sys-color-on-surface hover:bg-md-sys-color-on-surface/8 focus:bg-md-sys-color-primary-container focus:text-md-sys-color-on-primary-container focus:outline-md-sys-color-primary
										   aria-[valuetext=Empty]:text-md-sys-color-on-surface-variant cursor-default rounded-xs
										   px-1
										   py-0.5
										   transition-colors
										   duration-100 select-none focus:outline-2
										   focus-visible:ring-0! focus-visible:ring-offset-0!"
                    >
                      {segVal}
                    </DateRangePicker.Segment>
                  {/if}
                {/each}
              </div>
            </div>
          {/snippet}
        </DateRangePicker.Input>

        <label class={cls.label()} for={id ? `${id}-end` : undefined}>
          {endLabel ?? label}{#if required}<span class={cls.requiredAsterisk()} aria-hidden="true"
              >*</span
            >{/if}
        </label>
      </div>

      <DateRangePicker.Trigger
        class={cls.trailingIcon({ class: 'flex items-center justify-center' })}
      >
        <Icon name="calendar_month" />
      </DateRangePicker.Trigger>
    </div>

    {#if supportingText}
      <div class={cls.supportingText()}>
        <p>{@render supportingText()}</p>
      </div>
    {/if}
  </div>

  <DateRangePicker.Content sideOffset={6} class="z-[100]">
    <DateRangePicker.Calendar
      class="bg-md-sys-color-surface-container-high shadow-elevation-3 h-104 w-90 rounded-lg p-6"
    >
      {#snippet children({ months, weekdays })}
        <DateRangePicker.Header
          class="text-md-sys-color-on-surface-variant z-10 flex w-full items-center justify-between pb-7.5"
        >
          <DateRangePicker.PrevButton>
            <ButtonIcon type="button" iconProps={{ name: 'chevron_left' }} />
          </DateRangePicker.PrevButton>
          <DateRangePicker.Heading class="md-sys-typescale-label-large" />
          <DateRangePicker.NextButton>
            <ButtonIcon type="button" iconProps={{ name: 'chevron_right' }} />
          </DateRangePicker.NextButton>
        </DateRangePicker.Header>

        {#each months as month}
          <DateRangePicker.Grid class="w-full border-collapse select-none">
            <DateRangePicker.GridHead>
              <DateRangePicker.GridRow class="flex w-full justify-between">
                {#each weekdays as day}
                  <DateRangePicker.HeadCell
                    class="md-sys-typescale-label-large text-md-sys-color-on-surface-variant size-10"
                  >
                    {day}
                  </DateRangePicker.HeadCell>
                {/each}
              </DateRangePicker.GridRow>
            </DateRangePicker.GridHead>
            <DateRangePicker.GridBody>
              {#each month.weeks as weekDates}
                <DateRangePicker.GridRow class="flex w-full justify-between">
                  {#each weekDates as date}
                    <DateRangePicker.Cell
                      {date}
                      month={month.value}
                      class="md-sys-typescale-body-large text-center"
                    >
                      <DateRangePicker.Day
                        class="group data-disabled:text-md-sys-color-on-surface/38 data-highlighted:bg-md-sys-color-primary-container/20 data-range-end:bg-md-sys-color-primary data-range-end:text-md-sys-color-on-primary data-range-middle:bg-md-sys-color-primary-container/40 data-range-start:bg-md-sys-color-primary
												   data-range-start:text-md-sys-color-on-primary data-selected:bg-md-sys-color-primary data-selected:text-md-sys-color-on-primary data-unavailable:text-md-sys-color-on-surface/38
												   relative flex
												   size-10 items-center
												   justify-center rounded-full
												   bg-transparent p-0
												   transition-colors
												   duration-100 data-disabled:cursor-not-allowed
												   data-outside-month:pointer-events-none data-outside-month:opacity-0
												   data-range-middle:rounded-none data-unavailable:line-through"
                      >
                        <Layer />
                        {date.day}
                      </DateRangePicker.Day>
                    </DateRangePicker.Cell>
                  {/each}
                </DateRangePicker.GridRow>
              {/each}
            </DateRangePicker.GridBody>
          </DateRangePicker.Grid>
        {/each}
      {/snippet}
    </DateRangePicker.Calendar>
  </DateRangePicker.Content>
</DateRangePicker.Root>
