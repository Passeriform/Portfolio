import type {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from "@angular/common/http";

import { throwError } from "rxjs";
import type { Observable } from "rxjs";
import { catchError, retry } from "rxjs/operators";

import type { ApiErrorResponse, ErrorModel } from "@app/error/error.interface";

export class HttpErrorInterceptor implements HttpInterceptor {
	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<ErrorModel>> {
		return next.handle(request)
			.pipe(
				retry(1),
				/* eslint-disable-next-line rxjs/no-implicit-any-catch */
				catchError((error: ApiErrorResponse) => {
					// TODO: Recheck if this assignment works for client-side errors

					// TODO: Add type for errorModel
					const errorModel = error instanceof ErrorEvent ? error : error.error;

					// TODO: Use custom error-type

					return throwError(
						() => (
							{
								message: errorModel?.message,
								name: errorModel?.name,
								status: errorModel?.status,
								statusText: errorModel?.statusText,
							}
						),
					);
				}),
			);
	}
}
