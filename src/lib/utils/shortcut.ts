/**
 * A keyboard shortcut, written as `aria-keyshortcuts` writes one: modifiers, then the key, joined
 * by `+`. `'/'`, `'Mod+K'`, `'Alt+Shift+P'`. `Mod` is ⌘ on Apple platforms and Ctrl elsewhere,
 * the key each platform's apps use for their own shortcuts.
 */
export type Shortcut = string;

type Modifier = 'Meta' | 'Control' | 'Alt' | 'Shift';

/** Whether this is an Apple platform, where `Mod` is ⌘. False during SSR. */
export function isApplePlatform(): boolean {
  if (typeof navigator === 'undefined') return false;
  const platform =
    (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform ??
    navigator.platform;
  return /mac|iphone|ipad|ipod/i.test(platform ?? '');
}

function parse(shortcut: Shortcut, apple: boolean) {
  const parts = shortcut.split('+');
  const key = parts.pop() ?? '';
  const modifiers = new Set<Modifier>(
    parts.map((m) => (m === 'Mod' ? (apple ? 'Meta' : 'Control') : (m as Modifier)))
  );
  return { key, modifiers };
}

/**
 * Whether a keydown is this shortcut. Modifiers must match exactly. Digits match by physical key,
 * since Alt+1 types `¡` on a Mac; letters match by the character typed, falling back to the
 * physical key on non-Latin layouts, so ⌘K still works with a Cyrillic layout on.
 */
export function matchesShortcut(
  e: KeyboardEvent,
  shortcut: Shortcut,
  apple = isApplePlatform()
): boolean {
  const { key, modifiers } = parse(shortcut, apple);
  if (
    e.metaKey !== modifiers.has('Meta') ||
    e.ctrlKey !== modifiers.has('Control') ||
    e.altKey !== modifiers.has('Alt')
  )
    return false;
  const alphanumeric = /^[a-z0-9]$/i.test(key);
  // Shift is part of typing a symbol like `?`, so it's only checked for letters and digits.
  if (modifiers.has('Shift') ? !e.shiftKey : alphanumeric && e.shiftKey) return false;
  if (/^[0-9]$/.test(key)) return e.code === `Digit${key}` || e.code === `Numpad${key}`;
  if (/^[a-z]$/i.test(key)) {
    return /^[a-z]$/i.test(e.key)
      ? e.key.toLowerCase() === key.toLowerCase()
      : e.code === `Key${key.toUpperCase()}`;
  }
  return e.key === key;
}

/** Whether a keydown's target takes text, where a bare `/` is typing, not a shortcut. */
export function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable || target instanceof HTMLTextAreaElement) return true;
  if (target instanceof HTMLSelectElement) return true;
  return (
    target instanceof HTMLInputElement &&
    !/^(button|checkbox|color|file|hidden|image|radio|range|reset|submit)$/.test(target.type)
  );
}

/**
 * Whether a page-wide shortcut should fire for this keydown: it matches, nothing handled the key
 * first, no IME is composing, a shortcut without ⌘/Ctrl/Alt isn't being typed into a field, and
 * no modal dialog other than the one holding `owner` is open.
 */
export function triggersShortcut(
  e: KeyboardEvent,
  shortcut: Shortcut | null | undefined,
  owner?: Element | null
): boolean {
  if (!shortcut || e.defaultPrevented || e.isComposing || e.repeat) return false;
  if (!matchesShortcut(e, shortcut)) return false;
  if (!/(^|\+)(Mod|Meta|Control|Alt)\+/.test(shortcut) && isEditableTarget(e.target)) return false;
  const modal = document.querySelector('[aria-modal="true"]');
  return !modal || (!!owner && modal.contains(owner));
}

/** The shortcut for `aria-keyshortcuts`, with `Mod` resolved for this platform. */
export function ariaKeyShortcut(shortcut: Shortcut, apple = isApplePlatform()): string {
  const { key, modifiers } = parse(shortcut, apple);
  return [...modifiers, key.length === 1 ? key.toUpperCase() : key].join('+');
}

const SYMBOLS: Record<Modifier, string> = { Meta: '⌘', Control: '⌃', Alt: '⌥', Shift: '⇧' };
const NAMES: Record<Modifier, string> = {
  Meta: 'Win',
  Control: 'Ctrl',
  Alt: 'Alt',
  Shift: 'Shift'
};

/** The shortcut as people read it on this platform: `⌘K` on a Mac, `Ctrl+K` elsewhere. */
export function shortcutLabel(shortcut: Shortcut, apple = isApplePlatform()): string {
  const { key, modifiers } = parse(shortcut, apple);
  const k = key.length === 1 ? key.toUpperCase() : key;
  return apple
    ? [...modifiers].map((m) => SYMBOLS[m]).join('') + k
    : [...[...modifiers].map((m) => NAMES[m]), k].join('+');
}
