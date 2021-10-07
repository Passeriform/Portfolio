import type { LoaderConfig } from "../loader.interface";

export enum AnimationState {
	STOPPED,
	RUNNING,
	RESOLVING,
}

export type HarmonicLoaderConfig = LoaderConfig & {
	readonly amplitude: number;
	readonly basePhase: number;
	readonly dotRadius: number;
	readonly dotsDist: number;
	readonly retardationRate: number;
	readonly speed: number;
	readonly yoffset: number;
};
