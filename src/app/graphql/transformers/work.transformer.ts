import type { ApolloQueryResult } from "@apollo/client/core";

import type { TopWorkModel } from "@app/footer/models/footer.interface";
import type { WorkModel } from "@app/work/models/work.interface";

import type { Framework, GetAllWorkQuery, GetTopWorksQuery, Language, License, Tool } from "@graphql/generated/schema";

export const extractWorks = (
		gqlResult: Readonly<ApolloQueryResult<GetAllWorkQuery>>,
): readonly WorkModel[] => gqlResult.data.workCollection?.edges.map(
	(workEdge) => ({
		...workEdge.work,
		assets: workEdge.work.work_assetsCollection?.edges.map(
			(assetEdge) => assetEdge.asset,
		) ?? [],
		frameworks: workEdge.work.frameworks.filter(Boolean) as readonly Framework[],
		languages: workEdge.work.languages.filter(Boolean) as readonly Language[],
		license: workEdge.work.license.filter(Boolean) as readonly License[],
		tags: workEdge.work.tags.filter(Boolean) as readonly string[],
		tools: workEdge.work.tools.filter(Boolean) as readonly Tool[],
	}),
) ?? [];

export const extractTopWorks = (
		gqlResult: Readonly<ApolloQueryResult<GetTopWorksQuery>>,
): readonly TopWorkModel[] => gqlResult.data.workCollection?.edges.map((workEdge) => workEdge.work) ?? [];
