import { tv } from 'tailwind-variants';

export const avatar = tv({
	slots: {
		root: 'relative flex aspect-square shrink-0 items-center justify-center overflow-hidden rounded-full',
		image: 'h-full w-full object-cover',
		fallback: 'flex h-full w-full items-center justify-center rounded-full bg-surface-container-highest',
		button: 'relative rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
	},
	variants: {
		size: {
			sm: {
				root: 'size-12'
			},
			md: {
				root: 'size-18'
			},
			lg: {
				root: 'size-24'
			}
		}
	},
	defaultVariants: {
		size: 'lg'
	}
});
