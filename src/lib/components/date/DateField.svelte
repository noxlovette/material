<!--
@component
DateField is a text field that allows users to enter a date or pick it from a docked calendar.

@see https://m3.material.io/components/date-pickers/guidelines
-->
<script lang="ts">
  import { DatePicker, useId } from 'bits-ui';
  import { enterExit, presence } from '$lib/animation/index.js';
  import ButtonIcon from '../buttons/ButtonIcon.svelte';
  import Icon from '$lib/utils/icon/Icon.svelte';
  import Layer from '$lib/utils/Layer.svelte';
  import type { DateFieldProps } from './types';
  import { dateCalendar, dateField, dateSegment } from './theme';

  let {
    value = $bindable(),
    label,
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
  }: DateFieldProps = $props();

  const cls = $derived(dateField({ disabled, error, variant }));
  const calendar = dateCalendar();
</script>

<DatePicker.Root
  bind:value
  {weekStartsOn}
  {required}
  {disabled}
  {locale}
  weekdayFormat="narrow"
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
            <div class={cls.segments()}>
              <div class="flex">
                {#each segments as { part, value: segment }}
                  <DatePicker.Segment
                    {part}
                    class={dateSegment({ part: part === 'literal' ? 'literal' : 'value' })}
                  >
                    {segment}
                  </DatePicker.Segment>
                {/each}
              </div>
            </div>
          {/snippet}
        </DatePicker.Input>

        <DatePicker.Label class={cls.label()}>
          {label}{#if required}<span class={cls.requiredAsterisk()} aria-hidden="true">*</span>{/if}
        </DatePicker.Label>
      </div>

      <DatePicker.Trigger>
        {#snippet child({ props })}
          <ButtonIcon
            {...props}
            {disabled}
            class={cls.trailingIcon()}
            iconProps={{ name: 'calendar_month' }}
          />
        {/snippet}
      </DatePicker.Trigger>

      {#if variant === 'outlined'}
        <fieldset class={cls.fieldset()} aria-hidden="true">
          <legend class={cls.legend()}>
            <span class={cls.legendLabel()}>{label}{required ? '*' : ''}</span>
          </legend>
        </fieldset>
      {/if}
    </div>

    {#if supportingText}
      <div class={cls.supportingText()}>
        <p>{@render supportingText()}</p>
      </div>
    {/if}
  </div>

  <DatePicker.Portal>
    <DatePicker.Content sideOffset={4} align="start">
      {#snippet child({ wrapperProps, props, open })}
        <div {...wrapperProps}>
          <div {...props} {@attach presence(() => open, enterExit.scale)}>
            <DatePicker.Calendar class={calendar.surface()}>
              {#snippet children({ months, weekdays })}
                <DatePicker.Header class={calendar.header()}>
                  <DatePicker.Heading class={calendar.heading()} />
                  <div class={calendar.nav()}>
                    <DatePicker.PrevButton>
                      {#snippet child({ props })}
                        <ButtonIcon {...props} iconProps={{ name: 'chevron_left' }} />
                      {/snippet}
                    </DatePicker.PrevButton>
                    <DatePicker.NextButton>
                      {#snippet child({ props })}
                        <ButtonIcon {...props} iconProps={{ name: 'chevron_right' }} />
                      {/snippet}
                    </DatePicker.NextButton>
                  </div>
                </DatePicker.Header>

                {#each months as month (month.value.toString())}
                  <DatePicker.Grid class={calendar.grid()}>
                    <DatePicker.GridHead>
                      <DatePicker.GridRow class={calendar.row()}>
                        {#each weekdays as day, i (i)}
                          <DatePicker.HeadCell class={calendar.weekday()}>
                            {day}
                          </DatePicker.HeadCell>
                        {/each}
                      </DatePicker.GridRow>
                    </DatePicker.GridHead>
                    <DatePicker.GridBody>
                      {#each month.weeks as weekDates, i (i)}
                        <DatePicker.GridRow class={calendar.row()}>
                          {#each weekDates as date (date.toString())}
                            <DatePicker.Cell {date} month={month.value} class={calendar.cell()}>
                              <DatePicker.Day class={calendar.day()}>
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
          </div>
        </div>
      {/snippet}
    </DatePicker.Content>
  </DatePicker.Portal>
</DatePicker.Root>
