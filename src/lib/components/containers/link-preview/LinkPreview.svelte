<!--
@component
Link Previews display a preview of a link's content when hovered.

@see https://bits-ui.com/docs/components/link-preview
-->
<script lang="ts">
	import { LinkPreview } from 'bits-ui';
	import clsx from 'clsx';
	import { linkPreview } from './theme.js';
	import type { LinkPreviewProps } from './types.js';
	import { enterExit, easeEmphasizedDecel, easeEmphasizedAccel } from '$lib/animation/index.js';
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
		<LinkPreview.Content forceMount {side} {align} {sideOffset}>
			{#snippet child({ wrapperProps, props, open: isOpen })}
				{#if isOpen}
					<div {...wrapperProps}>
						<div
							{...props}
							class={base({ class: clsx(className) })}
							in:enterExit={{ duration: 200, easing: easeEmphasizedDecel, mode: 'scale' }}
							out:enterExit={{ duration: 150, easing: easeEmphasizedAccel, mode: 'scale' }}
						>
							<Layer />
							<div class={content()}>
								{@render children()}
							</div>
						</div>
					</div>
				{/if}
			{/snippet}
		</LinkPreview.Content>
	</LinkPreview.Portal>
</LinkPreview.Root>
