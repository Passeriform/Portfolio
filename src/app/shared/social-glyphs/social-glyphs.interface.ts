import type { GetSocialLinksQuery } from "@graphql/generated/schema";

type BaseSocialModel = NonNullable<
	NonNullable<GetSocialLinksQuery["peopleCollection"]>["edges"][number]["people"]["socialCollection"]
>["edges"][number]["social"];

export type SocialModel = {
	entity: BaseSocialModel["entity"];
	link: BaseSocialModel["link"];
};
