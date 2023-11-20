export type Environment = Readonly<{
	apiUrl: string;
	blogUrl: string;
	githubEventsApiUrl: string;
	graphqlApiKey: string;
	graphqlServerUri: string;
	production: boolean;
}>;
