import type { LoaderConfig } from "../models/loader.interface";

export type HarmonicLoaderConfig = LoaderConfig & Readonly<{
	amplitude: number;
	angularFrequency: number;
	basePhase: number;
	dotRadius: number;
	dotsDist: number;
	retardationRate: number;
	waveNumber: number;
	yoffset: number;
}>;
