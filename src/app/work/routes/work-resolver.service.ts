import type { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Router } from "@angular/router";
import { inject } from "@angular/core";

import type { Observable } from "rxjs";
import { of } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { LoaderService } from "@app/loader/services/loader.service";
import { ErrorService } from "@app/error/services/error.service";
import type { Work_Type } from "@graphql/generated/schema";

import { NO_TRANSFORM, routeFilters } from "../work.config";
import type { WorkModel } from "../models/work.interface";
import { WorkService } from "../services/work.service";

export const WorkResolver: ResolveFn<readonly WorkModel[]> = (
		route: Readonly<ActivatedRouteSnapshot>,
		_: Readonly<RouterStateSnapshot>,
		router: Readonly<Router> = inject(Router),
		workService: Readonly<WorkService> = inject(WorkService),
		errorService: Readonly<ErrorService> = inject(ErrorService),
		loaderService: Readonly<LoaderService> = inject(LoaderService),
): Readonly<Observable<readonly WorkModel[]>> => {
	// TODO: Simplify resolve method.
	loaderService.beginLoading("[http] work");

	return workService.refreshCache$()
		.pipe(
			map((model?: readonly WorkModel[]): readonly WorkModel[] => {
				// Fatal error (mostly API hit issue)
				if (!model) {
					router.navigate([ "/" ]);

					return [];
				}

				// TODO: Define RouteSnapshot type in types.d.ts
				const [ segment ] = route.url;

				// Showcasing only
				if (segment?.path && routeFilters.includes(segment.path as Work_Type)) {
					// Keep this active filter local only. Let explore flap explore all entities.
					const activeFilter: string = segment.path;

					// Redirect to filtering
					if (!Boolean(route.params.package)) {
						router.navigate([ `/explore/${activeFilter}` ]);
					}

					const concatRoute: string = Object.values(route.params).join("/");
					const queriedEntry: Readonly<WorkModel | undefined> = model.find(
						// TODO: Check if this should use slug or route
						(entry: Readonly<WorkModel>) => entry.slug === concatRoute && entry.type === activeFilter,
					);

					if (queriedEntry) {
						workService.setSelected(queriedEntry);
					} else {
						// TODO: Redirect with a message that project wasn't found and try searching for it in explore view.
						router.navigate([ "/explore" ]);
					}
				}

				if (segment?.path === "explore") {
					const activeFilter = route.url[1]?.path;
					if (routeFilters.includes((activeFilter ?? "") as Work_Type)) {
						workService.setTransform(
							(workModel: readonly WorkModel[]) => workModel.filter(
								(entity: Readonly<WorkModel>) => entity.type === activeFilter,
							),
						);
					} else if (Boolean(activeFilter)) {
						router.navigate([ "/explore" ]);
					} else {
						workService.setTransform(NO_TRANSFORM);
					}
				}

				loaderService.endLoading("[http] work");

				return model;
			}),
			catchError((error: unknown) => {
				loaderService.endLoading("[http] work");
				errorService.displayError(error);

				return of();
			}),
		);
};
