/* eslint-disable @typescript-eslint/no-magic-numbers */

import type { HarmonicLoaderConfig } from "./harmonic-loader.interface";

export const generateLoaderConfig = (width: number, height: number): HarmonicLoaderConfig => ({
	amplitude: height / 12,
	// ω = 2π / T<Time Period>
	angularFrequency: 2 * Math.PI / 0.3,
	basePhase: 0,
	dotRadius: (width / 600) + 2,
	dotsDist: width / 10,
	retardationRate: 0.5,
	// k = 2π / λ<Wavelength>
	waveNumber: 2 * Math.PI / (width / 3),
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
