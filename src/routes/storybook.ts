import { base } from '$app/paths';

// Storybook runs as its own dev server locally; in production it's built into
// build/storybook/ alongside this static site (see .github/workflows/gh-pages.yaml).
// Mirrors the root +layout.svelte's storybookHref, but deep-links to a single story.
export function storybookStoryUrl(storyId: string): string {
  const root = import.meta.env.DEV ? 'http://localhost:6006' : `${base}/storybook/`;
  return `${root}?path=/story/${storyId}`;
}
