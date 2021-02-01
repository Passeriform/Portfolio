import { SocialGlyphModel } from '../social-glyphs/social-glyphs.interface';

export interface TextSection {
  heading?: string;
  paragraph: string;
  img?: string;
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
  story?: TextSection[];
  contributors?: ContributorModel[];
  contact?: ContactModel;
}
