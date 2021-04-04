import { HarmonicLoaderConfig } from './harmonic-loader.interface';

export function generateLoaderConfig(width: number, height: number): HarmonicLoaderConfig {
	return {
		yoffset: height / 2,
		amplitude: height / 12,
		speed: 25,
		// frequency: width / 10,
		basePhase: 0,
		dotsDist: width / 10,
		dotRadius: (width / 600) + 2,
		retardationRate: 0.5,
	};
}
