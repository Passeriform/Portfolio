/* eslint-disable-next-line import/no-unassigned-import */
import "zone.js/dist/zone-error";

export const environment: {
	readonly apiUrl: string;
	readonly production: boolean;
} = {
	/* eslint-disable-next-line unicorn/string-content */
	apiUrl: "http://localhost:3000",
	production: false,
};
