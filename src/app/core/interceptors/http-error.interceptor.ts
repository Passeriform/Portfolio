import type {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from "@angular/common/http";

import { throwError } from "rxjs";
import type { Observable } from "rxjs";
import { catchError, retry } from "rxjs/operators";

import type { ApiErrorResponse } from "@app/error/error.interface";
import { ApiError, ClientError } from "@app/error/error.interface";

export class HttpErrorInterceptor implements HttpInterceptor {
	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<ApiError | ClientError>> {
		return next.handle(request)
			.pipe(
				retry(1),
				catchError((error: ApiErrorResponse | ErrorEvent) => error instanceof ErrorEvent
					? throwError(
						// Client error
						() => new ClientError({
							message: error.message,
							name: (error.error as Error).name,
						}),
					)
					: throwError(
						// Server error
						() => new ApiError({
							message: error.message,
							name: error.name,
							status: error.status,
							statusText: error.statusText,
						}),
					)),
			);
	}
}
