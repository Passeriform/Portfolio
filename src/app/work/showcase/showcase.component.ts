import type { OnInit } from "@angular/core";
import { Component, HostListener, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";

import type { WorkModel } from "../work.interface";
import { WorkService } from "../services/work.service";

@Component({
	selector: "app-showcase",
	styleUrls: [ "./showcase.component.scss" ],
	templateUrl: "./showcase.component.html",
})
export class ShowcaseComponent implements OnInit {
	@ViewChild("cardScroller", { read: ElementRef }) public readonly cardChild: ElementRef<HTMLElement>;

	public model: readonly WorkModel[];

	public windowHeight: number;

	@HostListener("window:resize")
	public onResize(): void {
		this.updateWindowHeight();
	}

	constructor(
			private readonly router: Router,
			private readonly workService: WorkService,
	) {
		this.updateWindowHeight();
	}

	public cancelClick(event: MouseEvent): void {
		event.stopPropagation();
	}

	ngOnInit() {
		this.workService.workActiveState$.subscribe((model) => {
			this.model = model;
		});
	}

	public updateWindowHeight(): void {
		const bodyElement: HTMLBodyElement | null = document.querySelector("body");

		this.windowHeight = bodyElement
			? window.innerHeight / Number.parseFloat(
				getComputedStyle(
					bodyElement,
				)["font-size"] as string,
			)
			: 0;
	}

	public setSelected(entry: WorkModel): void {
		this.workService.setSelected(entry);
	}

	public setActive(activeModel: readonly WorkModel[]): void {
		this.workService.setActive(activeModel);
	}
}
