/* eslint-disable @typescript-eslint/no-magic-numbers */
export const Constants: {
	readonly DELTA_DEFAULT: number;
	readonly HORIZONTAL: boolean;
	readonly INITIAL_PAGE_INDEX: number;
	readonly OVERSHOOT_DEFAULT: number;
	readonly SCROLL_TOLERANCE: number;
	readonly SWIPE_SCALE_FACTOR: number;
	readonly THROTTLE_DEFAULT: number;
	readonly TOUCH_TOLERANCE: number;
	readonly VERTICAL: boolean;
} = {
	DELTA_DEFAULT: 100,
	HORIZONTAL: true,
	INITIAL_PAGE_INDEX: 0,
	OVERSHOOT_DEFAULT: 0,
	SCROLL_TOLERANCE: 0.1,
	SWIPE_SCALE_FACTOR: 5,
	THROTTLE_DEFAULT: 500,
	TOUCH_TOLERANCE: 0.1,
	VERTICAL: false,
};

/* eslint-enable @typescript-eslint/no-magic-numbers */