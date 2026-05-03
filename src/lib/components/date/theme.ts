import { tv } from 'tailwind-variants';

export const dateField = tv({
	slots: {
		base: `
				group w-full h-14 bg-md-sys-color-surface-container-highest rounded-t-xs
				after:absolute after:bottom-0 after:left-0 after:right-0
				relative
				state-layer before:rounded-xs hover:before:bg-md-sys-color-on-surface/8
				flex items-center
				after:h-px after:bg-md-sys-color-on-surface-variant
				after:transition-[height,background-color] after:duration-200
				hover:after:bg-md-sys-color-on-surface
				focus-within:after:bg-md-sys-color-primary focus-within:after:h-[2px]
				disabled:bg-md-sys-color-on-surface/4
				disabled:after:bg-md-sys-color-on-surface/12
				justify-between
			`,
		input: `
				w-full bg-transparent outline-none
				md-sys-typescale-body-large text-md-sys-color-on-surface
				disabled:text-md-sys-color-on-surface/38 px-3 flex items-center
			`
	}
});
