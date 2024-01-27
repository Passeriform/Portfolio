import type { WorkModel } from "@app/work/models/work.interface";
import type { GetAllWorkQuery, GetSocialLinksQuery, GetTopPeopleQuery, GetTopWorksQuery } from "@graphql/generated/schema";

// TODO: Infer this type from usage directly or remove duplication in transformer and footer service spec.
type SocialLinksEdgeType = NonNullable<NonNullable<
	GetSocialLinksQuery["peopleCollection"]
>["edges"][number]["people"]["socialCollection"]>;

export const socialLinksGQLModelMock: Readonly<SocialLinksEdgeType["edges"][number]["social"][]> = [
	{
		entity: {
			iconUrl: "https://icon.com/icon.svg",
			identifier: "EMAIL",
		},
		link: "/link-email",
	},
	{
		entity: {
			iconUrl: "https://icon.com/icon.svg",
			identifier: "LINKEDIN",
		},
		link: "/link-linkedin",
	},
	{
		entity: {
			iconUrl: "https://icon.com/icon.svg",
			identifier: "GITHUB",
		},
		link: "/link-github",
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
		logo: "",
		repository: "",
		subtitle: "Product 1 - Subtitle",
		tags: [
			"tag1a",
			"tag1b",
			"tag1c",
		],
		type: "PRODUCT",
		workAssets: { edges: [] },
		workEntityMapping: { edges: [
			{ entity: { entity: { iconUrl: "angular.svg", identifier: "angular", type: "FRAMEWORK", wikiSearchTerm: "angular" } } },
			{ entity: { entity: { iconUrl: "typescript.svg", identifier: "typescript", type: "LANGUAGE", wikiSearchTerm: "typescript" } } },
			{ entity: { entity: { iconUrl: "free.svg", identifier: "FREE", type: "LICENSE", wikiSearchTerm: "free-license" } } },
		] },
		workReferenceMapping: { edges: [] },
	},
	{
		...topWorksGQLModelMock[1]!,
		brief: "Project 1 - Brief",
		logo: "",
		repository: "",
		subtitle: "Project 1 - Subtitle",
		tags: [
			"tag2a",
			"tag2b",
			"tag2c",
		],
		type: "PROJECT",
		workAssets: { edges: [] },
		workEntityMapping: { edges: [
			{ entity: { entity: { iconUrl: "react.svg", identifier: "react", type: "FRAMEWORK", wikiSearchTerm: "react" } } },
			{ entity: { entity: { iconUrl: "typescript.svg", identifier: "typescript", type: "LANGUAGE", wikiSearchTerm: "typescript" } } },
			{ entity: { entity: { iconUrl: "javascript.svg", identifier: "javascript", type: "LANGUAGE", wikiSearchTerm: "javascript" } } },
			{ entity: { entity: { iconUrl: "gpl.svg", identifier: "GPL", type: "LICENSE", wikiSearchTerm: "gpl-license" } } },
			{ entity: { entity: { iconUrl: "free.svg", identifier: "FREE", type: "LICENSE", wikiSearchTerm: "free-license" } } },
		] },
		workReferenceMapping: { edges: [] },
	},
];

export const expectedModel: readonly WorkModel[] = [
	{
		...workGQLModelMock[0],
		assets: [],
		licenses: [ { iconUrl: "free.svg", identifier: "FREE", type: "LICENSE", wikiSearchTerm: "free-license" } ],
		techStack: [
			{ iconUrl: "angular.svg", identifier: "angular", type: "FRAMEWORK", wikiSearchTerm: "angular" },
			{ iconUrl: "typescript.svg", identifier: "typescript", type: "LANGUAGE", wikiSearchTerm: "typescript" },
			{ iconUrl: "free.svg", identifier: "FREE", type: "LICENSE", wikiSearchTerm: "free-license" },
		],
	},
	{
		...workGQLModelMock[1],
		assets: [],
		licenses: [
			{ iconUrl: "gpl.svg", identifier: "GPL", type: "LICENSE", wikiSearchTerm: "gpl-license" },
			{ iconUrl: "free.svg", identifier: "FREE", type: "LICENSE", wikiSearchTerm: "free-license" },
		],
		techStack: [
			{ iconUrl: "react.svg", identifier: "react", type: "FRAMEWORK", wikiSearchTerm: "react" },
			{ iconUrl: "typescript.svg", identifier: "typescript", type: "LANGUAGE", wikiSearchTerm: "typescript" },
			{ iconUrl: "javascript.svg", identifier: "javascript", type: "LANGUAGE", wikiSearchTerm: "javascript" },
			{ iconUrl: "gpl.svg", identifier: "GPL", type: "LICENSE", wikiSearchTerm: "gpl-license" },
			{ iconUrl: "free.svg", identifier: "FREE", type: "LICENSE", wikiSearchTerm: "free-license" },
		],
	},
] as WorkModel[];
