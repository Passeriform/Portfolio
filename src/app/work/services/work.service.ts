import { Injectable } from "@angular/core";

import type { Observable } from "rxjs";
import { BehaviorSubject, combineLatest } from "rxjs";
import { map, tap } from "rxjs/operators";

import { LoaderService } from "@app/loader/services/loader.service";
import { GetAllWorkGQL } from "@graphql/generated/schema";
import { extractWorks } from "@graphql/transformers/work.transformer";

import type { WorkModel, WorkTransformer } from "../models/work.interface";
import { NO_TRANSFORM } from "../work.config";

@Injectable()
export class WorkService {
	// TODO: Add support for multiple named filters
	private readonly workCacheSource$ = new BehaviorSubject<readonly WorkModel[]>([]);
	private readonly workSelectedSource$ = new BehaviorSubject<WorkModel | undefined>(undefined);
	private readonly workTransformSource$ = new BehaviorSubject<WorkTransformer>(NO_TRANSFORM);

	public readonly workActiveState$: Observable<readonly WorkModel[]>;
	public readonly workCacheState$: Observable<readonly WorkModel[]> = this.workCacheSource$.asObservable();
	public readonly workSelectedState$: Observable<WorkModel | undefined> = this.workSelectedSource$.asObservable();
	public readonly workTransformState$: Observable<WorkTransformer> = this.workTransformSource$.asObservable();

	constructor(
			private readonly getAllWorkGQL: GetAllWorkGQL,
			private readonly loaderService: LoaderService,
	) {
		this.workActiveState$ = combineLatest(
			[
				this.workCacheState$,
				this.workTransformState$,
			],
		).pipe(
			map(([cache, transform]: [readonly WorkModel[], WorkTransformer]) => transform(cache)),
		);
	}

	public refreshCache$(): Observable<readonly WorkModel[]> {
		this.loaderService.beginLoading("[http] work");

		return this.getAllWorkGQL.watch().valueChanges
			.pipe(
				map(extractWorks),
				tap((model) => {
					// TODO: Add a @trackForLoading decorator which awaits the statement and completes the loading as below
					this.loaderService.endLoading("[http] work");
					this.workCacheSource$.next(model);
				}),
			);
	}

	public setSelected(model: WorkModel | undefined): void {
		this.workSelectedSource$.next(model);
	}

	public setTransform(transformMethod: WorkTransformer): void {
		this.workTransformSource$.next(transformMethod);
	}
}
