import type { SocialGlyphModel } from "@shared/social-glyphs/social-glyphs.interface";

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

export type IntroModel = TextSection & {
	readonly heading: string;
};

export interface ContributorModel {
	readonly aboutUrl: string;
	readonly description: string;
	readonly img: string;
	readonly title: string;
}

export type ContactModel = TextSection & {
	readonly links: readonly SocialGlyphModel[];
	readonly mediaplugpara: string;
};

export interface AboutModel {
	readonly subject: string;
	readonly contact?: ContactModel;
	readonly contributors?: readonly ContributorModel[];
	readonly intro?: IntroModel;
	readonly overview?: readonly TextSection[];
	readonly story?: readonly TimelineSection[];
}
