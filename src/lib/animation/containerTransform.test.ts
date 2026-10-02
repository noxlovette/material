// @vitest-environment jsdom
import { afterEach, expect, it, vi } from 'vitest';

let runUpdate: () => Promise<void>;
let ready: (value: unknown) => void;
let finish: () => void;
const calls: unknown[][] = [];
vi.mock('motion', async (original) => ({
  ...(await original<typeof import('motion')>()),
  animateView: (update: () => Promise<void>) => {
    runUpdate = update;
    const started = new Promise((resolve) => {
      ready = resolve;
    });
    const builder: Record<string, unknown> = { then: started.then.bind(started) };
    for (const method of ['add', 'class', 'group', 'crop', 'layout', 'old', 'new']) {
      builder[method] = (...args: unknown[]) => {
        calls.push([method, ...args]);
        return builder;
      };
    }
    return builder;
  }
}));
const { containerTransform } = await import('./containerTransform.js');
window.matchMedia = vi.fn(() => ({ matches: false })) as never;

afterEach(() => {
  document.body.innerHTML = '';
  calls.length = 0;
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

it.each([
  ['closing', 123],
  ['opening', 123],
  ['closing', null],
  ['opening', null]
])(
  '%s interpolates elevation with initial startTime %s and cleans it up',
  async (direction, startTime) => {
    const source = document.createElement('div');
    source.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.3)';
    source.style.viewTransitionName = 'pane-morph';
    const destination = document.createElement('div');
    if (direction === 'opening') {
      destination.style.boxShadow = source.style.boxShadow;
      source.style.boxShadow = 'none';
    }
    document.body.append(source, destination);
    class Effect {
      pseudoElement = '::view-transition-group(pane-morph)';
      getKeyframes() {
        // Some browser-generated groups expose a transform rather than width keyframes.
        return [{ transform: 'matrix(1, 0, 0, 1, 0, 0)' }];
      }
      getTiming() {
        return { delay: 0, duration: 500, easing: 'linear(0, 0.8, 1)' };
      }
    }
    vi.stubGlobal('KeyframeEffect', Effect);
    const morph = { effect: new Effect(), startTime };
    const unrelated = { effect: new Effect(), startTime: 999 };
    unrelated.effect.pseudoElement = '::view-transition-group(unrelated)';
    document.getAnimations = vi.fn(() => [unrelated, morph]) as never;
    const setStart = vi.fn();
    const shadow = {
      set startTime(value: unknown) {
        setStart(value);
      },
      playState: 'running',
      cancel: vi.fn()
    };
    let nextFrame: FrameRequestCallback | undefined;
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
      nextFrame = callback;
      return 1;
    });
    document.documentElement.animate = vi.fn(() => shadow) as never;
    containerTransform(
      () => {
        source.remove();
      },
      { from: source, to: destination }
    );
    await runUpdate();
    ready({
      finished: new Promise<void>((resolve) => {
        finish = resolve;
      })
    });
    await new Promise((r) => setTimeout(r));
    expect(document.documentElement.animate).toHaveBeenCalledWith(
      {
        boxShadow:
          direction === 'closing'
            ? ['0px 4px 8px rgba(0, 0, 0, 0.3)', '0px 4px 8px rgba(0, 0, 0, 0)']
            : ['0px 4px 8px rgba(0, 0, 0, 0)', '0px 4px 8px rgba(0, 0, 0, 0.3)']
      },
      {
        pseudoElement: '::view-transition-group(pane-morph)',
        delay: 0,
        duration: 500,
        easing: 'linear(0, 0.8, 1)',
        fill: 'both'
      }
    );
    if (startTime === null) {
      expect(setStart).not.toHaveBeenCalled();
      morph.startTime = 123;
      nextFrame?.(123);
    }
    expect(setStart).toHaveBeenCalledWith(123);
    finish();
    await new Promise((r) => setTimeout(r));
    expect(shadow.cancel).toHaveBeenCalled();
    expect(document.documentElement.style.getPropertyValue('--md-container-transform-shadow')).toBe(
      direction === 'closing' ? 'none' : '0px 4px 8px rgba(0, 0, 0, 0.3)'
    );
  }
);

it('preserves chrome in static flat groups and keeps the morph at the elevated endpoint layer', async () => {
  document.body.innerHTML =
    '<div class="md-vt-persist" style="position:fixed;z-index:40"></div><div id="card"></div><div id="pane" style="position:fixed;z-index:60"></div>';
  containerTransform(() => {}, { from: '#card', to: '#pane' });
  await runUpdate();
  expect(calls).toContainEqual(['add', document.querySelector('.md-vt-persist')]);
  expect(calls).toContainEqual(['group', false]);
  expect(calls).toContainEqual(['crop', true]);
  expect(calls).toContainEqual(['layout', { duration: 0 }]);
  const css = [...document.querySelectorAll('style')].map((s) => s.textContent).join('');
  expect(css).toContain('z-index: 60');
  expect(css).toContain('z-index: 40');
  ready({ finished: Promise.resolve() });
  await new Promise((r) => setTimeout(r));
  expect(document.querySelector('[data-container-transform-style]')).toBeNull();
});
