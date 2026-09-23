<!--
@component
TimeField component provides a text input that opens a Timepicker overlay when interacted with.
It combines a Material 3 Textfield with a TimepickerInput for intuitive time selection.

@see https://m3.material.io/components/time-pickers/overview
-->
<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import Textfield from '$lib/components/forms/textfield/Textfield.svelte';
  import TimepickerInput from './TimepickerInput.svelte';
  import { Popover } from 'bits-ui';
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
    leadingIconProps,
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
      trailingIconProps={{ name: 'timer' }}
      trailingOnClick={() => !disabled && (picker = !picker)}
      {...restProps as any}
    >
      {#snippet supportingText()}
        ЧЧ-ММ
      {/snippet}
    </Textfield>

    <Popover.Trigger {disabled}>
      {#snippet child({ props })}
        <button
          {...props}
          title="time-overlay"
          class="absolute inset-0 cursor-pointer disabled:cursor-not-allowed"
          type="button"
          data-cy="calendar-time-toggle"
        ></button>
      {/snippet}
    </Popover.Trigger>
  </div>

  <Popover.Portal>
    <Popover.Content
      forceMount
      customAnchor={anchorEl}
      side="bottom"
      align="start"
      sideOffset={12}
      collisionPadding={8}
      class="z-100"
    >
      {#snippet child({ wrapperProps, props, open })}
        {#if open}
          <div {...wrapperProps}>
            <div
              {...props}
              class={[
                props.class,
                'max-h-(--bits-floating-available-height) min-w-(--bits-floating-anchor-width) origin-(--bits-floating-transform-origin) overflow-auto'
              ]}
              in:enterExit={{ duration: 200, easing: easeEmphasizedDecel, mode: 'scale' }}
              out:enterExit={{ duration: 150, easing: easeEmphasizedAccel, mode: 'scale' }}
            >
              <TimepickerInput
                time={value}
                close={() => (picker = false)}
                setTime={(t) => (value = t)}
              />
            </div>
          </div>
        {/if}
      {/snippet}
    </Popover.Content>
  </Popover.Portal>
</Popover.Root>
