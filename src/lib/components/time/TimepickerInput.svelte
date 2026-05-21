<!--
@component
TimepickerInput component provides the internal UI for selecting hours and minutes.
It follows the Material 3 design for time input pickers.

@see https://m3.material.io/components/time-pickers/specs#66113b8d-698d-4ef3-9993-97992797666e
-->
<script lang="ts">
  import { TimeField } from 'bits-ui';
  import { parseTime } from '@internationalized/date';
  import type { Time } from '@internationalized/date';
  import { timepicker } from './theme.js';
  import Button from '../buttons/Button.svelte';
  import type { TimepickerProps } from './types.js';
  import { ButtonIcon } from '../buttons/index.js';

  const {
    label = 'Введите время',
    time = '09:41',
    close,
    setTime,
    name = 'startTime'
  }: TimepickerProps = $props();

  const cls = timepicker();

  let timeValue = $state<Time>(parseTime(time?.includes(':') ? time : '00:00'));

  const output = $derived(
    `${String(timeValue.hour).padStart(2, '0')}:${String(timeValue.minute).padStart(2, '0')}`
  );
</script>

<div class={cls.base()}>
  <div class={cls.headline()}>{label}</div>

  <TimeField.Root bind:value={timeValue} granularity="minute" hourCycle={24}>
    <TimeField.Input {name}>
      {#snippet children({ segments })}
        <div class={cls.clockDiv()}>
          {#each segments as { part, value }}
            {#if part === 'literal'}
              <span class={cls.fieldSeparator()}>{value}</span>
            {:else if part === 'hour' || part === 'minute'}
              <div class={cls.inputWrapper()}>
                <TimeField.Segment {part} class={cls.timeInput()}>
                  {value}
                </TimeField.Segment>
                <p class={cls.timeInputSupportingText()}>
                  {part === 'hour' ? 'Часы' : 'Минуты'}
                </p>
              </div>
            {/if}
          {/each}
        </div>
      {/snippet}
    </TimeField.Input>
  </TimeField.Root>

  <div class={cls.buttonDiv()}>
    <ButtonIcon type="button" iconProps={{ name: 'schedule' }} />
    <div>
      <Button variant="text" type="button" onclick={() => close()}>Отмена</Button>
      <Button
        variant="text"
        type="button"
        onclick={() => {
          setTime(output);
          close();
        }}
        data-cy="calendar-time-confirm">Готово</Button
      >
    </div>
  </div>
</div>
