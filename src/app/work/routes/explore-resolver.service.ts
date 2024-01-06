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

export const ExploreResolver: ResolveFn<readonly WorkModel[]> = (
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

				if (segment?.path === "explore") {
					const activeFilter = route.url[1]?.path as Lowercase<Work_Type> | undefined;

					if (activeFilter) {
						router.navigate([
							routeFilters.includes(activeFilter)
								? `/${activeFilter}`
								: "/explore",
						]);
					}

					workService.setSelected(undefined);
					workService.setTransform(NO_TRANSFORM);
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
