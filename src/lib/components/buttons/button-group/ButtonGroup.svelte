<!--
@component
A standard button group: an invisible container that spaces buttons and adds an interaction
between neighbours. Pressing a button widens it by 15% while the buttons beside it narrow to
make room, on the fast spatial spring; a toggle inside also swaps its shape as it's selected.
Children keep their own style, so filled, tonal and outlined buttons and icon buttons mix freely.

For a set of related options where one or more is selected, use `ConnectedButtonGroup`.

@see https://m3.material.io/components/button-groups/specs
-->
<script lang="ts">
  import clsx from 'clsx';
  import { animate } from 'motion';
  import type { Attachment } from 'svelte/attachments';
  import { springTokens, springTransition } from '$lib/animation/spring.js';
  import { buttonGroup } from './theme.js';
  import type { ButtonGroupProps } from './types.js';

  let {
    orientation = 'horizontal',
    size = 'sm',
    children,
    'aria-label': ariaLabel,
    class: className
  }: ButtonGroupProps = $props();

  const cls = $derived(buttonGroup({ orientation, size }));

  const GROW = 0.15;
  const spring = springTransition(springTokens.fastSpatial);
  const reducedMotion = () =>
    typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // The pressed button and its neighbours, with their widths before the press.
  type Press = { items: { el: HTMLElement; width: number; to: number }[] };

  const squeeze: Attachment<HTMLElement> = (group) => {
    let press: Press | null = null;
    // Widths at rest, kept while a release is still settling so a quick re-press starts from them.
    const rest = new WeakMap<HTMLElement, number>();

    const isEnabled = (el: Element | null): el is HTMLElement =>
      el instanceof HTMLElement &&
      !el.matches(':disabled, [aria-disabled="true"], [data-disabled]');

    const itemOf = (target: EventTarget | null) => {
      if (!(target instanceof Node)) return null;
      let el = target instanceof Element ? target : target.parentElement;
      while (el && el.parentElement !== group) el = el.parentElement;
      return el && isEnabled(el) ? el : null;
    };

    const widthOf = (el: HTMLElement) => {
      if (!rest.has(el)) rest.set(el, el.getBoundingClientRect().width);
      return rest.get(el)!;
    };

    const start = (el: HTMLElement) => {
      if (orientation !== 'horizontal' || press || reducedMotion()) return;
      const width = widthOf(el);
      const neighbours = [el.previousElementSibling, el.nextElementSibling].filter(isEnabled);
      const share = (width * GROW) / Math.max(neighbours.length, 1);
      press = {
        items: [
          { el, width, to: width * (1 + GROW) },
          ...neighbours.map((n) => {
            const w = widthOf(n);
            return { el: n, width: w, to: Math.max(w - share, 0) };
          })
        ]
      };
      for (const { el: item, to } of press.items) animate(item, { width: `${to}px` }, spring);
    };

    const end = () => {
      if (!press) return;
      const { items } = press;
      press = null;
      for (const { el, width } of items) {
        animate(el, { width: `${width}px` }, spring).then(() => {
          // Hand the width back to the layout, unless a new press picked this button up.
          if (press?.items.some((i) => i.el === el)) return;
          el.style.width = '';
          rest.delete(el);
        });
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      const el = itemOf(e.target);
      if (el) start(el);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat || (e.key !== ' ' && e.key !== 'Enter')) return;
      const el = itemOf(e.target);
      if (el) start(el);
    };

    group.addEventListener('pointerdown', onPointerDown);
    group.addEventListener('keydown', onKeyDown);
    group.addEventListener('keyup', end);
    window.addEventListener('pointerup', end);
    window.addEventListener('pointercancel', end);
    return () => {
      group.removeEventListener('pointerdown', onPointerDown);
      group.removeEventListener('keydown', onKeyDown);
      group.removeEventListener('keyup', end);
      window.removeEventListener('pointerup', end);
      window.removeEventListener('pointercancel', end);
    };
  };
</script>

<div
  role="group"
  aria-label={ariaLabel}
  data-orientation={orientation}
  class={cls.root({ class: clsx(className) })}
  {@attach squeeze}
>
  {@render children()}
</div>
