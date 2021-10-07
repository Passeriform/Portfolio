import { Injectable } from "@angular/core";

export type FuzzyScore = number;

export interface FuzzySegment {
	isMatch: boolean;
	value: string;
}

@Injectable()
export class FuzzyAnalyzer {
	public parseValue(value: string, input: string): readonly FuzzySegment[] {
		// TODO: Refactor method to make more modern.

		const valueLength: number = value.length;
		const inputLength: number = input.length;
		let valueIndex = 0;
		let inputIndex = 0;

		const segments: FuzzySegment[] = [];

		while (valueIndex < valueLength) {
			const valueChar: string = value.charAt(valueIndex++).toLowerCase();
			const inputChar: string = input.charAt(inputIndex).toLowerCase();
			const segment: FuzzySegment = {
				isMatch: false,
				value: valueChar,
			};

			if (valueChar === inputChar) {
				inputIndex++;

				if (segment.isMatch) {
					segment.value += valueChar;
				}

				segment.isMatch = true;

				segments.push(segment);

				if (inputIndex === inputLength && valueIndex < valueLength) {
					segments.push({
						isMatch: false,
						value: value.slice(valueIndex),
					});

					break;
				}
			} else {
				if (segment.isMatch) {
					segment.isMatch = false;

					segments.push(segment);
				} else {
					segment.value += valueChar;
				}
			}
		}

		return segments;
	}

	public scoreValue(value: string, input: string): FuzzyScore {
		const normalizedValue: string = value.toLowerCase();
		const normalizedInput: string = input.toLowerCase();

		const valueLength: number = normalizedValue.length;
		const inputLength: number = normalizedInput.length;
		let valueIndex: number = 0;
		let inputIndex: number = 0;

		let previousIndexMatched: boolean = false;
		let score: number = 0;

		while (valueIndex < valueLength) {
			const valueChar: string = normalizedValue.charAt(valueIndex++);
			const inputChar: string = normalizedInput.charAt(inputIndex);

			if (valueChar === inputChar) {
				inputIndex++;
				score += previousIndexMatched ? 3 : 2;
				previousIndexMatched = true;

				if (inputIndex === inputLength) {
					return score -= valueLength - valueIndex;
				}
			} else {
				score--;
				previousIndexMatched = false;
			}
		}

		return score;
	}
}
