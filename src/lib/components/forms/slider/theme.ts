import { tv, type VariantProps } from 'tailwind-variants';

export const slider = tv({
	slots: {
		root: 'slider-root group relative block min-w-40 [block-size:var(--handle-height)] [print-color-adjust:exact] [--m3-slider-track-out-shape:0.5rem] [--m3-slider-track-in-shape:0.125rem] [--m3-slider-handle-shape:var(--m3-shape-full)] [--functional-width:calc(100%-2*(0.25rem+0.125rem))] [--handle-left:calc(50%+var(--functional-width)*var(--handle)-0.125rem-0.375rem)] [--handle-center:calc(50%+var(--functional-width)*var(--handle))] [--handle-right:calc(50%+var(--functional-width)*var(--handle)+0.125rem+0.375rem)] cursor-pointer data-[disabled]:cursor-not-allowed',
		input:
			'peer absolute left-1/2 [inline-size:calc(var(--functional-width)+1rem)] [block-size:100%] -translate-x-1/2 appearance-none opacity-0 m-0 enabled:cursor-pointer',
		leadingIcon:
			'absolute top-1/2 left-1 h-[var(--icon-size)] w-[var(--icon-size)] -translate-y-1/2 text-[var(--m3c-secondary-container)] pointer-events-none',
		leadingIconPop: 'left-[var(--handle-right)] text-[var(--m3c-primary)]',
		trailingIcon:
			'absolute top-1/2 right-1 h-[var(--icon-size)] w-[var(--icon-size)] -translate-y-1/2 text-[var(--m3c-primary)] pointer-events-none',
		trailingIconPop: 'right-[calc(100%-var(--handle-left))] text-[var(--m3c-secondary-container)]',
		trackFill:
			'absolute inset-x-0 [inset-block:calc((var(--handle-height)-var(--track-height))/2)] pointer-events-none bg-[var(--m3c-primary)] [clip-path:inset(0_calc(100%-var(--handle-left))_0_0_round_var(--track-radius)_var(--m3-slider-track-in-shape)_var(--m3-slider-track-in-shape)_var(--track-radius))] group-data-[disabled]:bg-[--translucent(var(--m3c-on-surface),0.38)] [@media(forced-colors:active)]:bg-[selecteditem] group-data-[disabled]:[@media(forced-colors:active)]:bg-[canvastext]',
		trackRest:
			'absolute inset-x-0 [inset-block:calc((var(--handle-height)-var(--track-height))/2)] pointer-events-none bg-[var(--m3c-secondary-container)] [clip-path:inset(0_0_0_var(--handle-right)_round_var(--m3-slider-track-in-shape)_var(--track-radius)_var(--track-radius)_var(--m3-slider-track-in-shape))] group-data-[disabled]:bg-[--translucent(var(--m3c-on-surface),0.12)] [@media(forced-colors:active)]:bg-[canvastext] group-data-[disabled]:[@media(forced-colors:active)]:bg-[graytext]',
		stopBase:
			'absolute top-1/2 h-1 w-1 rounded-full [inset-inline-start:calc(50%+(100%-0.5rem-0.25rem)*var(--x))] pointer-events-none',
		stopFill: 'bg-[var(--m3c-on-primary)] group-data-[disabled]:bg-[var(--m3c-inverse-on-surface)]',
		stopRest:
			'bg-[var(--m3c-primary)] group-data-[disabled]:bg-[--translucent(var(--m3c-on-surface),0.38)]',
		handle:
			'absolute inset-y-0 left-[var(--handle-center)] w-1 rounded-[1.25rem] bg-[var(--m3c-primary)] pointer-events-none group-focus-within:outline group-focus-within:outline-[4px] group-focus-within:outline-[var(--m3c-on-secondary-container)] group-focus-within:outline-offset-[5px] group-focus-within:z-[2] group-focus-within:w-0.5 group-active:w-0.5 group-data-[disabled]:bg-[--translucent(var(--m3c-on-surface),0.38)] [@media(forced-colors:active)]:bg-[selecteditem] group-data-[disabled]:[@media(forced-colors:active)]:bg-[graytext]',
		value:
			'absolute flex min-w-12 items-center justify-center rounded-[var(--m3-slider-handle-shape)] bg-[var(--m3c-inverse-surface)] px-4 py-3 text-[var(--m3c-inverse-on-surface)] md-sys-typescale-label-large [inset-inline-start:var(--handle-center)] [inset-block-end:calc(var(--handle-height)+4px)] opacity-0 pointer-events-none select-none z-[1] group-hover:opacity-100 group-focus-within:opacity-100 group-active:opacity-100 [@media(forced-colors:active)]:border-2 [@media(forced-colors:active)]:border-[selecteditem] [@media(forced-colors:active)]:overflow-hidden'
	},
	variants: {
		size: {
			xs: '[--track-height:1rem] [--handle-height:2.75rem] [--track-radius:var(--m3-shape-small)] [--icon-size:0]',
			s: '[--track-height:1.5rem] [--handle-height:2.75rem] [--track-radius:var(--m3-shape-small)] [--icon-size:0]',
			m: '[--track-height:2.5rem] [--handle-height:3.25rem] [--track-radius:var(--m3-shape-medium)] [--icon-size:1.5rem]',
			l: '[--track-height:3.5rem] [--handle-height:4.25rem] [--track-radius:var(--m3-shape-large)] [--icon-size:1.5rem]',
			xl: '[--track-height:6rem] [--handle-height:6.75rem] [--track-radius:var(--m3-shape-extra-large)] [--icon-size:2rem]'
		},
		vertical: {
			true: '[writing-mode:sideways-lr]'
		}
	},
	defaultVariants: {
		size: 'xs'
	}
});

export type SliderVariants = VariantProps<typeof slider>;
