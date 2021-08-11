import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject, merge, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '@env/environment';

import { LinkModel } from './link.interface';
import { LoaderService } from '@app/core/services/loader.service';
import { ErrorService } from '@app/error/error.service';

@Injectable()
export class FooterService {
	private topProductsSource = new BehaviorSubject<LinkModel[]>([]);
	private topAboutSource = new BehaviorSubject<LinkModel[]>([]);
	private topSocialsSource = new BehaviorSubject<LinkModel[]>([]);

	productsState$: Observable<LinkModel[]> = this.topProductsSource.asObservable();
	aboutState$: Observable<LinkModel[]> = this.topAboutSource.asObservable();
	socialsState$: Observable<LinkModel[]> = this.topSocialsSource.asObservable();

	constructor(
		private readonly http: HttpClient,
		private readonly loaderService: LoaderService,
		private readonly errorService: ErrorService,
	) { }

	refreshLinks(maxItemCount: number): void {
		this.loaderService.beginLoading('[http] [footer] products');
		this.loaderService.beginLoading('[http] [footer] about');
		this.loaderService.beginLoading('[http] [footer] social');

		const topProducts = this.http
			.get(
				`${environment.apiUrl}/work?` +
				`epp=${maxItemCount - 2}&` +
				'page=1&' +
				'select=title,route&' +
				'attribs=title,route&' +
				'rename=name,link'
			)
			.pipe(
				map((products: { data: LinkModel[] }) => products.data),
				catchError((error) => {
					this.loaderService.endLoading('[http] [footer] products');
					this.errorService.displayError(error);

					return of([]);
				})
			)
			.subscribe((products) => {
				this.loaderService.endLoading('[http] [footer] products');

				this.topProductsSource.next(products);
			});

		const topAbouts = this.http
			.get(
				`${environment.apiUrl}/about?` +
				`epp=${maxItemCount}&` +
				'page=1&' +
				'select=subject,route&' +
				'attribs=subject,route&' +
				'rename=name,link'
			)
			.pipe(
				map((aboutDocs: { data: LinkModel[] }) => aboutDocs.data),
				catchError((error) => {
					this.loaderService.endLoading('[http] [footer] about');
					this.errorService.displayError(error);

					return of([]);
				})
			)
			.subscribe((aboutDocs) => {
				this.loaderService.endLoading('[http] [footer] about');

				this.topAboutSource.next(aboutDocs);
			});

		const topSocials = this.http
			.get(
				`${environment.apiUrl}/about/utkarsh-bhardwaj?` +
				'select=contact.links&' +
				'attribs=contact.links&' +
				'rename=links'
			)
			.pipe(
				map((socialDocs: { links: LinkModel[] }) => socialDocs.links.slice(0, 4)),
				catchError((error) => {
					this.loaderService.endLoading('[http] [footer] social');
					this.errorService.displayError(error);

					return of([]);
				})
			)
			.subscribe((socialDocs) => {
				this.loaderService.endLoading('[http] [footer] social');

				this.topSocialsSource.next(socialDocs);
			});
	}
}
