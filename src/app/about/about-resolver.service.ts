import { Injectable } from "@angular/core";
import type { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

import { throwError } from "rxjs";
import type { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { environment } from "@env/environment";

import type { ClientError } from "@app/error/error.interface";
import { ErrorService } from "@app/error/error.service";
import { LoaderService } from "@app/loader/loader.service";
import type { AboutModel } from "./models/about.interface";

@Injectable()
export class AboutResolver implements Resolve<AboutModel> {
	constructor(
			private readonly router: Router,
			private readonly http: HttpClient,
			private readonly errorService: ErrorService,
			private readonly loaderService: LoaderService,
	) { }

	resolve(route: ActivatedRouteSnapshot): Observable<AboutModel> {
		this.loaderService.beginLoading("[http] about");

		return this.http
			.get<AboutModel>(`${environment.apiUrl}/about/${route.params.slug as string || "passeriform"}`)
			.pipe(
				tap((model?: AboutModel) => {
					this.loaderService.endLoading("[http] about");

					if (!model) {
						this.router.navigate([ "/" ]);
					}
				}),
				catchError((error: unknown) => {
					this.loaderService.endLoading("[http] about");
					this.errorService.displayError(error);

					return throwError(() => new Error((error as Error).message));
				}),
			) as Observable<AboutModel>;
	}
}
