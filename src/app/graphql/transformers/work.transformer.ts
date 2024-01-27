import type { ApolloQueryResult } from "@apollo/client/core";

import type { TopWorkModel } from "@app/footer/models/footer.interface";
import type { WorkModel } from "@app/work/models/work.interface";

import type { GetAllWorkQuery, GetTopWorksQuery } from "@graphql/generated/schema";

export const extractWorks = (
		gqlResult: Readonly<ApolloQueryResult<GetAllWorkQuery>>,
): readonly WorkModel[] => gqlResult.data.workCollection?.edges.map(
	(workEdge) => ({
		...workEdge.work,
		assets: workEdge.work.workAssets?.edges.map(
			(assetEdge) => assetEdge.asset,
		) ?? [],
		licenses: workEdge.work.workEntityMapping?.edges.filter(
			(entityEdge) => entityEdge.entity.entity.type === "LICENSE",
		).map(
			(entityEdge) => entityEdge.entity.entity,
		) ?? [],
		tags: workEdge.work.tags.filter(Boolean) as readonly string[],
		techStack: workEdge.work.workEntityMapping?.edges.map(
			(entityEdge) => entityEdge.entity.entity,
		) ?? [],
	}),
) ?? [];

export const extractTopWorks = (
		gqlResult: Readonly<ApolloQueryResult<GetTopWorksQuery>>,
): readonly TopWorkModel[] => gqlResult.data.workCollection?.edges.map((workEdge) => workEdge.work) ?? [];
