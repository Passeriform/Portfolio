export interface FuzzySegment {
	isMatch: boolean;
	value: string;
}

// TODO: Prune results if score exceeds threshold to reduce the result array size

// TODO: Fix lint issues.

export const scoreWord = (value: string, input: string): number => {
	const normalizedValue: string = value.toLowerCase();
	const normalizedInput: string = input.toLowerCase();

	let score = 0;

	// TODO: Convert to reduce.

	for (
		let inputIndex = 0, previousIndexMatched = false, valueIndex = 0;
		valueIndex < normalizedValue.length && inputIndex < normalizedInput.length;
		valueIndex++
	) {
		const valueChar: string = normalizedValue.charAt(valueIndex);
		const inputChar: string = normalizedInput.charAt(inputIndex);

		if (valueChar === inputChar) {
			inputIndex++;
		}

		score += valueChar === inputChar ? (previousIndexMatched ? 3 : 2) : -1;

		previousIndexMatched = valueChar === inputChar;
	}

	const overshoot = Math.max(normalizedValue.length - normalizedInput.length, 0);

	return score - overshoot;
};
