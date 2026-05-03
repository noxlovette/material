<script lang="ts">
	/**
	 * Popovers display rich content in a non-modal overlay anchored to a trigger element.
	 *
	 * @see https://m3.material.io/components/dialogs/overview (non-modal surface variant)
	 */
	import { Popover } from 'bits-ui';
	import clsx from 'clsx';
	import { popover } from './theme.js';
	import type { PopoverProps } from './types.js';
	import { enterExit, easeEmphasizedDecel, easeEmphasizedAccel } from '$lib/animation/index.js';
	import ButtonIcon from '../../buttons/ButtonIcon.svelte';
	import Title from '../../typography/title/Title.svelte';
	import { Layer } from '$lib/utils/index.js';

	let {
		trigger,
		children,
		title,
		showClose = true,
		open = $bindable(false),
		side = 'bottom',
		align = 'start',
		sideOffset = 8,
		class: className
	}: PopoverProps = $props();

	const { base, header, title: titleCls, close } = popover();
</script>

<Popover.Root bind:open>
	<Popover.Trigger>
		{@render trigger()}
	</Popover.Trigger>

	<Popover.Portal>
		<Popover.Content forceMount {side} {align} {sideOffset}>
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
							{#if title || showClose}
								<div class={header()}>
									{#if title}
										<Title class={titleCls()}>{title}</Title>
									{/if}
									{#if showClose}
										<Popover.Close>
											{#snippet child({ props: closeProps })}
												<div class={close()}>
													<ButtonIcon
														{...closeProps}
														iconProps={{ name: 'close' }}
														variant="text"
														size="sm"
													/>
												</div>
											{/snippet}
										</Popover.Close>
									{/if}
								</div>
							{/if}
							{@render children()}
						</div>
					</div>
				{/if}
			{/snippet}
		</Popover.Content>
	</Popover.Portal>
</Popover.Root>
