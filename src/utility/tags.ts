export type TagTransform<T extends { tags: readonly string[] }> = (entry: T) => NonNullable<T["tags"]>;

export const nonKeywords: readonly string[] = [
	"a",
	"am",
	"an",
	"and",
	"are",
	"better",
	"between",
	"based",
	"dead",
	"for",
	"from",
	"i",
	"in",
	"into",
	"more",
	"of",
	"off",
	"on",
	"one",
	"or",
	"s",
	"suited",
	"small",
	"that",
	"this",
	"to",
	"using",
	"with",
	"within",
	"yet",
	"you",
];

export const filterNonKeywords = (words: readonly string[]): readonly string[] => words.filter(
	(word: string) => word && !nonKeywords.includes(word.toLowerCase()),
);

// TODO: Consider converting to sets for uniqueness
export const populateTags = <T extends { tags: readonly string[] }>(
	modelCollection: readonly T[],
	strategy: TagTransform<T> = (model: T) => model.tags,
): readonly T[] => modelCollection.map(
	(model: T) => ({
		...model,
		tags: [
			...model.tags,
			...strategy(model),
		],
	}),
);
