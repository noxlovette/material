# mcu — vendored Material Color Utilities

This directory is a trimmed copy of the TypeScript port of
[material-color-utilities](https://github.com/material-foundation/material-color-utilities/tree/main/typescript),
the algorithms behind the Material Design 3 color system (HCT color space,
dynamic schemes, image quantization and scoring).

## Attribution

- **Google LLC / Material Foundation** wrote the code. Copyright 2021–2026 Google LLC,
  licensed under the [Apache License 2.0](./LICENSE). Each source file keeps its
  original license header.
- **[@KTibow](https://github.com/KTibow)** publishes
  [`@ktibow/material-color-utilities-nightly`](https://www.npmjs.com/package/@ktibow/material-color-utilities-nightly),
  nightly builds of upstream `main`. Google's official npm package lags well behind
  the repository, so this library used those builds to get the 2025/2026 color specs.
  This vendored copy replaces that dependency.

## Source

- Upstream: `material-foundation/material-color-utilities`, directory `typescript/`
- Commit: [`91da30d`](https://github.com/material-foundation/material-color-utilities/commit/91da30d89e70c3dc9575ec71a1ebe8874d881f29)
  ("Updated background for on-fixed colors in ColorSpec2026"). This is the commit
  behind nightly `0.4.1772748028000`, the version this library previously depended on.

## Local modifications

- Only the files reachable from what `../themeState.svelte.ts` imports are kept
  (34 of the upstream modules). Tests, `index.ts`, and unused schemes, palettes, blend
  and image/theme utils are dropped.
- Extensionless relative imports (`'../dynamiccolor/dynamic_scheme'`) were rewritten to
  `.js` so bundlers and `svelte-package` resolve them.
- Type-only imports are marked `import type` (the library compiles with `verbatimModuleSyntax`).
- `index.ts` here is a new, narrower barrel that re-exports only what this library uses.

No algorithmic changes. To update, copy the same files from a newer upstream commit,
re-apply both import fixes, and update the commit above.
