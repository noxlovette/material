// @vitest-environment jsdom
import { flushSync, mount, unmount } from 'svelte';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Fixture from './drag.fixture.test.svelte';
import { resist, type DragOptions } from './drag.js';

const box = () => document.querySelector<HTMLElement>('[data-testid="box"]')!;
const button = () => document.querySelector<HTMLElement>('[data-testid="button"]')!;

const pointer = (target: EventTarget, type: string, x: number, y = 0, pointerType = 'mouse') =>
  target.dispatchEvent(
    new PointerEvent(type, {
      bubbles: true,
      cancelable: true,
      pointerId: 1,
      isPrimary: true,
      button: 0,
      // Held while pressed and moving, as a real mouse reports it; released on pointerup.
      buttons: type === 'pointerup' ? 0 : 1,
      pointerType,
      clientX: x,
      clientY: y
    })
  );

const click = () => button().dispatchEvent(new MouseEvent('click', { bubbles: true }));

function setup(options: Partial<DragOptions> = {}) {
  const callbacks = { onStart: vi.fn(), onMove: vi.fn(), onEnd: vi.fn() };
  const onclick = vi.fn();
  const app = mount(Fixture, {
    target: document.body,
    props: { options: { ...callbacks, ...options }, onclick }
  });
  flushSync();
  return { ...callbacks, onclick, app };
}

describe('drag', () => {
  let app: ReturnType<typeof mount> | undefined;
  beforeEach(() => vi.useRealTimers());
  afterEach(() => {
    if (app) unmount(app);
    app = undefined;
    document.body.innerHTML = '';
  });

  it('starts on pointerdown without a threshold and reports the offset', () => {
    const s = setup();
    app = s.app;
    pointer(button(), 'pointerdown', 10, 10);
    expect(s.onStart).toHaveBeenCalledOnce();
    pointer(box(), 'pointermove', 40, 25);
    expect(s.onMove).toHaveBeenLastCalledWith({ x: 30, y: 15 }, expect.any(PointerEvent));
  });

  it('stays a press until the pointer passes the threshold', () => {
    const s = setup({ threshold: 4 });
    app = s.app;
    pointer(button(), 'pointerdown', 0);
    pointer(document.body, 'pointermove', 3);
    expect(s.onStart).not.toHaveBeenCalled();
    pointer(document.body, 'pointermove', 6);
    expect(s.onStart).toHaveBeenCalledOnce();
    expect(s.onMove).toHaveBeenLastCalledWith({ x: 6, y: 0 }, expect.any(PointerEvent));
  });

  it('lets a press that never became a drag click', () => {
    const s = setup({ threshold: 4 });
    app = s.app;
    pointer(button(), 'pointerdown', 0);
    pointer(document.body, 'pointermove', 2);
    pointer(document.body, 'pointerup', 2);
    click();
    expect(s.onEnd).not.toHaveBeenCalled();
    expect(s.onclick).toHaveBeenCalledOnce();
  });

  it('swallows the click that follows a drag, and only that one', async () => {
    const s = setup({ threshold: 4 });
    app = s.app;
    pointer(button(), 'pointerdown', 0);
    pointer(document.body, 'pointermove', 20);
    pointer(box(), 'pointerup', 20);
    expect(s.onEnd).toHaveBeenCalledOnce();
    click();
    expect(s.onclick).not.toHaveBeenCalled();
    await new Promise((resolve) => setTimeout(resolve));
    click();
    expect(s.onclick).toHaveBeenCalledOnce();
  });

  it('follows the drag and its release anywhere on the page, not just over the node', () => {
    const s = setup();
    app = s.app;
    pointer(button(), 'pointerdown', 0);
    pointer(document.body, 'pointermove', 300);
    expect(s.onMove).toHaveBeenLastCalledWith({ x: 300, y: 0 }, expect.any(PointerEvent));
    pointer(document.body, 'pointerup', 300);
    expect(s.onEnd).toHaveBeenCalledOnce();
    // Over: later moves don't drag.
    pointer(document.body, 'pointermove', 400);
    expect(s.onMove).toHaveBeenCalledTimes(1);
  });

  it('ends a mouse drag whose release it missed', () => {
    const s = setup();
    app = s.app;
    pointer(button(), 'pointerdown', 0);
    pointer(document.body, 'pointermove', 50);
    document.body.dispatchEvent(
      new PointerEvent('pointermove', {
        bubbles: true,
        pointerId: 1,
        pointerType: 'mouse',
        clientX: 60,
        buttons: 0
      })
    );
    expect(s.onEnd).toHaveBeenCalledOnce();
  });

  it('takes the pointer back when it loses capture mid-drag', () => {
    const s = setup();
    app = s.app;
    const setPointerCapture = vi.fn();
    box().setPointerCapture = setPointerCapture;
    pointer(button(), 'pointerdown', 0);
    expect(setPointerCapture).toHaveBeenCalledTimes(1);
    // What the browser does when the captured node is moved in the DOM.
    box().dispatchEvent(new PointerEvent('lostpointercapture', { pointerId: 1 }));
    expect(setPointerCapture).toHaveBeenCalledTimes(2);
  });

  it('reports zero velocity when the browser cancels the pointer', () => {
    const s = setup();
    app = s.app;
    pointer(button(), 'pointerdown', 0);
    pointer(box(), 'pointermove', 50);
    pointer(box(), 'pointercancel', 50);
    expect(s.onEnd).toHaveBeenCalledWith({ x: 0, y: 0 });
  });

  it('ignores presses while disabled', () => {
    const s = setup({ disabled: true });
    app = s.app;
    pointer(button(), 'pointerdown', 0);
    pointer(box(), 'pointermove', 50);
    expect(s.onStart).not.toHaveBeenCalled();
  });

  describe('touch', () => {
    beforeEach(() => vi.useFakeTimers());

    it('starts after the finger rests for touchDelay', () => {
      const s = setup({ touchDelay: 400 });
      app = s.app;
      pointer(button(), 'pointerdown', 0, 0, 'touch');
      vi.advanceTimersByTime(399);
      expect(s.onStart).not.toHaveBeenCalled();
      vi.advanceTimersByTime(1);
      expect(s.onStart).toHaveBeenCalledOnce();
    });

    it('treats moving before the delay as a scroll', () => {
      const s = setup({ touchDelay: 400 });
      app = s.app;
      pointer(button(), 'pointerdown', 0, 0, 'touch');
      pointer(document.body, 'pointermove', 0, 20, 'touch');
      vi.advanceTimersByTime(500);
      expect(s.onStart).not.toHaveBeenCalled();
    });

    it('stops the page scrolling once the drag has started', () => {
      const s = setup({ touchDelay: 400 });
      app = s.app;
      const before = new Event('touchmove', { bubbles: true, cancelable: true });
      button().dispatchEvent(before);
      expect(before.defaultPrevented).toBe(false);
      pointer(button(), 'pointerdown', 0, 0, 'touch');
      vi.advanceTimersByTime(400);
      const during = new Event('touchmove', { bubbles: true, cancelable: true });
      button().dispatchEvent(during);
      expect(during.defaultPrevented).toBe(true);
    });
  });
});

describe('resist', () => {
  it('passes values inside the range through', () => {
    expect(resist(50, 0, 100, 200)).toBe(50);
  });

  it('follows less and less past an edge, never reaching the pointer', () => {
    const a = resist(110, 0, 100, 200);
    const b = resist(200, 0, 100, 200);
    expect(a).toBeGreaterThan(100);
    expect(a).toBeLessThan(110);
    expect(b - 100).toBeLessThan((a - 100) * 10);
  });
});
