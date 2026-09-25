<script lang="ts">
  import { Body } from '$lib/index.js';
  import CodeBlock from '../../CodeBlock.svelte';
  import Code from '../Code.svelte';
  import GuidePage from '../GuidePage.svelte';
  import Section from '../Section.svelte';

  const toc = [
    { id: 'what', label: 'What it is' },
    { id: 'install', label: 'Install' },
    { id: 'contents', label: "What's in it" }
  ];
</script>

<GuidePage
  title="Claude skill"
  lede="Give Claude Code this library's M3 rules, so the UI it writes in your project uses the right components, tokens and motion."
  {toc}
>
  <Section id="what" title="What it is">
    <Body>
      The package ships a <a
        href="https://docs.claude.com/en/docs/claude-code/skills"
        class="text-md-sys-color-primary">Claude Code skill</a
      >
      called <Code>material-design</Code>. Claude loads it when it creates or reviews UI, and
      follows the library's rules instead of guessing M3 from general knowledge. It's the same skill
      used to build this library.
    </Body>
  </Section>

  <Section id="install" title="Install">
    <Body>From your project's root, after installing the package:</Body>
    <CodeBlock lang="bash" code="npx @noxlovette/material material-claude-skill" />
    <Body>
      This copies the skill into <Code>.claude/skills/material-design</Code>. It won't overwrite an
      existing copy; after upgrading the package, run it again with <Code>--force</Code> to update the
      skill.
    </Body>
  </Section>

  <Section id="contents" title="What's in it">
    <Body>
      The color roles, type scale, spacing, shape, elevation and motion tokens as they're named
      here; how to choose a component variant and color role; the motion rules and transition
      patterns; and an M3 accessibility checklist.
    </Body>
  </Section>
</GuidePage>
