interface Taggable {
	tags?: string[];
}

type TagTransform<T extends Taggable> = (entry: T) => NonNullable<Taggable["tags"]>;

export const nonKeywords: string[] = [
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

export const filterNonKeywords = (words: string[]): string[] => words.filter(
	(word: string) => word && !nonKeywords.includes(word.toLowerCase()),
);

// TODO: Consider converting to sets for uniqueness
export const populateTags = <T extends Taggable>(
	modelCollection: readonly T[],
	strategy: TagTransform<T> = (model: T) => model.tags ?? [],
): readonly T[] => modelCollection.map(
	(model: T) => {
		model.tags = [
			...model.tags ?? [],
			...strategy(model),
		];

		return model;
	},
);
