// Stand-in for SvelteKit's $app/paths in Storybook, which has no SvelteKit runtime. RailItem and
// NavbarItem call `resolve('/')` as the app's root when marking the current route; stories run at
// the root, so there is no base path to prepend.
export const resolve = (path: string): string => path;
export const asset = (file: string): string => `/${file}`;
