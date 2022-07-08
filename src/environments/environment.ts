/* eslint-disable-next-line import/no-unassigned-import */
import "zone.js/dist/zone-error";

export const environment: {
	readonly apiUrl: string;
	readonly blogUrl: string;
	readonly githubEventsApiUrl: string;
	readonly production: boolean;
} = {
	/* eslint-disable-next-line unicorn/string-content */
	apiUrl: "http://localhost:3000",
	blogUrl: "http://blog.passeriform.com",
	githubEventsApiUrl: "https://api.github.com/users/Passeriform/events",
	production: false,
};
