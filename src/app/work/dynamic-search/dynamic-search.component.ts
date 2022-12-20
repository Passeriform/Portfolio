import { Component, EventEmitter, HostListener, Input, Output } from "@angular/core";
import type { AfterViewInit } from "@angular/core";

import { Observable } from "rxjs";

import { FuzzyAnalyzer } from "@shared/injectables/fuzzy-analyzer";

import { Constants } from "./dynamic-search.config";
import type { RankedEntry } from "./dynamic-search.interface";

@Component({
	providers: [ FuzzyAnalyzer ],
	selector: "app-dynamic-search",
	styleUrls: [ "./dynamic-search.component.scss" ],
	templateUrl: "./dynamic-search.component.html",
})
export class DynamicSearchComponent<T extends { readonly tags: readonly string[] }> implements AfterViewInit {
	@Input() public readonly matchThreshold: number = Constants.MATCH_THRESHOLD;
	@Input() public readonly minimumSearchLength: number = Constants.MINIMUM_SEARCH_LENGTH;
	@Input() public model: readonly T[];
	@Input() public readonly resetTrigger$: Observable<void>;

	@Output() public readonly propagate: EventEmitter<readonly T[]> = new EventEmitter<readonly T[]>();

	@HostListener("mousedown", [ "$event" ])
	public onInputClick(event: MouseEvent): void {
		event.stopPropagation()
	}

	public searchText = "";

	constructor(private readonly fuzzyAnalyzer: FuzzyAnalyzer) { }

	ngAfterViewInit() {
		this.resetTrigger$.subscribe(() => {
			this.searchText = "";
			this.updateModel();
		});
	}

	public updateModel(): void {
		const rankedModel = this.model
			.map((entry: T): RankedEntry<T> => ({
				...entry,
				score: entry.tags
					.map((word: string) => this.fuzzyAnalyzer.scoreValue(word, this.searchText))
					.reduce((minScore: number, currentScore: number) => Math.max(minScore, currentScore)),
			}))
			.filter(
				(entry: RankedEntry<T>): boolean => this.searchText.length <= this.minimumSearchLength
					|| entry.score > this.matchThreshold,
			)
			.sort(
				(first: RankedEntry<T>, second: RankedEntry<T>): number => (first.score > second.score && Number.MIN_SAFE_INTEGER)
					|| (first.score < second.score && Number.MAX_SAFE_INTEGER)
					/* eslint-disable-next-line no-magic-numbers */
					|| 0,
			)
			.map((entry: RankedEntry<T>): T => {
				const { score, ...pluckedModel } = entry;

				return pluckedModel as unknown as T;
			});

		this.propagate.emit(rankedModel);
	}
}
