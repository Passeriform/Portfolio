import { Injectable } from "@angular/core";

import { Subject } from "rxjs";
import type { Observable } from "rxjs";

import type { ApiError, ClientError } from "./error.interface";

@Injectable()
export class ErrorService {
	private readonly errorDetailsSource$ = new Subject<ApiError | ClientError>();

	public readonly errorDetails$: Observable<ApiError | ClientError> = this.errorDetailsSource$.asObservable();

	public displayError(errorModel: ApiError | ClientError): void {
		this.errorDetailsSource$.next(errorModel);
	}
}
