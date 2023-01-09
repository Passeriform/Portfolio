export type AvatarInput = { href: string, link?: never } | { link: string, href?: never };

export interface AvatarImageInput {
	alt: string;
	src: string | undefined;
}
