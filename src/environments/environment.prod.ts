export const environment: {
	readonly apiUrl: string;
	readonly blogUrl: string;
	readonly githubEventsApiUrl: string;
	readonly production: boolean;
} = {
	apiUrl: "https://passeriform-portfolio-api.herokuapp.com",
	blogUrl: "http://blog.passeriform.com",
	githubEventsApiUrl: "https://api.github.com/users/Passeriform/events",
	production: true,
};
