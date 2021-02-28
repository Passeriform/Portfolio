import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpResponse,
	HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { environment } from '@env/environment';

import { ErrorModel } from '@app/error/error.interface';
import { ErrorService } from '@app/error/error.service';

export class HttpErrorInterceptor implements HttpInterceptor {
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<ErrorModel>> {
		return next.handle(request)
			.pipe(
				retry(1),
				catchError((error: HttpErrorResponse) => {
					// TODO: Recheck if this assignment works for client-side errors
					const errorModel = error.error instanceof ErrorEvent ? error.error : error;

					// Server returned error object
					return throwError(
						{
							name: error.name,
							status: error.status,
							statusText: error.statusText,
							message: error.message,
						}
					);
				})
			);
	}
}
