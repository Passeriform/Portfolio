import { WType, License, Language, Framework, Tool } from '@app/shared/registry.interface';

export interface WorkModel {
	ref: string;
	type: WType;
	title: string;
	subtitle: string;
	description: string;
	license: License[];
	languages: Language[];
	frameworks: Framework[];
	tools: Tool[];
	tags: string[];
	children: string[];
	dependency: string[];
}

export interface WorkDescriptionModel {
	title: string;
	subtitle: string;
	description: string;
	logo: string;
	screenshots: string[];
}
