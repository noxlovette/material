<!--
  The six M3 transition patterns, each on its own M3 shape, driven by `src/lib/animation/`.
  https://m3.material.io/styles/motion/transitions/transition-patterns
  Choosing and applying them: https://m3.material.io/styles/motion/transitions/applying-transitions
  (summarized in .claude/skills/material-design/references/motion-guide.md → "Applying transitions").

  Every demo loops by default; "Replay" retriggers it on demand. The Overview plays the six in
  turn rather than all at once: container transform, forward/backward, lateral and top level run
  on the View Transition API, which allows one transition per document at a time.

  Excluded from autodocs — the docs page renders every story into one document, which would
  duplicate the `data-demo` targets these transitions resolve.
-->
<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Motion/Transition patterns',
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen' }
  });
</script>

<script lang="ts">
  import { tick } from 'svelte';
  import type { Attachment } from 'svelte/attachments';
  import Button from '$lib/components/buttons/Button.svelte';
  import Title from '$lib/components/typography/title/Title.svelte';
  import Body from '$lib/components/typography/body/Body.svelte';
  import {
    containerTransform,
    enterExit,
    fadeThrough,
    lateral,
    Presence,
    sharedAxis,
    skeleton,
    type NavigationDirection
  } from './transition.js';
  import {
    pathFourLeafClover,
    pathFourSidedCookie,
    pathGem,
    pathPentagon,
    pathSoftBurst,
    pathSunny
  } from './shapes.js';

  const LOOP_MS = 2200;
  const OVERVIEW_STEP_MS = 1400;

  let looping = $state(true);

  /* Container transform — a cookie card expands into a detail surface and back. */
  let expanded = $state(false);
  const runContainer = () => {
    const [from, to] = expanded
      ? ['[data-demo="ct-detail"]', '[data-demo="ct-card"]']
      : ['[data-demo="ct-card"]', '[data-demo="ct-detail"]'];
    return containerTransform(
      async () => {
        expanded = !expanded;
        await tick();
      },
      { from, to }
    );
  };

  /* Forward and backward — Inbox → Thread → Message and back up the hierarchy. */
  const levels = ['Inbox', 'Thread', 'Message'];
  let level = $state(0);
  let descending = true;
  const runAxis = () => {
    if (level === levels.length - 1) descending = false;
    if (level === 0) descending = true;
    const direction: NavigationDirection = descending ? 'forward' : 'backward';
    return sharedAxis(
      async () => {
        level += descending ? 1 : -1;
        await tick();
      },
      { target: '[data-demo="axis"]', axis: 'x', direction }
    );
  };

  /* Lateral — peer tabs, wrapping back to the first. */
  const tabs = ['Photos', 'Albums', 'Search'];
  let tab = $state(0);
  const runLateral = () => {
    const next = (tab + 1) % tabs.length;
    const direction: NavigationDirection = next > tab ? 'forward' : 'backward';
    return lateral(
      async () => {
        tab = next;
        await tick();
      },
      { target: '[data-demo="lateral"]', direction }
    );
  };

  /* Lateral on the y axis — vertical tabs: the next peer pushes up from below. */
  const steps = ['Shipping', 'Payment', 'Review'];
  let step = $state(0);
  const runLateralY = () => {
    const next = (step + 1) % steps.length;
    return lateral(
      async () => {
        step = next;
        await tick();
      },
      {
        target: '[data-demo="lateral-y"]',
        axis: 'y',
        direction: next > step ? 'forward' : 'backward'
      }
    );
  };

  /* Top level — unrelated destinations, as from a navigation bar. */
  const destinations = [
    { label: 'Home', color: 'bg-md-sys-color-primary-container text-md-sys-color-primary' },
    { label: 'Library', color: 'bg-md-sys-color-secondary-container text-md-sys-color-secondary' },
    { label: 'Profile', color: 'bg-md-sys-color-tertiary-container text-md-sys-color-tertiary' }
  ];
  let destination = $state(0);
  const runTopLevel = () =>
    fadeThrough(
      async () => {
        destination = (destination + 1) % destinations.length;
        await tick();
      },
      { target: '[data-demo="top"]' }
    );

  /* Enter and exit — a surface appears and leaves within the same screen. */
  let popped = $state(true);
  const pop = new Presence(() => popped);
  const runEnterExit = () => (popped = !popped);

  /* Skeleton loader — a pulsing placeholder, then the content fades in. */
  let loaded = $state(false);
  const content = new Presence(() => loaded);
  const runSkeleton = () => (loaded = !loaded);

  type Pattern = { id: string; title: string; summary: string; anchor: string; run: () => unknown };

  const patterns = {
    container: {
      id: 'container',
      title: 'Container transform',
      summary: 'A container morphs into another, crossfading its content.',
      anchor: 'container-transform',
      run: runContainer
    },
    axis: {
      id: 'axis',
      title: 'Forward and backward',
      summary: 'Content moves along a shared axis between hierarchy levels.',
      anchor: 'forward-and-backward',
      run: runAxis
    },
    lateral: {
      id: 'lateral',
      title: 'Lateral',
      summary: 'Peer screens slide past each other edge to edge.',
      anchor: 'lateral',
      run: runLateral
    },
    top: {
      id: 'top',
      title: 'Top level',
      summary: 'Unrelated destinations fade through each other.',
      anchor: 'top-level',
      run: runTopLevel
    },
    enterExit: {
      id: 'enter-exit',
      title: 'Enter and exit',
      summary: 'Surfaces appear and leave within the current screen.',
      anchor: 'enter-and-exit',
      run: runEnterExit
    },
    skeleton: {
      id: 'skeleton',
      title: 'Skeleton loaders',
      summary: 'A placeholder pulses until real content fades in.',
      anchor: 'skeleton-loaders',
      run: runSkeleton
    }
  } satisfies Record<string, Pattern>;

  const all = Object.values(patterns);
  // A variant of lateral, not a seventh pattern: its own story, not in the overview grid.
  const lateralY: Pattern = {
    id: 'lateral-y',
    title: 'Lateral, vertical',
    summary: "Peers laid out top to bottom slide on the y axis: lateral with axis: 'y'.",
    anchor: 'lateral',
    run: runLateralY
  };

  /** Loops `run` while `looping` is on; toggling the loop restarts the interval. */
  const loop =
    (run: () => unknown, every = LOOP_MS): Attachment =>
    () => {
      if (!looping) return;
      const id = setInterval(run, every);
      return () => clearInterval(id);
    };

  /** Overview: one pattern per tick, round-robin, so view transitions never overlap. */
  const roundRobin: Attachment = () => {
    if (!looping) return;
    let i = 0;
    const id = setInterval(() => all[i++ % all.length].run(), OVERVIEW_STEP_MS);
    return () => clearInterval(id);
  };
