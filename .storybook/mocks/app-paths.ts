// Stand-in for SvelteKit's $app/paths in Storybook, which has no SvelteKit runtime. RailItem and
// NavbarItem read `base` as the app's root when marking the current route; stories run at the root.
export const base = '';
export const assets = '';
