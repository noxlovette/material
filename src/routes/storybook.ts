import { base } from '$app/paths';

// Storybook runs as its own dev server locally; in production it's built into
// build/storybook/ alongside this static site (see .github/workflows/gh-pages.yaml).
export function storybookHref(path?: string): string {
  const root = import.meta.env.DEV ? 'http://localhost:6006/' : `${base}/storybook/`;
  return path ? `${root}?path=${path}` : root;
}
