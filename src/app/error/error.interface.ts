import type { HttpErrorResponse } from "@angular/common/http";

export enum HttpErrorCodes {
	/* eslint-disable @typescript-eslint/no-magic-numbers */
	BAD_REQUEST = 400,
	FORBIDDEN = 403,
	INTERNAL_SERVER_ERROR = 500,
	NOT_FOUND = 404,
	UNKNOWN_ERROR = 0,
	UNAUTHORIZED = 401,
	/* eslint-enable @typescript-eslint/no-magic-numbers */
}

export class ApiError implements Error {
	public message: string;
	public name: string;
	public status: HttpErrorCodes;
	public statusText: string;

	constructor({ message, name, status, statusText }: {
		readonly message?: string;
		readonly name?: string;
		readonly status?: HttpErrorCodes;
		readonly statusText?: string;
	}) {
		this.message = message ?? this.message;
		this.name = name ?? this.name;
		this.status = status ?? this.status;
		this.statusText = statusText ?? this.statusText;
	}
}

export class ClientError implements Error {
	public message: string;
	public name: string;

	constructor({ message, name }: {
		readonly message?: string;
		readonly name?: string;
	}) {
		this.message = message ?? this.message;
		this.name = name ?? this.name;
	}
}

export interface ApiErrorResponse extends Omit<HttpErrorResponse, "name"> {
	readonly message: string;
	readonly name: string;
	readonly status: HttpErrorCodes;
	readonly statusText: string;
}

export const isError = (error: unknown): boolean => {
	return error instanceof ApiError || error instanceof ClientError
};
