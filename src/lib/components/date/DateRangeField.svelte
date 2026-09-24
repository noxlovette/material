<!--
@component
DateRangeField lets users enter or pick a date range (start + end) via two
segment inputs and a shared docked calendar.

Changing the visible month slides the grid with the M3 lateral transition (see calendarMotion.ts).

@see https://m3.material.io/components/date-pickers/guidelines
-->
<script lang="ts">
  import { DateRangePicker, Portal, useId } from 'bits-ui';
  import type { DateValue } from '@internationalized/date';
  import { enterExit, presence } from '$lib/animation/index.js';
  import ButtonIcon from '../buttons/ButtonIcon.svelte';
  import Icon from '$lib/utils/icon/Icon.svelte';
  import Layer from '$lib/utils/Layer.svelte';
  import type { DateRangeFieldProps } from './types';
  import { slideMonth } from './calendarMotion.js';
  import { dateCalendar, dateRangeField, dateSegment } from './theme';

  let {
    value = $bindable(),
    label,
    startLabel = 'Start',
    endLabel = 'End',
    id = useId(),
    required = false,
    disabled = false,
    error = false,
    variant = 'outlined',
    supportingText,
    name,
    locale,
    weekStartsOn,
    leadingIconProps
  }: DateRangeFieldProps = $props();

  const cls = $derived(dateRangeField({ disabled, error, variant }));
  const calendar = dateCalendar();

  // Starts undefined on purpose: bits-ui writes its own default (from value, else today) through
  // the setter on mount, which is why the getter below can assert.
  let placeholder = $state<DateValue>();
  let grids = $state<HTMLElement | null>(null);
  const setPlaceholder = (next: DateValue) =>
    slideMonth(placeholder, next, grids, (date) => (placeholder = date));
</script>

{#snippet rangeInput(type: 'start' | 'end', fieldLabel: string)}
  <div class={cls.inputWrapper()}>
    <DateRangePicker.Input
      {type}
      class={cls.input()}
      name={type === 'start' ? name : undefined}
      id={`${id}-${type}`}
    >
      {#snippet children({ segments })}
        <div class="flex w-full pt-4 tabular-nums">
          {#each segments as { part, value: segment }}
            <DateRangePicker.Segment
              {part}
              class={dateSegment({ part: part === 'literal' ? 'literal' : 'value' })}
            >
              {segment}
            </DateRangePicker.Segment>
          {/each}
        </div>
      {/snippet}
    </DateRangePicker.Input>

    <span class={cls.label()}>
      {fieldLabel}{#if required}<span class={cls.requiredAsterisk()} aria-hidden="true">*</span
        >{/if}
    </span>
  </div>
{/snippet}

<DateRangePicker.Root
  bind:value
  bind:placeholder={() => placeholder as DateValue, setPlaceholder}
  {weekStartsOn}
  {required}
  {disabled}
  {locale}
  weekdayFormat="narrow"
  fixedWeeks
  closeOnRangeSelect
>
  <div class="relative w-full">
    {#if label}
      <DateRangePicker.Label class="sr-only">{label}</DateRangePicker.Label>
    {/if}
    <div class={cls.base()} data-invalid={error || undefined}>
      {#if leadingIconProps}
        <Icon class={cls.leadingIcon()} {...leadingIconProps} />
      {/if}

      {@render rangeInput('start', startLabel)}
      <span class={cls.separator()}>–</span>
      {@render rangeInput('end', endLabel)}

      <DateRangePicker.Trigger>
        {#snippet child({ props })}
          <ButtonIcon
            variant="standard"
            {...props}
            {disabled}
            class={cls.trailingIcon()}
            iconProps={{ name: 'date_range' }}
          />
        {/snippet}
      </DateRangePicker.Trigger>
    </div>

    {#if supportingText}
      <div class={cls.supportingText()}>
        <p>{@render supportingText()}</p>
      </div>
    {/if}
  </div>

  <Portal>
    <DateRangePicker.Content sideOffset={4} align="start">
      {#snippet child({ wrapperProps, props, open })}
        <div {...wrapperProps}>
          <div {...props} {@attach presence(() => open, enterExit.scale)}>
            <DateRangePicker.Calendar class={calendar.surface()}>
              {#snippet children({ months, weekdays })}
                <DateRangePicker.Header class={calendar.header()}>
                  <DateRangePicker.Heading class={calendar.heading()} />
                  <div class={calendar.nav()}>
                    <DateRangePicker.PrevButton>
                      {#snippet child({ props })}
                        <ButtonIcon
                          variant="standard"
                          {...props}
                          iconProps={{ name: 'chevron_left' }}
                        />
                      {/snippet}
                    </DateRangePicker.PrevButton>
                    <DateRangePicker.NextButton>
                      {#snippet child({ props })}
                        <ButtonIcon
                          variant="standard"
                          {...props}
                          iconProps={{ name: 'chevron_right' }}
                        />
                      {/snippet}
                    </DateRangePicker.NextButton>
                  </div>
                </DateRangePicker.Header>

                <div bind:this={grids}>
                  {#each months as month (month.value.toString())}
                    <DateRangePicker.Grid class={calendar.grid()}>
                      <DateRangePicker.GridHead>
                        <DateRangePicker.GridRow class={calendar.row()}>
                          {#each weekdays as day, i (i)}
                            <DateRangePicker.HeadCell class={calendar.weekday()}>
                              {day}
                            </DateRangePicker.HeadCell>
                          {/each}
                        </DateRangePicker.GridRow>
                      </DateRangePicker.GridHead>
                      <DateRangePicker.GridBody>
                        {#each month.weeks as weekDates, i (i)}
                          <DateRangePicker.GridRow class={calendar.row()}>
                            {#each weekDates as date (date.toString())}
                              <DateRangePicker.Cell
                                {date}
                                month={month.value}
                                class={calendar.cell()}
                              >
                                <DateRangePicker.Day class={calendar.day()}>
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
                </div>
              {/snippet}
            </DateRangePicker.Calendar>
          </div>
        </div>
      {/snippet}
    </DateRangePicker.Content>
  </Portal>
</DateRangePicker.Root>
