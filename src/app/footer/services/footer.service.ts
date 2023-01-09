import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import type { Observable } from "rxjs";
import { BehaviorSubject, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { environment } from "@env/environment";
import type { SocialGlyphModel } from "@shared/social-glyphs/social-glyphs.interface";
import { LoaderService } from "@app/loader/services/loader.service";
import { ErrorService } from "@app/error/services/error.service";
import { pluck } from "@utility/rxjs";

import type { FooterLinkModel } from "../models/footer.interface";

// TODO: Port http data service code to vercel graphql instance.

@Injectable()
export class FooterService {
	private readonly topAboutSource$ = new BehaviorSubject<readonly FooterLinkModel[]>([]);
	private readonly topSocialSource$ = new BehaviorSubject<readonly SocialGlyphModel[]>([]);
	private readonly topWorkSource$ = new BehaviorSubject<readonly FooterLinkModel[]>([]);

	public readonly aboutEntriesState$: Observable<readonly FooterLinkModel[]> = this.topAboutSource$.asObservable();
	public readonly socialEntriesState$: Observable<readonly SocialGlyphModel[]> = this.topSocialSource$.asObservable();
	public readonly workEntriesState$: Observable<readonly FooterLinkModel[]> = this.topWorkSource$.asObservable();

	constructor(
			private readonly errorService: ErrorService,
			private readonly http: HttpClient,
			private readonly loaderService: LoaderService,
	) { }

	private refreshAboutEntries(aboutCount: number): void {
		this.loaderService.beginLoading("[http] [footer] aboutEntries");

		this.http
			.get<{ data: FooterLinkModel[] }>(
				`${environment.apiUrl}/about?`
				+ `epp=${aboutCount}&`
				+ "page=1&"
				+ "select=intro.heading,subject&"
				+ "attribs=intro.heading,subject&"
				+ "rename=name,link",
			)
			.pipe(
				pluck("data"),
				map(
					(aboutEntries) => aboutEntries.map(
						(about) => ({
							...about,
							link: `about/${about.link}`,
						}),
					),
				),
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

		this.http
			.get<{ contact: { readonly links: readonly SocialGlyphModel[] } }>(
				`${environment.apiUrl}/about/utkarsh-bhardwaj?`,
			)
			.pipe(
				pluck("contact"),
				pluck("links"),
				/* eslint-enable-next-line @typescript-eslint/no-magic-numbers */
				map((socialDocuments) => socialDocuments.slice(0, socialCount)),
				catchError((error: unknown): Observable<SocialGlyphModel[]> => {
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

		this.http
			.get<{ data: (FooterLinkModel & { label: string })[] }>(
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
					(workEntries) => workEntries.map(
						(work: FooterLinkModel & { label: string }) => ({
							link: `${work.label}/${work.link}`,
							name: work.name,
						}),
					),
				),
				catchError((error: unknown): Observable<FooterLinkModel[]> => {
					this.loaderService.endLoading("[http] [footer] workEntries");
					this.errorService.displayError(error);

					return of([]);
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
