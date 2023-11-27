import type { ApolloQueryResult } from "@apollo/client/core";

import type { AboutModel } from "@app/about/models/about.interface";
import type { TopAboutModel } from "@app/footer/models/footer.interface";
import type { GetPeopleQuery, GetTopPeopleQuery } from "@graphql/generated/schema";

export const extractPeople = (
		gqlResult: Readonly<ApolloQueryResult<GetPeopleQuery>>,
): readonly AboutModel[] => gqlResult.data.peopleCollection?.edges.map(
	(peopleEdge) => ({
		...peopleEdge.people,
		socials: peopleEdge.people.socialCollection?.edges.map(
			(socialEdge) => socialEdge.social,
		) ?? [],
	}),
) ?? [];

export const extractTopPeople = (
		gqlResult: Readonly<ApolloQueryResult<GetTopPeopleQuery>>,
): readonly TopAboutModel[] => gqlResult.data.peopleCollection?.edges.map((peopleEdge) => peopleEdge.people) ?? [];
