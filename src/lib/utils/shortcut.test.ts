// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest';
import {
  ariaKeyShortcut,
  isEditableTarget,
  matchesShortcut,
  shortcutLabel,
  triggersShortcut
} from './shortcut.js';

const key = (init: KeyboardEventInit) => new KeyboardEvent('keydown', init);

describe('matchesShortcut', () => {
  it('resolves Mod to ⌘ on Apple platforms and Ctrl elsewhere', () => {
    expect(matchesShortcut(key({ key: 'k', metaKey: true }), 'Mod+K', true)).toBe(true);
    expect(matchesShortcut(key({ key: 'k', ctrlKey: true }), 'Mod+K', true)).toBe(false);
    expect(matchesShortcut(key({ key: 'k', ctrlKey: true }), 'Mod+K', false)).toBe(true);
  });

  it('needs the modifiers exactly', () => {
    expect(matchesShortcut(key({ key: 'k' }), 'Mod+K', true)).toBe(false);
    expect(matchesShortcut(key({ key: 'K', metaKey: true, shiftKey: true }), 'Mod+K', true)).toBe(
      false
    );
    expect(matchesShortcut(key({ key: '/', altKey: true }), '/')).toBe(false);
  });

  it('matches a letter by its physical key on a non-Latin layout', () => {
    expect(matchesShortcut(key({ key: 'л', code: 'KeyK', metaKey: true }), 'Mod+K', true)).toBe(
      true
    );
  });

  it('matches digits by physical key, where Alt changes the character', () => {
    expect(matchesShortcut(key({ key: '¡', code: 'Digit1', altKey: true }), 'Alt+1')).toBe(true);
    expect(matchesShortcut(key({ key: '1', code: 'Numpad1', metaKey: true }), 'Mod+1', true)).toBe(
      true
    );
  });

  it('ignores Shift for symbols that need it', () => {
    expect(matchesShortcut(key({ key: '?', shiftKey: true }), '?')).toBe(true);
  });
});

describe('triggersShortcut', () => {
  afterEach(() => (document.body.innerHTML = ''));

  const fire = (target: Element, init: KeyboardEventInit) => {
    let result = false;
    target.addEventListener(
      'keydown',
      (e) =>
        (result = triggersShortcut(e as KeyboardEvent, init.key === '/' ? '/' : 'Mod+K', target)),
      { once: true }
    );
    target.dispatchEvent(
      new KeyboardEvent('keydown', { bubbles: true, cancelable: true, ...init })
    );
    return result;
  };

  it('lets a bare key be typed into a field, but not a Mod shortcut', () => {
    document.body.innerHTML = '<input id="f"><button id="b"></button>';
    const field = document.getElementById('f')!;
    expect(fire(field, { key: '/' })).toBe(false);
    expect(fire(document.getElementById('b')!, { key: '/' })).toBe(true);
    expect(fire(field, { key: 'k', ctrlKey: true })).toBe(true);
  });

  it('stays out of a modal dialog it is not part of', () => {
    document.body.innerHTML =
      '<button id="out"></button><div aria-modal="true"><button id="in"></button></div>';
    expect(fire(document.getElementById('out')!, { key: '/' })).toBe(false);
    expect(fire(document.getElementById('in')!, { key: '/' })).toBe(true);
  });
});

describe('isEditableTarget', () => {
  it('counts text inputs, not checkboxes', () => {
    const input = document.createElement('input');
    expect(isEditableTarget(input)).toBe(true);
    input.type = 'checkbox';
    expect(isEditableTarget(input)).toBe(false);
    expect(isEditableTarget(document.createElement('textarea'))).toBe(true);
  });
});

describe('labels', () => {
  it('writes aria-keyshortcuts and the platform label', () => {
    expect(ariaKeyShortcut('Mod+k', true)).toBe('Meta+K');
    expect(ariaKeyShortcut('Mod+k', false)).toBe('Control+K');
    expect(shortcutLabel('Mod+K', true)).toBe('⌘K');
    expect(shortcutLabel('Mod+K', false)).toBe('Ctrl+K');
    expect(shortcutLabel('/', false)).toBe('/');
  });
});
