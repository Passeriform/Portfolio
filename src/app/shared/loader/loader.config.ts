import { LoaderConfig } from './loader.interface';

export function generateLoaderConfig(width: number, height: number): LoaderConfig {
	return {
		yoffset: height / 2,
		retardationRate: 0.5,
	};
}

export function percToPhaseAngle(percentage: number): number {
	return 3.14 - (percentage * 3.14 / 100);
}
