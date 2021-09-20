import { Injectable } from "@angular/core";

import { Subject } from "rxjs";
import type { Observable } from "rxjs";

import type { ErrorModel } from "./error.interface";

@Injectable()
export class ErrorService {
	private readonly errorDetailsSource$ = new Subject<ErrorModel>();

	public readonly errorDetails$: Observable<ErrorModel> = this.errorDetailsSource$.asObservable();

	public displayError(errorModel: ErrorModel): void {
		this.errorDetailsSource$.next(errorModel);
	}
}
