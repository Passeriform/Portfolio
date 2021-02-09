import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map, concat, take } from 'rxjs/operators';

import { WorkModel } from './work.interface';

import { WorkService } from './services/work.service';
import { TaggerService } from './services/tagger.service';

@Injectable()
export class WorkResolver implements Resolve<WorkModel[]> {
	constructor(
		private router: Router,
		private http: HttpClient,
		private workService: WorkService,
	) { }

	resolve(route: ActivatedRouteSnapshot): Observable<WorkModel[]> {

		return this.workService.refreshCache()
			.pipe(
				concat(this.workService.workActiveState$),
				take(1),
				map((model) => {
					if (!model) {
						this.router.navigate(['/']);
					}

					// Conditions listed to clear future confusion
					// Outputs for => route.url, route.params
					// 1. SetSelected => `/explore/godwit` => [{path: "godwit"}], {package: "godwit"}
					// 4. Redirect => `/explore/xyz` => [{path: "xyz"}], {package: "xyz"}
					// 2. Filter => `/explore/misc` => [{path: "misc"}], {}
					// 3. Do Nothing => `/explore/` => [], {}

					if (route.url ?.[0] ?.path) {
						if (route.params ?.package) {
							const concatRoute = Object.values(route.params).join('/');
							const queriedEntry = model.find((entry) => entry.ref === concatRoute);

							if (queriedEntry) {
								this.workService.setSelected(queriedEntry);
							} else {
								this.router.navigate(['/']);
							}
						} else {
							this.workService.setFilter((entity) => entity.type === route.url[0].path);
						}
					}

					return model;
				}),
				catchError((error) => {
					console.log(`ErrorService triggered error. ${error.message}`);

					return Observable.throw(error.message);
				})
			);
	}
}
