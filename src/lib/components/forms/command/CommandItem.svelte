<!--
@component
A command in a `Command` or `CommandDialog`: an M3 list item. The children are its headline; add a
`leading` icon, `supporting` text, and a `shortcut` (shown, not bound) or other `trailingText`.
-->
<script lang="ts">
  import { Command } from 'bits-ui';
  import clsx from 'clsx';
  import { Layer, isApplePlatform, shortcutLabel } from '$lib/utils/index.js';
  import { commandItem } from './theme.js';
  import type { CommandItemProps } from './types.js';

  let {
    children,
    leading,
    supporting,
    trailingText,
    shortcut,
    disabled = false,
    class: className,
    value,
    ...restProps
  }: CommandItemProps = $props();

  // `Mod` resolves on the client, so SSR and the first render agree.
  let apple = $state(false);
  $effect(() => {
    apple = isApplePlatform();
  });

  const trailing = $derived(shortcut ? shortcutLabel(shortcut, apple) : trailingText);
  const cls = $derived(commandItem({ lines: supporting ? 2 : 1, disabled }));
</script>

<Command.Item {...restProps} {value} {disabled}>
  {#snippet child({ props })}
    <div {...props} class={cls.base({ class: clsx(className) })}>
      {#if !disabled}
        <Layer />
      {/if}
      {#if leading}
        <div class={cls.leading()} aria-hidden="true">{@render leading()}</div>
      {/if}
      <div class={cls.body()}>
        <span class={cls.headline()}>{@render children()}</span>
        {#if supporting}
          <span class={cls.supporting()}>{supporting}</span>
        {/if}
      </div>
      {#if trailing}
        <div class={cls.trailing()}>
          <span class={cls.trailingText()}>{trailing}</span>
        </div>
      {/if}
    </div>
  {/snippet}
</Command.Item>
