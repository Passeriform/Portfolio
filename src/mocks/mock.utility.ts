import type { GetAllWorkQuery, GetSocialLinksQuery, GetTopPeopleQuery, GetTopWorksQuery } from "@app/graphql/generated/schema";

// TODO: Infer this type from usage directly or remove duplication in transformer and footer service spec.
type SocialLinksEdgeType = NonNullable<NonNullable<
	GetSocialLinksQuery["peopleCollection"]
>["edges"][number]["people"]["socialCollection"]>;

// TODO: Combine all utilities into a single generic that can handle spy assignment in all cases.

export const setWorkSpyReturnValue = (
		spy: Readonly<jasmine.SpyObj<GetAllWorkQuery["workCollection"]>>,
		model: Readonly<NonNullable<GetAllWorkQuery["workCollection"]>["edges"][number]["work"][]>,
): void => {
	(Object.getOwnPropertyDescriptor(spy, "edges")?.get as jasmine.Spy<
		() => NonNullable<GetAllWorkQuery["workCollection"]>["edges"]
	>).and.returnValue(model.map((work) => ({ work })));
};

export const setTopWorksSpyReturnValue = (
		spy: Readonly<jasmine.SpyObj<GetTopWorksQuery["workCollection"]>>,
		model: Readonly<NonNullable<GetTopWorksQuery["workCollection"]>["edges"][number]["work"][]>,
): void => {
	(Object.getOwnPropertyDescriptor(spy, "edges")?.get as jasmine.Spy<
		() => NonNullable<GetTopWorksQuery["workCollection"]>["edges"]
	>).and.returnValue(model.map((work) => ({ work })));
};

export const setTopPeopleSpyReturnValue = (
		spy: Readonly<jasmine.SpyObj<GetTopPeopleQuery["peopleCollection"]>>,
		model: Readonly<NonNullable<GetTopPeopleQuery["peopleCollection"]>["edges"][number]["people"][]>,
): void => {
	(Object.getOwnPropertyDescriptor(spy, "edges")?.get as jasmine.Spy<
		() => NonNullable<GetTopPeopleQuery["peopleCollection"]>["edges"]
	>).and.returnValue(model.map((people) => ({ people })));
};

export const setSocialLinksSpyReturnValue = (
		spy: Readonly<jasmine.SpyObj<SocialLinksEdgeType>>,
		model: Readonly<NonNullable<SocialLinksEdgeType>["edges"][number]["social"][]>,
): void => {
	(Object.getOwnPropertyDescriptor(spy, "edges")?.get as jasmine.Spy<
		() => NonNullable<SocialLinksEdgeType>["edges"]
	>).and.returnValue(model.map((social) => ({ social })));
};
