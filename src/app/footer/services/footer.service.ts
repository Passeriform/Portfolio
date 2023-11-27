import { Injectable } from "@angular/core";

import type { Observable } from "rxjs";
import { BehaviorSubject, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { ErrorService } from "@app/error/services/error.service";
import { LoaderService } from "@app/loader/services/loader.service";
import { GetSocialLinksGQL, GetTopPeopleGQL, GetTopWorksGQL } from "@graphql/generated/schema";
import { extractTopPeople } from "@graphql/transformers/people.transformer";
import { extractTopSocialLinks } from "@graphql/transformers/social.transformer";
import { extractTopWorks } from "@graphql/transformers/work.transformer";

import type { TopAboutModel, TopSocialModel, TopWorkModel } from "../models/footer.interface";

// TODO: Port http data service code to vercel graphql instance.

@Injectable()
export class FooterService {
	private readonly topAboutSource$ = new BehaviorSubject<readonly TopAboutModel[]>([]);
	private readonly topSocialSource$ = new BehaviorSubject<readonly TopSocialModel[]>([]);
	private readonly topWorkSource$ = new BehaviorSubject<readonly TopWorkModel[]>([]);

	public readonly aboutEntriesState$: Observable<readonly TopAboutModel[]> = this.topAboutSource$.asObservable();
	public readonly socialEntriesState$: Observable<readonly TopSocialModel[]> = this.topSocialSource$.asObservable();
	public readonly workEntriesState$: Observable<readonly TopWorkModel[]> = this.topWorkSource$.asObservable();

	constructor(
			private readonly errorService: ErrorService,
			private readonly getTopPeopleGQL: GetTopPeopleGQL,
			private readonly getTopWorksGQL: GetTopWorksGQL,
			private readonly getSocialLinksGQL: GetSocialLinksGQL,
			private readonly loaderService: LoaderService,
	) { }

	private refreshAboutEntries(aboutCount: number): void {
		this.loaderService.beginLoading("[http] [footer] aboutEntries");

		this.getTopPeopleGQL.watch({ limit: aboutCount }).valueChanges
			.pipe(
				map(extractTopPeople),
				catchError((error: unknown) => {
					this.loaderService.endLoading("[http] [footer] aboutEntries");
					this.errorService.displayError(error);

					return of([]);
				}),
			)
			.subscribe((aboutDocuments) => {
				this.loaderService.endLoading("[http] [footer] aboutEntries");

				this.topAboutSource$.next(aboutDocuments);
			});
	}

	private refreshSocialEntries(socialCount: number): void {
		this.loaderService.beginLoading("[http] [footer] social");

		this.getSocialLinksGQL.watch().valueChanges
			.pipe(
				map(extractTopSocialLinks),
				map((socialLinks) => socialLinks.slice(0, socialCount)),
				catchError((error: unknown) => {
					this.loaderService.endLoading("[http] [footer] social");
					this.errorService.displayError(error);

					return of([]);
				}),
			)
			.subscribe((socialDocuments): void => {
				this.loaderService.endLoading("[http] [footer] social");

				this.topSocialSource$.next(socialDocuments);
			});
	}

	private refreshWorkEntries(workCount: number): void {
		this.loaderService.beginLoading("[http] [footer] workEntries");

		this.getTopWorksGQL.watch({ limit: workCount }).valueChanges
			.pipe(
				map(extractTopWorks),
				catchError((error: unknown) => {
					this.loaderService.endLoading("[http] [footer] workEntries");
					this.errorService.displayError(error);

					return of([] as readonly TopWorkModel[]);
				}),
			)
			.subscribe((workEntries): void => {
				this.loaderService.endLoading("[http] [footer] workEntries");

				this.topWorkSource$.next(workEntries);
			});
	}

	public refreshLinks({
		aboutCount,
		socialCount,
		workCount,
	}: {
		aboutCount: number;
		socialCount: number;
		workCount: number;
	}): void {
		this.refreshAboutEntries(aboutCount);
		this.refreshWorkEntries(workCount);
		this.refreshSocialEntries(socialCount);
	}
}
