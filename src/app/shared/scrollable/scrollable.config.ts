/* eslint-disable @typescript-eslint/no-magic-numbers */
export const Constants: {
	readonly DELTA_DEFAULT: number;
	readonly HORIZONTAL: boolean;
	readonly INITIAL_PAGE_INDEX: number;
	readonly SCROLL_NORMALIZATION_FACTOR: number;
	readonly SCROLL_THRESHOLD: number;
	readonly SENSITIVITY_DEFAULT: number;
	readonly SMOOTH_SCROLL_DEFAULT: boolean;
	readonly SWIPE_NORMALIZATION_FACTOR: number;
	readonly SWIPE_THRESHOLD: number;
	readonly THROTTLE_DEFAULT: number;
	readonly VERTICAL: boolean;
} = {
	DELTA_DEFAULT: 100,
	HORIZONTAL: true,
	INITIAL_PAGE_INDEX: 0,
	SCROLL_NORMALIZATION_FACTOR: 90,
	SCROLL_THRESHOLD: 0.1,
	SENSITIVITY_DEFAULT: 1,
	SMOOTH_SCROLL_DEFAULT: false,
	SWIPE_NORMALIZATION_FACTOR: 16,
	SWIPE_THRESHOLD: 0.1,
	THROTTLE_DEFAULT: 500,
	VERTICAL: false,
};

/* eslint-enable @typescript-eslint/no-magic-numbers */
