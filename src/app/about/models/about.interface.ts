import { SocialGlyphModel } from '../social-glyphs/social-glyphs.interface';

export interface TextSection {
	heading?: string;
	paragraph: string;
	img?: string;
}

export interface TimelineSection {
	img: string;
	period: string;
	entry: TextSection;
}

export interface ContributorModel {
	title: string;
	description: string;
	img: string;
}

export interface ContactModel extends TextSection {
	mediaplugpara: string;
	links: SocialGlyphModel;
}

export interface AboutModel {
	subject: string;
	intro?: TextSection;
	overview?: TextSection[];
	story?: TimelineSection[];
	contributors?: ContributorModel[];
	contact?: ContactModel;
}
