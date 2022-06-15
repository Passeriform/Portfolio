/* eslint-disable @typescript-eslint/no-magic-numbers */

import type { LoaderConfig } from "./loader.interface";

export enum Progress {
	INIT = 0,
	COMPLETE = 100,
}

export enum AnimationState {
	STOPPED,
	RUNNING,
	RESOLVING,
}

export const generateLoaderConfig = (width: number, height: number): LoaderConfig => ({
	retardationRate: 0.5,
	yoffset: height / 2,
});

/* eslint-enable @typescript-eslint/no-magic-numbers */
