import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AboutModel } from './models/about.interface';

@Injectable()
export class AboutResolver implements Resolve<AboutModel> {
	constructor(
		private router: Router,
		private http: HttpClient,
	) { }

	// TODO: Fix return type after introducing ErrorService
	resolve(route: ActivatedRouteSnapshot): Observable<AboutModel | any> {
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
				// NOTE: Use as entry point when implementing ErrorService
				catchError((error) => {
					this.router.navigate(['/']);
				})
			);
	}
}
