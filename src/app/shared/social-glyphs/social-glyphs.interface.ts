import type { Social_Media_Type } from "@graphql/generated/schema";

export type SocialGlyphModel = {
	link: Readonly<string>;
	type: Readonly<Social_Media_Type>;
};
