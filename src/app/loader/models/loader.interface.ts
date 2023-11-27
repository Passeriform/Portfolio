// TODO: Add another loader type to concretely define LoaderConfig interface.

export const enum LoadingState {
	LOADED,
	LOADING,
	LOADING_QUEUED,
}

/* eslint-disable @typescript-eslint/no-magic-numbers */
export const ProgressCheckpoint = {
	COMPLETE: 100,
	INIT: 0,
} as const;
/* eslint-enable @typescript-eslint/no-magic-numbers */

export const enum AnimationState {
	STOPPED,
	RUNNING,
	RESOLVING,
}


export type LoaderConfig = Readonly<{
	retardationRate: number;
	yoffset: number;
}>;
