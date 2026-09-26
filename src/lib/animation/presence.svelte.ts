import { animate, type AnimationPlaybackControlsWithThen } from 'motion';
import { untrack } from 'svelte';
import type { Attachment } from 'svelte/attachments';
import type { PresenceTransition } from './enterExit.js';

const fromTo = (from: object, to: object) =>
  Object.fromEntries(
    Object.entries(to).map(([key, value]) => [key, [(from as Record<string, unknown>)[key], value]])
  );

/**
 * Enter/exit attachment driven by Motion's `animate()`. Plays `transition.enter` from `hidden` to
 * `shown` when the element mounts open, and `transition.exit` to `exited` (default `hidden`) when
 * `isOpen()` turns false. Applies `transition.origin` as the element's `transform-origin`. Reopening mid-exit (or closing mid-enter) retargets from the current value — the
 * spring keeps its velocity instead of restarting.
 *
 * Inside bits-ui content (`Popover.Content`, `DropdownMenu.Content`, `Dialog.Content`, …) drop
 * `forceMount` and attach this to the element receiving `props`: bits-ui's presence layer waits
 * for that element's `getAnimations()` before unmounting, and Motion runs transform/opacity
 * through WAAPI, so the exit plays out in full.
 *
 * ```svelte
 * <Popover.Content>
 *   {#snippet child({ wrapperProps, props, open })}
 *     <div {...wrapperProps}>
 *       <div {...props} {@attach presence(() => open, enterExit.scale)}>…</div>
 *     </div>
 *   {/snippet}
 * </Popover.Content>
 * ```
 *
 * Outside bits-ui, use {@link Presence} so the element stays mounted until the exit finishes.
 */
export const presence =
  (
    isOpen: () => boolean,
    transition: PresenceTransition,
    onExitComplete?: () => void
  ): Attachment<HTMLElement> =>
  (node) => {
    let controls: AnimationPlaybackControlsWithThen | undefined;
    let started = false;
    let settleTimer: ReturnType<typeof setTimeout> | undefined;

    if (transition.origin) node.style.transformOrigin = transition.origin;

    $effect(() => {
      const open = isOpen();
      untrack(() => {
        const { hidden, shown, exited = hidden, enter, exit } = transition;
        clearTimeout(settleTimer);
        if (open) {
          controls = animate(node, started ? shown : fromTo(hidden, shown), enter);
        } else {
          const current = (controls = animate(node, exited, exit));
          current.then(() => {
            if (controls === current) onExitComplete?.();
          });
          settleTimer = setTimeout(() => {
            if (controls === current) settle(node);
          }, exitDeadline(current));
        }
        started = true;
      });
    });

    return () => {
      clearTimeout(settleTimer);
      controls?.stop();
    };
  };

/*
  bits-ui unmounts its content only once every animation on it has settled, and `Presence` once
  Motion's exit resolves. On touch devices a closed menu was reported staying mounted, one per
  open, stacking up (#53): some animation on the node never settled. So once the exit has had its
  time, whatever is still running or paused there is finished (or cancelled, if it can't be),
  which settles bits-ui's wait and the exit's promise.
*/
const EXIT_DEADLINE_MARGIN_MS = 150;
const EXIT_DEADLINE_FALLBACK_MS = 1000;

const exitDeadline = (controls: AnimationPlaybackControlsWithThen) => {
  const seconds = controls.duration;
  return Number.isFinite(seconds) && seconds > 0
    ? seconds * 1000 + EXIT_DEADLINE_MARGIN_MS
    : EXIT_DEADLINE_FALLBACK_MS;
};

const settle = (node: HTMLElement) => {
  for (const animation of node.getAnimations?.() ?? []) {
    if (animation.playState === 'finished') continue;
    try {
      animation.finish();
    } catch {
      animation.cancel();
    }
  }
};

/**
 * Keeps an element mounted until its exit animation finishes — the Motion replacement for a
 * Svelte `out:` transition. Construct during component init.
 *
 * ```svelte
 * <script>
 *   const sheet = new Presence(() => open);
 * </script>
 *
 * {#if sheet.mounted}
 *   <div {@attach sheet.attach(enterExit.sideSheet)}>…</div>
 * {/if}
 * ```
 */
export class Presence {
  #isOpen: () => boolean;
  // Plain field on purpose: set while open, read after close to hold the element for its exit.
  #held = false;
  #exits = $state(0);

  constructor(isOpen: () => boolean) {
    this.#isOpen = isOpen;
  }

  /** True while open, and while the exit animation is still playing. */
  mounted = $derived.by(() => {
    void this.#exits;
    if (this.#isOpen()) this.#held = true;
    return this.#held;
  });

  attach = (transition: PresenceTransition) =>
    presence(this.#isOpen, transition, () => {
      this.#held = false;
      this.#exits++;
    });
}
