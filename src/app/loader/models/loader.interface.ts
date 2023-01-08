// TODO: Add another loader type to concretely define LoaderConfig interface.

export const enum LoadingState {
	LOADED,
	LOADING,
	LOADING_QUEUED,
}

/* eslint-disable @typescript-eslint/no-magic-numbers */
export const enum Progress {
	INIT = 0,
	COMPLETE = 100,
}
/* eslint-enable @typescript-eslint/no-magic-numbers */

export const enum AnimationState {
	STOPPED,
	RUNNING,
	RESOLVING,
}


export interface LoaderConfig {
	readonly retardationRate: number;
	readonly yoffset: number;
}
