import type { ActivatedRouteSnapshot, Resolve, UrlSegment } from "@angular/router";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import type { Observable } from "rxjs";
import { of } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { LoaderService } from "@app/loader/loader.service";
import { ErrorService } from "@app/error/error.service";

import { NO_TRANSFORM, routeFilters } from "./work.config";
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

	// TODO: Simplify resolve method.

	public resolve(route: ActivatedRouteSnapshot): Observable<readonly WorkModel[]> {
		this.loaderService.beginLoading("[http] work");

		return this.workService.refreshCache$()
			.pipe(
				map((model?: readonly WorkModel[]): readonly WorkModel[] => {
					// Fatal error (mostly API hit issue)
					if (!model) {
						/* eslint-disable-next-line no-void */
						void this.router.navigate([ "/" ]);

						return [];
					}

					// TODO: Define RouteSnapshot type in types.d.ts
					const segment: UrlSegment | undefined = route.url[0];

					// Showcasing only
					if (routeFilters.includes(segment?.path)) {
						// Keep this active filter local only. Let explore flap explore all entities.
						const activeFilter: string = segment.path;

						// Redirect to filtering
						if (!Boolean(route.params.package)) {
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

					if (segment?.path === "explore") {
						const activeFilter: string | undefined = route.url[1]?.path;
						if (routeFilters.includes(activeFilter)) {
							this.workService.setTransform(
								(workModel: WorkModel[]) => workModel.filter(
									(entity: WorkModel) => entity.type === activeFilter
								)
							);
						} else if (activeFilter) {
							this.router.navigate([ "/explore" ]);
						} else {
              this.workService.setTransform(NO_TRANSFORM);
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
