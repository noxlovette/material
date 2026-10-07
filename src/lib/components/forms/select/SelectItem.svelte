<script lang="ts">
  import { Select } from 'bits-ui';
  import type { Snippet } from 'svelte';

  import { Icon } from '#lib/utils/index.js';

  import { select as selectCls } from './theme.js';

  let {
    value,
    label,
    disabled = false,
    disableClipping = false,
    class: className,
    children
  }: {
    value: string;
    label?: string;
    disabled?: boolean;
    /**
     * Allows the default option label to wrap instead of clipping.
     * @default false
     */
    disableClipping?: boolean;
    class?: string;
    children?: Snippet<[{ selected: boolean; highlighted: boolean }]>;
  } = $props();

  const cls = $derived(selectCls({ disableClipping }));
</script>

<Select.Item {value} label={label ?? value} {disabled} class={cls.item({ class: className })}>
  {#snippet children({ selected, highlighted })}
    {#if children}
      {@render children({ selected, highlighted })}
    {:else}
      <span class={cls.itemLabel()}>{label ?? value}</span>
      {#if selected}
        <Icon name="check" class="size-spacing-250 shrink-0" />
      {/if}
    {/if}
  {/snippet}
</Select.Item>
