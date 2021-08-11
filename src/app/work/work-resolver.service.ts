import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, concat, take } from 'rxjs/operators';

import { LoaderService } from '@app/core/services/loader.service';
import { WorkModel } from './work.interface';
import { WorkService } from './services/work.service';
import { TaggerService } from './services/tagger.service';
import { ErrorService } from '@app/error/error.service';

@Injectable()
export class WorkResolver implements Resolve<WorkModel[]> {
	constructor(
		private readonly router: Router,
		private readonly http: HttpClient,
		private readonly workService: WorkService,
		private readonly errorService: ErrorService,
		private readonly loaderService: LoaderService,
	) { }

	resolve(route: ActivatedRouteSnapshot): Observable<WorkModel[]> {
		this.loaderService.beginLoading('[http] work');

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

					this.loaderService.endLoading('[http] work');

					return model;
				}),
				catchError((error) => {
					this.loaderService.endLoading('[http] work');
					this.errorService.displayError(error);

					return of(undefined);
				})
			);
	}
}
