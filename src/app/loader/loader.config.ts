/* eslint-disable @typescript-eslint/no-magic-numbers */

import type { LoaderConfig } from "./models/loader.interface";

export const generateLoaderConfig = (width: number, height: number): LoaderConfig => ({
	retardationRate: 0.5,
	yoffset: height / 2,
});

/* eslint-enable @typescript-eslint/no-magic-numbers */
