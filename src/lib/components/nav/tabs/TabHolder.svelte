<!--
@component
Material 3 Tabs container.

Wraps bits-ui Tabs.Root + Tabs.List and renders a sliding active indicator.
Use TabContent for content-panel tabs; omit it for navigation (href) tabs.
Switching panels runs the M3 lateral transition: the new panel pushes the old one out in the
direction of the selected tab.

@see https://m3.material.io/components/tabs/overview
-->
<script lang="ts">
  import { lateral } from '$lib/animation/index.js';
  import { tabHolder } from './theme.js';
  import type { TabHolderProps } from './types.js';
  import Tab from './Tab.svelte';
  import { Tabs } from 'bits-ui';
  import { tick, type Snippet } from 'svelte';

  let {
    items,
    value = $bindable(items[0]?.value ?? ''),
    onValueChange,
    activationMode = 'automatic',
    variant = 'primary',
    rounded = false,
    children
  }: TabHolderProps & { children?: Snippet } = $props();

  const idx = $derived(items.findIndex((i) => i.value === value));
  const count = $derived(items.length);
  const { base, bar } = $derived(tabHolder({ rounded }));

  let panels = $state<HTMLElement>();

  /**
   * Tabs are peers, so switching panels is the M3 lateral transition: the new panel pushes the
   * old one out toward the side of the newly selected tab. Navigation (href) tabs have no panels
   * here — the route change is the app's to animate.
   * https://m3.material.io/styles/motion/transitions/transition-patterns#lateral
   */
  const select = (next: string) => {
    const from = idx;
    const to = items.findIndex((i) => i.value === next);
    const update = async () => {
      value = next;
      await tick();
    };
    if (!children || !panels || from === -1 || to === -1 || from === to) return void update();
    lateral(update, { target: panels, direction: to > from ? 'forward' : 'backward' });
  };
</script>

<Tabs.Root bind:value={() => value, select} {onValueChange} {activationMode}>
  <Tabs.List class={base()}>
    {#each items as item (item)}
      <Tab {...item} {variant} />
    {/each}

    <div
      class={bar()}
      style="width: calc(100% / {count}); transform: translateX(calc({idx} * 100%));"
    ></div>
  </Tabs.List>

  {#if children}
    <div bind:this={panels}>
      {@render children()}
    </div>
  {/if}
</Tabs.Root>
