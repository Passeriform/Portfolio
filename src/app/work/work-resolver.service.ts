import type { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { of } from "rxjs";
import type { Observable } from "rxjs";
import { catchError, concatWith, map, first } from "rxjs/operators";

import { LoaderService } from "@app/loader/loader.service";
import { ErrorService } from "@app/error/error.service";
import { isErrorModel } from "@app/error/error.interface";
import type { ErrorModel } from "@app/error/error.interface";
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
				map((model: readonly WorkModel[] | undefined): readonly WorkModel[] => {
					if (!model) {
						/* eslint-disable-next-line no-void */
						void this.router.navigate([ "/" ]);

						return [];
					}

					/*
					 * Condition matrix
					 *
					 * ┌───────┬────────────────────┬─────────────────────┬──────────────────────┐
					 * │ Index │ Expected Operation │ route.url[0]?.path  │ route.params         │
					 * ├───────┼────────────────────┼─────────────────────┼──────────────────────┤
					 * │ 1     │ SetSelected        │ godwit              │ {package: "godwit"}  │
					 * ├───────┼────────────────────┼─────────────────────┼──────────────────────┤
					 * │ 2     │ Redirect           │ xyz                 │ {package: "xyz"}     │
					 * ├───────┼────────────────────┼─────────────────────┼──────────────────────┤
					 * │ 3     │ Filter             │ misc                │ {}                   │
					 * ├───────┼────────────────────┼─────────────────────┼──────────────────────┤
					 * │ 4     │ Do Nothing         │ <null>              │ {}                   │
					 * └───────┴────────────────────┴─────────────────────┴──────────────────────┘
					 */

					// TODO: Define RouteSnapshot type in types.d.ts

					if (route.url[0]?.path) {
						if (route.params.package) {
							const concatRoute = Object.values(route.params).join("/");
							const queriedEntry: WorkModel | undefined = model!.find((entry) => entry.ref === concatRoute);

							if (queriedEntry) {
								this.workService.setSelected(queriedEntry);
							} else {
								this.router.navigate([ "/" ]);
							}
						} else {
							this.workService.setFilter((entity) => entity.type === route.url[0].path);
						}
					}

					this.loaderService.endLoading("[http] work");

					return model!;
				}),
				catchError((error: unknown) => {
					this.loaderService.endLoading("[http] work");
					if (isErrorModel(error)) {
						this.errorService.displayError(error as ErrorModel);
					}

					return of();
				}),
			);
	}
}
