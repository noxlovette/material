<!--
@component
Material 3 Text Field.

Text fields allow users to enter and edit text.

@see https://m3.material.io/components/text-fields/overview
-->
<script lang="ts">
  import clsx from 'clsx';
  import { Icon } from '$lib/utils/index.js';
  import { textfield } from './theme.js';
  import type { TextfieldProps } from './types.js';
  import { useId } from 'bits-ui';

  let {
    value = $bindable(),
    supportingText,
    leadingIconProps,
    trailingIconProps,
    placeholder = '',
    label,
    id = useId(),
    class: className,
    characterLimit,
    disabled = false,
    error = false,
    required = false,
    trailingOnClick,
    inputChild,
    trailingIcon,
    ...restProps
  }: TextfieldProps = $props();

  const cls = $derived(textfield({ disabled, error }));

  const inputProps = $derived({
    id,
    class: cls.input(),
    'aria-invalid': error,
    'aria-required': required,
    required,
    disabled,
    placeholder,
    ...restProps
  });
</script>

<div class={clsx('relative w-full', className)}>
  <div class={cls.base()}>
    {#if leadingIconProps}
      <Icon class={cls.leadingIcon()} {...leadingIconProps} />
    {/if}

    <div class={cls.inputWrapper()}>
      {#if inputChild}
        {@render inputChild({ props: inputProps })}
      {:else}
        <input bind:value {...inputProps} />
      {/if}

      <label class={cls.label()} for={id}>
        {label}{#if required}<span class={cls.requiredAsterisk()} aria-hidden="true">*</span>{/if}
      </label>
    </div>

    {#if trailingIcon}
      {@render trailingIcon()}
    {:else if trailingIconProps}
      <button type="button" onclick={trailingOnClick}>
        <Icon class={cls.trailingIcon()} {...trailingIconProps} />
      </button>
    {/if}
  </div>

  {#if supportingText}
    <div class={cls.supportingText()}>
      <p>{@render supportingText()}</p>
      {#if characterLimit && typeof value === 'string'}
        <p>{value?.length} / {characterLimit}</p>
      {/if}
    </div>
  {/if}
</div>
