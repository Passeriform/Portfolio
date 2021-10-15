import type { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { of } from "rxjs";
import type { Observable } from "rxjs";
import { catchError, concatWith, first, map } from "rxjs/operators";

import { LoaderService } from "@app/loader/loader.service";
import { ErrorService } from "@app/error/error.service";
import { routeFilters } from "./work.config";
import type { WorkModel } from "./work.interface";
import { WorkService } from "./services/work.service";

@Injectable()
export class WorkResolver implements Resolve<readonly WorkModel[]> {
	constructor(
			private readonly router: Router,
			private readonly http: HttpClient,
			private readonly workService: WorkService,
			private readonly errorService: ErrorService,
			private readonly loaderService: LoaderService,
	) { }

	public resolve(route: ActivatedRouteSnapshot): Observable<readonly WorkModel[]> {
		this.loaderService.beginLoading("[http] work");

		return this.workService.refreshCache$()
			.pipe(
				concatWith(this.workService.workActiveState$),
				first(),
				map((model?: readonly WorkModel[]): readonly WorkModel[] => {
					// Fatal error (mostly API hit issue)
					if (!model) {
						/* eslint-disable-next-line no-void */
						void this.router.navigate([ "/" ]);

						return [];
					}

					// TODO: Define RouteSnapshot type in types.d.ts

					// Showcasing only
					if (routeFilters.includes(route.url[0]?.path)) {
						// Keep this active filter local only. Let explore flap explore all entities.
						const activeFilter: string = route.url[0].path;

						// Redirect to filtering
						if (!route.params.package) {
							this.router.navigate([ `/explore/${activeFilter}` ]);
						}

						const concatRoute: string = Object.values(route.params).join("/");
						const queriedEntry: WorkModel | undefined = model.find((entry: WorkModel) => entry.ref === concatRoute && entry.type === activeFilter);

						if (queriedEntry) {
							this.workService.setSelected(queriedEntry);
						} else {
							// TODO: Redirect with a message that project wasn't found and try searching for it in explore view.
							this.router.navigate([ "/explore" ]);
						}
					}

					if (route.url[0]?.path === "explore") {
						const activeFilter: string | undefined = route.url[1]?.path;
						if (routeFilters.includes(activeFilter)) {
							this.workService.setFilter((entity: WorkModel) => entity.type === activeFilter);
						} else if (activeFilter) {
							this.router.navigate([ "/explore" ]);
						}
					}

					this.loaderService.endLoading("[http] work");

					return model;
				}),
				catchError((error: unknown) => {
					this.loaderService.endLoading("[http] work");
					this.errorService.displayError(error);

					return of();
				}),
			);
	}
}
