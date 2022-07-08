import type { OnInit } from "@angular/core";
import { Component, ElementRef, HostListener, ViewChild } from "@angular/core";

import type { Observable } from "rxjs";
import { Subject } from "rxjs";

import { Orientation, Position } from "@shared/models/cardinals.interface";

import type { WorkModel } from "../work.interface";
import { WorkService } from "../services/work.service";

@Component({
	selector: "app-showcase",
	styleUrls: [ "./showcase.component.scss" ],
	templateUrl: "./showcase.component.html",
})
export class ShowcaseComponent implements OnInit {
	@ViewChild("cardScroller", { read: ElementRef }) public readonly cardChild: ElementRef<HTMLElement>;

	public readonly Position = Position;
	public readonly Orientation = Orientation;

	public scrollResetSource$ = new Subject<void>();
	public scrollResetState$: Observable<void> = this.scrollResetSource$.asObservable();
	public model: readonly WorkModel[];
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
		this.workService.workActiveState$.subscribe((model: WorkModel[]) => {
			this.model = model;
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

			this.showExpanded = windowHeight > 32;
	}

	public setSelected(entry: WorkModel): void {
		this.workService.setSelected(entry);
	}

	public setActive(activeModel: readonly WorkModel[]): void {
		this.workService.setActive(activeModel);
	}

	public resetScroll(event: MouseEvent): void {
		this.scrollResetSource$.next();
	}
}
