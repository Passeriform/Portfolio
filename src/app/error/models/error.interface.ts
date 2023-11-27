/* eslint-disable max-classes-per-file */
import type { HttpErrorResponse } from "@angular/common/http";

export const enum HttpErrorCodes {
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

	constructor({ message, name, status, statusText }: Readonly<{
		message?: string;
		name?: string;
		status?: HttpErrorCodes;
		statusText?: string;
	}>) {
		this.message = message ?? this.message;
		this.name = name ?? this.name;
		this.status = status ?? this.status;
		this.statusText = statusText ?? this.statusText;
	}
}

export class ClientError implements Error {
	public message: string;
	public name: string;

	constructor({ message, name }: Readonly<{
		message?: string;
		name?: string;
	}>) {
		this.message = message ?? this.message;
		this.name = name ?? this.name;
	}
}

export type ApiErrorResponse = Omit<HttpErrorResponse, "name"> & Readonly<{
	message: string;
	name: string;
	status: HttpErrorCodes;
	statusText: string;
}>;

export const isError = (error: unknown): boolean => error instanceof ApiError || error instanceof ClientError;
/* eslint-enable max-classes-per-file */
