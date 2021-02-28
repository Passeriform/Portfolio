import { Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs';

import { ErrorModel } from './error.interface';

@Injectable()
export class ErrorService {
	private errorDetailsSource = new Subject<ErrorModel>();

	errorDetails$: Observable<ErrorModel> = this.errorDetailsSource.asObservable();

	displayError(errorModel: ErrorModel): void {
		this.errorDetailsSource.next(errorModel);
	}
}
