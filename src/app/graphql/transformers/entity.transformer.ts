import type { ApolloQueryResult } from "@apollo/client/core";
import type { GetEntityIconQuery } from "../generated/schema";

export const extractEntityIcon = (
		gqlResult: Readonly<ApolloQueryResult<GetEntityIconQuery>>,
): string | undefined => gqlResult.data.entityRegistryCollection?.edges[0]?.node.iconUrl;
