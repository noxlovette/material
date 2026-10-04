<!--
@component
Multi-line text field.

M3 has no textarea spec, only a multi-line text field, so this is the `Textfield` with a
`<textarea>` inside: the same filled and outlined containers, floating label and supporting
text. It grows with its content from `rows` to `maxRows` lines, then scrolls.

@see https://m3.material.io/components/text-fields/guidelines
-->
<script lang="ts">
  import clsx from 'clsx';
  import type { Attachment } from 'svelte/attachments';
  import { useId } from 'bits-ui';
  import { Icon } from '#lib/utils/index.js';
  import { ButtonIcon } from '#lib/components/buttons/index.js';
  import { textarea } from './theme.js';
  import type { TextareaProps } from './types.js';

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
    variant = 'outlined',
    rows = 3,
    maxRows,
    trailingOnClick,
    trailingIcon,
    ...restProps
  }: TextareaProps = $props();

  const length = $derived(value?.length ?? 0);
  const overLimit = $derived(characterLimit != null && length > characterLimit);
  const invalid = $derived(!!error || overLimit);

  const cls = $derived(
    textarea({ disabled, error: invalid, variant, leadingIcon: !!leadingIconProps })
  );

  const supportingId = $derived(`${id}-supporting`);
  const counterId = $derived(`${id}-counter`);
  const describedBy = $derived(
    clsx(
      restProps['aria-describedby'],
      supportingText && supportingId,
      characterLimit != null && counterId
    ) || undefined
  );

  const sizeStyle = $derived(
    `min-height: ${rows}lh;` + (maxRows != null ? ` max-height: ${Math.max(rows, maxRows)}lh;` : '')
  );

  /* `field-sizing: content` does the growing where it's supported; elsewhere, fit the height to
     the content on every change, including a `value` set from outside. */
  let textareaEl = $state<HTMLTextAreaElement>();
  const fieldSizing = typeof CSS !== 'undefined' && CSS.supports('field-sizing', 'content');

  const autoGrow: Attachment<HTMLTextAreaElement> = (node) => {
    if (fieldSizing) return;
    void value;
    node.style.height = 'auto';
    node.style.height = `${node.scrollHeight}px`;
  };

  /* The wrapper's padding sits outside the textarea; a press there still focuses it. */
  function focusTextarea(event: PointerEvent) {
    if (event.target !== event.currentTarget || disabled) return;
    event.preventDefault();
    textareaEl?.focus();
  }
</script>

<div class={clsx('relative w-full', className)}>
  <div class={cls.base()}>
    {#if leadingIconProps}
      <Icon class={cls.leadingIcon()} {...leadingIconProps} />
    {/if}

    <div class={cls.inputWrapper()} onpointerdown={focusTextarea} role="presentation">
      <textarea
        bind:this={textareaEl}
        bind:value
        {id}
        class={cls.input()}
        style={sizeStyle}
        rows={1}
        aria-invalid={invalid}
        aria-required={required}
        {required}
        {disabled}
        {placeholder}
        {...restProps}
        aria-describedby={describedBy}
        {@attach autoGrow}></textarea>

      <label class={cls.label()} for={id}>
        {label}{#if required}<span class={cls.requiredAsterisk()} aria-hidden="true">*</span>{/if}
      </label>
    </div>

    {#if trailingIcon}
      {@render trailingIcon()}
    {:else if trailingIconProps}
      <ButtonIcon
        variant="standard"
        type="button"
        onclick={trailingOnClick}
        class={cls.trailingIcon()}
        iconProps={trailingIconProps}
      ></ButtonIcon>
    {/if}

    {#if variant === 'outlined'}
      <fieldset class={cls.fieldset()} aria-hidden="true">
        <legend class={cls.legend()}>
          <span class={cls.legendLabel()}>{label}{required ? '*' : ''}</span>
        </legend>
      </fieldset>
    {/if}
  </div>

  {#if supportingText || characterLimit != null}
    <div class={cls.supportingText()}>
      {#if supportingText}
        <p id={supportingId}>{@render supportingText()}</p>
      {/if}
      {#if characterLimit != null}
        <p id={counterId} class={cls.counter()}>{length} / {characterLimit}</p>
      {/if}
    </div>
  {/if}
</div>
