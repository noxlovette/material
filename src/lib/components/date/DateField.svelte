<!--
@component
DateField is a text field that allows users to enter a date or pick it from a calendar.

@see https://m3.material.io/components/date-pickers/guidelines
-->
<script lang="ts">
  import { DatePicker } from 'bits-ui';
  import ButtonIcon from '../buttons/ButtonIcon.svelte';
  import Icon from '$lib/utils/icon/Icon.svelte';
  import Layer from '$lib/utils/Layer.svelte';
  import type { DateFieldProps } from './types';
  import { dateField } from './theme';

  let {
    value = $bindable(),
    label,
    id,
    required = false,
    disabled = false,
    error = false,
    supportingText,
    name,
    leadingIconProps
  }: DateFieldProps & { leadingIconProps?: any } = $props();

  const cls = $derived(dateField({ disabled, error }));
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
  <div class="relative w-full">
    <div class={cls.base()} data-invalid={error || undefined}>
      {#if leadingIconProps}
        <Icon class={cls.leadingIcon()} {...leadingIconProps} />
      {/if}

      <div class={cls.inputWrapper()}>
        <DatePicker.Input class={cls.input()} {name} id={id ?? undefined}>
          {#snippet children({ segments })}
            <div class="flex w-full flex-col pt-4 tabular-nums">
              <div class="flex items-center justify-between">
                <div class="flex">
                  {#each segments as { part, value }}
                    {#if part === 'literal'}
                      <DatePicker.Segment
                        {part}
                        class="text-md-sys-color-on-surface-variant px-0.5 select-none first:pl-0"
                      >
                        {value}
                      </DatePicker.Segment>
                    {:else}
                      <DatePicker.Segment
                        {part}
                        class="text-md-sys-color-on-surface hover:bg-md-sys-color-on-surface/8 focus:bg-md-sys-color-primary-container focus:text-md-sys-color-on-primary-container focus:outline-md-sys-color-primary
											   aria-[valuetext=Empty]:text-md-sys-color-on-surface-variant cursor-default
											   rounded-xs
											   px-1
											   py-0.5
											   transition-colors
											   duration-100 select-none focus:outline-2
											   focus-visible:ring-0! focus-visible:ring-offset-0!"
                      >
                        {value}
                      </DatePicker.Segment>
                    {/if}
                  {/each}
                </div>
              </div>
            </div>
          {/snippet}
        </DatePicker.Input>

        <label class={cls.label()} for={id}>
          {label}{#if required}<span class={cls.requiredAsterisk()} aria-hidden="true">*</span>{/if}
        </label>
      </div>

      <DatePicker.Trigger class={cls.trailingIcon({ class: 'flex items-center justify-center' })}>
        <Icon name="calendar_month" />
      </DatePicker.Trigger>
    </div>

    {#if supportingText}
      <div class={cls.supportingText()}>
        <p>{@render supportingText()}</p>
      </div>
    {/if}
  </div>
  <DatePicker.Portal>
    <DatePicker.Content sideOffset={6} class="z-[100]">
      <DatePicker.Calendar
        class="bg-md-sys-color-surface-container-high shadow-elevation-3 h-104 w-90 rounded-lg p-6"
      >
        {#snippet children({ months, weekdays })}
          <DatePicker.Header
            class="text-md-sys-color-on-surface-variant z-10 flex w-full items-center justify-between pb-7.5"
          >
            <DatePicker.PrevButton>
              <ButtonIcon type="button" iconProps={{ name: 'chevron_left' }} />
            </DatePicker.PrevButton>
            <DatePicker.Heading class="md-sys-typescale-label-large" />
            <DatePicker.NextButton>
              <ButtonIcon type="button" iconProps={{ name: 'chevron_right' }} />
            </DatePicker.NextButton>
          </DatePicker.Header>

          {#each months as month}
            <DatePicker.Grid class="w-full border-collapse select-none">
              <DatePicker.GridHead>
                <DatePicker.GridRow class="flex w-full justify-between">
                  {#each weekdays as day}
                    <DatePicker.HeadCell
                      class="md-sys-typescale-label-large text-md-sys-color-on-surface-variant size-10"
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
                        class="md-sys-typescale-body-large text-center"
                      >
                        <DatePicker.Day
                          class="group data-disabled:text-md-sys-color-on-surface/38 data-selected:bg-md-sys-color-primary data-selected:text-md-sys-color-on-primary data-unavailable:text-md-sys-color-on-surface/38 relative flex size-10 items-center justify-center rounded-full bg-transparent p-0 data-disabled:cursor-not-allowed data-outside-month:pointer-events-none data-unavailable:line-through"
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
  </DatePicker.Portal>
</DatePicker.Root>
