import { LoaderConfig } from './loader.interface';

export enum AnimationState {
	Stopped,
	Running,
	Resolving,
}

export function getDotsPos(splitDist: number): number[] {
	const dotsCount = window.innerWidth / splitDist;
	const splitLocs: number[] = Array.from({ length: dotsCount })
		.fill(0)
		.map((_, idx) =>
			splitDist * (idx - ((dotsCount - 0.5) / 2))
		);

	return splitLocs;
}

export function generateLoaderConfig(width: number, height: number): LoaderConfig {
	return {
		yoffset: height / 2,
		retardationRate: 0.5,
	};
}

export function percToPhaseAngle(percentage: number): number {
	return 3.14 - (percentage * 3.14 / 100);
}
