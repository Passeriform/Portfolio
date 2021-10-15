import { Injectable } from "@angular/core";

import { Subject } from "rxjs";
import type { Observable } from "rxjs";

import type { ApiError } from "./error.interface";
import { isError, ClientError } from "./error.interface";

@Injectable()
export class ErrorService {
	private readonly errorDetailsSource$ = new Subject<ApiError | ClientError>();

	public readonly errorDetails$: Observable<ApiError | ClientError> = this.errorDetailsSource$.asObservable();

	public displayError(errorModel: unknown): void {
		if (isError(errorModel)) {
			this.errorDetailsSource$.next(errorModel as ApiError | ClientError);
		} else {
			this.errorDetailsSource$.next(new ClientError({
				name: "InvalidErrorModel",
				message: "Unable to parse error model.",
			}));
		}
	}
}
