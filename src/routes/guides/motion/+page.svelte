<script lang="ts">
  import { Body } from '$lib/index.js';
  import CodeBlock from '../../CodeBlock.svelte';
  import { storybookHref } from '../../storybook.js';
  import Code from '../Code.svelte';
  import GuidePage from '../GuidePage.svelte';
  import Section from '../Section.svelte';
  import SimpleTable from '../SimpleTable.svelte';

  const toc = [
    { id: 'rules', label: 'Two rules' },
    { id: 'springs', label: 'Springs' },
    { id: 'patterns', label: 'Choosing a transition' },
    { id: 'built-in', label: 'Built into components' },
    { id: 'routes', label: 'Route changes' }
  ];
</script>

<GuidePage
  title="Motion"
  lede="Every animation runs on M3 Expressive springs, and every transition follows one of M3's six patterns."
  {toc}
>
  <Section id="rules" title="Two rules">
    <Body>
      <strong>Springs only.</strong> There are no millisecond durations or easing curves. Every animation,
      in CSS or JS, uses one of six spring tokens.
    </Body>
    <Body>
      <strong>No Svelte transitions.</strong> Mounting, unmounting and navigation run on Motion's springs
      through the library's helpers, which can be interrupted mid-flight and keep their velocity. Hover,
      press and selection color changes stay CSS transitions on the effects springs.
    </Body>
  </Section>

  <Section id="springs" title="Springs">
    <Body>
      Spatial springs move, resize or reshape things and overshoot slightly. Effects springs change
      color or opacity and never overshoot. Don't animate opacity on a spatial spring.
    </Body>
    <SimpleTable
      headers={['Token', 'Use for', 'CSS utility']}
      rows={[
        [
          '`fastSpatial`',
          'Small parts and direct feedback: handles, indicators, shape morphs',
          '`md-sys-motion-fast-spatial`'
        ],
        [
          '`spatial`',
          'Component containers: dialogs, sheets, navigation content',
          '`md-sys-motion-spatial`'
        ],
        ['`slowSpatial`', 'Large and full-screen surfaces', '`md-sys-motion-slow-spatial`'],
        ['`fastEffects`', 'Hover, press and focus color; exits', '`md-sys-motion-fast-effects`'],
        ['`effects`', 'Color and opacity on containers; fades', '`md-sys-motion-effects`'],
        ['`slowEffects`', 'Large-surface fades', '`md-sys-motion-slow-effects`']
      ]}
    />
  </Section>

  <Section id="patterns" title="Choosing a transition">
    <Body>
      Pick the pattern from how the two states relate (<a
        href="https://m3.material.io/styles/motion/transitions/applying-transitions"
        class="text-md-sys-color-primary">M3: applying transitions</a
      >):
    </Body>
    <SimpleTable
      headers={['The change', 'Pattern', 'Helper']}
      rows={[
        [
          'A component appears on the current screen',
          'Enter and exit',
          '`presence(() => open, enterExit.fade)`'
        ],
        [
          'An element expands into its own detail (a hero moment)',
          'Container transform',
          '`containerTransform(update, { from, to })`'
        ],
        [
          'Parent to child, or the next step',
          'Forward and backward',
          '`sharedAxis(update, { axis, direction })`'
        ],
        [
          'Peers in one set: tabs, pages of a carousel',
          'Lateral',
          '`lateral(update, { direction })`'
        ],
        ['Unrelated destinations from a nav bar or rail', 'Top level', '`fadeThrough(update)`'],
        ['Content is loading', 'Skeleton', '`{@attach skeleton}`']
      ]}
    />
    <Body>
      Keep one pattern per kind of change across the app, don't use bouncy springs for navigation,
      and fade old content out before new content fades in. Each pattern has a live demo in
      <a
        href={storybookHref('/story/motion-transition-patterns--overview')}
        class="text-md-sys-color-primary">Storybook</a
      >.
    </Body>
  </Section>

  <Section id="built-in" title="Built into components">
    <Body>
      Components that own both states animate themselves. Dialogs, sheets, menus, popovers,
      tooltips, selects and snackbars enter and exit; <Code>TabHolder</Code> panels slide laterally; the
      FAB morphs into its menu. Changes whose content lives in your app, such as route changes, card-to-detail
      and wizard steps, are yours to animate with the helpers above.
    </Body>
  </Section>

  <Section id="routes" title="Route changes">
    <Body>
      Pages reached from a <Code>Rail</Code> or <Code>Navbar</Code> are top-level destinations, so they
      fade through. In SvelteKit, hook the helper into <Code>onNavigate</Code> in your root layout:
    </Body>
    <CodeBlock
      code={`<script lang="ts">
  import { onNavigate } from '$app/navigation';
  import { fadeThrough } from '@noxlovette/material';

  onNavigate((navigation) => {
    // A hash change on the same page isn't a new destination.
    if (navigation.from?.url.pathname === navigation.to?.url.pathname) return;
    return new Promise((resolve) => {
      fadeThrough(async () => {
        resolve();
        await navigation.complete;
      }, { target: 'main' });
    });
  });
<\/script>`}
    />
    <Body>
      Fade only the region whose content changed. When a nested nav (a guides list, a settings
      drawer) stays on screen, target that section's content pane between its own pages, and
      <Code>main</Code> only when the destination in the rail or navbar changes. This site does exactly
      that in its root layout.
    </Body>
    <Body>
      For hierarchy (a list to its item), use <Code>sharedAxis</Code> with
      <Code>direction: 'forward'</Code> going in and <Code>'backward'</Code> coming out.
    </Body>
  </Section>
</GuidePage>
