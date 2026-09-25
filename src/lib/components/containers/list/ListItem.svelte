<script lang="ts">
  import { Icon, Layer } from '$lib/utils/index.js';
  import clsx from 'clsx';
  import { listItem } from './theme.js';
  import { getListContext, type SelectionRect } from './context.js';
  import { untrack } from 'svelte';
  import { animate, type AnimationPlaybackControlsWithThen } from 'motion';
  import { springTokens, springTransition } from '$lib/animation/spring.js';
  import type { ListitemProps } from './types.js';
  import Badge from '../../badge/Badge.svelte';

  let {
    leading,
    overline = '',
    headline = '',
    supporting = '',
    trailing,
    trailingText,
    badge,
    selected,
    disabled = false,
    children,
    expanded = $bindable(false),
    class: className,
    asChild = false,
    lines = overline && supporting ? 3 : overline || supporting ? 2 : 1,
    ...restProps
  }: ListitemProps = $props();

  const uid = $props.id();
  const ctx = getListContext();

  const rest = $derived(restProps as Record<string, unknown>);
  const expandable = $derived(!!children);
  // Expandable items are always a button; otherwise the props pick the element.
  const tag = $derived(
    expandable || 'onclick' in rest
      ? 'button'
      : 'label' in rest
        ? 'label'
        : rest.href != null && rest.href !== ''
          ? 'a'
          : 'div'
  );
  const isOption = $derived(rest.role === 'option');
  const interactive = $derived(!disabled && (tag !== 'div' || isOption));

  const cls = $derived(
    listItem({
      lines,
      selected: !!selected,
      disabled,
      interactive,
      variant: ctx?.variant ?? 'standard',
      expanded: expandable ? expanded : undefined
    })
  );

  /*
    The selected fill travels. Before an update, the item losing the selection leaves where its
    fill is drawn (mid-flight too) in the List's context; after it, the item gaining the
    selection springs its new fill over from there, on spatial: a sizeable move, and part of a
    navigation, so no fastSpatial bounce. Without a List, or with several items selected or
    deselected at once, the fill just appears where it belongs. Reduced motion skips the ride.
  */
  const showFill = $derived(!!selected && !disabled);
  let fill = $state<HTMLElement>();
  let travelling = $state(false);
  let wasShown = untrack(() => showFill);
  let ride: AnimationPlaybackControlsWithThen | undefined;

  const measure = (el: HTMLElement): SelectionRect | null => {
    const box = ctx?.element?.getBoundingClientRect();
    if (!box) return null;
    const r = el.getBoundingClientRect();
    return {
      top: r.top - box.top,
      bottom: r.bottom - box.top,
      left: r.left - box.left,
      right: r.right - box.left
    };
  };

  $effect.pre(() => {
    const shown = showFill;
    untrack(() => {
      if (!wasShown || shown || !ctx || !fill) return;
      ctx.from = measure(fill);
      ride?.stop();
      travelling = false;
      // Only for this update: a deselect with no select after it leaves nothing behind.
      queueMicrotask(() => (ctx.from = null));
    });
  });

  $effect(() => {
    const shown = showFill;
    untrack(() => {
      const gained = shown && !wasShown;
      wasShown = shown;
      const from = ctx?.from;
      if (!gained || !from || !fill) return;
      ctx!.from = null;
      const to = measure(fill);
      if (!to || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      // Above the items it passes over, which are the item's siblings.
      travelling = true;
      ride = animate(
        fill,
        {
          top: [`${from.top - to.top}px`, '0px'],
          bottom: [`${to.bottom - from.bottom}px`, '0px'],
          left: [`${from.left - to.left}px`, '0px'],
          right: [`${to.right - from.right}px`, '0px']
        },
        springTransition(springTokens.spatial)
      );
      ride.then(() => (travelling = false));
    });
  });

  $effect(() => () => ride?.stop());

  const attrs = $derived.by(() => {
    const { label: _, href, onclick, ...extra } = rest;
    const a: Record<string, unknown> = { ...extra };
    if (tag === 'button') {
      a.type = 'button';
      a.disabled = disabled;
      a.onclick = (e: MouseEvent) => {
        (onclick as ((e: MouseEvent) => void) | undefined)?.(e);
        if (expandable && !e.defaultPrevented) expanded = !expanded;
      };
      if (expandable) {
        a['aria-expanded'] = expanded;
        a['aria-controls'] = `${uid}-nested`;
      } else if (selected !== undefined && !isOption) a['aria-pressed'] = selected;
    } else if (tag === 'a') {
      // A disabled link has no href, so it's not focusable or followable.
      if (disabled) {
        a.role = 'link';
        a['aria-disabled'] = true;
      } else a.href = href;
      if (selected) a['aria-current'] = 'page';
    } else if (disabled) a['aria-disabled'] = true;
    if (isOption) a['aria-selected'] = !!selected;
    return a;
  });
</script>

{#snippet content()}
  {#if showFill}
    <span bind:this={fill} class={cls.selection()} aria-hidden="true"></span>
  {/if}
  {#if interactive}
    <Layer />
  {/if}
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
  {#if trailing || trailingText || badge !== undefined || expandable}
    <div class={cls.trailing()}>
      {#if trailingText}
        <span class={cls.trailingText()}>{trailingText}</span>
      {/if}
      {@render trailing?.()}
      {#if badge !== undefined}
        <Badge
          size={badge === true ? 'sm' : 'lg'}
          number={badge === true ? undefined : (badge as number)}
          standalone
        />
      {/if}
      {#if expandable}
        <span class={cls.expandIcon()} aria-hidden="true">
          <Icon name="keyboard_arrow_down" size="sm" />
        </span>
      {/if}
    </div>
  {/if}
{/snippet}

{#snippet item()}
  <svelte:element
    this={tag}
    class={cls.base({ class: clsx(className, travelling && 'z-10') })}
    {...attrs}
  >
    {@render content()}
  </svelte:element>
  {#if children}
    <div class={cls.region()} inert={!expanded}>
      <div class={cls.regionInner()}>
        <ul id="{uid}-nested" class={cls.nested()}>
          {@render children()}
        </ul>
      </div>
    </div>
  {/if}
{/snippet}

{#if asChild && !expandable}
  {@render item()}
{:else if asChild}
  <div class={cls.group()}>{@render item()}</div>
{:else}
  <li class={expandable ? cls.group() : undefined}>
    {@render item()}
  </li>
{/if}
