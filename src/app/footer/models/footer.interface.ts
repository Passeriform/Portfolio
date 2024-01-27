import type { GetSocialLinksQuery, GetTopPeopleQuery, GetTopWorksQuery } from "@graphql/generated/schema";

type BaseSocialModel = NonNullable<
	NonNullable<GetSocialLinksQuery["peopleCollection"]>["edges"][number]["people"]["socialCollection"]
>["edges"][number]["social"];

export enum FooterVariant {
	LINEAR = "linear",
	STACKED = "stacked",
}

export type TopAboutModel = NonNullable<GetTopPeopleQuery["peopleCollection"]>["edges"][number]["people"];
export type TopWorkModel = NonNullable<GetTopWorksQuery["workCollection"]>["edges"][number]["work"];
export type TopSocialModel = {
	entity: BaseSocialModel["entity"];
	link: BaseSocialModel["link"];
};
