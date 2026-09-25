/**
 * Whether a destination's `href` is the page at `url` or one of its descendants, for marking
 * the current rail/navbar destination.
 *
 * The href resolves against the page, so a relative one works and one on another origin (a
 * Storybook link on its own port, an external site) never matches, even when its path does.
 * An in-page anchor (`#…`) is never a destination. A destination's own path matches its
 * sub-pages too (`/guides` for `/guides/icons`), except the app's root (`/`, or SvelteKit's `base`
 * path when the app is served from a sub-path), which would match everything.
 */
export function isCurrentRoute(href: string, url: URL, root = '/'): boolean {
  if (!href || href.startsWith('#')) return false;
  let target: URL;
  try {
    target = new URL(href, url);
  } catch {
    return false;
  }
  if (target.origin !== url.origin) return false;
  const trim = (path: string) => (path.length > 1 ? path.replace(/\/+$/, '') : path);
  const path = trim(target.pathname);
  const current = trim(url.pathname);
  const isRoot = path === '/' || path === trim(root || '/');
  return current === path || (!isRoot && current.startsWith(path + '/'));
}
