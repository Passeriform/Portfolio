import { Injectable } from "@angular/core";
import { Location } from "@angular/common";

import type { Observable } from "rxjs";
import { BehaviorSubject, combineLatest } from "rxjs";
import { map, tap } from "rxjs/operators";

import { LoaderService } from "@app/loader/services/loader.service";
import { GetAllWorkGQL } from "@graphql/generated/schema";
import { extractWorks } from "@graphql/transformers/work.transformer";
import { filterNonKeywords, populateTags } from "@utility/tags";

import type { WorkModel, WorkTransformer } from "../models/work.interface";
import { NO_TRANSFORM } from "../work.config";

const extractKeywords = (textString: string): readonly string[] => filterNonKeywords(
	textString.split(/[\s"(),./:;?\\\-]+/),
);

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
			private readonly location: Location,
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
				map((model) => {
					this.loaderService.endLoading("[http] work");

					// TODO: Add a @trackForLoading decorator which awaits the statement and completes the loading as below
					this.loaderService.beginLoading("[tag] work");

					const taggedModel = populateTags<WorkModel>(model as WorkModel[], (entry) => [
						entry.type.toString(),
						...extractKeywords(entry.title),
						...extractKeywords(entry.subtitle),
						...extractKeywords(entry.brief),
						...entry.license.map((license) => license.toString()),
						...entry.languages.map((language) => language.toString()),
						...entry.frameworks.map((framework) => framework.toString()),
						...entry.tools.map((tool) => tool.toString()),
					]);

					this.loaderService.endLoading("[tag] work");

					return taggedModel;
				}),
				tap((model) => {
					this.workCacheSource$.next(model);
				}),
			);
	}

	public setSelected(model: WorkModel): void {
		// TODO: Check if this should use slug or route
		this.location.replaceState(`${model.type}/${model.slug}`);
		this.workSelectedSource$.next(model);
	}

	public setTransform(transformMethod: WorkTransformer): void {
		this.workTransformSource$.next(transformMethod);
	}
}
