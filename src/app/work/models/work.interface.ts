import type { Framework, Language, License, Tool, WType } from "@shared/models/registry.interface";

// TODO: Convert array attribs to sets
export interface WorkModel {
	readonly children: readonly string[];
	readonly dependency: readonly string[];
	readonly description: string;
	readonly frameworks: readonly Framework[];
	readonly languages: readonly Language[];
	readonly license: readonly License[];
	readonly logo: string;
	readonly ref: string;
	// TODO: Verify if this gets proper value
	readonly repository: string;
	readonly screenshots: string[];
	readonly subtitle: string;
	readonly tags: string[];
	readonly title: string;
	readonly tools: readonly Tool[];
	readonly type: WType;
}
