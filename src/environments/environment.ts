import type { Environment } from "./environment.interface";

/* eslint-disable-next-line import/no-unassigned-import */
import "zone.js/dist/zone-error";

export const environment: Environment = {
	apiUrl: "https://api.portfolio.passeriform.com",
	blogUrl: "https://blog.passeriform.com",
	githubEventsApiUrl: "https://api.github.com/users/Passeriform/events",
	graphqlApiKey: `${process.env.GRAPHQL_API_KEY}`,
	graphqlServerUri: `${process.env.GRAPHQL_SERVER_URI}`,
	production: false,
};
