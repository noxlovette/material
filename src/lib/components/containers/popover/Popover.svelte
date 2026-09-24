<!--
@component
Popovers display rich content in a non-modal overlay anchored to a trigger element.

@see https://m3.material.io/components/dialogs/overview (non-modal surface variant)
-->
<script lang="ts">
  import { enterExit, presence } from '$lib/animation/index.js';
  import { Popover } from 'bits-ui';
  import clsx from 'clsx';
  import { popover } from './theme.js';
  import type { PopoverProps } from './types.js';
  import ButtonIcon from '../../buttons/ButtonIcon.svelte';
  import Title from '../../typography/title/Title.svelte';
  let {
    trigger,
    children,
    title,
    showClose = true,
    open = $bindable(false),
    side = 'bottom',
    align = 'start',
    sideOffset = 8,
    class: className
  }: PopoverProps = $props();

  const { base, header, title: titleCls, close } = popover();
</script>

<Popover.Root bind:open>
  <Popover.Trigger>
    {#snippet child({ props })}
      {@render trigger(props)}
    {/snippet}
  </Popover.Trigger>

  <Popover.Portal>
    <Popover.Content {side} {align} {sideOffset}>
      {#snippet child({ wrapperProps, props, open: isOpen })}
        <div {...wrapperProps} class={wrapperProps.class as any}>
          <div
            {...props}
            class={base({ class: clsx(className, props.class as any) })}
            {@attach presence(() => isOpen, enterExit.scale)}
          >
            {#if title || showClose}
              <div class={header()}>
                {#if title}
                  <Title class={titleCls()}>{title}</Title>
                {/if}
                {#if showClose}
                  <Popover.Close>
                    {#snippet child({ props: closeProps })}
                      <div class={close()}>
                        <ButtonIcon
                          {...closeProps}
                          iconProps={{ name: 'close' }}
                          variant="standard"
                          size="sm"
                        />
                      </div>
                    {/snippet}
                  </Popover.Close>
                {/if}
              </div>
            {/if}
            {@render children()}
          </div>
        </div>
      {/snippet}
    </Popover.Content>
  </Popover.Portal>
</Popover.Root>
