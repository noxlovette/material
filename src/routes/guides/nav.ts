import { base } from '$app/paths';

export type Guide = { slug: string; title: string; icon: string; summary: string };

export const guides: Guide[] = [
  {
    slug: 'get-started',
    title: 'Get started',
    icon: 'rocket_launch',
    summary: 'Install the package, import the CSS in the right order, and wrap your app.'
  },
  {
    slug: 'theming',
    title: 'Theming',
    icon: 'palette',
    summary: 'Dynamic color from a source color or image, light and dark schemes, and contrast.'
  },
  {
    slug: 'tokens',
    title: 'Tokens',
    icon: 'token',
    summary: 'Color roles, the type scale, spacing, shape and elevation as Tailwind classes.'
  },
  {
    slug: 'responsive',
    title: 'Responsive props',
    icon: 'devices',
    summary: 'Props that take one value per M3 window size, resolved in CSS.'
  },
  {
    slug: 'layout',
    title: 'Layout',
    icon: 'view_quilt',
    summary: 'Pane and PaneGrid: list-detail, supporting pane, resizable and sticky layouts.'
  },
  {
    slug: 'motion',
    title: 'Motion',
    icon: 'animation',
    summary: 'Springs only, and which M3 transition to use for which kind of change.'
  },
  {
    slug: 'claude-skill',
    title: 'Claude skill',
    icon: 'smart_toy',
    summary: "Install this library's Material Design skill into your project for Claude Code."
  }
];

export const guideHref = (slug: string) => `${base}/guides/${slug}`;
