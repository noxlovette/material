<!--
@component
Body components are used for longer passages of text in your app.
Follows Material 3 Body typography styles.

@see https://m3.material.io/styles/typography/overview#4739268d-2900-410a-abb8-10903823467f
-->
<script lang="ts">
	import clsx from 'clsx';

	import { body } from './theme.js';
	import type { BodyProps } from './types.js';

	let {
		children,
		emphasized,
		size = 'medium',
		class: className,
		...restProps
	}: BodyProps = $props();

	let classP = $derived(
		body({
			class: clsx(className),
			emphasized,
			size
		})
	);
</script>

<p {...restProps} class={classP}>
	{@render children()}
</p>
