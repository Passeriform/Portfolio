import { Injectable } from "@angular/core";
import { Location } from "@angular/common";
import { HttpClient } from "@angular/common/http";

import type { Observable } from "rxjs";
import { BehaviorSubject, combineLatest } from "rxjs";
import { map, tap } from "rxjs/operators";

import { environment } from "@env/environment";
import type { Framework, Language, License, Tool } from "@shared/models/registry.interface";
import { LoaderService } from "@app/loader/services/loader.service";
import { filterNonKeywords, populateTags } from "@utility/tags";

import type { WorkModel } from "../models/work.interface";
import { NO_TRANSFORM } from "../work.config";

const extractKeywords = (textString: string): readonly string[] => filterNonKeywords(
	textString.split(/[\s"(),./:;?\\\-]+/),
);

@Injectable()
export class WorkService {
	// TODO: Add support for multiple named filters
	private readonly workCacheSource$ = new BehaviorSubject<readonly WorkModel[]>([]);
	private readonly workSelectedSource$ = new BehaviorSubject<WorkModel | undefined>(undefined);
	private readonly workTransformSource$ = new BehaviorSubject<typeof NO_TRANSFORM>(NO_TRANSFORM);

	public readonly workActiveState$: Observable<readonly unknown[]>;
	public readonly workCacheState$: Observable<readonly WorkModel[]> = this.workCacheSource$.asObservable();
	public readonly workSelectedState$: Observable<WorkModel | undefined> = this.workSelectedSource$.asObservable();
	public readonly workTransformState$: Observable<(_: readonly WorkModel[]) => unknown[]> = this.workTransformSource$.asObservable();

	constructor(
			private readonly http: HttpClient,
			private readonly loaderService: LoaderService,
			private readonly location: Location,
	) {
		this.workActiveState$ = combineLatest(
			[
				this.workCacheState$,
				this.workTransformState$,
			],
			// TODO: Type this transform to infer return value
			(cache: readonly WorkModel[], transform: (_: readonly WorkModel[]) => unknown[]) => transform(cache),
		);
	}

	public refreshCache$(): Observable<readonly WorkModel[]> {
		this.loaderService.beginLoading("[http] work");

		return this.http.get<readonly WorkModel[]>(`${environment.apiUrl}/work`)
			.pipe(
				tap(() => {
					this.loaderService.endLoading("[http] work");
				}),
				map((model: readonly WorkModel[]) => {
					// TODO: Add a @trackForLoading decorator which awaits the statement and completes the loading as below
					this.loaderService.beginLoading("[tag] work");

					const taggedModel: readonly WorkModel[] = populateTags(model, (entry) => [
						entry.type.toString(),
						...extractKeywords(entry.title),
						...extractKeywords(entry.subtitle),
						...extractKeywords(entry.description),
						...entry.license.map((license: License) => license.toString()),
						...entry.languages.map((language: Language) => language.toString()),
						...entry.frameworks.map((framework: Framework) => framework.toString()),
						...entry.tools.map((tool: Tool) => tool.toString()),
					]);

					this.loaderService.endLoading("[tag] work");

					return taggedModel;
				}),
				tap((model: readonly WorkModel[]) => {
					this.workCacheSource$.next(model);
				}),
			);
	}

	public setSelected(model: WorkModel): void {
		this.location.replaceState(`${model.type}/${model.ref}`);
		this.workSelectedSource$.next(model);
	}

	public setTransform(transformMethod: (_: readonly WorkModel[]) => unknown[]): void {
		this.workTransformSource$.next(transformMethod);
	}
}
