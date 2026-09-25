// @vitest-environment jsdom
import { flushSync, mount, unmount } from 'svelte';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

type Spring = { from: number; to: number; velocity: number; stop: () => void };
const springs: Spring[] = [];

// Springs are recorded, not run: the tests check where each one starts and ends. Element
// animations (Layer's ripple) resolve at once.
vi.mock('motion', async (importOriginal) => ({
  ...(await importOriginal<typeof import('motion')>()),
  animate: (from: unknown, to: unknown, options?: { velocity?: number }) => {
    const controls = { stop: vi.fn(), then: (done: () => void) => Promise.resolve().then(done) };
    if (typeof from === 'number' && typeof to === 'number') {
      springs.push({ from, to, velocity: options?.velocity ?? 0, stop: controls.stop });
    }
    return controls;
  }
}));

const { default: Fixture } = await import('./chipGroup.fixture.test.svelte');

/*
  jsdom does no layout, so fake one: the list is a single 500 × 32 row and each chip slot is a
  90px box at 100px per position, in DOM order.
  Slot i: left = 100i, width 90, top 0, height 32.
*/
const SLOT = 100;
const WIDTH = 90;
const isSlot = (el: Element) => el.getAttribute('role') === 'listitem';
const slotIndex = (el: Element) => [...el.parentElement!.children].filter(isSlot).indexOf(el);
const layout: Record<string, (this: HTMLElement) => number> = {
  offsetLeft() {
    return isSlot(this) ? slotIndex(this) * SLOT : 0;
  },
  offsetTop: () => 0,
  offsetWidth() {
    return isSlot(this) ? WIDTH : 0;
  },
  offsetHeight: () => 32,
  clientWidth() {
    return this.getAttribute('role') === 'list' ? 500 : 0;
  },
  clientHeight: () => 32
};
const originals = new Map<string, PropertyDescriptor | undefined>();

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: false, media: query })) as never;
  for (const [prop, get] of Object.entries(layout)) {
    originals.set(prop, Object.getOwnPropertyDescriptor(HTMLElement.prototype, prop));
    Object.defineProperty(HTMLElement.prototype, prop, { configurable: true, get });
  }
});

afterAll(() => {
  for (const [prop, descriptor] of originals) {
    if (descriptor) Object.defineProperty(HTMLElement.prototype, prop, descriptor);
  }
});

const names = ['a', 'b', 'c', 'd', 'e'];
const order = () =>
  [...document.querySelectorAll('[role="listitem"]')].map((el) => el.textContent?.trim());
const chip = (name: string) => document.querySelector<HTMLElement>(`[data-testid="chip-${name}"]`)!;
const slotOf = (name: string) => chip(name).closest<HTMLElement>('[role="listitem"]')!;

const pointer = (target: EventTarget, type: string, x: number) =>
  target.dispatchEvent(
    new PointerEvent(type, {
      bubbles: true,
      cancelable: true,
      pointerId: 1,
      isPrimary: true,
      button: 0,
      // Held while pressed and moving, as a real mouse reports it; released on pointerup.
      buttons: type === 'pointerup' ? 0 : 1,
      pointerType: 'mouse',
      clientX: x,
      clientY: 16
    })
  );

function setup() {
  const onReorder = vi.fn();
  const onChipClick = vi.fn();
  const app = mount(Fixture, {
    target: document.body,
    props: { initial: names, onReorder, onChipClick }
  });
  flushSync();
  return { app, onReorder, onChipClick };
}

