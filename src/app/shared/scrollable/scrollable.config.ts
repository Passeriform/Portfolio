import { Orientation } from "@shared/models/cardinals.interface";

/* eslint-disable @typescript-eslint/no-magic-numbers */
export const Constants: {
	readonly DELTA_DEFAULT: number;
	readonly INITIAL_PAGE_INDEX: number;
	readonly ORIENTATION_DEFAULT: Orientation;
	readonly SCROLL_SCALING_FACTOR: number;
	readonly SCROLL_THRESHOLD: number;
	readonly SENSITIVITY_DEFAULT: number;
	readonly SMOOTH_SCROLL_DEFAULT: boolean;
	readonly SWIPE_SCALING_FACTOR: number;
	readonly SWIPE_THRESHOLD: number;
	readonly THROTTLE_DEFAULT: number;
	readonly VERTICAL: boolean;
} = {
	DELTA_DEFAULT: 100,
	INITIAL_PAGE_INDEX: 0,
	ORIENTATION_DEFAULT: Orientation.VERTICAL,
	SCROLL_SCALING_FACTOR: 90,
	SCROLL_THRESHOLD: 0.1,
	SENSITIVITY_DEFAULT: 1,
	SMOOTH_SCROLL_DEFAULT: false,
	SWIPE_SCALING_FACTOR: 16,
	SWIPE_THRESHOLD: 0.1,
	THROTTLE_DEFAULT: 500,
	VERTICAL: false,
};

/* eslint-enable @typescript-eslint/no-magic-numbers */
