import type { Attachment } from 'svelte/attachments';
import { on } from 'svelte/events';

export type DragPoint = { x: number; y: number };

export type DragOptions = {
  /** Stops new drags from starting. A drag already running finishes. */
  disabled?: boolean;
  /**
   * How far (px) the pointer must move before a drag starts. Below it the press stays a plain
   * press, so a click on a draggable button still clicks. `0` starts on pointerdown.
   * @default 0
   */
  threshold?: number;
  /**
   * Touch only: how long (ms) a finger must rest before a drag starts. Moving sooner scrolls the
   * page instead, so a row of draggable things doesn't trap swipes. `0` treats touch like a mouse.
   * @default 0
   */
  touchDelay?: number;
  /** The drag started. */
  onStart?: (event: PointerEvent) => void;
  /** The pointer moved; `offset` is its total travel since the press. */
  onMove?: (offset: DragPoint, event: PointerEvent) => void;
  /**
   * The drag ended. `velocity` (px/s) is the pointer's speed over its last 100ms, for a spring to
   * carry on release; it's zero when the browser cancelled the pointer.
   */
  onEnd?: (velocity: DragPoint) => void;
};

/* Pointer samples older than this don't count towards the release velocity. */
const VELOCITY_WINDOW_MS = 100;
/* How far a resting finger may wander during `touchDelay` before it counts as a scroll. */
const TOUCH_SLOP = 8;

/**
 * Pointer dragging for an element: capture, a start threshold, a long-press delay on touch, and
 * the release velocity. It moves nothing itself: `onMove` gets the pointer's offset and the
 * caller positions things, typically with `resist` at the edges and a Motion spring on release.
 *
 * Options are read through a getter at event time, so changing them never tears down a drag in
 * progress:
 *
 * ```svelte
 * <div {@attach drag(() => ({ threshold: 4, onMove: (o) => (offset = o) }))}>…</div>
 * ```
 *
 * After a drag the click that would follow the release is swallowed, so dragging a button
 * doesn't also press it.
 */
