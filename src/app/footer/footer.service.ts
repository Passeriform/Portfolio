import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { BehaviorSubject, of } from "rxjs";
import type { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import type { LinkModel } from "@shared/models/link.interface";
import { environment } from "@env/environment";
import { LoaderService } from "@app/loader/loader.service";
import type { ErrorModel } from "@app/error/error.interface";
import { isErrorModel } from "@app/error/error.interface";
import { ErrorService } from "@app/error/error.service";

@Injectable()
export class FooterService {
	private readonly topProductsSource$ = new BehaviorSubject<readonly LinkModel[]>([]);

	private readonly topAboutSource$ = new BehaviorSubject<readonly LinkModel[]>([]);

	private readonly topSocialsSource$ = new BehaviorSubject<readonly LinkModel[]>([]);

	private readonly footerElementSource$ = new BehaviorSubject<HTMLElement | undefined>(undefined);

	public readonly aboutState$: Observable<readonly LinkModel[]> = this.topAboutSource$.asObservable();

	public readonly worksState$: Observable<readonly LinkModel[]> = this.topProductsSource$.asObservable();

	public readonly socialsState$: Observable<readonly LinkModel[]> = this.topSocialsSource$.asObservable();

	public readonly footerElement$: Observable<HTMLElement | undefined> = this.footerElementSource$.asObservable();

	constructor(
			private readonly http: HttpClient,
			private readonly loaderService: LoaderService,
			private readonly errorService: ErrorService,
	) { }

	setFooterElement(footerElement: HTMLElement): void {
		this.footerElementSource$.next(footerElement);
	}

	public refreshLinks(maxItemCount: number): void {
		const aboutCount = maxItemCount;
		const workCount = maxItemCount - 2;
		const socialCount = 4;

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
				map((works: { data: (LinkModel & { label: string })[]	}) => works.data),
				map(
					(works: (LinkModel & { label: string })[]): LinkModel[] => works.map(
						(work: LinkModel & { label: string }): LinkModel => ({
							name: work.name,
							link: `${work.label}/${work.link}`,
						})
					)
				),
				catchError((error: unknown) => {
					this.loaderService.endLoading("[http] [footer] works");
					this.loaderService.endLoading("[http] about");
					if (isErrorModel(error)) {
						this.errorService.displayError(error! as ErrorModel);
					}

					return of([]);
				}),
			)
			.subscribe((works: LinkModel[]) => {
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
				map((aboutDocuments: { readonly data: readonly LinkModel[] }) => aboutDocuments.data),
				catchError((error: unknown) => {
					this.loaderService.endLoading("[http] [footer] about");
					if (isErrorModel(error)) {
						this.errorService.displayError(error! as ErrorModel);
					}

					return of([]);
				}),
			)
			.subscribe((aboutDocuments) => {
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
				catchError((error: unknown) => {
					this.loaderService.endLoading("[http] [footer] social");
					if (isErrorModel(error)) {
						this.errorService.displayError(error! as ErrorModel);
					}

					return of([]);
				}),
			)
			.subscribe((socialDocuments) => {
				this.loaderService.endLoading("[http] [footer] social");

				this.topSocialsSource$.next(socialDocuments);
			});
	}
}
