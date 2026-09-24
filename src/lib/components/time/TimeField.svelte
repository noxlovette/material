<!--
@component
TimeField component provides a text input that opens a Timepicker overlay when interacted with.
It combines a Material 3 Textfield with a TimepickerInput for intuitive time selection.

@see https://m3.material.io/components/time-pickers/overview
-->
<script lang="ts">
  import { enterExit, presence } from '$lib/animation/index.js';
  import type { HTMLInputAttributes } from 'svelte/elements';
  import Textfield from '$lib/components/forms/textfield/Textfield.svelte';
  import TimepickerInput from './TimepickerInput.svelte';
  import { Popover } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import type { TimepickerLabels } from './types.js';

  let {
    label = 'Time',
    value = $bindable(),
    required = false,
    disabled = false,
    error = false,
    datePickerTitle = 'Pick date',
    name,
    leadingIconProps,
    supportingText,
    pickerLabels,
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
    /** Props for the leading icon. */
    leadingIconProps?: any;
    /** Supporting text under the field. */
    supportingText?: Snippet;
    /** Headline, input and button strings for the picker overlay (English by default). */
    pickerLabels?: TimepickerLabels;
  } & HTMLInputAttributes = $props();

  const id = $props.id();

  let picker = $state(false);
  let anchorEl = $state<HTMLDivElement>();
</script>

<Popover.Root bind:open={picker}>
  <div class="relative w-full" bind:this={anchorEl}>
    <Textfield
      id={id as string}
      {label}
      {value}
      {name}
      {disabled}
      {error}
      {leadingIconProps}
      class="pointer-events-none"
      trailingIconProps={{ name: 'schedule' }}
      trailingOnClick={() => !disabled && (picker = !picker)}
      {supportingText}
      {...restProps as any}
    />

    <Popover.Trigger {disabled}>
      {#snippet child({ props })}
        <button
          {...props}
          title="time-overlay"
          class="inset-spacing-0 absolute cursor-pointer disabled:cursor-not-allowed"
          type="button"
          data-cy="calendar-time-toggle"
        ></button>
      {/snippet}
    </Popover.Trigger>
  </div>

  <Popover.Portal>
    <Popover.Content
      customAnchor={anchorEl}
      side="bottom"
      align="start"
      sideOffset={12}
      collisionPadding={8}
      class="z-100"
    >
      {#snippet child({ wrapperProps, props, open })}
        <div {...wrapperProps}>
          <div
            {...props}
            class={[
              props.class,
              'max-h-(--bits-floating-available-height) min-w-(--bits-floating-anchor-width) overflow-auto'
            ]}
            {@attach presence(() => open, enterExit.scale)}
          >
            <TimepickerInput
              {...pickerLabels}
              time={value}
              close={() => (picker = false)}
              setTime={(t) => (value = t)}
            />
          </div>
        </div>
      {/snippet}
    </Popover.Content>
  </Popover.Portal>
</Popover.Root>
