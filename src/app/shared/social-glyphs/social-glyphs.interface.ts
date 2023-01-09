import type { Social } from "@shared/models/registry.interface";

export interface SocialGlyphModel {
	readonly link: string;
	readonly type: Social;
}
