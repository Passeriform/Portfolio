import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '@env/environment';

import { WorkModel } from '../work.interface';

import { LoaderService } from '@app/core/services/loader.service';
import { TaggerService } from '../services/tagger.service';

@Injectable()
export class WorkService {
	private workFilterSource = new BehaviorSubject<(_: WorkModel) => boolean>((_) => true);
	private workCacheSource = new BehaviorSubject<WorkModel[]>([]);
	private workSelectedSource = new BehaviorSubject<WorkModel>(undefined);

	workFilterState$: Observable<(_: WorkModel) => boolean> = this.workFilterSource.asObservable();
	workCacheState$: Observable<WorkModel[]> = this.workCacheSource.asObservable();
	workActiveState$: Observable<WorkModel[]> = combineLatest(
		this.workCacheState$,
		this.workFilterState$,
		(cache: WorkModel[], filterfn) => cache.filter(filterfn)
	);
	workSelectedState$: Observable<WorkModel> = this.workSelectedSource.asObservable();

	constructor(private http: HttpClient, private tagger: TaggerService, private loaderService: LoaderService) { }

	setSelected(model: WorkModel): void {
		this.workSelectedSource.next(model);
	}

	setFilter(comparator: (_: WorkModel) => boolean): void {
		this.workFilterSource.next(comparator);
	}

	setActive(model: WorkModel[]): void {
		// TODO: Figure out a solution around forcing cache change
		this.workCacheSource.next(model);
	}

	refreshCache(): Observable<WorkModel[]> {
		this.loaderService.beginLoading('[http] work');

		return this.http.get<WorkModel[]>(`${environment.apiUrl}/work`)
			.pipe(
				map((model: WorkModel[]) => {
					this.loaderService.endLoading('[http] work');

					this.loaderService.beginLoading('[tag] work');

					const taggedModel = this.tagger.appendTags(model);

					this.loaderService.endLoading('[tag] work');

					this.workCacheSource.next(taggedModel);

					return taggedModel;
				}),
				catchError((error) => {
					console.log('ErrorService triggered error.');

					return Observable.throw(error.message);
				})
			);
	}
}
