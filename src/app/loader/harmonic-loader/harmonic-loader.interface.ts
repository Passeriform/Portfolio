import type { LoaderConfig } from "../models/loader.interface";

export type HarmonicLoaderConfig = LoaderConfig & {
	readonly amplitude: number;
	readonly angularFrequency: number;
	readonly basePhase: number;
	readonly dotRadius: number;
	readonly dotsDist: number;
	readonly retardationRate: number;
	readonly waveNumber: number;
	readonly yoffset: number;
};
