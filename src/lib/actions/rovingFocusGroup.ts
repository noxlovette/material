const NEXT_KEYS = new Set(['ArrowDown', 'j']);
const PREV_KEYS = new Set(['ArrowUp', 'k']);

export type RovingFocusGroupParams = {
  /** CSS selector (relative to the node) matching the focusable candidates. */
  candidateSelector: string;
  /** Loop from the last candidate back to the first (and vice versa). */
  loop?: boolean;
  /** Disable the group without unmounting it (leaves existing tabindex/focus alone). */
  enabled?: boolean;
};

/**
 * Roving-tabindex keyboard navigation for a group of sibling elements (e.g. table rows,
 * list items): only one candidate is ever a Tab stop, and ArrowDown/ArrowUp (plus the
 * j/k vim aliases) move focus — and the roving tab stop — between candidates. Tab and
 * Shift+Tab keep working natively since they only ever see the single active tabindex=0
 * candidate. Modeled on bits-ui's RovingFocusGroup (packages/bits-ui/src/lib/internal/
 * roving-focus-group.ts), adapted to a plain Svelte action instead of a headless class.
 */
export function rovingFocusGroup(node: HTMLElement, params: RovingFocusGroupParams) {
  let p = params;

  function candidates() {
    return Array.from(node.querySelectorAll<HTMLElement>(p.candidateSelector));
  }

  function setup() {
    if (!p.enabled) return;
    const items = candidates();
    if (!items.length) return;
    const active = items.includes(document.activeElement as HTMLElement)
      ? (document.activeElement as HTMLElement)
      : items[0];
    for (const item of items) {
      item.tabIndex = item === active ? 0 : -1;
    }
  }

  function handleFocusIn(event: FocusEvent) {
    if (!p.enabled) return;
    const items = candidates();
    const target = event.target as HTMLElement;
    if (!items.includes(target)) return;
    for (const item of items) {
      item.tabIndex = item === target ? 0 : -1;
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (!p.enabled) return;
    const target = event.target as HTMLElement;
    const items = candidates();
    const index = items.indexOf(target);
    if (index === -1) return;

    let nextIndex: number | undefined;
    if (NEXT_KEYS.has(event.key)) nextIndex = index + 1;
    else if (PREV_KEYS.has(event.key)) nextIndex = index - 1;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = items.length - 1;

    if (nextIndex === undefined) return;

    if (nextIndex < 0) nextIndex = p.loop ? items.length - 1 : 0;
    else if (nextIndex >= items.length) nextIndex = p.loop ? 0 : items.length - 1;

    const nextItem = items[nextIndex];
    if (!nextItem || nextItem === target) return;

    event.preventDefault();
    nextItem.focus();
  }

  setup();
  node.addEventListener('keydown', handleKeydown);
  node.addEventListener('focusin', handleFocusIn);

  return {
    update(newParams: RovingFocusGroupParams) {
      p = newParams;
      setup();
    },
    destroy() {
      node.removeEventListener('keydown', handleKeydown);
      node.removeEventListener('focusin', handleFocusIn);
    }
  };
}
