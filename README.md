# @noxlovette/material

**Google's [Material Design 3](https://m3.material.io/) system, built for Svelte.**

Every component is a real MD3 citizen — the token vocabulary (color roles, typescale,
elevation, shape, motion), the state layers, the canonical layouts — implemented on top of
[Bits UI](https://bits-ui.com/)'s headless primitives and styled with
[`tailwind-variants`](https://www.tailwind-variants.org/). You get the accessibility and
interaction behavior Bits UI already gets right, with Material's actual look and feel on top.

[![npm version](https://img.shields.io/npm/v/%40noxlovette%2Fmaterial.svg)](https://www.npmjs.com/package/@noxlovette/material)
[![npm downloads](https://img.shields.io/npm/dm/%40noxlovette%2Fmaterial.svg)](https://www.npmjs.com/package/@noxlovette/material)
[![CI](https://github.com/noxlovette/material/actions/workflows/ci.yml/badge.svg)](https://github.com/noxlovette/material/actions/workflows/ci.yml)
[![license: MIT](https://img.shields.io/npm/l/%40noxlovette%2Fmaterial.svg)](./LICENSE)

**[📖 Docs & overview](https://material.noxlovette.com)** · **[🧩 Storybook — browse every component live](https://material.noxlovette.com/storybook/)**

Storybook is the canonical place to actually look at things: every component, every variant,
with Controls to poke at props and an a11y panel to check contrast and roles as you go. The
docs site is prose — install steps, theming, rationale — and links out to Storybook rather
than re-implementing a gallery of its own.

## Install

```bash
npm i @noxlovette/material
```

```css
/* your root stylesheet */
@import 'tailwindcss';
@import '@noxlovette/material/styles';
@import '@noxlovette/material/theme/light';
@import '@noxlovette/material/theme/dark';
```

```svelte
<script lang="ts">
  import { App, Button, Card, Title } from '@noxlovette/material';
</script>

<App>
  <Card class="p-4">
    <Title>Hello world</Title>
    <Button>Click me</Button>
  </Card>
</App>
```

`App` wires up theming, dark-mode detection, and icon loading. Dynamic theming (generate a
whole MD3 theme from a source color or an image, toggle light/dark/contrast at runtime) is
covered on the [docs site](https://material.noxlovette.com), along with the SSR setup that
avoids a flash of unstyled content.

## What's inside

Buttons, cards, dialogs, navigation rail/bar, side sheets, snackbars, tabs, sliders, chips,
menus, text fields, and the rest of the MD3 component set, plus `Pane`/`PaneGrid` for
Material's [canonical layouts](https://m3.material.io/foundations/layout/canonical-layouts)
(list-detail, supporting-pane, feed) without hand-rolling flex/sticky positioning yourself.
The full list, with live previews, is in [Storybook](https://material.noxlovette.com/storybook/).

A Claude Code skill ships alongside the library — `npx @noxlovette/material material-claude-skill`
installs it into `.claude/skills/material-design`, so an agent working in your app gets the
same token vocabulary and variant-selection rules this library was built with.

## Credits

- [**Material Design 3**](https://m3.material.io/) — the design system itself. All token
  names, color roles, and layout patterns here are Google's, not reinvented.
- [**Bits UI**](https://bits-ui.com/) — the headless primitives underneath every interactive
  component. This library owes its accessibility behavior and interaction correctness to it;
  ours is the Material skin on top.

## Contributing

```bash
bun run dev              # showcase site: landing page + prose docs
bun run storybook        # component workbench — the canonical way to view/QA components
bun run check             # svelte-check + tsc
bun run test              # vitest
```

See [`CLAUDE.md`](./CLAUDE.md) for the fuller architecture rundown and known pitfalls.

## License

[MIT](./LICENSE)
