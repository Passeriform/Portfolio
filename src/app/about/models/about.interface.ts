import type { LinkModel } from "@shared/models/link.interface";

export interface TextSection {
	readonly paragraph: string;
	readonly heading?: string;
	readonly img?: string;
}

export interface TimelineSection {
	readonly entry: TextSection;
	readonly img: string;
	readonly period: string;
}

export interface ContributorModel {
	readonly description: string;
	readonly img: string;
	readonly title: string;
}

export type ContactModel = TextSection & {
	readonly links: LinkModel;
	readonly mediaplugpara: string;
};

export interface AboutModel {
	readonly subject: string;
	readonly contact?: ContactModel;
	readonly contributors?: readonly ContributorModel[];
	readonly intro?: TextSection;
	readonly overview?: readonly TextSection[];
	readonly story?: readonly TimelineSection[];
}
