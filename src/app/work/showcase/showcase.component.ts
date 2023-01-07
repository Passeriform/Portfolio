import type { OnInit } from "@angular/core";
import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from "@angular/core";

import type { Observable } from "rxjs";
import { Subject } from "rxjs";

import { Orientation, Position } from "@shared/models/cardinals.interface";

import type { WorkModel } from "../work.interface";
import { WorkService } from "../services/work.service";
import { EXPANDED_HEIGHT_THRESHOLD } from "./showcase.config";

@Component({
	selector: "app-showcase",
	styleUrls: [ "./showcase.component.scss" ],
	templateUrl: "./showcase.component.html",
})
export class ShowcaseComponent implements OnInit {
	@Output() public readonly selectionEvent: EventEmitter<WorkModel> = new EventEmitter<WorkModel>();

	@ViewChild("cardScroller", { read: ElementRef }) public readonly cardChild: ElementRef<HTMLElement>;

	private readonly scrollResetSource$ = new Subject<void>();
	private readonly searchResetSource$ = new Subject<void>();

	public readonly Position = Position;
	public readonly Orientation = Orientation;

	public scrollResetState$: Observable<void> = this.scrollResetSource$.asObservable();
	public searchResetState$: Observable<void> = this.searchResetSource$.asObservable();
	public model: readonly WorkModel[];
	public activeModel: readonly WorkModel[];
	public showExpanded: boolean;

	@HostListener("window:resize")
	public onResize(): void {
		this.updateShowExpanded();
	}

	constructor(private readonly workService: WorkService) {
		this.updateShowExpanded();
	}

	public cancelClick(event: MouseEvent): void {
		event.stopPropagation();
	}

	ngOnInit() {
		this.workService.workCacheState$.subscribe((model: WorkModel[]) => {
			this.model = model;
		});
		this.workService.workActiveState$.subscribe((model: WorkModel[]) => {
			this.activeModel = model;
		});
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
