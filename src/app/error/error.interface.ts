import type { HttpErrorResponse } from "@angular/common/http";

export enum HttpErrors {
	/* eslint-disable @typescript-eslint/no-magic-numbers */
	BAD_REQUEST = 400,
	FORBIDDEN = 403,
	INTERNAL_SERVER_ERROR = 500,
	NOT_FOUND = 404,
	UNKNOWN_ERROR = 0,
	UNAUTHORIZED = 401,
	/* eslint-enable @typescript-eslint/no-magic-numbers */
}

export interface ApiErrorResponse extends HttpErrorResponse {
	readonly error: {
		readonly message: string;
		readonly name: string;
		readonly status: HttpErrors;
		readonly statusText: string;
	};
}

export interface ErrorModel {
	readonly message: string;
	readonly name: string;
	readonly status: HttpErrors;
	readonly statusText: string;
}

export const isErrorModel = (maybeError: any): maybeError is ErrorModel => maybeError?.name !== undefined
	&& maybeError?.message !== undefined
	&& maybeError?.status !== undefined;
