# Motion guide

Source: `src/lib/animation/` (barrel-exported via `src/lib/animation/index.ts`) + spring tokens and utilities in `src/lib/styles/motion.css`. Live reference: Storybook → **Motion/Transition patterns** (one looping demo per M3 pattern).

Two rules frame everything below:

- **M3 Expressive springs are the only motion scheme.** There are no Standard-scheme springs and no hand-picked `ms` durations. Every animation — JS or CSS — resolves to one of the six spring tokens in `springTokens` (`spring.ts`).
- **No Svelte transitions.** `in:`/`out:`/`transition:`/`animate:` are not used anywhere in the library. Mount/unmount and navigation motion goes through Motion (`motion` package, hybrid `animate()`/`animateView()`); state-driven motion (hover, press, selected, focus) stays as CSS transitions on the spring tokens.

## Applying transitions

Source: [m3.material.io → Transitions → Applying transitions](https://m3.material.io/styles/motion/transitions/applying-transitions). Read this section before picking a primitive, and use it to review any transition. M3 notes that its transition pages still describe the legacy easing-and-duration system and will move to the physics (spring) system. This library already runs on springs, so read "duration" below as "spring token" (see the spring table).

### What makes a good transition

| Quality                            | M3 rule                                                                                                                                                                                                                                                                                  | What it means here                                                                                                                                                                                                                                                                                                   |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Follows accessibility settings** | With reduced motion on, use subtle fades instead of intense slides or scales, and turn off decorative effects such as parallax and shape morphing.                                                                                                                                       | This is not implemented yet (see [Reduced motion](#reduced-motion)). Don't add new parallax or morph effects that you couldn't easily switch off.                                                                                                                                                                    |
| **Consistent**                     | Use the same transition type for the same kind of change everywhere, so the app feels like one cohesive family.                                                                                                                                                                          | Always use one primitive for one relationship. Every hierarchy step uses `sharedAxis` on the same axis, and every navbar/rail destination uses `fadeThrough`. Never mix patterns for the same kind of navigation.                                                                                                    |
| **Stable layouts**                 | Use skeleton loaders so the layout holds still during a transition. Content shouldn't pop in or move around.                                                                                                                                                                             | Reserve the loaded content's footprint with `{@attach skeleton}` placeholders, then reveal the content with `presence(…, enterExit.fade)`. The content shouldn't be conditionally inserted in a way that shifts its siblings.                                                                                        |
| **No jarring jump cuts**           | By default, avoid instant screen swaps because they disorient users. A jump cut is fine only when pure efficiency matters most, such as opening a menu in a productivity app.                                                                                                            | Surfaces and navigation always animate, which is why the ownership table below is mandatory. A jump cut has to be an explicit, documented choice, never the result of leaving the animation out.                                                                                                                     |
| **Coherent spatial model**         | Transitions should teach the app's physical layout.                                                                                                                                                                                                                                      | A given relationship always moves along the same axis. For example, don't switch between horizontal and vertical when a collapsed view expands. If forward is `x`, backward is `x` reversed and never `y`.                                                                                                           |
| **Unified direction**              | Group elements so they move along one primary axis. Only important elements, such as hero images, stay persistent. Don't animate many persistent elements independently.                                                                                                                 | Transition one `target` region as a unit. Don't give several children their own `animateView` targets or view-transition names. The only element that gets its own identity is the hero, which becomes the `containerTransform` `from`/`to`.                                                                         |
| **Clean fades**                    | Fully fade out the old content before fading the new content in. If a cross-fade can't be avoided, keep it short and hide it in the fastest part of the motion. Don't slowly fade a component over other content while it enters or exits. A centered dialog may fade, but only briefly. | The view-transition helpers already do this: `old` fades on `fastEffects`, `new` fades on `effects` after a delay. Opacity on enter/exit presets always uses `fastEffects`. **Edge-anchored surfaces (bottom and side sheets) slide without any opacity.** Keep it that way, and never put opacity on a slow spring. |
| **Simple style**                   | Transitions happen often, cover large parts of the screen and exist to help users finish a task. Common transitions shouldn't use overt style effects such as bouncy springs.                                                                                                            | Navigation primitives default to `spatial` (damping 0.8). Don't pass `fastSpatial` (damping 0.6, the bounciest spring) as the `spring` for `sharedAxis`/`lateral`/`fadeThrough`/`containerTransform`. Keep noticeable overshoot for small parts and direct feedback.                                                 |

### Choosing a transition pattern

| Pattern                  | Use for                                                                                                                                                                                                              | Don't use for                                                                                                                                                                                                                                                                                                                      |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Container transform**  | Hero moments that should feel expressive, shallow hierarchies where an element expands for detail and then collapses back, and creating a seamless connection between two elements. It is the most dramatic pattern. | Apps with deep hierarchies, where the motion becomes excessive, and utility-focused navigation. It needs a custom implementation and feels heavy when used often.                                                                                                                                                                  |
| **Forward and backward** | Common hierarchical navigation. M3 recommends the platform default. On the web that's `sharedAxis` (`x` for steps, `z` for parent → child), because its motion style is simple.                                      | Hero moments, such as opening a photo memory. Use container transform for those.                                                                                                                                                                                                                                                   |
| **Lateral**              | Browsing peer content in the same set, such as tabs in a media library or carousel pages. The horizontal slide suggests the area can be swiped.                                                                      | Hierarchical screens: a full-width slide is too much for a frequent transition and falsely suggests a peer relationship. Top-level destinations: it suggests a swipe that conflicts with carousels and swipeable list items. **Never fade while sliding**, because it hides the peer relationship and looks like forward/backward. |
| **Top level**            | Moving between destinations from a navigation bar, rail or drawer, which use a quick fade (`fadeThrough`). The destinations aren't necessarily related, so the motion deliberately doesn't connect them.             | Anything that should read as related (use lateral or forward/backward).                                                                                                                                                                                                                                                            |
| **Enter and exit**       | Bringing a component into the context of the current screen. It can be modal (a dialog that needs an action) or non-modal (a standard bottom sheet over a map, where both regions stay usable).                      | Navigating between hierarchical screens: a full-height slide is excessive and leaves the relationship between screens unclear.                                                                                                                                                                                                     |
| **Skeleton loaders**     | Holding the layout still while content loads (see "Stable layouts").                                                                                                                                                 | Content that's already available. Animate it in instead of faking a load.                                                                                                                                                                                                                                                          |

Quick decision: is a component appearing on this screen? **Enter/exit.** Is the user changing screens? Ask how the screens relate. If one element expands into its own detail as a hero moment, use **container transform**. If the screens are parent/child or sequential steps, use **forward/backward**. If they're siblings in one set, use **lateral**. If they're unrelated navbar/rail/drawer destinations, use **top level**.

## Springs: spatial vs effects

M3 principle: motion is **spatial** when something moves, resizes or reshapes; **effects** when only color/opacity change.

| Token (`springTokens.*`) | Stiffness / damping ratio | Use for                                                                    |
| ------------------------ | ------------------------- | -------------------------------------------------------------------------- |
| `fastSpatial`            | 800 / 0.6 (~410ms)        | small parts & direct feedback: handles, indicators, chevrons, shape morphs |
| `spatial`                | 380 / 0.8 (~490ms)        | component containers: dialogs, sheets, rail, navigation content            |
| `slowSpatial`            | 200 / 0.8 (~660ms)        | large / full-screen surfaces                                               |
| `fastEffects`            | 3800 / 1 (~190ms)         | hover/press/focus color, state layers, exits                               |
| `effects`                | 1600 / 1 (~270ms)         | color/opacity changes on containers, fades                                 |
| `slowEffects`            | 800 / 1 (~370ms)          | large-surface fades                                                        |

Spatial springs overshoot by design (fast spatial most, at damping ratio 0.6); effects springs are critically damped. The `ms` values are CSS settle times — JS springs have no fixed duration. **Never put opacity on a spatial spring** — split per value instead (see `enterExit.ts`).

## JS: picking a primitive

| M3 pattern                                                        | Primitive                                                    | Notes                                                                                                                                                                                                                                                                                              |
| ----------------------------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Enter and exit** — a surface appears/leaves within the screen   | `presence(() => open, enterExit.<preset>)`                   | Attachment. Presets: `fade`, `scale` (menus/popovers/tooltips — sets `transform-origin` to bits-ui's anchor side, so never add an `origin-*` class), `slideUp` (snackbar), `dialog`, `sideSheet`, `bottomSheet`. Interruptible: reopening mid-exit retargets from the current value with velocity. |
| Same, outside bits-ui (element must stay mounted during its exit) | `new Presence(() => open)`                                   | `{#if p.mounted}<div {@attach p.attach(enterExit.x)}>`. Construct during component init. Used by Snackbar, SideSheet, BottomSheet.                                                                                                                                                                 |
| **Container transform** — card → detail, FAB → sheet              | `containerTransform(update, { from, to })`                   | Motion `animateView()` (View Transition API). `update` swaps the DOM (`async () => { open = true; await tick(); }`); `to` may be a selector for an element that only exists after the update.                                                                                                      |
| **Forward and backward** — hierarchy levels, wizard steps         | `sharedAxis(update, { target, axis, direction })`            | `axis: 'x' \| 'y' \| 'z'`, `direction: 'forward' \| 'backward'`. `target` is the persistent region whose content changes; omit for the whole page.                                                                                                                                                 |
| **Lateral** — peer screens (tabs, carousels)                      | `lateral(update, { target, direction })`                     | Edge-to-edge slide, no fade.                                                                                                                                                                                                                                                                       |
| **Top level** — unrelated destinations (navigation bar)           | `fadeThrough(update, { target })`                            | Old fades out, new fades in scaling from 92%.                                                                                                                                                                                                                                                      |
| **Skeleton loaders**                                              | `{@attach skeleton}` on the placeholder                      | Pulses until replaced; reveal the content with `presence(…, enterExit.fade)`.                                                                                                                                                                                                                      |
| Anything custom                                                   | `animate(node, keyframes, springTransition(springTokens.x))` | `springTransition` converts a token to Motion's physics spring (`stiffness`/`damping`), which inherits velocity on interruption.                                                                                                                                                                   |

### Which components must use which pattern

A pattern belongs in a component only when that component owns both states of the change. When the content that changes lives outside the component (a route, an app screen), the app applies the pattern, not the library. Keep this table in sync when a component gains or loses one of these patterns; each primitive's JSDoc in `src/lib/animation/` repeats its own row.

| Pattern                  | Built into (must use it)                                                                                                                                                       | Left to the app                                                                                     |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| **Enter and exit**       | Dialogue, BottomSheet, SideSheet, Menu, MenuSub, ContextMenu, Popover, Tooltip, LinkPreview, Select, FABMenu, SplitButton, Snackbar, DateField/DateRangeField/TimeField popups | —                                                                                                   |
| **Lateral**              | TabHolder (switching content panels); DateField/DateRangeField (changing the visible month, via `date/calendarMotion.ts`)                                                      | Navigation (`href`) tabs: the route change is the app's                                             |
| **Container transform**  | —                                                                                                                                                                              | Card → detail, FAB → sheet. `Search` has no search view to expand into; add it here if one is built |
| **Forward and backward** | —                                                                                                                                                                              | Hierarchy levels, wizard steps                                                                      |
| **Top level**            | —                                                                                                                                                                              | Page changes from `Navbar`/`Rail`: they don't own the content region                                |
| **Skeleton loaders**     | —                                                                                                                                                                              | Placeholders for data the app loads                                                                 |

A new component that mounts a surface must use enter/exit; one that pages between peer views (a carousel, a stepper of equal steps) must use lateral.

### bits-ui content

bits-ui's presence layer waits for the content element's `getAnimations()` before unmounting, and Motion runs `transform`/`opacity` on WAAPI. So for any bits-ui `*.Content`: **drop `forceMount`, drop the `{#if open}` wrapper**, and attach `presence` to the element that receives `props`:

```svelte
<Popover.Content>
  {#snippet child({ wrapperProps, props, open })}
    <div {...wrapperProps}>
      <div {...props} {@attach presence(() => open, enterExit.scale)}>…</div>
    </div>
  {/snippet}
</Popover.Content>
```

Keep enter/exit keyframes to `transform` and `opacity` — a non-accelerated property falls back to a JS animation that `getAnimations()` can't see, and bits-ui will unmount before the exit plays.

### View-transition patterns: limits

`containerTransform`, `sharedAxis`, `lateral`, `fadeThrough` use the View Transition API: one transition per document at a time (Motion queues the next one rather than interrupting), snapshot-based, and a no-op animation (DOM update still runs) in browsers without the API.

## Shape morphing

The 35 M3 Expressive shapes (https://m3.material.io/styles/shape) ship in three sets in `src/lib/animation/`:

| Set                                                                          | Points, viewBox                 | Morphable                            | Use for                                               |
| ---------------------------------------------------------------------------- | ------------------------------- | ------------------------------------ | ----------------------------------------------------- |
| `shapes.ts` (`pathCircle`, …)                                                | original Béziers, `0 0 380 380` | no, each path has its own structure  | static shapes only                                    |
| `shapesAnimatable.ts` (`pathAnimatable*`, `animatableShapes`)                | 720, `0 0 380 380`              | yes, with any other path in this set | hero-sized shapes                                     |
| `shapesAnimatableSmall.ts` (`pathAnimatableSmall*`, `animatableShapesSmall`) | 120, `0 0 48 48`                | yes, with any other path in this set | icons, avatars, indicators, FABs; about 1/8 the bytes |

Within a set, every path has the same point count, start point and winding, so Motion's `mix` interpolates any pair without flipping or twisting. Never morph across sets.

- **Morph with `shapeMorph(() => path)`** (attachment on a `<path>`) or `morphShape(pathEl, to)`. Both use `fastSpatial` by default, stop the previous morph and start from the shape on screen, and swap instantly under `prefers-reduced-motion`.
- **Pick by name** with `animatableShapes[name]` / `animatableShapesSmall[name]` (`ShapeName`, `shapeNames`). A map pulls in its whole set, so import individual `pathAnimatable*` constants when bundle size matters.
- `LoadingIndicator` morphs through seven of the small shapes (`LOADING_SHAPES`) on its own component spring.
- Live demo: Storybook → Motion/Shapes.

## CSS: state-driven transitions

For hover/press/selected/focus motion driven by pseudo-classes or `data-*` state, use a Tailwind transition-property utility plus one spring utility from `motion.css`:

```ts
'transition-colors md-sys-motion-fast-effects'; // state color
'transition-transform md-sys-motion-fast-spatial'; // indicator / chevron / handle
'transition-[width,padding] md-sys-motion-spatial'; // container resize
```

Utilities: `md-sys-motion-{fast-spatial,spatial,slow-spatial,fast-effects,effects,slow-effects}`. They set duration + timing function together (and Tailwind's `--tw-duration`/`--tw-ease`, so they win over `transition-*` regardless of order). Never write `duration-200`, `ease-in-out`, bare `transition-colors` (Tailwind's 150ms default), or `transition-all`.

In plain CSS (`component.css`, `<style>` blocks) use the variables directly: `transition: border-radius var(--md-sys-motion-duration-fast-spatial) var(--md-sys-motion-timing-function-fast-spatial);`. Button shape morphs use `fast-spatial` for both press and release — no separate accelerate/decelerate curves.

**Don't hand-edit the spring tokens.** They sit between `@generated:springs` markers in `motion.css`. Change `springTokens` in `spring.ts`; the lefthook pre-commit job (`motion-springs`) regenerates and stages `motion.css` whenever `spring.ts`, the generator or `motion.css` is committed, and `bun run build` regenerates before packaging. To run it by hand: `bun run generate:springs`.

The legacy easing-and-duration tokens (`--md-sys-motion-duration{,-fast,-slow}`, `-timing-function-emphasized*`) no longer exist.

### Where the numbers come from

m3.material.io describes the patterns but doesn't list scales or offsets; its reference implementation, Material Components Android (`lib/java/com/google/android/material/transition/`), does. Use these, don't invent new ones:

| Value                                                 | Source                                                               |
| ----------------------------------------------------- | -------------------------------------------------------------------- |
| Enter from `scale(0.8)`, exit by fade only (`exited`) | `MaterialFade` / `ScaleProvider`                                     |
| Shared axis X/Y: 30px slide                           | `mtrl_transition_shared_axis_slide_distance`                         |
| Shared axis Z: in 0.8 → 1, out 1 → 1.1                | `ScaleProvider`                                                      |
| Fade through: in from `scale(0.92)`                   | `MaterialFadeThrough`                                                |
| Snackbar: slide by own height                         | `BaseTransientBottomBar` (slide mode)                                |
| Spring tokens                                         | `motion/res/values/tokens.xml` (`m3_sys_motion_expressive_spring_*`) |

MDC's own durations/easings (`short1`…`extraLong4` × `emphasized`/`standard`) are replaced by the spring tokens here. Still invented and flagged in code: the skeleton pulse hold (`skeleton.ts`), the 0.05s/0.09s fade-in delays in the view-transition patterns.

`Layer.svelte`'s ripple also runs on Motion (scale + fade on `slowEffects`), so there's no fixed-curve animation left in the library.

## Reduced motion

Not implemented yet — tracked in https://github.com/noxlovette/material/issues/24. `Layer.svelte`'s ripple is the only thing that currently checks `prefers-reduced-motion`.

Target behavior, per [Applying transitions](https://m3.material.io/styles/motion/transitions/applying-transitions). When `prefers-reduced-motion: reduce` is set:

- **Swap movement for subtle fades rather than removing the transition** (a jump cut would break the "no jarring jump cuts" rule). `enterExit.scale`/`dialog`/`slideUp`/`sideSheet`/`bottomSheet` fall back to `enterExit.fade`. `sharedAxis`, `lateral` and `containerTransform` fall back to a `fadeThrough`-style opacity-only fade, with no translate or scale.
- **Disable decorative effects**: shape morphing (button `--btn-shape` morphs; `morphShape`/`shapeMorph` already swap instantly), parallax, the ripple (already done).
- Keep effects-spring color/opacity feedback (state layers, hover/press color), since that motion carries meaning and isn't intense.
