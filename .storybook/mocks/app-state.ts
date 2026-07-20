// Mocks SvelteKit's `$app/state` for components (RailItem, NavbarItem) that read
// `page.url` to derive active-route state. Storybook's Vite config intentionally omits
// the `sveltekit()` plugin (see ../vite.config.ts), so this module is unresolvable at
// build time unless aliased to a stand-in here.
export const page = {
  url: new URL('http://localhost/')
};
