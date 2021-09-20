import { Component, EventEmitter, Input, Output } from "@angular/core";
import type { OnInit } from "@angular/core";

import type { WordScore } from "./dynamic-search.interface";
import { FuzzyAnalyzer } from "./fuzzy-analyzer";

@Component({
	providers: [ FuzzyAnalyzer ],
	selector: "app-dynamic-search",
	styleUrls: [ "./dynamic-search.component.scss" ],
	templateUrl: "./dynamic-search.component.html",
})
export class DynamicSearchComponent implements OnInit {
	@Input() public model: readonly WordScore[];

	@Output() public readonly propagate: EventEmitter<readonly WordScore[]> = new EventEmitter<readonly WordScore[]>();

	public queryString: string;

	constructor(private readonly fuzzyAnalyzer: FuzzyAnalyzer) {
		this.queryString = "";
	}

	ngOnInit() {
		// ngOnInit
	}

	public applyFilter(): void {
		if (!this.queryString) {
			return;
		}

		this.model = this.model
			.map(
				(entry) => {
					entry.score = entry.tags
						.map((word: string) => this.fuzzyAnalyzer.scoreValue(word, this.queryString))
						.reduce((minScore: number, currentScore: number) => Math.max(minScore, currentScore));

					return entry;
				},
			)
			.sort(
				(first, second) => (first.score > second.score && Number.MIN_SAFE_INTEGER)
					|| (first.score < second.score && Number.MAX_SAFE_INTEGER)
					/* eslint-disable-next-line no-magic-numbers */
					|| 0,
			);

		this.propagate.emit(this.model);
	}
}
