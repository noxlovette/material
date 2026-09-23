<!--
@component
Link Previews display a preview of a link's content when hovered.

@see https://bits-ui.com/docs/components/link-preview
-->
<script lang="ts">
  import { enterExit, presence } from '$lib/animation/index.js';
  import { LinkPreview } from 'bits-ui';
  import clsx from 'clsx';
  import { linkPreview } from './theme.js';
  import type { LinkPreviewProps } from './types.js';
  import { Layer } from '$lib/utils/index.js';

  let {
    trigger,
    children,
    open = $bindable(false),
    side = 'bottom',
    align = 'center',
    sideOffset = 8,
    openDelay = 700,
    closeDelay = 300,
    class: className
  }: LinkPreviewProps = $props();

  const { base, content } = linkPreview();
</script>

<LinkPreview.Root bind:open {openDelay} {closeDelay}>
  <LinkPreview.Trigger>
    {@render trigger()}
  </LinkPreview.Trigger>

  <LinkPreview.Portal>
    <LinkPreview.Content {side} {align} {sideOffset}>
      {#snippet child({ wrapperProps, props, open: isOpen })}
        <div {...wrapperProps}>
          <div
            {...props}
            class={base({ class: clsx(className) })}
            {@attach presence(() => isOpen, enterExit.scale)}
          >
            <Layer />
            <div class={content()}>
              {@render children()}
            </div>
          </div>
        </div>
      {/snippet}
    </LinkPreview.Content>
  </LinkPreview.Portal>
</LinkPreview.Root>
