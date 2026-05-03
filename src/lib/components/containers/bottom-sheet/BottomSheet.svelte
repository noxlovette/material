<!--
@component
Bottom sheets are surfaces containing supplementary content that are anchored to the bottom of the screen.

They provide access to supplementary content and actions, such as navigation or a menu,
while keeping the main screen content visible.

@see https://m3.material.io/components/bottom-sheets/overview
-->
<script lang="ts">
	import type { BottomSheetProps } from './types.js';
	import type { TransitionConfig } from 'svelte/transition';
	import { easeEmphasizedAccel, easeEmphasizedDecel } from '$lib/animation/easing.js';
	import { outroClass } from '$lib/animation/outroClass.js';

	let { children, close }: BottomSheetProps = $props();

	let height = $state(480);
	let container: HTMLDivElement | undefined = $state();
	let isDragging = $state(false);
	let startY = $state(0);

	const open = (node: HTMLDialogElement) => node.showModal();

	const heightAnim = (
		node: HTMLDialogElement,
		options: { duration: number; easing: typeof easeEmphasizedDecel }
	): TransitionConfig => {
		if (node.clientHeight < height) height = node.clientHeight;
		return {
			duration: options.duration,
			easing: options.easing,
			css: (t) => `max-height: ${t * height}px`
		};
	};

	const moveWheel = (e: WheelEvent) => {
		e.preventDefault();
		height += e.deltaY;
		if (container && container.clientHeight < height) height = container.clientHeight;
	};

	const moveMouse = (e: { clientY: number }) => {
		if (isDragging) {
			const distance = e.clientY - startY;
			height -= distance;
			startY = e.clientY;
		}
	};

	$effect(() => {
		if (height < 48) close('low');
	});
</script>

<svelte:window
	onmousemove={moveMouse}
	onmouseup={() => (isDragging = false)}
	ontouchmove={(e) => moveMouse(e.touches[0])}
	ontouchend={() => (isDragging = false)}
/>

<dialog
	class="m-0 mt-auto w-full max-w-2xl overflow-hidden rounded-t-[28px] border-none bg-md-sys-color-surface-container-low p-0 text-md-sys-color-on-surface"
	style:max-height="{height}px"
	use:open
	use:outroClass
	oncancel={(e) => {
		e.preventDefault();
		close('esc');
	}}
	onmousedown={(e) => {
		if (e.target != e.currentTarget) return;
		close('click');
	}}
	onwheel={moveWheel}
	in:heightAnim={{ easing: easeEmphasizedDecel, duration: 400 }}
	out:heightAnim={{ easing: easeEmphasizedAccel, duration: 300 }}
>
	<div class="px-4" bind:this={container}>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="flex h-12 w-full cursor-grab items-center justify-center"
			onmousedown={(e) => {
				e.preventDefault();
				isDragging = true;
				startY = e.clientY;
			}}
			ontouchstart={(e) => {
				isDragging = true;
				startY = e.touches[0].clientY;
			}}
		>
			<div class="h-1 w-8 rounded-full bg-md-sys-color-on-surface-variant/40"></div>
		</div>
		{@render children()}
	</div>
</dialog>

<style>
	dialog::backdrop {
		background-color: rgba(0, 0, 0, 0.5);
		animation: backdrop 400ms;
	}
	dialog:global(.leaving)::backdrop {
		background-color: transparent;
		animation: backdropReverse 400ms;
	}
	@keyframes backdrop {
		from {
			background-color: transparent;
		}
		to {
			background-color: rgba(0, 0, 0, 0.5);
		}
	}
	@keyframes backdropReverse {
		from {
			background-color: rgba(0, 0, 0, 0.5);
		}
		to {
			background-color: transparent;
		}
	}
</style>
