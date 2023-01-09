import type { OnInit } from "@angular/core";
import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from "@angular/core";

import type { Observable } from "rxjs";
import { Subject } from "rxjs";

import { Orientation, Position } from "@shared/models/cardinals.interface";
import { stopClickPropagation } from "@utility/events";

import type { WorkModel } from "../models/work.interface";
import { WorkService } from "../services/work.service";
import { EXPANDED_HEIGHT_THRESHOLD } from "./showcase.config";

@Component({
	selector: "app-showcase",
	styleUrls: [ "./showcase.component.scss" ],
	templateUrl: "./showcase.component.html",
})
export class ShowcaseComponent implements OnInit {
	private readonly scrollResetSource$ = new Subject<void>();
	private readonly searchResetSource$ = new Subject<void>();

	public activeModel$: Observable<readonly WorkModel[]>;
	public cancelClick: (event: MouseEvent) => void = stopClickPropagation;
	public model$: Observable<readonly WorkModel[]>;
	public scrollResetState$: Observable<void> = this.scrollResetSource$.asObservable();
	public searchResetState$: Observable<void> = this.searchResetSource$.asObservable();
	public showExpanded: boolean;

	/* eslint-disable @typescript-eslint/member-ordering */
	public readonly Orientation = Orientation;
	public readonly Position = Position;
	/* eslint-enable @typescript-eslint/member-ordering */

	@Output() public readonly selectionEvent: EventEmitter<WorkModel> = new EventEmitter<WorkModel>();

	@ViewChild("cardScroller", { read: ElementRef }) public readonly cardChild: ElementRef<HTMLElement>;

	@HostListener("window:resize")
	public onResize(): void {
		this.updateShowExpanded();
	}

	constructor(private readonly workService: WorkService) {
		this.updateShowExpanded();
	}

	ngOnInit() {
		this.model$ = this.workService.workCacheState$;
		this.activeModel$ = this.workService.workActiveState$ as Observable<WorkModel[]>;
	}

	public updateShowExpanded(): void {
		const bodyElement: HTMLBodyElement | null = document.querySelector("body");

		const windowHeight = bodyElement
			? window.innerHeight / Number.parseFloat(
				getComputedStyle(
					bodyElement,
				)["font-size"] as string,
			)
			: 0;

		this.showExpanded = windowHeight > EXPANDED_HEIGHT_THRESHOLD;
	}

	public setSelected(entry: WorkModel): void {
		this.workService.setSelected(entry);
		this.selectionEvent.emit(entry);
	}

	public setTransform(updatedModel: readonly WorkModel[]): void {
		const modelTransform = (model: WorkModel[]) => updatedModel.map(
			(updatedEntry: WorkModel) => model.find(
				(entry: WorkModel) => entry.ref === updatedEntry.ref,
			),
		);

		this.workService.setTransform(modelTransform);
	}

	public resetScroll(event: MouseEvent): void {
		this.scrollResetSource$.next();
		event.stopPropagation();
	}

	public resetSearch(event: MouseEvent): void {
		this.searchResetSource$.next();
		event.stopPropagation();
	}
}
