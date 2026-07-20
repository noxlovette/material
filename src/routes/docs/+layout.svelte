<script lang="ts">
  import { page } from '$app/state';
  import { Icon, SplitPane } from '$lib/index.js';

  const { children } = $props();

  type NavItem = { label: string; href: string };
  type NavGroup = { group: string; icon: string; items: NavItem[] };

  const nav: NavGroup[] = [
    {
      group: 'Navigation',
      icon: 'bottom_navigation',
      items: [
        { label: 'Rail', href: '/docs/rail' },
        { label: 'Navbar', href: '/docs/navbar' },
        { label: 'Tabs', href: '/docs/tabs' },
        { label: 'App Bar', href: '/docs/appbar' }
      ]
    },
    {
      group: 'Clickables',
      icon: 'smart_button',
      items: [
        { label: 'Button', href: '/docs/button' },
        { label: 'Button Icon', href: '/docs/button-icon' },
        { label: 'FAB', href: '/docs/fab' },
        { label: 'Toggle', href: '/docs/toggle' },
        { label: 'Pill', href: '/docs/pill' }
      ]
    },
    {
      group: 'Inputs',
      icon: 'edit',
      items: [
        { label: 'Textfield', href: '/docs/textfield' },
        { label: 'Checkbox', href: '/docs/checkbox' },
        { label: 'Switch', href: '/docs/switch' },
        { label: 'Select', href: '/docs/select' },
        { label: 'Slider', href: '/docs/slider' },
        { label: 'Search', href: '/docs/search' }
      ]
    },
    {
      group: 'Layout',
      icon: 'view_quilt',
      items: [
        { label: 'Single Pane', href: '/docs/single-pane' },
        { label: 'Split Pane', href: '/docs/split-pane' },
        { label: 'Supporting Pane', href: '/docs/supporting-pane' },
        { label: 'Card', href: '/docs/card' }
      ]
    },
    {
      group: 'Containers',
      icon: 'layers',
      items: [
        { label: 'Dialog', href: '/docs/dialog' },
        { label: 'Menu', href: '/docs/menu' },
        { label: 'Popover', href: '/docs/popover' },
        { label: 'Bottom Sheet', href: '/docs/bottom-sheet' },
        { label: 'Side Sheet', href: '/docs/side-sheet' }
      ]
    },
    {
      group: 'Feedback',
      icon: 'notifications',
      items: [
        { label: 'Snackbar', href: '/docs/snackbar' },
        { label: 'Badge', href: '/docs/badge' },
        { label: 'Progress', href: '/docs/progress' }
      ]
    },
    {
      group: 'Typography',
      icon: 'title',
      items: [
        { label: 'Display', href: '/docs/display' },
        { label: 'Headline', href: '/docs/headline' },
        { label: 'Title', href: '/docs/title' },
        { label: 'Body', href: '/docs/body' },
        { label: 'Label', href: '/docs/label' }
      ]
    }
  ];

  const currentPath = $derived(page.url.pathname);
</script>

<!--
  Secondary docs sidebar. anchor="sticky" + resizable={false} because this nav is
  nested inside the root layout's already Rail-offset content column: a "viewport"
  anchor would fix to the true browser edge (wrong, under the Rail) and a "parent"
  anchor would lose sticky-while-scrolling behaviour. See SplitPane's anchor docs.
-->
<SplitPane
  anchor="sticky"
  resizable={false}
  full={false}
  rounded={false}
  leftWidth={224}
  leftClass="bg-md-sys-color-surface border-md-sys-color-outline-variant border-r"
  rightClass="min-w-0"
>
  {#snippet left()}
    <a
      href="/docs"
      class="text-md-sys-color-primary mb-4 block px-7 pt-6 text-xs font-semibold tracking-widest uppercase no-underline"
    >
      Components
    </a>

    {#each nav as group}
      <div class="mb-1 px-3">
        <div class="text-md-sys-color-outline mb-1 flex items-center gap-2 px-3 py-1">
          <Icon name={group.icon} class="text-[16px]" />
          <span class="text-xs font-medium tracking-wide uppercase">{group.group}</span>
        </div>

        {#each group.items as item}
          {@const isActive = currentPath === item.href}
          <a
            href={item.href}
            class="block rounded-lg px-3 py-1.5 text-sm no-underline transition-colors {isActive
              ? 'bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container font-medium'
              : 'text-md-sys-color-on-surface-variant hover:bg-md-sys-color-surface-container-high'}"
          >
            {item.label}
          </a>
        {/each}
      </div>
    {/each}
  {/snippet}

  {#snippet right()}
    {@render children()}
  {/snippet}
</SplitPane>
