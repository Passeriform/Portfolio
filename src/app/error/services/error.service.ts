import { Injectable } from "@angular/core";

import type { Observable } from "rxjs";
import { Subject } from "rxjs";

import type { ApiError } from "../models/error.interface";
import { ClientError, isError } from "../models/error.interface";

@Injectable()
export class ErrorService {
	private readonly errorDetailsSource$ = new Subject<ApiError | ClientError>();

	public readonly errorDetails$: Observable<ApiError | ClientError> = this.errorDetailsSource$.asObservable();

	public setError(errorModel: unknown): void {
		if (isError(errorModel)) {
			this.errorDetailsSource$.next(errorModel as ApiError | ClientError);
		} else {
			this.errorDetailsSource$.next(new ClientError({
				message: "Unable to parse error model.",
				name: "InvalidErrorModel",
			}));
		}
	}
}
