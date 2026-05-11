<!--
@component
Tooltips provide informative text when users hover over, focus on, or tap an element.
Plain tooltips are used for simple labels, while rich tooltips can contain formatted text and images.

@see https://m3.material.io/components/tooltips/overview
-->
<script lang="ts">
  import clsx from 'clsx';
  import Body from '../../typography/body/Body.svelte';
  import Title from '../../typography/title/Title.svelte';
  import { Layer } from '$lib/utils/index.js';
  import { tooltip } from './theme.js';
  import type { TooltipProps } from './types.js';
  import { Tooltip } from 'bits-ui';
  import { enterExit, easeEmphasizedDecel, easeEmphasizedAccel } from '$lib/animation/index.js';

  let {
    subhead,
    supportingText,
    children,
    trigger,
    triggerClass,
    delayDuration = 100,
    class: className,
    variant = 'snack',
    style = 'container',
    isOpen = $bindable(false),
    showArrow = false,
    triggerProps = {},
    contentProps = {},
    ...restProps
  }: TooltipProps = $props();

  const {
    subhead: subheadCls,
    base,
    trigger: triggerCls,
    supportingText: supportingTextCls
  } = $derived(tooltip({ variant, style }));

  const baseCls = $derived(base({ class: clsx(className) }));

  /**
   * ButtonIcons always have tooltips on, but not always with text
   * This ensures we don't get ugly rectangles then
   */
  const hasTooltipContent = $derived(
    Boolean(supportingText || subhead || (variant === 'rich' && children))
  );
</script>

<Tooltip.Root {...restProps} {delayDuration} bind:open={isOpen}>
  <Tooltip.Trigger {...triggerProps} class={triggerCls({ class: clsx(triggerClass) })}>
    {@render trigger?.()}
  </Tooltip.Trigger>
  <Tooltip.Portal>
    {#if showArrow}
      <Tooltip.Arrow />
    {/if}

    {#if hasTooltipContent}
      <Tooltip.Content {...contentProps} forceMount>
        {#snippet child({ wrapperProps, props, open })}
          {#if open}
            <div {...wrapperProps} class={wrapperProps.class as any}>
              <div
                {...props}
                class={clsx(baseCls, props.class as any)}
                in:enterExit={{
                  duration: variant === 'rich' ? 200 : 150,
                  easing: easeEmphasizedDecel,
                  mode: 'scale'
                }}
                out:enterExit={{
                  duration: variant === 'rich' ? 150 : 75,
                  easing: easeEmphasizedAccel,
                  mode: 'scale'
                }}
              >
                {#if variant === 'rich'}
                  <Layer />
                  {#if subhead}
                    <Title class={subheadCls()}>
                      {subhead}
                    </Title>
                  {/if}
                  <Body class={supportingTextCls()}>
                    {supportingText}
                  </Body>
                  {@render children?.()}
                {:else if supportingText}
                  <Body class={supportingTextCls()}>
                    {supportingText}
                  </Body>
                {/if}
              </div>
            </div>
          {/if}
        {/snippet}
      </Tooltip.Content>
    {/if}
  </Tooltip.Portal>
</Tooltip.Root>
