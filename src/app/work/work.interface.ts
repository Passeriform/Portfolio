import type { Framework, Language, License, Tool, WType } from "@shared/models/registry.interface";

export interface WorkModel {
	readonly children: readonly string[];
	readonly dependency: readonly string[];
	readonly description: string;
	readonly frameworks: readonly Framework[];
	readonly languages: readonly Language[];
	readonly license: readonly License[];
	readonly ref: string;
	readonly subtitle: string;
	readonly tags: string[];
	readonly title: string;
	readonly tools: readonly Tool[];
	readonly type: WType;
}

export interface WorkDescriptionModel {
	readonly description: string;
	readonly logo: string;
	readonly screenshots: readonly string[];
	readonly subtitle: string;
	readonly title: string;
}
