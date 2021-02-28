import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '@env/environment';

import { AboutModel } from './models/about.interface';
import { ErrorModel } from '@app/error/error.interface';
import { ErrorService } from '@app/error/error.service';

@Injectable()
export class AboutResolver implements Resolve<AboutModel> {
	constructor(
		private router: Router,
		private http: HttpClient,
		private errorService: ErrorService,
	) { }

	resolve(route: ActivatedRouteSnapshot): Observable<AboutModel | undefined> {
		return this.http
			.get<AboutModel>(
				`${environment.apiUrl}/about/${route.params.slug ?? 'passeriform'}`
			)
			.pipe(
				map((model: AboutModel) => {
					if (!model) {
						// TODO: Check if this needs modification.
						this.router.navigate(['/']);
					}

					return model;
				}),
				catchError((error: ErrorModel) => {
					this.errorService.displayError(error);

					return of(undefined);
				})
			);
	}
}
