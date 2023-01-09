import type { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

import type { Observable } from "rxjs";
import { throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";

import { ApiError, ClientError, HttpErrorCodes } from "@app/error/models/error.interface";

export class HttpErrorInterceptor implements HttpInterceptor {
	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<ApiError | ClientError>> {
		return next.handle(request)
			.pipe(
				retry(1),
				catchError((error: unknown) => {
					if (error instanceof ErrorEvent) {
						return throwError(
							// Client error
							() => new ClientError({
								message: error.message,
								name: (error.error as Error).name,
							}),
						);
					}

					const {
						message = "",
						name = "",
						status = HttpErrorCodes.UNKNOWN_ERROR,
						statusText = "",
					} = error as ApiError;

					return throwError(
						// Server error
						() => new ApiError({ message, name, status, statusText }),
					);
				}),
			);
	}
}
