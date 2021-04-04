import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject, merge } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';

import { LinkModel } from './link.interface';
import { LoaderService } from '@app/core/services/loader.service';

@Injectable()
export class FooterService {
	private topProductsSource = new BehaviorSubject<LinkModel[]>([]);
	private topAboutSource = new BehaviorSubject<LinkModel[]>([]);
	private topSocialsSource = new BehaviorSubject<LinkModel[]>([]);

	productsState$: Observable<LinkModel[]> = this.topProductsSource.asObservable();
	aboutState$: Observable<LinkModel[]> = this.topAboutSource.asObservable();
	socialsState$: Observable<LinkModel[]> = this.topSocialsSource.asObservable();

	constructor(
		private http: HttpClient,
		private loaderService: LoaderService
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
				map((products: { data: any[] }) => products.data)
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
				map((aboutDocs: { data: any[] }) => aboutDocs.data)
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
				map((socialDocs: { links: any[] }) => socialDocs.links.slice(0, 4))
			)
			.subscribe((socialDocs) => {
				this.loaderService.endLoading('[http] [footer] social');

				this.topSocialsSource.next(socialDocs);
			});
	}
}