</script>

{#snippet shape(path: string, cls: string)}
  <svg viewBox="0 0 380 380" class={cls} aria-hidden="true">
    <path d={path} fill="currentColor" />
  </svg>
{/snippet}

{#snippet stage(pattern: Pattern)}
  {#if pattern.id === 'container'}
    {#if !expanded}
      <button
        type="button"
        data-demo="ct-card"
        class="bg-md-sys-color-primary-container text-md-sys-color-on-primary-container top-spacing-200 left-spacing-200 gap-spacing-150 p-spacing-150 absolute flex items-center rounded-lg"
        onclick={runContainer}
      >
        {@render shape(pathFourSidedCookie, 'size-spacing-500 text-md-sys-color-primary')}
        <span class="md-sys-typescale-label-large">Open</span>
      </button>
    {:else}
      <div
        data-demo="ct-detail"
        class="bg-md-sys-color-surface-container-highest text-md-sys-color-on-surface inset-spacing-150 gap-spacing-150 absolute flex flex-col items-center justify-center rounded-xl"
      >
        {@render shape(pathFourSidedCookie, 'size-24 text-md-sys-color-primary')}
        <span class="md-sys-typescale-title-medium">Detail</span>
      </div>
    {/if}
  {:else if pattern.id === 'axis'}
    <div
      data-demo="axis"
      class="inset-spacing-0 gap-spacing-150 absolute flex flex-col items-center justify-center"
    >
      {@render shape(
        pathPentagon,
        [
          'size-spacing-800 text-md-sys-color-primary',
          'size-20 text-md-sys-color-secondary',
          'size-24 text-md-sys-color-tertiary'
        ][level]
      )}
      <span class="md-sys-typescale-title-medium text-md-sys-color-on-surface">
        {levels.slice(0, level + 1).join(' › ')}
      </span>
    </div>
  {:else if pattern.id === 'lateral'}
    <div
      class="inset-x-spacing-0 top-spacing-0 gap-spacing-300 pt-spacing-150 absolute flex justify-center"
    >
      {#each tabs as name, i (name)}
        <span
          class={[
            'md-sys-typescale-label-large',
            i === tab ? 'text-md-sys-color-primary' : 'text-md-sys-color-on-surface-variant'
          ]}>{name}</span
        >
      {/each}
    </div>
    <div
      data-demo="lateral"
      class="bg-md-sys-color-surface-container inset-x-spacing-150 bottom-spacing-150 absolute top-11 flex items-center justify-center rounded-lg"
    >
      {@render shape(pathFourLeafClover, 'size-24 text-md-sys-color-primary')}
      <span
        class="md-sys-typescale-display-small text-md-sys-color-on-primary absolute"
        aria-hidden="true">{tab + 1}</span
      >
    </div>
  {:else if pattern.id === 'lateral-y'}
    <div class="inset-spacing-150 gap-spacing-200 absolute flex">
      <div class="gap-spacing-200 flex flex-col justify-center">
        {#each steps as name, i (name)}
          <span
            class={[
              'md-sys-typescale-label-large',
              i === step ? 'text-md-sys-color-primary' : 'text-md-sys-color-on-surface-variant'
            ]}>{name}</span
          >
        {/each}
      </div>
      <div
        data-demo="lateral-y"
        class="bg-md-sys-color-surface-container relative flex flex-1 items-center justify-center rounded-lg"
      >
        {@render shape(pathFourLeafClover, 'size-24 text-md-sys-color-secondary')}
        <span
          class="md-sys-typescale-display-small text-md-sys-color-on-secondary absolute"
          aria-hidden="true">{step + 1}</span
        >
      </div>
    </div>
  {:else if pattern.id === 'top'}
    <div
      data-demo="top"
      class={[
        'inset-spacing-150 gap-spacing-150 absolute flex flex-col items-center justify-center rounded-lg',
        destinations[destination].color
      ]}
    >
      {@render shape(pathSunny, 'size-24')}
      <span class="md-sys-typescale-title-medium">{destinations[destination].label}</span>
    </div>
  {:else if pattern.id === 'enter-exit'}
    {#if pop.mounted}
      <div
        class="bg-md-sys-color-surface-container-high shadow-elevation-3 inset-x-spacing-400 inset-y-spacing-300 absolute flex items-center justify-center rounded-xl"
        {@attach pop.attach(enterExit.scale)}
      >
        {@render shape(pathSoftBurst, 'size-24 text-md-sys-color-tertiary')}
      </div>
    {/if}
  {:else if pattern.id === 'skeleton'}
    <div class="inset-spacing-150 absolute grid [&>*]:[grid-area:1/1]">
      {#if !loaded}
        <div class="gap-spacing-150 flex flex-col items-center justify-center" {@attach skeleton}>
          <div class="bg-md-sys-color-surface-container-highest size-24 rounded-full"></div>
          <div
            class="bg-md-sys-color-surface-container-highest h-spacing-200 w-28 rounded-full"
          ></div>
        </div>
      {/if}
      {#if content.mounted}
        <div
          class="gap-spacing-150 flex flex-col items-center justify-center"
          {@attach content.attach(enterExit.fade)}
        >
          {@render shape(pathGem, 'size-24 text-md-sys-color-secondary')}
          <span class="md-sys-typescale-title-medium text-md-sys-color-on-surface">Loaded</span>
        </div>
      {/if}
    </div>
  {/if}
{/snippet}

{#snippet demo(pattern: Pattern, tall = false)}
  <section
    class="bg-md-sys-color-surface-container-low text-md-sys-color-on-surface gap-spacing-150 p-spacing-200 flex flex-col rounded-xl"
  >
    <header class="gap-spacing-150 flex items-start justify-between">
      <div class="gap-spacing-50 flex flex-col">
        <Title size="medium">{pattern.title}</Title>
        <Body size="small" class="text-md-sys-color-on-surface-variant">{pattern.summary}</Body>
      </div>
      <Button variant="tonal" size="sm" onclick={pattern.run}>Replay</Button>
    </header>
    <div
      class={['bg-md-sys-color-surface relative overflow-clip rounded-lg', tall ? 'h-96' : 'h-60']}
    >
      {@render stage(pattern)}
    </div>
    <a
      class="text-link md-sys-typescale-label-small self-start"
      href="https://m3.material.io/styles/motion/transitions/transition-patterns#{pattern.anchor}"
      target="_blank"
      rel="noreferrer">M3 spec</a
    >
  </section>
{/snippet}

{#snippet toolbar()}
  <div class="gap-spacing-200 flex items-center justify-between">
    <Title size="large">M3 transition patterns</Title>
    <Button variant={looping ? 'filled' : 'outlined'} onclick={() => (looping = !looping)}>
      {looping ? 'Pause loop' : 'Loop'}
    </Button>
  </div>
{/snippet}

<Story name="Overview" asChild>
  <div
    class="bg-md-sys-color-surface gap-spacing-300 p-spacing-300 flex min-h-dvh flex-col"
    {@attach roundRobin}
  >
    {@render toolbar()}
    <div class="gap-spacing-200 grid md:grid-cols-2 xl:grid-cols-3">
      {#each all as pattern (pattern.id)}
        {@render demo(pattern)}
      {/each}
    </div>
  </div>
</Story>

{#snippet single(pattern: Pattern)}
  <div
    class="bg-md-sys-color-surface gap-spacing-300 p-spacing-300 flex min-h-dvh flex-col"
    {@attach loop(pattern.run)}
  >
    {@render toolbar()}
    <div class="mx-auto w-full max-w-xl">
      {@render demo(pattern, true)}
    </div>
  </div>
{/snippet}

<Story name="Container transform" asChild>{@render single(patterns.container)}</Story>
<Story name="Forward and backward" asChild>{@render single(patterns.axis)}</Story>
<Story name="Lateral" asChild>{@render single(patterns.lateral)}</Story>
<Story name="Lateral vertical" asChild>{@render single(lateralY)}</Story>
<Story name="Top level" asChild>{@render single(patterns.top)}</Story>
<Story name="Enter and exit" asChild>{@render single(patterns.enterExit)}</Story>
<Story name="Skeleton loaders" asChild>{@render single(patterns.skeleton)}</Story>
