# data-cy Attribute Convention

## Purpose

`data-cy` attributes are stable test hooks for Cypress. They are decoupled from styling (classes) and behavior (IDs), so they survive refactors without breaking tests.

## Naming Convention

Use the `m3-` prefix to namespace all test IDs in this library.

| Element type         | Pattern                 | Example               |
| -------------------- | ----------------------- | --------------------- |
| Component root       | `m3-<component>`        | `m3-button`           |
| Internal sub-element | `m3-<component>-<part>` | `m3-snackbar-dismiss` |

Use kebab-case throughout. Keep names short and role-describing, not variant-describing (`m3-button`, not `m3-filled-button`).

## Implementation Rules

### Root element

Place `data-cy` **before** `{...restProps}` so consumers can override it with their own value:

```svelte
<Button.Root data-cy="m3-button" {...restProps as ButtonRootProps}>
```

This means a consumer can do:

```svelte
<Button data-cy="submit-order-btn" />
```

and `m3-button` is replaced by `submit-order-btn` in the rendered HTML.

### Internal sub-elements

Hardcode these directly — they are not reachable via `restProps`:

```svelte
<button data-cy="m3-snackbar-dismiss" aria-label="Dismiss snackbar">
```

### Bits UI roots

When the root is a Bits UI primitive, cast `restProps` but keep `data-cy` before the spread:

```svelte
<Button.Root data-cy="m3-button" {...restProps as ButtonRootProps}>
```

## What NOT to do

- Do not use `class` or `id` as test selectors — they are coupled to styling.
- Do not put `data-cy` after `{...restProps}` — it would prevent consumer overrides.
- Do not use variant names in the ID (`m3-tonal-button`) — tests should not care about visual variants.

## Existing components

| Component        | Root `data-cy`         | Sub-element `data-cy` |
| ---------------- | ---------------------- | --------------------- |
| Snackbar         | `m3-snackbar`          | `m3-snackbar-dismiss` |
| Button           | `m3-button`            | —                     |
| ButtonIcon       | `m3-button-icon`       | —                     |
| FAB              | `m3-fab`               | —                     |
| FABMenu          | `m3-fab-menu`          | —                     |
| FABMenuItem      | `m3-fab-menu-item`     | —                     |
| Toggle           | `m3-toggle`            | —                     |
| Card             | `m3-card`              | —                     |
| Avatar           | `m3-avatar`            | —                     |
| LinearProgress   | `m3-linear-progress`   | —                     |
| CircularProgress | `m3-circular-progress` | —                     |

> Update this table as new components are added or sub-elements are instrumented.

## Cypress usage

```ts
cy.get('[data-cy="m3-button"]'); // any button
cy.get('[data-cy="submit-order-btn"]'); // consumer-overridden button
cy.get('[data-cy="m3-snackbar-dismiss"]').click();
```
