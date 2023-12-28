import type { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Router } from "@angular/router";
import { inject } from "@angular/core";

import type { Observable } from "rxjs";
import { of } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { LoaderService } from "@app/loader/services/loader.service";
import { ErrorService } from "@app/error/services/error.service";

import { routeFilters } from "../work.config";
import type { WorkModel } from "../models/work.interface";
import { WorkService } from "../services/work.service";

export const FilterResolver: ResolveFn<readonly WorkModel[]> = (
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

				const activeFilter = route.url[1]?.path ?? "";

				if ((routeFilters as string[]).includes(activeFilter)) {
					workService.setTransform(
						(workModel: readonly WorkModel[]) => workModel.filter(
							(entity: Readonly<WorkModel>) => entity.type === activeFilter.toLocaleUpperCase(),
						),
					);
				} else {
					router.navigate([ "/explore" ]);
				}

				loaderService.endLoading("[http] work");

				return model;
			}),
			catchError((error: unknown) => {
				loaderService.endLoading("[http] work");
				errorService.setError(error);

				return of();
			}),
		);
};
