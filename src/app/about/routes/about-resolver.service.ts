import { inject } from "@angular/core";
import type { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Router } from "@angular/router";

import type { Observable } from "rxjs";
import { throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { ErrorService } from "@app/error/services/error.service";
import { LoaderService } from "@app/loader/services/loader.service";
import { GetPeopleGQL } from "@graphql/generated/schema";
import { extractPeople } from "@graphql/transformers/people.transformer";

import type { AboutModel } from "../models/about.interface";

export const AboutResolver: ResolveFn<readonly AboutModel[]> = (
		route: Readonly<ActivatedRouteSnapshot>,
		_: Readonly<RouterStateSnapshot>,
		router: Readonly<Router> = inject(Router),
		getPeopleGQL: Readonly<GetPeopleGQL> = inject(GetPeopleGQL),
		errorService: Readonly<ErrorService> = inject(ErrorService),
		loaderService: Readonly<LoaderService> = inject(LoaderService),
): Readonly<Observable<readonly AboutModel[]>> => {
	loaderService.beginLoading("[http] about");

	return getPeopleGQL.watch({ slug: route.params.slug as string || "passeriform" }).valueChanges
		.pipe(
			map(extractPeople),
			tap((model) => {
				loaderService.endLoading("[http] about");

				if (!model.length) {
					router.navigate([ "/" ]);
				}
			}),
			catchError((error: unknown) => {
				loaderService.endLoading("[http] about");
				errorService.setError(error);

				return throwError(() => new Error((error as Error).message));
			}),
		);
};
