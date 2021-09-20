// TODO: Add another loader type to concretely define LoaderConfig interface.

export enum LoadingState {
	LOADED,
	LOADING,
	LOADING_QUEUED,
}

export interface LoaderConfig {
	readonly retardationRate: number;
	readonly yoffset: number;
}
