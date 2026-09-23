import type { Attachment } from 'svelte/attachments';
import { on } from 'svelte/events';

/**
 * Calls `handler` when a click lands outside the element. Listens in the capture phase so
 * it still fires when something inside the page stops propagation.
 *
 * Attach it conditionally so the document listener only exists while there is something to
 * dismiss:
 *
 * ```svelte
 * <div {@attach open && clickOutside(() => (open = false))}>...</div>
 * ```
 */
export function clickOutside(handler: (event: MouseEvent) => void): Attachment<HTMLElement> {
  return (node) =>
    on(
      document,
      'click',
      (event) => {
        if (!event.composedPath().includes(node)) handler(event);
      },
      { capture: true }
    );
}
