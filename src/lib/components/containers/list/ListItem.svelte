<script lang="ts">
  import { Layer } from '$lib/utils/index.js';
  import { listiem } from './theme.js';
  import type { ListitemProps } from './types.js';

  let {
    leading,
    overline = '',
    headline = '',
    supporting = '',
    trailing,
    selected,
    class: className,
    asChild = false,
    lines = overline && supporting ? 3 : overline || supporting ? 2 : 1,
    ...restProps
  }: ListitemProps = $props();

  const cls = $derived(listiem({ lines, selected }));
</script>

{#snippet content()}
  {#if leading}
    <div class={cls.leading()}>
      {@render leading()}
    </div>
  {/if}
  <div class={cls.body()}>
    {#if overline}
      <p class={cls.overline()}>{overline}</p>
    {/if}
    <p class={cls.headline()}>{headline}</p>
    {#if supporting}
      <p class={cls.supporting()}>{supporting}</p>
    {/if}
  </div>
  {#if trailing}
    <div class={cls.trailing()}>
      {@render trailing()}
    </div>
  {/if}
{/snippet}

{#snippet action()}
  {#if 'label' in restProps}
    {@const { label: _, ...extra } = restProps}
    <label class={cls.base()} {...extra}>
      <Layer />
      {@render content()}
    </label>
  {:else if 'onclick' in restProps}
    <button type="button" class={cls.base()} {...restProps}>
      <Layer />
      {@render content()}
    </button>
  {:else if 'href' in restProps && restProps.href != null && restProps.href !== ''}
    {@const { href, ...extra } = restProps as typeof restProps & {
      href?: string | null;
    }}
    <a class={cls.base()} {href} {...extra}>
      <Layer />
      {@render content()}
    </a>
  {:else}
    {@const { href: _, ...extra } = restProps as Record<string, unknown>}
    <div class={cls.base()} {...extra}>
      <Layer />
      {@render content()}
    </div>
  {/if}
{/snippet}

{#if asChild}
  {@render action()}
{:else}
  <li>
    {@render action()}
  </li>
{/if}