export function drag(getOptions: () => DragOptions): Attachment<HTMLElement> {
  return (node) => {
    let phase: 'idle' | 'pending' | 'dragging' = 'idle';
    let pointerId = -1;
    let origin: DragPoint = { x: 0, y: 0 };
    let samples: { x: number; y: number; t: number }[] = [];
    let touchTimer: ReturnType<typeof setTimeout> | undefined;
    let suppressClick = false;
    let unwatch: (() => void) | undefined;

    const offsetOf = (event: PointerEvent) => ({
      x: event.clientX - origin.x,
      y: event.clientY - origin.y
    });

    const record = (event: PointerEvent) => {
      samples.push({ x: event.clientX, y: event.clientY, t: event.timeStamp });
      samples = samples.filter((sample) => event.timeStamp - sample.t <= VELOCITY_WINDOW_MS);
    };

    const velocity = (): DragPoint => {
      const first = samples[0];
      const last = samples[samples.length - 1];
      const seconds = first && last ? (last.t - first.t) / 1000 : 0;
      if (!seconds) return { x: 0, y: 0 };
      return { x: (last.x - first.x) / seconds, y: (last.y - first.y) / seconds };
    };

    const reset = () => {
      clearTimeout(touchTimer);
      unwatch?.();
      unwatch = undefined;
      phase = 'idle';
      pointerId = -1;
    };

    const capture = () => {
      try {
        node.setPointerCapture(pointerId);
      } catch {
        // Not an active pointer (a synthetic event, or one already gone): drag uncaptured.
      }
    };

    const begin = (event: PointerEvent) => {
      clearTimeout(touchTimer);
      touchTimer = undefined;
      phase = 'dragging';
      // Capturing only now, not on pointerdown: a capture from the start would retarget the
      // click to this node, and a press that never became a drag would lose its click.
      capture();
      getOptions().onStart?.(event);
    };

    const finish = (v: DragPoint) => {
      const wasDragging = phase === 'dragging';
      if (node.hasPointerCapture?.(pointerId)) node.releasePointerCapture(pointerId);
      reset();
      if (!wasDragging) return;
      suppressClick = true;
      // The click, if any, fires synchronously after pointerup; anything later is a new press.
      setTimeout(() => (suppressClick = false));
      getOptions().onEnd?.(v);
    };

    /*
      The whole gesture, pending or dragging, is followed on the window rather than the node.
      Capture alone isn't enough: moving the captured node in the DOM (a list reordering under the
      drag) silently releases it, and then the release would land on some other element and never
      end the drag. Plain listeners, not svelte/events' `on`: that defers pointer listeners to a
      microtask, and these are added mid-gesture, so they must be live for the very next event.
    */
    const watch = () => {
      const onMove = (event: PointerEvent) => {
        if (event.pointerId !== pointerId) return;
        record(event);
        if (phase === 'dragging') {
          // The button came up somewhere we didn't hear about (outside the window, uncaptured).
          if (event.pointerType === 'mouse' && event.buttons === 0) return finish(velocity());
          getOptions().onMove?.(offsetOf(event), event);
          return;
        }
        const { threshold = 0 } = getOptions();
        const moved = Math.hypot(event.clientX - origin.x, event.clientY - origin.y);
        if (event.pointerType === 'touch' && touchTimer !== undefined) {
          // Moved before the long press: it's a scroll, not a drag.
          if (moved > TOUCH_SLOP) reset();
          return;
        }
        if (moved >= threshold) {
          begin(event);
          getOptions().onMove?.(offsetOf(event), event);
        }
      };
      const onUp = (event: PointerEvent) => {
        if (event.pointerId !== pointerId) return;
        if (phase === 'dragging') finish(velocity());
        else reset();
      };
      const onCancel = (event: PointerEvent) => {
        if (event.pointerId !== pointerId) return;
        if (phase === 'dragging') finish({ x: 0, y: 0 });
        else reset();
      };
      // Capture lost mid-drag (the node moved): take it back, so a release outside the browser
      // window still reaches us.
      const onLostCapture = (event: PointerEvent) => {
        if (phase === 'dragging' && event.pointerId === pointerId && node.isConnected) capture();
      };
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
      window.addEventListener('pointercancel', onCancel);
      node.addEventListener('lostpointercapture', onLostCapture);
      return () => {
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
        window.removeEventListener('pointercancel', onCancel);
        node.removeEventListener('lostpointercapture', onLostCapture);
      };
    };

    const offDown = on(node, 'pointerdown', (event) => {
      if (phase !== 'idle' || !event.isPrimary || event.button !== 0) return;
      const { disabled, threshold = 0, touchDelay = 0 } = getOptions();
      if (disabled) return;
      pointerId = event.pointerId;
      origin = { x: event.clientX, y: event.clientY };
      samples = [{ x: event.clientX, y: event.clientY, t: event.timeStamp }];
      unwatch = watch();

      if (event.pointerType === 'touch' && touchDelay > 0) {
        phase = 'pending';
        touchTimer = setTimeout(() => {
          touchTimer = undefined;
          begin(event);
        }, touchDelay);
        return;
      }
      if (threshold > 0) {
        phase = 'pending';
        return;
      }
      begin(event);
    });

    // A touch drag started by a long press: stop the page from scrolling under it. Needs a
    // non-passive listener; touch-action can't be switched once the gesture has begun.
    const offTouchMove = on(
      node,
      'touchmove',
      (event) => {
        if (phase === 'dragging') event.preventDefault();
      },
      { passive: false }
    );

    // The long press would otherwise open the context menu or the text callout.
    const offContextMenu = on(node, 'contextmenu', (event) => {
      if (phase !== 'idle') event.preventDefault();
    });

    const offClick = on(
      node,
      'click',
      (event) => {
        if (!suppressClick) return;
        event.preventDefault();
        event.stopPropagation();
      },
      { capture: true }
    );

    return () => {
      reset();
      offDown();
      offTouchMove();
      offContextMenu();
      offClick();
    };
  };
}

/*
  Share of the overshoot still applied at the edge, shrinking the further it's pulled. The
  UIScrollView rubber-band constant; M3 has no token for this, tune by eye.
*/
const RUBBER_BAND = 0.55;

/** Resisted overshoot: the further past the edge, the less it follows. */
function rubberBand(overshoot: number, limit: number) {
  return (1 - 1 / ((overshoot * RUBBER_BAND) / limit + 1)) * limit;
}

/**
 * `value` clamped to `[min, max]` with rubber-banding instead of a wall: past an edge it keeps
 * following the pointer, less and less. `size` is the scale of the resistance, usually the
 * extent of the bounds on that axis.
 */
export function resist(value: number, min: number, max: number, size: number) {
  if (value < min) return min - rubberBand(min - value, size);
  if (value > max) return max + rubberBand(value - max, size);
  return value;
}
