/* eslint-disable complexity, functional/no-let, functional/no-loop-statement, @typescript-eslint/no-magic-numbers */
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

		const valueLength = value.length;
		const inputLength = input.length;
		let valueIndex = 0;
		let inputIndex = 0;

		const segments: FuzzySegment[] = [];

		while (valueIndex < valueLength) {
			const valueChar = value.charAt(valueIndex++).toLowerCase();
			const inputChar = input.charAt(inputIndex).toLowerCase();
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

		const normalizedValue = value.toLowerCase();
		const normalizedInput = input.toLowerCase();

		const valueLength = normalizedValue.length;
		const inputLength = normalizedInput.length;
		let valueIndex = 0;
		let inputIndex = 0;

		let previousIndexMatched = false;
		let score = 0;

		while (valueIndex < valueLength) {
			const valueChar = normalizedValue.charAt(valueIndex++);
			const inputChar = normalizedInput.charAt(inputIndex);

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

/* eslint-enable complexity, functional/no-let, functional/no-loop-statement, @typescript-eslint/no-magic-numbers */
