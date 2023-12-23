/* eslint-disable max-classes-per-file */
import type { HttpErrorResponse, HttpStatusCode } from "@angular/common/http";

export class ApiError implements Error {
	public message: string;
	public name: string;
	public status: HttpStatusCode;
	public statusText: string;

	constructor({ message, name, status, statusText }: Readonly<{
		message?: string;
		name?: string;
		status?: HttpStatusCode;
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
	status: HttpStatusCode;
	statusText: string;
}>;

export const isError = (error: unknown): boolean => error instanceof ApiError || error instanceof ClientError;
/* eslint-enable max-classes-per-file */