describe('ChipGroup', () => {
  let app: ReturnType<typeof mount> | undefined;
  afterEach(() => {
    if (app) unmount(app);
    app = undefined;
    springs.length = 0;
    document.body.innerHTML = '';
  });

  describe('dragging', () => {
    it('reorders live, keeps the chip under the pointer, and reports the order on release', () => {
      const s = setup();
      app = s.app;
      // Press "a" (slot 0) and drag it 160px right: its centre (45 + 160) is over slot 2.
      pointer(chip('a'), 'pointerdown', 10);
      pointer(document.body, 'pointermove', 170);
      flushSync();

      expect(order()).toEqual(['b', 'c', 'a', 'd', 'e']);
      expect(slotOf('a').dataset.dragged).toBeDefined();
      // Drawn where the pointer put it (x = 160), from its new slot at 200.
      expect(slotOf('a').style.translate).toBe('-40px 0px');
      expect(s.onReorder).not.toHaveBeenCalled();

      pointer(slotOf('a'), 'pointerup', 170);
      flushSync();
      expect(slotOf('a').dataset.dragged).toBeUndefined();
      expect(s.onReorder).toHaveBeenCalledOnce();
      expect(s.onReorder).toHaveBeenCalledWith(['b', 'c', 'a', 'd', 'e']);
      // It springs home from where it was drawn.
      expect(springs).toContainEqual(expect.objectContaining({ from: -40, to: 0 }));
      expect(document.querySelector('[aria-live]')?.textContent).toBe('a, moved to 3 of 5');
    });

    it('slides the neighbours it passes from their old slots to their new ones', () => {
      const s = setup();
      app = s.app;
      pointer(chip('a'), 'pointerdown', 10);
      pointer(document.body, 'pointermove', 170);
      flushSync();
      // "b" and "c" each moved one slot left, so each starts 100px right of its new slot.
      const fromRight = springs.filter((spring) => spring.from === SLOT && spring.to === 0);
      expect(fromRight).toHaveLength(2);
    });

    it('keeps following the same drag after the list reorders under it', () => {
      const s = setup();
      app = s.app;
      pointer(chip('a'), 'pointerdown', 10);
      pointer(document.body, 'pointermove', 170);
      flushSync();
      // On to slot 3 (centre 45 + 260 = 305), then release.
      pointer(slotOf('a'), 'pointermove', 270);
      flushSync();
      expect(order()).toEqual(['b', 'c', 'd', 'a', 'e']);
      pointer(slotOf('a'), 'pointerup', 270);
      expect(s.onReorder).toHaveBeenCalledWith(['b', 'c', 'd', 'a', 'e']);
    });

    it('keeps dragging and drops when the pointer leaves the group', () => {
      const s = setup();
      app = s.app;
      pointer(chip('a'), 'pointerdown', 10);
      pointer(document.body, 'pointermove', 170);
      flushSync();
      // Out past the end of the row and released there, over no chip at all.
      pointer(document.body, 'pointermove', 900);
      flushSync();
      expect(order()).toEqual(['b', 'c', 'd', 'e', 'a']);
      pointer(document.body, 'pointerup', 900);
      flushSync();
      expect(slotOf('a').dataset.dragged).toBeUndefined();
      expect(s.onReorder).toHaveBeenCalledWith(['b', 'c', 'd', 'e', 'a']);
      // Released: moving on doesn't drag it any more.
      const translate = slotOf('a').style.translate;
      pointer(document.body, 'pointermove', 100);
      expect(slotOf('a').style.translate).toBe(translate);
    });

    it("doesn't press the chip it drops", () => {
      const s = setup();
      app = s.app;
      pointer(chip('a'), 'pointerdown', 10);
      pointer(document.body, 'pointermove', 170);
      pointer(slotOf('a'), 'pointerup', 170);
      chip('a').click();
      expect(s.onChipClick).not.toHaveBeenCalled();
    });

    it('leaves a tap as a press, with the order untouched', () => {
      const s = setup();
      app = s.app;
      pointer(chip('b'), 'pointerdown', 110);
      pointer(document.body, 'pointerup', 110);
      chip('b').click();
      expect(s.onChipClick).toHaveBeenCalledWith('b');
      expect(s.onReorder).not.toHaveBeenCalled();
    });

    it('reports nothing when the chip is dropped back in its own slot', () => {
      const s = setup();
      app = s.app;
      pointer(chip('b'), 'pointerdown', 110);
      pointer(document.body, 'pointermove', 130);
      pointer(slotOf('b'), 'pointerup', 130);
      expect(order()).toEqual(names);
      expect(s.onReorder).not.toHaveBeenCalled();
    });
  });

  describe('keyboard', () => {
    const key = (name: string, keyName: string, altKey = true) =>
      chip(name).dispatchEvent(
        new KeyboardEvent('keydown', { key: keyName, altKey, bubbles: true, cancelable: true })
      );

    it('moves the focused chip with Alt+Arrow, keeps focus on it, and announces it', () => {
      const s = setup();
      app = s.app;
      chip('b').focus();
      key('b', 'ArrowRight');
      flushSync();
      expect(order()).toEqual(['a', 'c', 'b', 'd', 'e']);
      expect(document.activeElement).toBe(chip('b'));
      expect(s.onReorder).toHaveBeenCalledWith(['a', 'c', 'b', 'd', 'e']);
      expect(document.querySelector('[aria-live]')?.textContent).toBe('b, moved to 3 of 5');
    });

    it('stops at the ends', () => {
      const s = setup();
      app = s.app;
      key('a', 'ArrowLeft');
      key('e', 'ArrowRight');
      expect(order()).toEqual(names);
      expect(s.onReorder).not.toHaveBeenCalled();
    });

    it('leaves arrows without Alt to the chip', () => {
      const s = setup();
      app = s.app;
      key('b', 'ArrowRight', false);
      expect(order()).toEqual(names);
    });
  });
});
