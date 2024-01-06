import type { WorkModel } from "@app/work/models/work.interface";
import type { GetAllWorkQuery, GetSocialLinksQuery, GetTopPeopleQuery, GetTopWorksQuery } from "@graphql/generated/schema";

// TODO: Infer this type from usage directly or remove duplication in transformer and footer service spec.
type SocialLinksEdgeType = NonNullable<NonNullable<
	GetSocialLinksQuery["peopleCollection"]
>["edges"][number]["people"]["socialCollection"]>;

export const socialLinksGQLModelMock: Readonly<SocialLinksEdgeType["edges"][number]["social"][]> = [
	{
		link: "/link-email",
		type: "EMAIL",
	},
	{
		link: "/link-linkedin",
		type: "LINKEDIN",
	},
	{
		link: "/link-github",
		type: "GITHUB",
	},
];

export const topPeopleGQLModelMock: Readonly<NonNullable<GetTopPeopleQuery["peopleCollection"]>["edges"][number]["people"][]> = [
	{
		route: "/person-1",
		slug: "person-1",
		title: "Person 1 - Title",
	},
	{
		route: "/person-2",
		slug: "person-2",
		title: "Person 2 - Title",
	},
];

export const topWorksGQLModelMock: Readonly<NonNullable<GetTopWorksQuery["workCollection"]>["edges"][number]["work"][]> = [
	{
		route: "/product-1",
		slug: "product-1",
		title: "Product 1 - Title",
	},
	{
		route: "/project-1",
		slug: "project-1",
		title: "Project 1 - Title",
	},
];

export const workGQLModelMock: Readonly<NonNullable<GetAllWorkQuery["workCollection"]>["edges"][number]["work"][]> = [
	{
		...topWorksGQLModelMock[0]!,
		brief: "Product 1 - Brief",
		frameworks: [ "angular" ],
		languages: [ "typescript" ],
		license: [ "FREE" ],
		logo: "",
		repository: "",
		subtitle: "Product 1 - Subtitle",
		tags: [
			"tag1a",
			"tag1b",
			"tag1c",
		],
		tools: [],
		type: "PRODUCT",
		/* eslint-disable camelcase */
		work_assetsCollection: { edges: [] },
		work_referencesCollection: { edges: [] },
		/* eslint-enable camelcase */
	},
	{
		...topWorksGQLModelMock[1]!,
		brief: "Project 1 - Brief",
		frameworks: [ "react" ],
		languages: [
			"typescript",
			"javascript",
		],
		license: [
			"GPL",
			"FREE",
		],
		logo: "",
		repository: "",
		subtitle: "Project 1 - Subtitle",
		tags: [
			"tag2a",
			"tag2b",
			"tag2c",
		],
		tools: [],
		type: "PROJECT",
		/* eslint-disable camelcase */
		work_assetsCollection: { edges: [] },
		work_referencesCollection: { edges: [] },
		/* eslint-enable camelcase */
	},
];

export const expectedModel: readonly WorkModel[] = [
	{
		...workGQLModelMock[0],
		assets: [],
	},
	{
		...workGQLModelMock[1],
		assets: [],
	},
] as WorkModel[];
