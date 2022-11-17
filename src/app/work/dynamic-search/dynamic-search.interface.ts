export type RankedEntry<T extends { readonly tags: readonly string[] }> = T & { score: number };
