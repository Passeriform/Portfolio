import { LoadingState } from "@app/loader/models/loader.interface";

export const expectedLoaderOperations = [
	[],
	[ { label: "Task 1", progress: 0, state: LoadingState.LOADING_QUEUED } ],
	[
		{ label: "Task 1", progress: 0, state: LoadingState.LOADING_QUEUED },
		{ label: "Task 2", progress: 0, state: LoadingState.LOADING_QUEUED },
	],
	[
		{ label: "Task 1", progress: 100, state: LoadingState.LOADED },
		{ label: "Task 2", progress: 0, state: LoadingState.LOADING_QUEUED },
	],
	[
		{ label: "Task 1", progress: 100, state: LoadingState.LOADED },
		{ label: "Task 2", progress: 0, state: LoadingState.LOADING_QUEUED },
		{ label: "Task 3", progress: 0, state: LoadingState.LOADING_QUEUED },
	],
	[
		{ label: "Task 1", progress: 100, state: LoadingState.LOADED },
		{ label: "Task 2", progress: 0, state: LoadingState.LOADING_QUEUED },
		{ label: "Task 3", progress: 100, state: LoadingState.LOADED },
	],
	[
		{ label: "Task 1", progress: 100, state: LoadingState.LOADED },
		{ label: "Task 2", progress: 100, state: LoadingState.LOADED },
		{ label: "Task 3", progress: 100, state: LoadingState.LOADED },
	],
];
