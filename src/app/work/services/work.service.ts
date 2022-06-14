import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import type { Observable } from "rxjs";
import { BehaviorSubject, combineLatest } from "rxjs";
import { map, tap } from "rxjs/operators";

import { environment } from "@env/environment";
import { LoaderService } from "@app/loader/loader.service";

import type { WorkModel } from "../work.interface";
import { TaggerService } from "./tagger.service";

const NO_FILTER = (_: WorkModel) => true;

@Injectable()
export class WorkService {
	private readonly workFilterSource$ = new BehaviorSubject<typeof NO_FILTER>(NO_FILTER);
	private readonly workCacheSource$ = new BehaviorSubject<readonly WorkModel[]>([]);
	private readonly workSelectedSource$ = new BehaviorSubject<WorkModel | undefined>(undefined);

	public readonly workFilterState$: Observable<(_: WorkModel) => boolean> = this.workFilterSource$.asObservable();
	public readonly workCacheState$: Observable<readonly WorkModel[]> = this.workCacheSource$.asObservable();
	public readonly workSelectedState$: Observable<WorkModel | undefined> = this.workSelectedSource$.asObservable();
	public readonly workActiveState$: Observable<readonly WorkModel[]> = combineLatest(
		[
			this.workCacheState$,
			this.workFilterState$,
		],
		(cache: readonly WorkModel[], filterfn: (_: WorkModel) => boolean) => cache.filter(filterfn),
	);

	constructor(
			private readonly http: HttpClient,
			private readonly tagger: TaggerService,
			private readonly loaderService: LoaderService,
	) { }

	public setSelected(model: WorkModel): void {
		this.workSelectedSource$.next(model);
	}

	public setFilter(comparator: (_: WorkModel) => boolean): void {
		this.workFilterSource$.next(comparator);
	}

	public setActive(model: readonly WorkModel[]): void {
		// TODO: Figure out a solution around forcing cache change

		this.workCacheSource$.next(model);
	}

	public refreshCache$(): Observable<readonly WorkModel[]> {
		this.loaderService.beginLoading("[http] work");

		return this.http.get<readonly WorkModel[]>(`${environment.apiUrl}/work`)
			.pipe(
				tap((model: readonly WorkModel[]) => {
					this.loaderService.endLoading("[http] work");
				}),
				map((model: readonly WorkModel[]) => {
					this.loaderService.beginLoading("[tag] work");

					const taggedModel: readonly WorkModel[] = this.tagger.appendTags(model);

					this.loaderService.endLoading("[tag] work");

					return taggedModel;
				}),
				tap((model: readonly WorkModel[]) => {
					this.workCacheSource$.next(model);
				}),
			);
	}
}
