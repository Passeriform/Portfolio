import { Component, EventEmitter, HostListener, Input, Output } from "@angular/core";
import type { AfterViewInit, OnChanges, SimpleChanges } from "@angular/core";
import Fuse from "fuse.js";

import { Observable } from "rxjs";

import { stopClickPropagation } from "@utility/events";

import { SearchOptions } from "./dynamic-search.config";

@Component({
	selector: "app-dynamic-search",
	standalone: true,
	styleUrls: [ "./dynamic-search.component.scss" ],
	templateUrl: "./dynamic-search.component.html",
})
export class DynamicSearchComponent<T extends { tags: readonly string[] }> implements AfterViewInit, OnChanges {
	private fuse: Fuse<T>;

	@Input() public model: readonly T[];
	// TODO: Pass keys from outside instead of populating tags internally.
	@Input() public searchPaths: readonly string[] = [ "tags" ];
	// @Input() public readonly matchThreshold: number = Constants.MATCH_THRESHOLD;
	@Input() public readonly minimumSearchLength: number = 0;
	@Input() public readonly resetTrigger$: Observable<void>;

	@Output() public readonly propagate: EventEmitter<readonly T[]> = new EventEmitter<readonly T[]>();

	@HostListener("mousedown", [ "$event" ])
	@HostListener("keydown", [ "$event" ])
	public onSelect: (event: KeyboardEvent | MouseEvent) => void = stopClickPropagation;

	ngAfterViewInit() {
		this.resetTrigger$.subscribe(() => {
			this.propagate.emit(this.model);
		});
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.model) {
			this.fuse = new Fuse(
				changes.model.currentValue as unknown as T[],
				{ ...SearchOptions, keys: this.searchPaths as string[] },
			);
		}
	}

	public onChange(event: Event): void {
		this.rankModel((event.target as HTMLInputElement).value);
	}

	public rankModel(searchText: string): void {
		if (searchText.length === 0 || searchText.length < this.minimumSearchLength) {
			this.propagate.emit(this.model);

			return;
		}

		const rankedModel = this.fuse
			.search(searchText)
			.map(({ item }) => item);

		this.propagate.emit(rankedModel);
	}
}
