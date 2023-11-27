import type { ApolloQueryResult } from "@apollo/client/core";

import type { TopSocialModel } from "@app/footer/models/footer.interface";
import type { GetSocialLinksQuery } from "@graphql/generated/schema";

export const extractTopSocialLinks = (
		gqlResult: Readonly<ApolloQueryResult<GetSocialLinksQuery>>,
): readonly TopSocialModel[] => gqlResult.data.peopleCollection?.edges[0]?.people.socialCollection?.edges.map(
	(socialEdge) => socialEdge.social,
) ?? [];
