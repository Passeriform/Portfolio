/* eslint-disable @typescript-eslint/no-magic-numbers */

import type { HarmonicLoaderConfig } from "./harmonic-loader.interface";

export const generateLoaderConfig = (width: number, height: number): HarmonicLoaderConfig => ({
	amplitude: height / 12,
	basePhase: 0,
	dotRadius: (width / 600) + 2,
	dotsDist: width / 10,
	// frequency: width / 10,
	retardationRate: 0.5,
	speed: 25,
	yoffset: height / 2,
});

export const Constants: {
	readonly DEFAULT_RETARDER: number;
	readonly FRAME_CONTRIBUTION: number;
} = {
	DEFAULT_RETARDER: 0,
	FRAME_CONTRIBUTION: 10_000,
};

/* eslint-enable @typescript-eslint/no-magic-numbers */
