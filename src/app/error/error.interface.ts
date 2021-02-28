export enum ErrorType {
	UnknownError = 0,
	BadRequest = 400,
	Unauthorized = 401,
	Forbidden = 403,
	NotFound = 404,
	InternalServer = 500,
}

export interface ErrorModel extends ReadonlyMap<string, string | ErrorType> {
	name: string;
	status: ErrorType;
	statusText?: string;
	message: string;
}
