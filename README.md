# ogonek-m3

Svelte components and utilities inspired by Material Design 3.

> This project borrows heavily from [m3-svelte.](https://github.com/KTibow/m3-svelte)

## Install

```bash
npm i @ogonek-education/ogonek-m3
```

## Material Symbols

Use the provider component once near the root of your app to load the baseline icons,
and extend it with any extra icons you need.

```svelte
<script lang="ts">
	import { MaterialSymbolsProvider } from 'ogonek-m3';
</script>

<MaterialSymbolsProvider extraIcons={['search', 'add']} />
```

## Theme CSS (Material Theme Builder)

[Material Theme Builder](https://material-foundation.github.io/material-theme-builder/) exports a CSS file with a theme selector (e.g. `.light { ... }`).

Convert:

- Variables from `--md-` to `--color-md-`
- Wrap the output in `@layer base` and `[data-theme="..."]`

You can then import the resulting .css into your app.css. Add the data-theme attribute to the app.html file to use the newly-created theme. Otherwise the package will resolve to default Google colours.

## Components

Almost all components have been implemented. Refer to this list to see how to use them. The semantics and props have been kept same. You can literally type in class="text-md-sys-color-on-error-container" and that will 1:1 corresond to what Google writes. [Material Design Components. ](https://m3.material.io/components)

### Typography

> [Typography – Material Design 3](https://m3.material.io/styles/typography/applying-type)

- [x] Body
- [x] Title
- [x] Headline
- [x] Display

### Navigation

- [x] Navigation
  - [x] Bar
  - [x] Rail
- [x] Tabs
- [x] Menu
- [x] App Bar – the former navbar. needs attention

### State

- [x] Progress
- [x] Loading
- [x] Dialog

### Information

- [ ] Carousel
- [x] Tooltips
  - [x] rich
  - [x] plain
- [x] List
- [x] Snackbar
- [x] Badge

### Input

- [ ] Chips
- [ ] Slider
- [ ] Switch
- [ ] Radio
- [x] Checkbox
- [x] Time Picker
- [x] Date Picker
- [x] Search
- [x] Textfield

### Buttons

- [ ] Split Button
- [x] Segmented Button
- [x] Button Group
- [x] Icon Button
- [x] FAB Menu
- [x] Button
- [x] FAB Extended
- [x] FAB

### Layout

- [ ] Sheet Bottom
- [ ] Sheet Side
- [x] Toolbars
- [x] Tabs
- [x] Divider
- [x] Card

## Pane Layout

Three pane components handle page-level layout.

### SupportingPane

Two-column layout with a supporting panel alongside main content.

```svelte
<script lang="ts">
	import { SupportingPane } from '@ogonek-education/ogonek-m3';
</script>

{#snippet main()}
	<p>Main content — scrolls the page</p>
{/snippet}

{#snippet supporting()}
	<p>Sidebar content</p>
{/snippet}

<!-- Classic sticky sidebar (default) -->
<SupportingPane {main} {supporting} />

<!-- Viewport-fixed sidebar — supporting is always visible and independently scrollable.
     Main content scrolls the whole page. -->
<SupportingPane
	{main}
	{supporting}
	anchor="viewport"
	supportingTop={64}
	supportingWidth={320}
	position="left"
/>
```

| Prop              | Type                     | Default    | Description                                                                  |
| ----------------- | ------------------------ | ---------- | ---------------------------------------------------------------------------- |
| `anchor`          | `'parent' \| 'viewport'` | `'parent'` | `parent` = sticky. `viewport` = fixed to viewport, independently scrollable. |
| `supportingTop`   | `number`                 | `0`        | Top offset in px for `viewport` mode — set to your navbar height.            |
| `supportingWidth` | `number`                 | `320`      | Width of the supporting pane in px.                                          |
| `position`        | `'left' \| 'right'`      | `'right'`  | Which side the supporting pane sits on.                                      |
| `collapsible`     | `boolean`                | —          | Adds a toggle button to hide/show the supporting pane.                       |
| `mainClass`       | `string`                 | —          | Extra classes on the main pane wrapper.                                      |
| `supportingClass` | `string`                 | —          | Extra classes on the supporting pane wrapper.                                |

### Rail

Vertical navigation rail, fixed or absolute.

```svelte
<script lang="ts">
	import { Rail, RailItem } from '@ogonek-education/ogonek-m3';
</script>

<!-- Viewport-fixed rail (default). Ghost div provides spacing in normal flow. -->
<Rail anchor="viewport">
	<RailItem href="/" iconProps={{ name: 'home' }} name="Home" />
	<RailItem href="/about" iconProps={{ name: 'info' }} name="About" />
</Rail>

<!-- With a top bar — offset the rail so it starts below the bar. -->
<Rail anchor="viewport" railTop={64}>
	<RailItem href="/" iconProps={{ name: 'home' }} name="Home" />
</Rail>

<!-- Absolute inside a relative container. -->
<div class="relative min-h-dvh">
	<Rail anchor="parent">
		<RailItem href="/" iconProps={{ name: 'home' }} name="Home" />
	</Rail>
	<div class="md:ml-24">
		<!-- page content -->
	</div>
</div>
```

The `Rail` renders a ghost `<div>` before itself that mirrors the rail's current width (`w-24` collapsed, `w-60` expanded). In `viewport` mode this ghost keeps the page content from sliding under the fixed rail — no manual `ml-*` needed on the content wrapper.

| Prop         | Type                     | Default      | Description                                                                                      |
| ------------ | ------------------------ | ------------ | ------------------------------------------------------------------------------------------------ |
| `anchor`     | `'viewport' \| 'parent'` | `'viewport'` | `viewport` = `position: fixed`. `parent` = `position: absolute` (requires `relative` container). |
| `railTop`    | `number`                 | `0`          | Top offset in px — set to your top bar height.                                                   |
| `expandable` | `boolean`                | `true`       | Show the collapse/expand toggle button.                                                          |
| `collapsed`  | `boolean`                | `true`       | Bindable. Controls collapsed state.                                                              |
| `fab`        | `Snippet`                | —            | FAB snippet rendered inside the rail.                                                            |

### SplitPane

Resizable two-column layout. Left pane is fixed to the viewport; right pane scrolls the page. Width is drag-adjustable and persisted to `localStorage`.

```svelte
<script lang="ts">
	import { SplitPane } from '@ogonek-education/ogonek-m3';
</script>

{#snippet left()}
	<nav>Left panel</nav>
{/snippet}

{#snippet right()}
	<main>Main content</main>
{/snippet}

<SplitPane {left} {right} leftWidth={320} storageKey="my-app:split" />
```

| Prop         | Type                     | Default                 | Description                               |
| ------------ | ------------------------ | ----------------------- | ----------------------------------------- |
| `anchor`     | `'viewport' \| 'parent'` | `'viewport'`            | How the left pane is positioned.          |
| `leftWidth`  | `number`                 | `396`                   | Initial left pane width in px (bindable). |
| `minLeft`    | `number`                 | `280`                   | Minimum draggable width.                  |
| `maxLeft`    | `number`                 | `720`                   | Maximum draggable width.                  |
| `storageKey` | `string`                 | `'splitpane:leftWidth'` | `localStorage` key to persist width.      |
| `persist`    | `boolean`                | `true`                  | Whether to persist width across sessions. |
