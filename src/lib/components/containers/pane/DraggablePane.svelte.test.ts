// @vitest-environment jsdom
import { flushSync, mount, unmount } from 'svelte';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import Fixture from './draggablePane.fixture.test.svelte';

// jsdom has no matchMedia. Reporting reduced motion also makes the settle spring land instantly,
// so the resting position can be asserted synchronously.
window.matchMedia = ((query: string) => ({ matches: true, media: query })) as never;

const panel = () => document.querySelector<HTMLElement>('[data-draggable-pane]')!;
const header = () => document.querySelector<HTMLElement>('[aria-label="Drag to move Tools"]')!;

const pointer = (target: EventTarget, type: string, x: number, y: number, timeStamp?: number) => {
  const event = new PointerEvent(type, {
    bubbles: true,
    cancelable: true,
    pointerId: 1,
    isPrimary: true,
    button: 0,
    buttons: type === 'pointerup' ? 0 : 1,
    pointerType: 'mouse',
    clientX: x,
    clientY: y
  });
  if (timeStamp !== undefined) Object.defineProperty(event, 'timeStamp', { value: timeStamp });
  return target.dispatchEvent(event);
};

describe('DraggablePane', () => {
  let app: ReturnType<typeof mount> | undefined;
  let props: { x?: number; y?: number; collapsed?: boolean };

  const mountProps = () => {
    const state: { x?: number; y?: number; collapsed?: boolean } = $state({});
    return state;
  };

  beforeEach(() => {
    window.innerWidth = 1000;
    window.innerHeight = 800;
    props = mountProps();
    app = mount(Fixture, { target: document.body, props });
    flushSync();
  });

  afterEach(() => {
    if (app) unmount(app);
    app = undefined;
    document.body.innerHTML = '';
  });

  it('moves by translate while dragging, leaving the resting position alone', () => {
    expect(panel().style.left).toBe('24px');
    pointer(header(), 'pointerdown', 50, 50);
    pointer(window, 'pointermove', 150, 100);
    flushSync();
    expect(panel().style.translate).toBe('100px 50px');
    expect(panel().style.left).toBe('24px');
  });

  it('commits the new resting position on release and clears the offset', () => {
    pointer(header(), 'pointerdown', 50, 50, 0);
    pointer(window, 'pointermove', 150, 100, 10);
    pointer(window, 'pointerup', 150, 100, 200);
    flushSync();
    expect(panel().style.left).toBe('124px');
    expect(panel().style.top).toBe('74px');
    expect(panel().style.translate).toBe('');
  });

  it('keeps its offset when a resting-position change re-renders the inline style', () => {
    pointer(header(), 'pointerdown', 50, 50);
    pointer(window, 'pointermove', 150, 100);
    props.x = 30;
    flushSync();
    expect(panel().style.left).toBe('30px');
    expect(panel().style.translate).toBe('100px 50px');
  });

  it('springs back inside bounds when released past an edge', () => {
    pointer(header(), 'pointerdown', 50, 50);
    pointer(window, 'pointermove', -500, 50);
    pointer(window, 'pointerup', -500, 50);
    flushSync();
    // boundsPadding
    expect(panel().style.left).toBe('8px');
  });

  it('nudges with the arrow keys', () => {
    header().dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true })
    );
    flushSync();
    expect(panel().style.left).toBe('32px');
  });

  it('minimises into the pill and restores from it', async () => {
    document.querySelector<HTMLButtonElement>('[aria-label="Minimize"]')!.click();
    await new Promise((resolve) => setTimeout(resolve));
    flushSync();
    expect(document.querySelector('[data-draggable-pane-pill]')).not.toBeNull();
    document.querySelector<HTMLButtonElement>('[data-draggable-pane-pill]')!.click();
    await new Promise((resolve) => setTimeout(resolve));
    flushSync();
    expect(panel()).not.toBeNull();
    expect(document.querySelector('[data-draggable-pane-pill]')).toBeNull();
  });
});
