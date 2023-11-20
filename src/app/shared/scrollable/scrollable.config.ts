import { Orientation } from "@shared/models/cardinals.interface";

/* eslint-disable @typescript-eslint/no-magic-numbers */
export const Constants: Readonly<{
	DELTA_DEFAULT: number;
	INITIAL_PAGE_INDEX: number;
	ORIENTATION_DEFAULT: Orientation;
	SENSITIVITY_DEFAULT: number;
	THRESHOLD_DEFAULT: number;
	THROTTLE_DEFAULT: number;
}> = {
	DELTA_DEFAULT: 1,
	INITIAL_PAGE_INDEX: 0,
	ORIENTATION_DEFAULT: Orientation.VERTICAL,
	SENSITIVITY_DEFAULT: 100,
	THRESHOLD_DEFAULT: 0,
	THROTTLE_DEFAULT: 0,
};

/* eslint-enable @typescript-eslint/no-magic-numbers */
