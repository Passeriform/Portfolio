export type RankedEntry<T extends { tags: readonly string[] }> = T & { score: number };
