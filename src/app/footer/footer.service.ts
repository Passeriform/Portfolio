import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import type { Observable } from "rxjs";
import { BehaviorSubject, of } from "rxjs";
import { catchError, map, pluck } from "rxjs/operators";

import { environment } from "@env/environment";
import type { LinkModel } from "@shared/models/link.interface";
import { LoaderService } from "@app/loader/loader.service";
import { ErrorService } from "@app/error/error.service";

// TODO: Port http data service code to vercel graphql instance.

@Injectable()
export class FooterService {
	private readonly topAboutSource$ = new BehaviorSubject<readonly LinkModel[]>([]);
	private readonly topProductsSource$ = new BehaviorSubject<readonly LinkModel[]>([]);
	private readonly topSocialsSource$ = new BehaviorSubject<readonly LinkModel[]>([]);

	public readonly aboutState$: Observable<readonly LinkModel[]> = this.topAboutSource$.asObservable();
	public readonly socialsState$: Observable<readonly LinkModel[]> = this.topSocialsSource$.asObservable();
	public readonly worksState$: Observable<readonly LinkModel[]> = this.topProductsSource$.asObservable();

	constructor(
			private readonly errorService: ErrorService,
			private readonly http: HttpClient,
			private readonly loaderService: LoaderService,
	) { }

	public refreshLinks({
		aboutCount,
		socialCount,
		workCount,
	}: {
		aboutCount: number;
		socialCount: number;
		workCount: number;
	}): void {
		this.loaderService.beginLoading("[http] [footer] works");
		this.loaderService.beginLoading("[http] [footer] about");
		this.loaderService.beginLoading("[http] [footer] social");

		this.http
			.get(
				`${environment.apiUrl}/work?`
				+ `epp=${workCount}&`
				+ "page=1&"
				+ "select=title,type,ref&"
				+ "attribs=title,type,ref&"
				+ "rename=name,label,link",
			)
			.pipe(
				pluck("data"),
				map(
					(works: (LinkModel & { label: string })[]) => works.map(
						(work: LinkModel & { label: string }) => ({
							link: `${work.label}/${work.link}`,
							name: work.name,
						}),
					),
				),
				catchError((error: unknown): Observable<LinkModel[]> => {
					this.loaderService.endLoading("[http] [footer] works");
					this.loaderService.endLoading("[http] about");
					this.errorService.displayError(error);

					return of([]);
				}),
			)
			.subscribe((works: LinkModel[]): void => {
				this.loaderService.endLoading("[http] [footer] works");

				this.topProductsSource$.next(works);
			});

		this.http
			.get(
				`${environment.apiUrl}/about?`
				+ `epp=${aboutCount}&`
				+ "page=1&"
				+ "select=subject,route&"
				+ "attribs=subject,route&"
				+ "rename=name,link",
			)
			.pipe(
				pluck("data"),
				catchError((error: unknown): Observable<LinkModel[]> => {
					this.loaderService.endLoading("[http] [footer] about");
					this.errorService.displayError(error);

					return of([]);
				}),
			)
			.subscribe((aboutDocuments: LinkModel[]): void => {
				this.loaderService.endLoading("[http] [footer] about");

				this.topAboutSource$.next(aboutDocuments);
			});

		this.http
			.get(
				`${environment.apiUrl}/about/utkarsh-bhardwaj?`
				+ "select=contact.links&"
				+ "attribs=contact.links&"
				+ "rename=links",
			)
			.pipe(
				/* eslint-enable-next-line @typescript-eslint/no-magic-numbers */
				map((socialDocuments: { readonly links: readonly LinkModel[] }) => socialDocuments.links.slice(0, socialCount)),
				catchError((error: unknown): Observable<LinkModel[]> => {
					this.loaderService.endLoading("[http] [footer] social");
					this.errorService.displayError(error);

					return of([]);
				}),
			)
			.subscribe((socialDocuments: LinkModel[]): void => {
				this.loaderService.endLoading("[http] [footer] social");

				this.topSocialsSource$.next(socialDocuments);
			});
	}
}
