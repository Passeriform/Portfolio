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

export const getDotsPos = (splitDist: number): readonly number[] => {
	const dotsCount = window.innerWidth / splitDist;
	const splitLocs: readonly number[] = Array.from({ length: dotsCount })
		.fill(0)
		.map(
			(_, index) => splitDist * (index - ((dotsCount - 0.5) / 2)),
		);

	return splitLocs;
};

export const generateLoaderConfig = (width: number, height: number): LoaderConfig => ({
	retardationRate: 0.5,
	yoffset: height / 2,
});

export const percToPhaseAngle = (percentage: number): number => Math.PI - (percentage * Math.PI / 100);

/* eslint-enable @typescript-eslint/no-magic-numbers */
